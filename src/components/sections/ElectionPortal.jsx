import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2, Lock, Vote, Info, AlertCircle } from 'lucide-react';
import { sendOTP, verifyOTP, castVote, getCandidates } from '../../utils/electionApi';
import { useEffect } from 'react';

const ElectionPortal = ({ isVerified, onVerify }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Voting
  const [candidates, setCandidates] = useState([]);
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
      setError('Please use your official @student.daystar.ac.ke email.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await sendOTP(email);
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
      await verifyOTP(email, otp);
      setStep(3);
      onVerify();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (candidateId) => {
    setLoading(true);
    setError('');
    try {
      await castVote(candidateId);
      alert('Your vote has been cast successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <p className="text-green-800 font-bold">Successfully Verified</p>
                    <p className="text-green-700 text-sm">You are eligible to vote in the current election.</p>
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Authenticated As</p>
                  <p className="text-slate-600 font-medium">{email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {candidates.map((candidate) => (
                  <motion.div
                    key={candidate.id}
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex gap-6 items-center"
                  >
                    <img src={candidate.image_url || 'https://via.placeholder.com/150'} alt={candidate.name} className="w-24 h-24 rounded-2xl object-cover" />
                    <div className="flex-grow">
                      <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-1">{candidate.position}</p>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{candidate.name}</h3>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-4 italic">"{candidate.manifesto}"</p>
                      <button
                        onClick={() => handleVote(candidate.id)}
                        disabled={loading}
                        className="flex items-center gap-2 bg-brand-primary/10 hover:bg-brand-primary hover:text-white text-brand-primary px-4 py-2 rounded-xl transition-all font-bold text-sm disabled:opacity-50"
                      >
                        <Vote size={18} />
                        {loading ? 'Voting...' : 'Cast Vote'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-brand-dark text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Transparency & Security</h3>
                    <p className="text-slate-300">All votes are recorded anonymously and encrypted using RSA-2048. Double voting is strictly prohibited and verified at the database level.</p>
                  </div>
                  <Lock size={64} className="text-brand-accent opacity-20" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ElectionPortal;
