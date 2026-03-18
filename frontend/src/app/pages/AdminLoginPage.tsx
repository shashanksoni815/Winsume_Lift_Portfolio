import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Mail, Lock, Shield, X, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useNavigate } from 'react-router';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      const response = await fetch('https://winsume-lift-portfolio-backend.onrender.com/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.message ?? 'Admin login failed. Please check your credentials.';
        alert(message);
        return;
      }

      const data = await response.json();

      localStorage.setItem('accessToken', data.tokens.accessToken);
      localStorage.setItem('refreshToken', data.tokens.refreshToken);
      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('isLoggedIn', 'true');

      navigate('/admin-dashboard');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Admin login error', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleResetEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetEmail(e.target.value);
  };

  const handleForgotPassword = () => {
    setShowForgotModal(true);
  };

  const handleResetPassword = () => {
    console.log('Reset password request for:', resetEmail);
    // Add logic to send reset password email
    setShowForgotModal(false);
  };

  return (
    <div className="min-h-screen bg-[#1a3332] relative">
      <Navigation />
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600"
          alt="Admin Login Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/80 via-[#1a3332]/70 to-[#2a4544]"></div>
      </div>

      {/* Login Form Container */}
      <div className="min-h-screen flex items-center justify-center px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Login Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-full mb-3">
                <Shield size={28} className="text-orange-500" />
              </div>
              <p className="text-orange-500 text-xs uppercase tracking-widest mb-1.5">ADMINISTRATION PORTAL</p>
              <h1 className="font-['Great_Vibes'] text-4xl text-white mb-1.5">Admin Login</h1>
              <div className="w-20 h-0.5 bg-orange-500 mx-auto mb-3"></div>
              <p className="text-white/60 text-xs">Executive Command Center</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="flex text-white/70 text-xs uppercase tracking-wider mb-2 items-center space-x-2">
                  <Mail size={14} className="text-orange-500" />
                  <span>Admin Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@winsume.com"
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="flex text-white/70 text-xs uppercase tracking-wider mb-2 items-center space-x-2">
                  <Lock size={14} className="text-orange-500" />
                  <span>Admin Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter admin password"
                    required
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

              {/* Forgot Password Link */}
              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={() => navigate('/create-identity')}
                  className="text-white/60 hover:text-white transition-colors text-xs uppercase tracking-wider"
                >
                  Create Identity
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin-forgot-password')}
                  className="text-orange-500 hover:text-orange-400 transition-colors text-xs uppercase tracking-wider"
                >
                  Forgot Password
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-lg font-semibold uppercase tracking-wider disabled:opacity-60 disabled:hover:scale-100"
              >
                {isSubmitting ? 'Authorizing…' : 'Authorize Admin Access →'}
              </button>

              {/* Security Notice */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-start space-x-3">
                  <Shield size={16} className="text-orange-500/60 mt-0.5 flex-shrink-0" />
                  <p className="text-white/40 text-xs leading-relaxed">
                    Secure Admin Portal: Restricted to authorized management personnel only
                  </p>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      <Footer />

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-6"
          onClick={() => setShowForgotModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-10 shadow-2xl w-full max-w-md relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-orange-500/20 border border-white/20 hover:border-orange-500/50 rounded-full flex items-center justify-center transition-all"
            >
              <X size={16} className="text-white" />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 border border-orange-500/30 rounded-full mb-4">
                <Shield size={32} className="text-orange-500" />
              </div>
              <p className="text-orange-500 text-xs uppercase tracking-widest mb-2">ADMINISTRATION PORTAL</p>
              <h1 className="font-['Great_Vibes'] text-5xl text-white mb-2">Forgot Password</h1>
              <div className="w-24 h-1 bg-orange-500 mx-auto mb-4"></div>
              <p className="text-white/60 text-sm">Enter your email to reset your password</p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="flex text-white/70 text-xs uppercase tracking-wider mb-2 items-center space-x-2">
                  <Mail size={14} className="text-orange-500" />
                  <span>Admin Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={resetEmail}
                  onChange={handleResetEmailChange}
                  placeholder="admin@winsume.com"
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="flex-1 border-2 border-white/40 text-white px-6 py-3.5 rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-300 uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 text-white px-6 py-3.5 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-lg uppercase tracking-wider"
                >
                  Reset Password →
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}