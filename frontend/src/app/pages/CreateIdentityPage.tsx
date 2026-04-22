// import { useState } from 'react';
// import { apiUrl, assetUrl } from "../api";
// import React from 'react';
// import { Navigation } from '../components/Navigation';
// // import { Footer } from '../components/Footer';
// import { Mail, Lock, User, Phone, MapPin, Building2, UserPlus, Shield, Eye, EyeOff } from 'lucide-react';
// import { motion } from 'motion/react';
// import { ImageWithFallback } from '../components/figma/ImageWithFallback';
// import { useNavigate } from 'react-router';

// export function CreateIdentityPage() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     company: '',
//     city: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       const response = await fetch(apiUrl('/auth/register'), {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           fullName: formData.fullName,
//           email: formData.email,
//           phone: formData.phone,
//           company: formData.company,
//           city: formData.city,
//           password: formData.password
//         })
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => null);
//         const message = errorData?.message ?? 'Failed to create identity. Please try again.';
//         alert(message);
//         return;
//       }

//       alert('Identity created successfully! Please login.');
//       navigate('/login');
//     } catch (error) {
//       console.error('Error creating identity', error);
//       alert('Something went wrong. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#1a3332] relative">
//       <Navigation />
      
//       {/* Background Image */}
//       <div className="absolute inset-0">
//         <ImageWithFallback
//           src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600"
//           alt="Create Identity Background"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/80 via-[#1a3332]/70 to-[#2a4544]"></div>
//       </div>

//       {/* Registration Form Container */}
//       <div className="min-h-screen flex items-center justify-center px-6 py-20 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="w-full max-w-md"
//         >
//           {/* Registration Card */}
//           <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
//             <div className="text-center mb-6">
//               <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-full mb-3">
//                 <UserPlus size={28} className="text-orange-500" />
//               </div>
//               <p className="text-orange-500 text-xs uppercase tracking-widest mb-1.5">NEW CLIENT REGISTRY</p>
//               <h1 className="font-['Great_Vibes'] text-4xl text-white mb-1.5">Create Identity</h1>
//               <div className="w-20 h-0.5 bg-orange-500 mx-auto mb-3"></div>
//               <p className="text-white/60 text-xs">Exclusive Access Registration</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Two Column Layout */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Full Name */}
//                 <div>
//                   <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
//                     <User size={14} className="text-orange-500" />
//                     <span>Full Name</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     placeholder="Enter your full name"
//                     required
//                     className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
//                     <Mail size={14} className="text-orange-500" />
//                     <span>Email Address</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Enter your email"
//                     required
//                     className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
//                     <Phone size={14} className="text-orange-500" />
//                     <span>Phone Number</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="+91 XXXXX XXXXX"
//                     required
//                     className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
//                   />
//                 </div>

//                 {/* Company */}
//                 <div>
//                   <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
//                     <Building2 size={14} className="text-orange-500" />
//                     <span>Company Name</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="company"
//                     value={formData.company}
//                     onChange={handleChange}
//                     placeholder="Enter company name"
//                     className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
//                   />
//                 </div>

//                 {/* City */}
//                 <div>
//                   <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
//                     <MapPin size={14} className="text-orange-500" />
//                     <span>City</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     placeholder="Enter your city"
//                     required
//                     className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
//                   />
//                 </div>

//                 {/* Password */}
//                 <div>
//                   <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
//                     <Lock size={14} className="text-orange-500" />
//                     <span>Password</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       placeholder="Create password"
//                       required
//                       minLength={8}
//                       className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
//                     />
//                     <button
//                       type="button"
//                       className="absolute top-0 right-0 h-full px-4 text-white/60 hover:text-white transition-colors"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Confirm Password - Full Width */}
//                 <div className="md:col-span-2">
//                   <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
//                     <Lock size={14} className="text-orange-500" />
//                     <span>Confirm Password</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showConfirmPassword ? 'text' : 'password'}
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       placeholder="Re-enter password"
//                       required
//                       minLength={8}
//                       className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
//                     />
//                     <button
//                       type="button"
//                       className="absolute top-0 right-0 h-full px-4 text-white/60 hover:text-white transition-colors"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     >
//                       {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-lg font-semibold uppercase tracking-wider disabled:opacity-60 disabled:hover:scale-100"
//               >
//                 {isSubmitting ? 'Creating...' : 'Create Identity →'}
//               </button>

//               {/* Login Link */}
//               <div className="text-center pt-4 border-t border-white/10">
//                 <p className="text-white/40 text-xs">
//                   Already have an account?{' '}
//                   <button
//                     type="button"
//                     onClick={() => navigate('/login')}
//                     className="text-orange-500 hover:text-orange-400 transition-colors uppercase tracking-wider"
//                   >
//                     Login Here
//                   </button>
//                 </p>
//               </div>

//               {/* Security Notice */}
//               <div className="pt-4 border-t border-white/10">
//                 <div className="flex items-start space-x-3">
//                   <Shield size={16} className="text-orange-500/60 mt-0.5 flex-shrink-0" />
//                   <p className="text-white/40 text-xs leading-relaxed">
//                     Your information is encrypted and secure. By creating an identity, you agree to our terms and conditions.
//                   </p>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </motion.div>
//       </div>

//       {/* <Footer /> */}
//     </div>
//   );
// }

import { useState } from 'react';
import { apiUrl } from '../api';
import React from 'react';
import { Navigation } from '../components/Navigation';
import {
  Mail, Lock, User, Phone, MapPin, Building2,
  UserPlus, Shield, Eye, EyeOff, X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';

export function CreateIdentityPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClose = () => navigate(-1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(apiUrl('/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          city: formData.city,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.message ?? 'Failed to create identity. Please try again.';
        alert(message);
        return;
      }

      alert('Identity created successfully! Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Error creating identity', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Shared input class ── */
  const inputCls =
    'w-full bg-white/[0.06] border border-white/[0.18] rounded-xl px-3.5 py-2.5 ' +
    'text-white text-xs sm:text-sm placeholder-white/25 ' +
    'focus:outline-none focus:border-orange-500/60 focus:bg-white/[0.10] transition-all duration-200';

  const labelCls =
    'flex items-center gap-1.5 text-white/65 text-[10px] uppercase tracking-widest mb-1.5';

  return (
    /* Fixed full viewport — no scroll */
    <div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{ fontFamily: "'Raleway', sans-serif" }}
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80&fit=crop"
          alt="Create Identity background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1a3332]/85" />
      </div>

      {/* ── Navigation ── */}
      <div className="relative z-20 shrink-0">
        <Navigation />
      </div>

      {/* ── Scrollable card area (overflow-y-auto only inside this div) ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-6 sm:pb-8 overflow-y-auto">
        <AnimatePresence>
          <motion.div
            key="register-card"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-sm sm:max-w-lg my-auto"
          >
            {/* Glass card */}
            <div
              className="relative bg-white/[0.06] backdrop-blur-md border border-white/[0.12]
                         rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.5)]
                         px-5 sm:px-8 py-6 sm:py-8"
            >
              {/* ── Close (×) button ── */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close registration"
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                           rounded-full bg-white/[0.08] border border-white/[0.12]
                           text-white/60 hover:text-white hover:bg-white/[0.15]
                           transition-all duration-200 group z-10"
              >
                <X size={15} className="group-hover:rotate-90 transition-transform duration-200" />
              </button>

              {/* ── Header ── */}
              <div className="text-center mb-5 sm:mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14
                                bg-orange-500/20 border border-orange-500/35 rounded-full mb-3">
                  <UserPlus size={22} className="text-orange-500" />
                </div>

                <p className="text-orange-500 text-[10px] uppercase tracking-[0.22em] mb-1.5">
                  New Client Registry
                </p>

                <h1
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                  className="text-4xl sm:text-[2.6rem] text-white mb-1.5 leading-tight"
                >
                  Create Identity
                </h1>

                <div className="w-16 h-[2px] bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mb-3 rounded-full" />

                <p className="text-white/55 text-[11px] sm:text-xs tracking-wide">
                  Exclusive Access Registration
                </p>
              </div>

              {/* ── Form ── */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">

                {/* 2-col grid for fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">

                  {/* Full Name */}
                  <div>
                    <label className={labelCls}>
                      <User size={11} className="text-orange-500" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className={inputCls}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelCls}>
                      <Mail size={11} className="text-orange-500" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className={inputCls}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={labelCls}>
                      <Phone size={11} className="text-orange-500" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      required
                      className={inputCls}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className={labelCls}>
                      <Building2 size={11} className="text-orange-500" />
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company (optional)"
                      className={inputCls}
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className={labelCls}>
                      <MapPin size={11} className="text-orange-500" />
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Your city"
                      required
                      className={inputCls}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className={labelCls}>
                      <Lock size={11} className="text-orange-500" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Min 8 characters"
                        required
                        minLength={8}
                        className={`${inputCls} pr-11`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute top-0 right-0 h-full px-3.5 text-white/45 hover:text-white/80 transition-colors"
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password — full width */}
                  <div className="sm:col-span-2">
                    <label className={labelCls}>
                      <Lock size={11} className="text-orange-500" />
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter your password"
                        required
                        minLength={8}
                        className={`${inputCls} pr-11`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        className="absolute top-0 right-0 h-full px-3.5 text-white/45 hover:text-white/80 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
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
                  {isSubmitting ? 'Creating Identity…' : 'Create Identity →'}
                </button>

                {/* Already have account */}
                <div className="text-center pt-2 pb-1 border-t border-white/[0.09]">
                  <p className="text-white/40 text-[10px] sm:text-[11px]">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="text-orange-500 hover:text-orange-400 transition-colors uppercase tracking-wider"
                    >
                      Login Here
                    </button>
                  </p>
                </div>

                {/* Security note */}
                <div className="flex items-start gap-2.5 pt-1 border-t border-white/[0.09]">
                  <Shield size={13} className="text-orange-500/50 mt-0.5 shrink-0" />
                  <p className="text-white/35 text-[10px] leading-relaxed">
                    Your information is encrypted and secure. By creating an identity, you agree to our terms and conditions.
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