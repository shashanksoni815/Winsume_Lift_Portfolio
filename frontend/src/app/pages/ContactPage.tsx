import { useState } from 'react';
import { apiUrl, assetUrl } from "../api";
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Send, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import React from 'react';

export function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    propertyType: 'Residential Villa',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      alert('Please create your identity and log in before sending an inquiry.');
      navigate('/create-identity');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(apiUrl('/inquiries/user'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          message: formData.message,
          type: formData.propertyType,
          source: 'contact-page',
        }),
      });

      if (response.status === 401) {
        alert('Your session has expired. Please log in again.');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.message ?? 'Failed to send inquiry. Please try again.';
        alert(message);
        return;
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        propertyType: 'Residential Villa',
        message: '',
      });
    } catch (error) {
      console.error('Error sending inquiry', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#1a3332]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 pt-32 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGV2YXRvciUyMGxvYmJ5JTIwbW9kZXJufGVufDF8fHx8MTc3MzMwOTc3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury Elevator Lobby"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/90 via-[#1a3332]/80 to-[#1a3332]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-orange-500 text-sm uppercase tracking-widest mb-4"
          >
            The Concierge
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-1 bg-orange-500 mx-auto"
          ></motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#1a3332] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-orange-500 text-xs uppercase tracking-widest mb-4">Get in Touch</p>
              <h2 className="text-4xl md:text-5xl text-white mb-6">
                Let's Discuss Your <span className="text-orange-500 italic font-serif">Vertical Vision.</span>
              </h2>
              <p className="text-white/70 mb-12 leading-relaxed">
                Whether it's a private residence or a commercial landmark, we provide bespoke architectural solutions tailored to your needs.
              </p>

              {/* Contact Details */}
              <div className="space-y-6 mb-12">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#2a4544] border border-orange-500/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Call Us</div>
                    <a href="tel:+917942829113" className="text-white hover:text-orange-500 transition-colors">
                      +91 79428 29113
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#2a4544] border border-orange-500/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Email</div>
                    <a href="mailto:concierge@winsumelift.com" className="text-white hover:text-orange-500 transition-colors">
                      concierge@winsumelift.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#2a4544] border border-orange-500/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Visit Studio</div>
                    <div className="text-white">
                      Winsume Tower, Landmark Area, Indore, M.P.
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/917942829113" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full hover:from-orange-600 hover:to-orange-700 hover:scale-105 transition-all shadow-lg hover:shadow-orange-500/30 group"
              >
                <MessageCircle size={20} className="mr-3" />
                <span className="font-semibold uppercase tracking-wider text-sm">WhatsApp</span>
              </a>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="bg-[#2a4544] rounded-2xl p-8 lg:p-10">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-orange-500/20 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send size={32} className="text-orange-500" />
                    </div>
                    <h3 className="text-2xl text-white mb-3 font-['Playfair_Display']">Thank You!</h3>
                    <p className="text-white/60">
                      We've received your inquiry and will contact you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors placeholder:text-white/30"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors placeholder:text-white/30"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors placeholder:text-white/30"
                          placeholder="0000000000"
                        />
                      </div>

                      <div>
                        <label htmlFor="city" className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors placeholder:text-white/30"
                          placeholder="Indore"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="propertyType" className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                        Project Type
                      </label>
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                      >
                        <option value="Residential Villa">Residential Villa</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Mixed Use">Mixed Use</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors resize-none placeholder:text-white/30"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-orange-500/30 uppercase tracking-wider font-semibold flex items-center justify-center disabled:opacity-60 disabled:hover:shadow-none"
                    >
                      {isSubmitting ? 'Sending…' : 'Send Inquiry →'}
                    </button>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}