import { Navigation } from '../components/Navigation';
import { InquiryForm } from '../components/InquiryForm';
import { Footer } from '../components/Footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Settings, Wrench, Shield, Zap } from 'lucide-react';
import React from 'react';

const services = [
  {
    icon: Settings,
    title: '24/7 Platforms Support',
    description:
      'Round-the-clock dedicated support services with guaranteed rapid response times to ensure uninterrupted operation of your vertical mobility systems.',
    features: [
      'Emergency breakdown assistance',
      'Remote diagnostics & troubleshooting',
      'Priority callback service',
    ],
  },
  {
    icon: Wrench,
    title: 'Precision Repair & Installation',
    description:
      'Expert repair and flawless installation services led by highly-trained technicians using advanced tools to ensure seamless performance & longevity.',
    features: [
      'Factory-certified technicians',
      'Comprehensive modernization solutions',
      'Performance optimization',
    ],
  },
  {
    icon: Shield,
    title: 'Safety & Compliance',
    description:
      'Comprehensive safety audits and regulatory compliance inspections ensuring all installations meet international standards and local regulations.',
    features: [
      'Annual safety certifications',
      'Regulatory compliance audits',
      'Detailed inspection reports',
    ],
  },
  {
    icon: Zap,
    title: 'Genuine Components',
    description:
      'We exclusively use manufacturer-approved genuine parts and components to guarantee optimal compatibility, reliability, and warranty protection.',
    features: [
      'OEM-certified spare parts',
      'Extended warranty coverage',
      'Quality-tested components',
    ],
  },
];

export function ServicesPage() {
  return (
    <div className="bg-[#1a3332] min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 pt-32 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGV2YXRvciUyMGNhYmluJTIwaW50ZXJpb3IlMjBnb2xkfGVufDF8fHx8MTc3MzIzNjYyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Maintenance & Services"
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
            Professional Excellence
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6"
          >
            Maintenance & Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/70 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Comprehensive maintenance and repair services ensuring peak performance, safety compliance, and
            extended longevity for all your vertical mobility systems.
          </motion.p>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-16 md:py-24 bg-[#2a4544]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Great_Vibes'] text-5xl md:text-6xl text-white mb-4">
              Our Services
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              From installation to ongoing maintenance, we provide comprehensive elevator solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#1a3332] border border-[#3a5554] rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-300 group"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500/30 transition-all">
                    <Icon size={28} className="text-orange-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl text-white mb-3 font-['Playfair_Display']">{service.title}</h3>

                  {/* Description */}
                  <p className="text-white/60 leading-relaxed text-sm mb-4">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-white/50 text-xs flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-16 md:py-24 bg-[#1a3332]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1719050817004-c76eb7c75c99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlciUyMGxpZnQlMjBzZXJ2aWNlJTIwcmVwYWlyfGVufDF8fHx8MTc3MzIzNTkyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional Service"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-transparent to-transparent"></div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-orange-500 text-sm uppercase tracking-widest mb-4">Our Commitment</p>
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-['Playfair_Display'] mb-6">
                Excellence in Every Service Call
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-6">
                Our factory-trained technicians bring decades of combined experience to every service call. We
                understand that your elevator is a critical component of your building's infrastructure, and we
                treat it with the care and professionalism it deserves.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-500 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Preventive Maintenance Plans</h4>
                    <p className="text-white/60 text-sm">
                      Customized maintenance schedules to prevent breakdowns and extend equipment life
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-500 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Modernization Solutions</h4>
                    <p className="text-white/60 text-sm">
                      Upgrade aging systems with latest technology for improved efficiency and safety
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-500 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Extended Warranty Programs</h4>
                    <p className="text-white/60 text-sm">
                      Comprehensive coverage options to protect your investment and ensure peace of mind
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <InquiryForm />

      {/* Footer */}
      <Footer />
    </div>
  );
}