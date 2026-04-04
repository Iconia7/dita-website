import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2, Lock, Vote, Info, AlertCircle, BarChart3, RefreshCw } from 'lucide-react';
import { sendOtp, verifyOtp, getCandidates, castVote, getMyVotes, bulkUploadCandidates, getResults } from '../../utils/electionApi';
import { useState, useEffect } from 'react';
import { Upload, Key, FileText } from 'lucide-react';

const POSITION_ORDER = [
  'President',
  'Vice President',
  'Treasurer',
  'Resources Manager',
  'Organizing Secretary',
  'Public Relations Officer',
  'Secretary',
  'DICT Representative'
];

const ElectionPortal = ({ isVerified, onVerify }) => {
  const [email, setEmail] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Multi-Step Voting, 4: Success
  const [candidates, setCandidates] = useState([]);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [votedPositions, setVotedPositions] = useState([]); // Track positions voted for
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }

    // Session Recovery
    const savedToken = localStorage.getItem('voter_token');
    if (savedToken) {
      resumeSession(savedToken);
    }
  }, []);

  const resumeSession = async (token) => {
    setLoading(true);
    try {
      const votedPos = await getMyVotes(token);
      setVotedPositions(votedPos);
      onVerify(token);
      
      const nextIndex = POSITION_ORDER.findIndex(pos => !votedPos.includes(pos));
      if (nextIndex === -1 && votedPos.length > 0) {
        setStep(4);
      } else {
        setCurrentPositionIndex(nextIndex !== -1 ? nextIndex : 0);
        setStep(3);
      }
    } catch (err) {
      console.error('Session recovery failed:', err.message);
      localStorage.removeItem('voter_token');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !adminKey) {
      setError('Please provide both the CSV file and the Admin Secret Key.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target.result;
        const rows = text.split('\n').filter(r => r.trim());
        const header = rows.shift().split(',').map(h => h.trim().toLowerCase());
        
        const candidatesData = rows.map(row => {
          const values = row.split(',').map(v => v.trim());
          const c = {};
          header.forEach((h, i) => {
            if (values[i]) c[h] = values[i];
          });
          return c;
        });

        setLoading(true);
        setUploadStatus('Uploading...');
        await bulkUploadCandidates(candidatesData, adminKey);
        setUploadStatus('Success! Candidates updated.');
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        setError('Upload failed: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    if (step === 3) {
      const fetchCandidates = async () => {
        try {
          const data = await getCandidates();
          setCandidates(data);
        } catch (err) {
          setError('Failed to load candidates.');
        }
      };
      fetchCandidates();
    }
  }, [step]);

  // Auto-skip logic: Automatically jump over positions already voted for
  useEffect(() => {
    if (step === 3) {
      const isAlreadyVoted = votedPositions.includes(POSITION_ORDER[currentPositionIndex]);
      if (isAlreadyVoted) {
        const nextIdx = POSITION_ORDER.findIndex((pos, idx) => idx > currentPositionIndex && !votedPositions.includes(pos));
        if (nextIdx !== -1) {
          setCurrentPositionIndex(nextIdx);
        } else {
          setStep(4); // All remaining positions already voted for
        }
      }
    }
  }, [currentPositionIndex, votedPositions, step]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email.endsWith('@daystar.ac.ke')) {
      setError('Please use your official @daystar.ac.ke email.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const resp = await sendOtp(email, admissionNumber);
      if (resp.alreadyFinished) {
        setError('You have already cast all your votes. Signing in will take you directly to live results.');
      }
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = await verifyOtp(email, otp);
      onVerify(token);
      
      // Resume logic: Fetch existing votes and jump to correct step
      const votedPos = await getMyVotes(token);
      setVotedPositions(votedPos);
      
      const nextIndex = POSITION_ORDER.findIndex(pos => !votedPos.includes(pos));
      if (nextIndex === -1 && votedPos.length > 0) {
        setStep(4); // Voted for all positions already
      } else {
        setCurrentPositionIndex(nextIndex !== -1 ? nextIndex : 0);
        setStep(3);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (candidateId, position) => {
    setLoading(true);
    setError('');
    try {
      await castVote(candidateId);
      const newVoted = [...votedPositions, position];
      setVotedPositions(newVoted);
      
      // Advance to next position or end
      const nextIndex = POSITION_ORDER.findIndex((pos, idx) => idx > currentPositionIndex && !newVoted.includes(pos));
      
      if (nextIndex !== -1) {
        setCurrentPositionIndex(nextIndex);
      } else {
        setStep(4); // All done!
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Group candidates by the official order
  const currentPositionName = POSITION_ORDER[currentPositionIndex];
  const currentCandidates = candidates.filter(c => c.position === currentPositionName);

  // Remove the hardcoded candidates list

  return (
    <section className="py-20 container-custom">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Admin Bulk Upload Panel */}
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 bg-slate-900 text-white p-8 rounded-3xl shadow-2xl border border-slate-800"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand-accent/20 rounded-lg flex items-center justify-center text-brand-accent">
                  <Upload size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Admin: Bulk Candidate Upload</h2>
                  <p className="text-slate-400 text-sm">Replace all candidates quickly via CSV.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                    <Key size={14} /> Admin Secret Key
                  </label>
                  <input
                    type="password"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-accent outline-none transition-all"
                    placeholder="Enter secret key..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                    <FileText size={14} /> Candidates CSV File
                  </label>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleBulkUpload}
                    disabled={loading}
                    className="w-full bg-slate-800 border-none rounded-xl px-4 py-2 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-brand-accent file:text-slate-900 hover:file:bg-white cursor-pointer"
                  />
                </div>
              </div>

              {uploadStatus && (
                <p className={`text-sm font-bold ${uploadStatus.includes('Success') ? 'text-green-400' : 'text-brand-accent'}`}>
                  {uploadStatus}
                </p>
              )}
              
              <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>CSV Format:</strong> <code>name,position,manifesto,image_url</code><br/>
                  *The first row must be the header. This will overwrite all existing candidates!
                </p>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Step 1: Student Verification</h2>
                  <p className="text-slate-500">Enter your institutional email to begin.</p>
                </div>
              </div>

              <form onSubmit={handleSendOTP} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Admission Number</label>
                    <input
                      type="text"
                      value={admissionNumber}
                      onChange={(e) => setAdmissionNumber(e.target.value)}
                      className="w-full px-4 py-4 bg-slate-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-brand-accent outline-none transition-all font-medium text-slate-900"
                      placeholder="23-0000"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Student Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-4 bg-slate-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-brand-accent outline-none transition-all font-medium text-slate-900"
                      placeholder="johndoe@daystar.ac.ke"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 mt-3 text-red-500 text-sm font-medium">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                  <Info className="text-blue-500 mt-1 shrink-0" size={18} />
                  <p className="text-blue-700 text-sm leading-relaxed">
                    A unique 6-digit verification code will be sent to your student email. This ensures only verified association members can participate.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-accent hover:-translate-y-1 hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Sending Code...' : 'Send Verification Code'}
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 text-center"
            >
              <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent mx-auto mb-6">
                <Lock size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify Your Identity</h2>
              <p className="text-slate-500 mb-8">We've sent a 6-digit code to <span className="text-brand-primary font-semibold">{email}</span></p>

              <form onSubmit={handleVerifyOTP} className="max-w-xs mx-auto space-y-6">
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-brand-accent outline-none transition-all font-bold text-center text-3xl tracking-[1em] text-slate-900"
                  placeholder="000000"
                  required
                />

                {error && (
                  <div className="flex items-center justify-center gap-2 text-red-500 text-sm font-medium">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-accent hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-slate-500 text-sm font-medium hover:text-brand-primary transition-colors"
                >
                  Didn't receive a code? Try again
                </button>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                   <h2 className="text-3xl font-bold text-slate-900">{currentPositionName}</h2>
                   <p className="text-slate-500">Select your preferred candidate for this role.</p>
                </div>
                <div className="bg-brand-primary/10 px-4 py-2 rounded-xl border border-brand-primary/10">
                   <p className="text-brand-primary font-bold text-sm">Position {currentPositionIndex + 1} of {POSITION_ORDER.length}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentPositionIndex + 1) / POSITION_ORDER.length) * 100}%` }}
                  className="h-full bg-brand-dark transition-all duration-500"
                ></motion.div>
              </div>

              {currentCandidates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentCandidates.map((candidate) => (
                    <motion.div
                      key={candidate.id}
                      whileHover={{ y: -5 }}
                      className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center text-center"
                    >
                      <img src={candidate.image_url || 'https://via.placeholder.com/150'} alt={candidate.name} className="w-32 h-32 rounded-2xl object-cover mb-4 shadow-md" />
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{candidate.name}</h3>
                        <p className="text-slate-500 text-sm line-clamp-3 mb-6 italic">"{candidate.manifesto}"</p>
                        <button
                          onClick={() => handleVote(candidate.id, currentPositionName)}
                          disabled={loading}
                          className="w-full flex items-center justify-center gap-2 bg-brand-dark text-white hover:bg-brand-accent px-6 py-3 rounded-xl transition-all font-bold disabled:opacity-50"
                        >
                          <Vote size={20} />
                          {loading ? 'Voting...' : `Vote for ${candidate.name}`}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 p-12 rounded-3xl text-center border-2 border-dashed border-slate-200">
                  <p className="text-slate-500 mb-4 font-medium">No candidates registered for this position.</p>
                  <button 
                    onClick={() => {
                      if (currentPositionIndex < POSITION_ORDER.length - 1) {
                        setCurrentPositionIndex(currentPositionIndex + 1);
                      } else {
                        setStep(4);
                      }
                    }}
                    className="text-brand-primary font-bold hover:underline"
                  >
                    Skip to Next Position →
                  </button>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm font-medium justify-center">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100"
            >
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Ballot Cast Successfully!</h2>
                <p className="text-slate-600 max-w-md mx-auto">
                  Thank you for participating. You can now view the live election results below.
                </p>
              </div>

              <div className="border-t border-slate-100 pt-12">
                <ResultsDashboard />
              </div>

              <div className="mt-12 flex justify-center">
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all text-sm"
                >
                  Sign Out & Finish
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const ResultsDashboard = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchResults = async () => {
    try {
      const data = await getResults();
      setResults(data);
      setLastUpdated(new Date());
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading && results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Loading live results...</p>
      </div>
    );
  }

  // Group by position
  const groupedResults = results.reduce((acc, curr) => {
    if (!acc[curr.position]) acc[curr.position] = [];
    acc[curr.position].push(curr);
    return acc;
  }, {});

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-900">
          <BarChart3 className="text-brand-primary" size={24} />
          <h3 className="text-xl font-bold">Live Election Tally</h3>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <RefreshCw size={12} className="animate-spin-slow" />
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-10">
        {Object.entries(groupedResults).map(([position, candidates]) => {
          const totalVotes = candidates.reduce((sum, c) => sum + (c.vote_count || 0), 0);
          
          return (
            <div key={position} className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-lg text-slate-800">{position}</h4>
                <span className="text-slate-400 text-sm font-medium">{totalVotes} total votes</span>
              </div>
              
              <div className="space-y-5">
                {candidates.map((candidate) => {
                  const percentage = totalVotes > 0 ? (candidate.vote_count / totalVotes) * 100 : 0;
                  
                  return (
                    <div key={candidate.id} className="space-y-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <div className="flex items-center gap-3">
                          <img 
                            src={candidate.image_url || 'https://via.placeholder.com/40'} 
                            alt="" 
                            className="w-8 h-8 rounded-full object-cover shadow-sm"
                          />
                          <span className="font-bold text-slate-700">{candidate.name}</span>
                        </div>
                        <div className="font-bold text-slate-900">
                          {candidate.vote_count} <span className="text-slate-400 font-medium text-xs ml-1">({percentage.toFixed(1)}%)</span>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            percentage === Math.max(...candidates.map(c => totalVotes > 0 ? (c.vote_count / totalVotes) * 100 : 0)) 
                            ? 'bg-brand-primary' 
                            : 'bg-slate-300'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ElectionPortal;
