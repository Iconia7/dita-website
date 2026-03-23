const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const otps = new Map(); // Use Redis in production

// --- ENDPOINTS ---

// --- ENDPOINTS ---

// 0. Get Candidates
app.get('/api/candidates', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM candidates ORDER BY position, name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

// 1. Send OTP
app.post('/api/auth/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email.endsWith('@daystar.ac.ke')) {
    return res.status(400).json({ error: 'Invalid email domain. Use @daystar.ac.ke' });
  }

  // 1. Membership Verification (Bridge to Django Backend)
  if (process.env.DJANGO_API_URL) {
    try {
      const verifyUrl = `${process.env.DJANGO_API_URL}/api/verify-voter/?email=${email}`;
      const resp = await fetch(verifyUrl, {
        headers: { 'X-Internal-Key': process.env.INTERNAL_API_KEY }
      });
      
      if (!resp.ok) {
        console.error('Membership API error:', resp.status);
      } else {
        const data = await resp.json();
        if (!data.is_member) {
          return res.status(403).json({ 
            error: data.message || 'Only active, paid-up DITA members can participate in elections. Please renew your membership in the DITA App.' 
          });
        }
      }
    } catch (err) {
      console.error('Membership verification connection failed:', err.message);
      // In case of bridge failure, we log it. Decide whether to block or allow.
      // For now, we continue but log the error.
    }
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otps.set(email, { otp, expires: Date.now() + 600000 }); // 10 mins

  try {
    await transporter.sendMail({
      from: `"DITA Elections" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Election Verification Code",
      text: `Your verification code is: ${otp}`,
      html: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #1e293b;">DITA Election Verification</h2>
              <p>Your unique verification code is:</p>
              <div style="font-size: 32px; font-weight: bold; color: #10b981; letter-spacing: 5px; margin: 20px 0;">${otp}</div>
              <p style="color: #64748b; font-size: 14px;">This code will expire in 10 minutes. If you didn't request this, please ignore this email.</p>
            </div>`,
    });
    res.json({ message: 'OTP sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// 2. Verify OTP
app.post('/api/auth/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  const record = otps.get(email);

  if (!record || record.otp !== otp || record.expires < Date.now()) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  otps.delete(email);
  res.json({ token });
});

// 3. Cast Vote
app.get('/api/my-votes', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await pool.query('SELECT position FROM votes WHERE voter_email = $1', [decoded.email]);
    res.json(result.rows.map(r => r.position));
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.post('/api/vote', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { candidateId } = req.body;

    // 1. Get candidate's position
    const candidateRes = await pool.query('SELECT position FROM candidates WHERE id = $1', [candidateId]);
    if (candidateRes.rows.length === 0) return res.status(404).json({ error: 'Candidate not found' });
    const position = candidateRes.rows[0].position;

    // 2. Check if already voted for THIS position
    const check = await pool.query('SELECT * FROM votes WHERE voter_email = $1 AND position = $2', [decoded.email, position]);
    if (check.rows.length > 0) {
      return res.status(403).json({ error: `You have already voted for ${position}` });
    }

    // 3. Insert vote with position
    await pool.query('INSERT INTO votes (voter_email, candidate_id, position) VALUES ($1, $2, $3)', [decoded.email, candidateId, position]);
    res.json({ message: `Vote cast for ${position} successfully` });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// 4. Admin: Bulk Upload Candidates
app.post('/api/admin/candidates/bulk', async (req, res) => {
  const secret = req.headers['x-internal-key'];
  if (secret !== process.env.INTERNAL_API_KEY) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { candidates } = req.body;
  if (!Array.isArray(candidates)) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('TRUNCATE TABLE candidates CASCADE');
    for (const c of candidates) {
      await client.query(
        'INSERT INTO candidates (name, position, manifesto, image_url) VALUES ($1, $2, $3, $4)',
        [c.name, c.position, c.manifesto, c.image_url]
      );
    }
    await client.query('COMMIT');
    res.json({ message: `Successfully uploaded ${candidates.length} candidates.` });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Bulk upload failed' });
  } finally {
    client.release();
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
