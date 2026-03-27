import { useState } from 'react';
import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
// import { Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { InquiryForm } from '../components/InquiryForm';

export function InquiryPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    projectType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will contact you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#1a3332]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 pt-32">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/95 via-[#1a3332]/90 to-[#1a3332]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-orange-500/80 text-xs uppercase tracking-widest mb-4">THE CONCIERGE</p>
            <h1 className="font-['Great_Vibes'] text-6xl md:text-7xl lg:text-8xl text-white mb-6">
              Contact <span className="text-orange-500">Us</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <InquiryForm />

      <Footer />
    </div>
  );
}