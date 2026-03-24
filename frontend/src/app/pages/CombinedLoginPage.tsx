import { useState } from 'react';
import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Mail, Lock, Shield, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useNavigate } from 'react-router';

export function CombinedLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      const response = await fetch('https://winsume-lift-backend01.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message =
          errorData?.message ??
          'Login failed. Please check your credentials.';
        alert(message);
        return;
      }

      const data = await response.json();

      localStorage.setItem('accessToken', data.tokens.accessToken);
      localStorage.setItem('refreshToken', data.tokens.refreshToken);
      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('isLoggedIn', 'true');

      const role = data?.user?.role;
      if (role === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      } else {
        navigate('/user-portal', { replace: true });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Login error', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = 'User Login';
  const subtitle = 'Client Dashboard Access';
  const badge = 'SECURITY PORTAL';
  const bg = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600';

  return (
    <div className="min-h-screen bg-[#1a3332] relative">
      <Navigation />

      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback src={bg} alt="Login Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/80 via-[#1a3332]/70 to-[#2a4544]"></div>
      </div>

      <div className="min-h-screen flex items-center justify-center px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-full mb-3">
                <Shield size={28} className="text-orange-500" />
              </div>
              <p className="text-orange-500 text-xs uppercase tracking-widest mb-1.5">{badge}</p>
              <h1 className="font-['Great_Vibes'] text-4xl text-white mb-1.5">{title}</h1>
              <div className="w-20 h-0.5 bg-orange-500 mx-auto mb-3"></div>
              <p className="text-white/60 text-xs">{subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
                  <Mail size={14} className="text-orange-500" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
                />
              </div>

              <div>
                <label className="text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
                  <Lock size={14} className="text-orange-500" />
                  <span>Private Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute top-0 right-0 h-full px-4 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

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
                  onClick={() => navigate('/forgot-password')}
                  className="text-orange-500 hover:text-orange-400 transition-colors text-xs uppercase tracking-wider"
                >
                  Forgot Password
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-lg font-semibold uppercase tracking-wider disabled:opacity-60 disabled:hover:scale-100"
              >
                {isSubmitting ? 'Authorizing…' : 'Authorize Access →'}
              </button>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-start space-x-3">
                  <Shield size={16} className="text-orange-500/60 mt-0.5 flex-shrink-0" />
                  <p className="text-white/40 text-xs leading-relaxed">
                    Encrypted connection: Exclusively for authorized partner access
                  </p>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

