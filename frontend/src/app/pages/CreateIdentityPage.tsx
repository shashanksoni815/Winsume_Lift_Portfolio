import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Mail, Lock, User, Phone, MapPin, Building2, UserPlus, Shield, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
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
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          city: formData.city,
          password: formData.password
        })
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#1a3332] relative">
      <Navigation />
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600"
          alt="Create Identity Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/80 via-[#1a3332]/70 to-[#2a4544]"></div>
      </div>

      {/* Registration Form Container */}
      <div className="min-h-screen flex items-center justify-center px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Registration Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-full mb-3">
                <UserPlus size={28} className="text-orange-500" />
              </div>
              <p className="text-orange-500 text-xs uppercase tracking-widest mb-1.5">NEW CLIENT REGISTRY</p>
              <h1 className="font-['Great_Vibes'] text-4xl text-white mb-1.5">Create Identity</h1>
              <div className="w-20 h-0.5 bg-orange-500 mx-auto mb-3"></div>
              <p className="text-white/60 text-xs">Exclusive Access Registration</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
                    <User size={14} className="text-orange-500" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
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

                {/* Phone */}
                <div>
                  <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
                    <Phone size={14} className="text-orange-500" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
                    <Building2 size={14} className="text-orange-500" />
                    <span>Company Name</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
                    <MapPin size={14} className="text-orange-500" />
                    <span>City</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
                    <Lock size={14} className="text-orange-500" />
                    <span>Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create password"
                      required
                      minLength={8}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 h-full px-4 text-white/60 hover:text-white transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password - Full Width */}
                <div className="md:col-span-2">
                  <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
                    <Lock size={14} className="text-orange-500" />
                    <span>Confirm Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      required
                      minLength={8}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-colors"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 h-full px-4 text-white/60 hover:text-white transition-colors"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-lg font-semibold uppercase tracking-wider disabled:opacity-60 disabled:hover:scale-100"
              >
                {isSubmitting ? 'Creating...' : 'Create Identity →'}
              </button>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-white/40 text-xs">
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

              {/* Security Notice */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-start space-x-3">
                  <Shield size={16} className="text-orange-500/60 mt-0.5 flex-shrink-0" />
                  <p className="text-white/40 text-xs leading-relaxed">
                    Your information is encrypted and secure. By creating an identity, you agree to our terms and conditions.
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