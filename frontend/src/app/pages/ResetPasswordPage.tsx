import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Lock, Shield, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface ResetState {
  email?: string;
  origin?: 'user' | 'admin';
}

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as ResetState) || {};

  const origin = state.origin ?? 'user';
  const email = state.email ?? '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!email) {
      if (origin === 'admin') {
        navigate('/admin-forgot-password', { replace: true });
      } else {
        navigate('/forgot-password', { replace: true });
      }
    }
  }, [email, origin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('https://winsume-lift-backend01.onrender.com/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.message ?? 'Unable to reset password. Please try again.';
        alert(message);
        return;
      }

      alert('Password updated successfully. Please log in with your new password.');
      navigate(origin === 'admin' ? '/admin-login' : '/login', { replace: true });
    } catch (error) {
      console.error('Reset password error', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a3332] relative">
      <Navigation />

      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=1600"
          alt="Reset Password Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/80 via-[#1a3332]/70 to-[#2a4544]"></div>
      </div>

      <div className="min-h-screen flex items-center justify-center px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <motion.button
            onClick={() => navigate(origin === 'admin' ? '/admin-login' : '/login')}
            className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors mb-6"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft size={16} />
            <span className="text-xs uppercase tracking-wider">Back to Login</span>
          </motion.button>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-full mb-3">
                <Shield size={28} className="text-orange-500" />
              </div>
              <p className="text-orange-500 text-xs uppercase tracking-widest mb-1.5">
                {origin === 'admin' ? 'ADMIN PORTAL' : 'USER PORTAL'}
              </p>
              <h1 className="font-['Great_Vibes'] text-4xl text-white mb-1.5">Reset Password</h1>
              <div className="w-20 h-0.5 bg-orange-500 mx-auto mb-3"></div>
              <p className="text-white/60 text-xs">
                Create a new password for <span className="text-orange-400">{email}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
                  <Lock size={14} className="text-orange-500" />
                  <span>New Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    minLength={8}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-0 right-0 h-full px-4 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
                  <Lock size={14} className="text-orange-500" />
                  <span>Confirm Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    required
                    minLength={8}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-0 right-0 h-full px-4 text-white/60 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-lg font-semibold uppercase tracking-wider disabled:opacity-60 disabled:hover:scale-100"
              >
                {isSubmitting ? 'Updating…' : 'Update Password →'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

