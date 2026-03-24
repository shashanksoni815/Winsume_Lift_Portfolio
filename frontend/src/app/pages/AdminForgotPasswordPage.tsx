import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Mail, Shield, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useNavigate } from 'react-router';
import React from 'react';

export function AdminForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const response = await fetch('https://winsume-lift-backend01.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.message ?? 'Unable to send reset email. Please try again.';
        alert(message);
        return;
      }

      setSubmitted(true);
      navigate('/reset-password', { state: { email, origin: 'admin' } });
    } catch (error) {
      console.error('Admin forgot password error', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#1a3332] relative">
      <Navigation />
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600"
          alt="Admin Forgot Password Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/80 via-[#1a3332]/70 to-[#2a4544]"></div>
      </div>

      {/* Forgot Password Form Container */}
      <div className="min-h-screen flex items-center justify-center px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Back to Login Link */}
          <motion.button
            onClick={() => navigate('/admin-login')}
            className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors mb-6"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft size={16} />
            <span className="text-xs uppercase tracking-wider">Back to Admin Login</span>
          </motion.button>

          {/* Forgot Password Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
            {!submitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-full mb-3">
                    <Shield size={28} className="text-orange-500" />
                  </div>
                  <p className="text-orange-500 text-xs uppercase tracking-widest mb-1.5">ADMINISTRATION PORTAL</p>
                  <h1 className="font-['Great_Vibes'] text-4xl text-white mb-1.5">Forgot Password</h1>
                  <div className="w-20 h-0.5 bg-orange-500 mx-auto mb-3"></div>
                  <p className="text-white/60 text-xs">Enter your admin email to reset your password</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Field */}
                  <div>
                    <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
                      <Mail size={14} className="text-orange-500" />
                      <span>Admin Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="admin@winsume.com"
                      required
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
                    />
                  </div>

                  {/* Security Notice */}
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                      <p className="text-white/70 text-xs leading-relaxed">
                        After confirming your admin email, you can immediately set a new secure password.
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => navigate('/admin-login')}
                      className="flex-1 border-2 border-white/40 text-white px-6 py-3 rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-300 uppercase tracking-wider text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-lg uppercase tracking-wider text-sm disabled:opacity-60 disabled:hover:scale-100"
                    >
                      {isSubmitting ? 'Checking…' : 'Update Password'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full mb-6">
                  <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-green-500 text-xs uppercase tracking-widest mb-2">SECURE EMAIL SENT</p>
                <h2 className="font-['Great_Vibes'] text-4xl text-white mb-2">Check Your Inbox</h2>
                <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  Admin password reset instructions sent to:
                </p>
                <p className="text-orange-500 font-semibold mb-8">{email}</p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <Shield size={16} className="text-orange-500/60 mt-0.5 flex-shrink-0" />
                    <p className="text-white/50 text-xs leading-relaxed text-left">
                      For security, this request has been logged. If you didn't request this, please contact your system administrator immediately.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="flex-1 border-2 border-white/40 text-white px-6 py-3.5 rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-300 uppercase tracking-wider"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => navigate('/admin-login')}
                    className="flex-1 bg-orange-500 text-white px-6 py-3.5 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-lg uppercase tracking-wider"
                  >
                    Back to Login →
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}