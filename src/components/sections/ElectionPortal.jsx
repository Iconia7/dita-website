import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2, Lock, Vote, Info, AlertCircle } from 'lucide-react';
import { sendOtp, verifyOtp, getCandidates, castVote, getMyVotes } from '../../utils/electionApi';
import { useState, useEffect } from 'react';

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
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Multi-Step Voting, 4: Success
  const [candidates, setCandidates] = useState([]);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [votedPositions, setVotedPositions] = useState([]); // Track positions voted for
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email.endsWith('@daystar.ac.ke')) {
      setError('Please use your official @daystar.ac.ke email.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await sendOtp(email);
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
      const votedPos = await getMyVotes();
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
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Student Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-4 bg-slate-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-brand-accent outline-none transition-all font-medium text-slate-900"
                    placeholder="johndoe230000@daystar.ac.ke"
                    required
                  />
                  {error && (
                    <div className="flex items-center gap-2 mt-3 text-red-500 text-sm font-medium">
                      <AlertCircle size={16} />
                      {error}
                    </div>
                  )}
                </div>

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
              className="bg-white p-8 md:p-16 rounded-3xl shadow-2xl border border-slate-100 text-center flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 animate-bounce">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Ballot Cast Successfully!</h2>
              <p className="text-slate-600 text-lg mb-8 max-w-md">
                Your votes for all {POSITION_ORDER.length} positions have been securely recorded. Thank you for participating in the DITA association elections.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-brand-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-accent transition-all"
                >
                  Return to Home
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ElectionPortal;
