const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST'],
  credentials: true
}));

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
  const { email, admissionNumber } = req.body;
  if (!email || !email.endsWith('@daystar.ac.ke')) {
    return res.status(400).json({ error: 'Invalid email domain. Use your @daystar.ac.ke student email.' });
  }

  if (!admissionNumber) {
    return res.status(400).json({ error: 'Admission Number is required.' });
  }

  // 1. App User Verification (Bridge to Django Backend)
  if (process.env.DJANGO_API_URL) {
    try {
      const verifyUrl = `${process.env.DJANGO_API_URL}/api/verify-voter/?admission_number=${admissionNumber}`;
      const resp = await fetch(verifyUrl, {
        headers: { 'X-Internal-Key': process.env.INTERNAL_API_KEY }
      });
      
      if (!resp.ok) {
        console.error('Verification API error:', resp.status);
      } else {
        const data = await resp.json();
        if (!data.is_user) {
          return res.status(403).json({ 
            error: 'Student not found in the DITA App database. Please download and register in the DITA App first to vote.' 
          });
        }
      }
    } catch (err) {
      console.error('Verification connection failed:', err.message);
      // In case of bridge failure, we log it.
    }
  }

  // 2. Check if already finished (Optional info for frontend)
  let alreadyFinished = false;
  try {
    const votalbePositionsCountMatch = await pool.query(`SELECT COUNT(DISTINCT position) as count FROM candidates`);
    const totalVotalbePositions = parseInt(votalbePositionsCountMatch.rows[0].count);
    
    const userVotesCountMatch = await pool.query(`SELECT COUNT(DISTINCT position) as count FROM votes WHERE voter_email = $1`, [email]);
    const userVotesCount = parseInt(userVotesCountMatch.rows[0].count);
    
    if (userVotesCount >= totalVotalbePositions && totalVotalbePositions > 0) {
      alreadyFinished = true;
    }
  } catch (err) {
    console.error('Finished check failed:', err.message);
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
    res.json({ message: 'OTP sent', alreadyFinished });
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

// 4. Get Election Results (Only for those who have finished voting)
app.get('/api/results', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 1. Check if the user has finished voting
    // A voter is "finished" if they have voted for all positions that have candidates
    const votalbePositionsCountMatch = await pool.query(`
      SELECT COUNT(DISTINCT position) as count FROM candidates
    `);
    const totalVotalbePositions = parseInt(votalbePositionsCountMatch.rows[0].count);

    const userVotesCountMatch = await pool.query(`
      SELECT COUNT(DISTINCT position) as count FROM votes WHERE voter_email = $1
    `, [decoded.email]);
    const userVotesCount = parseInt(userVotesCountMatch.rows[0].count);

    if (userVotesCount < totalVotalbePositions) {
      return res.status(403).json({ 
        error: 'Results are hidden until you finish casting all your votes.',
        votesRemaining: totalVotalbePositions - userVotesCount 
      });
    }

    // 2. Fetch Results
    const results = await pool.query(`
      SELECT 
        c.id, 
        c.name, 
        c.position, 
        c.image_url,
        CAST(COUNT(v.id) AS INTEGER) as vote_count
      FROM candidates c
      LEFT JOIN votes v ON c.id = v.candidate_id
      GROUP BY c.id, c.name, c.position, c.image_url
      ORDER BY c.position, vote_count DESC
    `);

    res.json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid token or session expired' });
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
