import { useState } from 'react';
import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Building2, Home, Hotel, Factory, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';

type ApplicationType = 'residential' | 'commercial' | 'hospitality' | 'industrial' | null;

export function BespokeProposalPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationType>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });

  const applications = [
    {
      id: 'residential' as ApplicationType,
      icon: Home,
      title: 'Residential Lifts',
      description: 'Bespoke solutions for luxury villas and mansions.'
    },
    {
      id: 'commercial' as ApplicationType,
      icon: Building2,
      title: 'Commercial Elevators',
      description: 'High-speed, high-capacity systems for modern offices.'
    },
    {
      id: 'hospitality' as ApplicationType,
      icon: Hotel,
      title: 'Hospitality Lifts',
      description: 'Elegant, silent transport for premier hotels & resorts.'
    },
    {
      id: 'industrial' as ApplicationType,
      icon: Factory,
      title: 'Industrial Hoists',
      description: 'Heavy-duty performance for factories and warehouses.'
    }
  ];

  const handleApplicationSelect = (appId: ApplicationType) => {
    setSelectedApplication(appId);
    setTimeout(() => setStep(2), 300);
  };

  const handleBack = () => {
    setStep(1);
    setSelectedApplication(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Proposal submitted:', { application: selectedApplication, ...formData });
    
    // Generate random inquiry ID
    const inquiryId = `WL-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Navigate to thank you page with form data
    navigate('/thank-you', {
      state: {
        name: formData.fullName.split(' ')[0] || 'Valued Client',
        application: selectedApplication === 'residential' ? 'Residential' : 
                     selectedApplication === 'commercial' ? 'Commercial' :
                     selectedApplication === 'hospitality' ? 'Hospitality' : 'Industrial',
        city: formData.city,
        inquiryId: inquiryId
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
            src="https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGV2YXRvciUyMGNhYmluJTIwaW50ZXJpb3IlMjBnb2xkfGVufDF8fHx8MTc3MzIzNjYyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury Elevator Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/85 via-[#1a3332]/75 to-[#1a3332]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-orange-500 text-sm uppercase tracking-widest mb-4">The Selection Process</p>
            <h1 className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4">
              Bespoke Proposal
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-[#1a3332]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Side - Process Steps */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className={`border-l-2 pl-6 ${step === 1 ? 'border-orange-500' : 'border-white/10'}`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`text-2xl font-bold ${step === 1 ? 'text-orange-500' : 'text-white/20'}`}>01</span>
                  <h3 className={`text-xl uppercase tracking-wider ${step === 1 ? 'text-white' : 'text-white/40'}`}>
                    Architectural Intent
                  </h3>
                </div>
                <p className={`${step === 1 ? 'text-white/70' : 'text-white/30'}`}>
                  Select the application for your architectural intervention system.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`border-l-2 pl-6 ${step === 2 ? 'border-orange-500' : 'border-white/10'}`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`text-2xl font-bold ${step === 2 ? 'text-orange-500' : 'text-white/20'}`}>02</span>
                  <h3 className={`text-xl uppercase tracking-wider ${step === 2 ? 'text-white' : 'text-white/40'}`}>
                    Project Particulars
                  </h3>
                </div>
                <p className={`${step === 2 ? 'text-white/70' : 'text-white/30'}`}>
                  Provide comprehensive details for a tailored technical consultation.
                </p>
              </motion.div>
            </div>

            {/* Right Side - Form/Selection */}
            <div>
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#2a4544] rounded-2xl p-8 md:p-10"
                  >
                    <h2 className="text-2xl text-white mb-8 font-['Playfair_Display']">Select Application</h2>
                    <div className="grid gap-4">
                      {applications.map((app, index) => {
                        const Icon = app.icon;
                        return (
                          <motion.button
                            key={app.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            onClick={() => handleApplicationSelect(app.id)}
                            className="bg-[#1a3332] border border-orange-500/20 rounded-xl p-6 text-left hover:border-orange-500/50 hover:bg-[#1a3332]/80 transition-all group"
                          >
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                                <Icon size={24} className="text-orange-500" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-white text-lg mb-1 group-hover:text-orange-500 transition-colors">
                                  {app.title}
                                </h3>
                                <p className="text-white/60 text-sm">{app.description}</p>
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#2a4544] rounded-2xl p-8 md:p-10"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl text-white font-['Playfair_Display']">Project Details</h2>
                      <button
                        onClick={handleBack}
                        className="text-orange-500 hover:text-orange-400 transition-colors text-sm uppercase tracking-wider flex items-center space-x-2"
                      >
                        <ArrowLeft size={16} />
                        <span>Back</span>
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white/70 text-xs uppercase tracking-wider mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 text-xs uppercase tracking-wider mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                            className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white/70 text-xs uppercase tracking-wider mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 79428 29113"
                            required
                            className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 text-xs uppercase tracking-wider mb-2">
                            City / Location
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Indore"
                            required
                            className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/70 text-xs uppercase tracking-wider mb-2">
                          Message / Requirements
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="I am interested in exploring elevator solutions for my upcoming project. Please provide further details."
                          rows={5}
                          required
                          className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30 uppercase tracking-wider font-semibold"
                      >
                        Request Consultation →
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}