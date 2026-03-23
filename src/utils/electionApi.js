const API_URL = import.meta.env.VITE_API_URL || 'https://elections-api.dita.co.ke/api';

export const getCandidates = async () => {
  const response = await fetch(`${API_URL}/candidates`);
  if (!response.ok) throw new Error('Failed to fetch candidates');
  return response.json();
};

export const sendOtp = async (email) => {
  const response = await fetch(`${API_URL}/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to send OTP');
  }
  return response.json();
};

export const verifyOtp = async (email, otp) => {
  const response = await fetch(`${API_URL}/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Invalid OTP');
  }
  const { token } = await response.json();
  localStorage.setItem('voter_token', token);
  return token;
};

export const getMyVotes = async (providedToken = null) => {
    const token = providedToken || localStorage.getItem('voter_token');
    const response = await fetch(`${API_URL}/my-votes`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch your votes');
    return response.json();
};

export const castVote = async (candidateId) => {
  const token = localStorage.getItem('voter_token');
  const response = await fetch(`${API_URL}/vote`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ candidateId }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to cast vote');
  }
  return response.json();
};
