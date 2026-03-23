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
app.post('/api/vote', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { candidateId } = req.body;

    // Check if already voted
    const check = await pool.query('SELECT * FROM votes WHERE voter_email = $1', [decoded.email]);
    if (check.rows.length > 0) {
      return res.status(403).json({ error: 'You have already voted' });
    }

    // Insert vote
    await pool.query('INSERT INTO votes (voter_email, candidate_id) VALUES ($1, $2)', [decoded.email, candidateId]);
    res.json({ message: 'Vote cast successfully' });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid token' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
