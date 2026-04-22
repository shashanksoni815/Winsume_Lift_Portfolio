// import { useState } from 'react';
// import { apiUrl, assetUrl } from "../api";
// import React from 'react';
// import { Navigation } from '../components/Navigation';
// import { Footer } from '../components/Footer';
// import { Mail, Lock, Shield, Eye, EyeOff } from 'lucide-react';
// import { motion } from 'motion/react';
// import { ImageWithFallback } from '../components/figma/ImageWithFallback';
// import { useNavigate } from 'react-router';

// export function CombinedLoginPage() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setIsSubmitting(true);

//       const response = await fetch(apiUrl('/auth/login'), {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => null);
//         const message =
//           errorData?.message ??
//           'Login failed. Please check your credentials.';
//         alert(message);
//         return;
//       }

//       const data = await response.json();

//       localStorage.setItem('accessToken', data.tokens.accessToken);
//       localStorage.setItem('refreshToken', data.tokens.refreshToken);
//       localStorage.setItem('userEmail', data.user.email);
//       localStorage.setItem('userRole', data.user.role);
//       localStorage.setItem('isLoggedIn', 'true');

//       const role = data?.user?.role;
//       if (role === 'admin') {
//         navigate('/admin-dashboard', { replace: true });
//       } else {
//         navigate('/user-portal', { replace: true });
//       }
//     } catch (error) {
//       // eslint-disable-next-line no-console
//       console.error('Login error', error);
//       alert('Something went wrong. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const title = 'User Login';
//   const subtitle = 'Client Dashboard Access';
//   const badge = 'SECURITY PORTAL';
//   const bg = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600';

//   return (
//     <div className="min-h-screen bg-[#1a3332] relative">
//       <Navigation />

//       {/* Background Image */}
//       <div className="absolute inset-0">
//         <ImageWithFallback src={bg} alt="Login Background" className="w-full h-full object-cover" />
//         <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/80 via-[#1a3332]/70 to-[#2a4544]"></div>
//       </div>

//       <div className="min-h-screen flex items-center justify-center px-6 py-20 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="w-full max-w-md"
//         >
//           <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
//             <div className="text-center mb-6">
//               <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-full mb-3">
//                 <Shield size={28} className="text-orange-500" />
//               </div>
//               <p className="text-orange-500 text-xs uppercase tracking-widest mb-1.5">{badge}</p>
//               <h1 className="font-['Great_Vibes'] text-4xl text-white mb-1.5">{title}</h1>
//               <div className="w-20 h-0.5 bg-orange-500 mx-auto mb-3"></div>
//               <p className="text-white/60 text-xs">{subtitle}</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div>
//                 <label className="text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
//                   <Mail size={14} className="text-orange-500" />
//                   <span>Email Address</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email"
//                   required
//                   className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
//                 />
//               </div>

//               <div>
//                 <label className="text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
//                   <Lock size={14} className="text-orange-500" />
//                   <span>Private Password</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                     required
//                     className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((v) => !v)}
//                     className="absolute top-0 right-0 h-full px-4 text-white/60 hover:text-white transition-colors"
//                   >
//                     {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                   </button>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between text-sm">
//                 <button
//                   type="button"
//                   onClick={() => navigate('/create-identity')}
//                   className="text-white/60 hover:text-white transition-colors text-xs uppercase tracking-wider"
//                 >
//                   Create Identity
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => navigate('/forgot-password')}
//                   className="text-orange-500 hover:text-orange-400 transition-colors text-xs uppercase tracking-wider"
//                 >
//                   Forgot Password
//                 </button>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-lg font-semibold uppercase tracking-wider disabled:opacity-60 disabled:hover:scale-100"
//               >
//                 {isSubmitting ? 'Authorizing…' : 'Authorize Access →'}
//               </button>

//               <div className="pt-4 border-t border-white/10">
//                 <div className="flex items-start space-x-3">
//                   <Shield size={16} className="text-orange-500/60 mt-0.5 flex-shrink-0" />
//                   <p className="text-white/40 text-xs leading-relaxed">
//                     Encrypted connection: Exclusively for authorized partner access
//                   </p>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </motion.div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

import { useState } from 'react';
import { apiUrl } from '../api';
import React from 'react';
import { Navigation } from '../components/Navigation';
import { Mail, Lock, Shield, Eye, EyeOff, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';

export function CombinedLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClose = () => navigate(-1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      const response = await fetch(apiUrl('/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.message ?? 'Login failed. Please check your credentials.';
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
      console.error('Login error', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    /* Full viewport, no scroll */
    <div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{ fontFamily: "'Raleway', sans-serif" }}
    >
      {/* ── Background image fills entire viewport ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80&fit=crop"
          alt="Login background"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark teal overlay matching site palette */}
        <div className="absolute inset-0 bg-[#1a3332]/85" />
      </div>

      {/* ── Navigation bar (sits on top) ── */}
      <div className="relative z-20 shrink-0">
        <Navigation />
      </div>

      {/* ── Centred card area — takes remaining height, no scroll ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-4 overflow-hidden">
        <AnimatePresence>
          <motion.div
            key="login-card"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-sm sm:max-w-md"
          >
            {/* Glass card */}
            <div
              className="relative bg-white/[0.06] backdrop-blur-md border border-white/[0.12]
                         rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.5)]
                         px-6 sm:px-8 py-7 sm:py-8"
            >
              {/* ── Close (×) button ── */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close login"
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                           rounded-full bg-white/[0.08] border border-white/[0.12]
                           text-white/60 hover:text-white hover:bg-white/[0.15]
                           transition-all duration-200 group"
              >
                <X size={15} className="group-hover:rotate-90 transition-transform duration-200" />
              </button>

              {/* ── Header ── */}
              <div className="text-center mb-6">
                <div
                  className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14
                               bg-orange-500/20 border border-orange-500/35 rounded-full mb-3"
                >
                  <Shield size={24} className="text-orange-500" />
                </div>

                <p className="text-orange-500 text-[10px] uppercase tracking-[0.22em] mb-1.5">
                  Security Portal
                </p>

                <h1
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                  className="text-4xl sm:text-[2.6rem] text-white mb-1.5 leading-tight"
                >
                  User Login
                </h1>

                <div className="w-16 h-[2px] bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mb-3 rounded-full" />

                <p className="text-white/55 text-[11px] sm:text-xs tracking-wide">
                  Client Dashboard Access
                </p>
              </div>

              {/* ── Form ── */}
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email */}
                <div>
                  <label className="flex items-center gap-1.5 text-white/65 text-[10px] uppercase tracking-widest mb-1.5">
                    <Mail size={12} className="text-orange-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-white/[0.06] border border-white/[0.18] rounded-xl
                               px-4 py-3 text-white text-sm placeholder-white/25
                               focus:outline-none focus:border-orange-500/60 focus:bg-white/[0.10]
                               transition-all duration-200"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="flex items-center gap-1.5 text-white/65 text-[10px] uppercase tracking-widest mb-1.5">
                    <Lock size={12} className="text-orange-500" />
                    Private Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="w-full bg-white/[0.06] border border-white/[0.18] rounded-xl
                                 px-4 py-3 pr-12 text-white text-sm placeholder-white/25
                                 focus:outline-none focus:border-orange-500/60 focus:bg-white/[0.10]
                                 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute top-0 right-0 h-full px-4 text-white/45 hover:text-white/80 transition-colors"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Links row */}
                <div className="flex items-center justify-between pt-0.5">
                  <button
                    type="button"
                    onClick={() => navigate('/create-identity')}
                    className="text-white/50 hover:text-white/80 transition-colors text-[10px] uppercase tracking-wider"
                  >
                    Create Identity
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-orange-500 hover:text-orange-400 transition-colors text-[10px] uppercase tracking-wider"
                  >
                    Forgot Password
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98]
                             text-white font-bold text-xs sm:text-[13px] uppercase tracking-widest
                             px-8 py-3.5 rounded-full mt-1
                             transition-all duration-200 shadow-lg shadow-orange-900/30
                             disabled:opacity-60 disabled:pointer-events-none"
                >
                  {isSubmitting ? 'Authorizing…' : 'Authorize Access →'}
                </button>

                {/* Security note */}
                <div className="flex items-start gap-2.5 pt-3 border-t border-white/[0.09]">
                  <Shield size={13} className="text-orange-500/50 mt-0.5 shrink-0" />
                  <p className="text-white/35 text-[10px] leading-relaxed">
                    Encrypted connection — exclusively for authorized partner access.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}