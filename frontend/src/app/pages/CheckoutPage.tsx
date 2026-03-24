import { useState } from 'react';
import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { CreditCard, Smartphone, Shield } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useNavigate } from 'react-router';

export function CheckoutPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'insta' | 'reserve'>('reserve');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
    requirements: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Navigate to Thank You page with form data
    navigate('/thank-you', {
      state: {
        name: formData.firstName || 'Valued Client',
        application: 'Premium Elevator',
        city: formData.city || 'Your City',
        inquiryId: `WL-${Math.floor(1000 + Math.random() * 9000)}`
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#1a3332]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 pt-32">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1772721559246-286e6d986d73?w=1600"
            alt="Checkout Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/95 via-[#1a3332]/90 to-[#1a3332]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-orange-500/80 text-xs uppercase tracking-widest mb-4">FINALIZATION</p>
            <h1 className="font-['Great_Vibes'] text-6xl md:text-7xl lg:text-8xl text-white mb-6">
              Architectural <span className="text-orange-500">Details</span>
            </h1>
            <p className="text-white/60 text-sm md:text-base max-w-3xl mx-auto">
              Please provide the structural and administrative details for your installation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-[#2a4544]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Side - Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder=""
                        required
                        className="w-full bg-[#1a3332] border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder=""
                        required
                        className="w-full bg-[#1a3332] border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=""
                      required
                      className="w-full bg-[#1a3332] border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Street Address / Site Location</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder=""
                      required
                      className="w-full bg-[#1a3332] border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                  </div>

                  {/* Location Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder=""
                        required
                        className="w-full bg-[#1a3332] border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder=""
                        required
                        className="w-full bg-[#1a3332] border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Zipcode and Country */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Zipcode</label>
                      <input
                        type="text"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                        placeholder=""
                        required
                        className="w-full bg-[#1a3332] border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder=""
                        required
                        className="w-full bg-[#1a3332] border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Contact Phone */}
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Contact Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder=""
                      required
                      className="w-full bg-[#1a3332] border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                  </div>

                  {/* Special Requirements */}
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Special requirements or site details...</label>
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      placeholder=""
                      rows={4}
                      className="w-full bg-[#1a3332] border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
                    />
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Right Side - Payment & Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#1a3332] border border-orange-500/20 rounded-2xl p-8 sticky top-32 shadow-xl"
              >
                {/* Payment Commitment */}
                <div className="mb-8">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-6">Payment Commitment</p>
                  
                  <div className="space-y-4">
                    {/* Secure Card */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${ 
                        paymentMethod === 'card' 
                          ? 'border-orange-500/50 bg-orange-500/10' 
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                          <CreditCard size={18} className="text-white/70" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-semibold mb-0.5">SECURE CARD</p>
                          <p className="text-white/40 text-xs">Visa / Mastercard</p>
                        </div>
                      </div>
                    </button>

                    {/* Insta-Pay */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('insta')}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${ 
                        paymentMethod === 'insta' 
                          ? 'border-orange-500/50 bg-orange-500/10' 
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                          <Smartphone size={18} className="text-white/70" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-semibold mb-0.5">INSTA-PAY</p>
                          <p className="text-white/40 text-xs">UPI / Net Banking</p>
                        </div>
                      </div>
                    </button>

                    {/* Reserve Consultation */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('reserve')}
                      className={`w-full p-5 rounded-lg border-2 transition-all text-left ${ 
                        paymentMethod === 'reserve' 
                          ? 'border-orange-500 bg-gradient-to-br from-orange-500/20 to-orange-600/10' 
                          : 'border-orange-500/30 hover:border-orange-500/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                          <Shield size={20} className="text-orange-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-semibold mb-1">RESERVE CONSULTATION</p>
                          <p className="text-white/60 text-xs leading-relaxed">Complete with a dedicated architectural reservation fee</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Proposal Summary */}
                <div className="mb-8 pt-8 border-t border-white/10">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-6">Proposal Summary</p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Subtotal</span>
                      <span className="text-white font-medium">₹1,850,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Site Survey & Logistics</span>
                      <span className="text-white font-medium">₹5,000</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <div className="flex justify-between items-baseline mb-8">
                      <span className="text-white/70 uppercase text-xs tracking-wider">Total Commitment</span>
                      <span className="font-['Great_Vibes'] text-4xl text-orange-500">₹1,855,000</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-orange-500 text-white py-4 rounded-full hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl font-semibold uppercase tracking-wider text-sm mb-6"
                >
                  CONFIRM SELECTION →
                </button>

                <div className="flex items-start gap-3 bg-[#2a4544]/50 border border-white/5 rounded-lg p-4">
                  <Shield size={16} className="text-orange-500/70 mt-0.5 flex-shrink-0" />
                  <p className="text-white/40 text-xs leading-relaxed">
                    Secured by Winsume Platinum encryption. Your architectural data is classified.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}