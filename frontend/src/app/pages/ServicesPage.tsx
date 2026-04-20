import { Navigation } from '../components/Navigation';
import { InquiryForm } from '../components/InquiryForm';
import { Footer } from '../components/Footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import {
  Settings,
  Wrench,
  Shield,
  Zap,
  Ruler,
  Sparkles,
  Users,
  Clock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import React from 'react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const mainServices = [
  {
    icon: Settings,
    title: '24/7 Platform Support',
    badge: 'Support',
    image: 'https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=700&q=80&fit=crop',
    imageAlt: 'Elevator maintenance engineer at work',
    description:
      'Round-the-clock dedicated support with guaranteed rapid response times to ensure uninterrupted operation of your vertical mobility systems.',
    features: [
      'Emergency breakdown assistance',
      'Remote diagnostics & troubleshooting',
      'Priority callback service',
    ],
  },
  {
    icon: Wrench,
    title: 'Precision Repair & Installation',
    badge: 'Installation',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80&fit=crop',
    imageAlt: 'Professional elevator installation',
    description:
      'Expert repair and flawless installation led by highly-trained technicians using advanced tools for seamless performance and longevity.',
    features: [
      'Factory-certified technicians',
      'Comprehensive modernization solutions',
      'Performance optimization',
    ],
  },
  {
    icon: Shield,
    title: 'Safety & Compliance',
    badge: 'Safety',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=700&q=80&fit=crop',
    imageAlt: 'Elevator safety compliance inspection',
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
    badge: 'OEM Parts',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=700&q=80&fit=crop',
    imageAlt: 'Genuine elevator components and spare parts',
    description:
      'We exclusively use manufacturer-approved genuine parts and components to guarantee optimal compatibility, reliability, and warranty protection.',
    features: [
      'OEM-certified spare parts',
      'Extended warranty coverage',
      'Quality-tested components',
    ],
  },
  {
    icon: Ruler,
    title: 'Bespoke Design',
    badge: 'Design',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&fit=crop',
    imageAlt: 'Luxury elevator interior bespoke design',
    description:
      'Custom-tailored elevator cabins designed around your architectural vision — from ambient lighting to hand-selected materials and finishes.',
    features: [
      '3D visualization & mockups',
      'Custom cabin configurations',
      'Architectural lighting design',
    ],
  },
  {
    icon: Sparkles,
    title: 'Premium Finishes',
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80&fit=crop',
    imageAlt: 'Premium elevator finishes marble and wood',
    description:
      'Only the finest imported materials — Italian marble flooring, hand-crafted wood veneers, brushed stainless steel, and tempered glass panels.',
    features: [
      'Italian marble & stone flooring',
      'Hand-crafted wood veneers',
      'Brushed metal & glass panels',
    ],
  },
  {
    icon: Users,
    title: 'White Glove Service',
    badge: 'Concierge',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=80&fit=crop',
    imageAlt: 'Professional project manager consultation',
    description:
      'Dedicated project managers — a single point of contact from site survey and design approvals through to handover and post-installation care.',
    features: [
      'Dedicated project manager',
      'Regular progress updates',
      'Post-installation care plan',
    ],
  },
  {
    icon: Clock,
    title: 'Annual Maintenance Contracts',
    badge: 'AMC',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&q=80&fit=crop',
    imageAlt: 'Annual maintenance contract planning',
    description:
      'Flexible AMC plans tailored to your usage and budget — keeping your lift in peak condition year-round with scheduled servicing and priority support.',
    features: [
      'Scheduled periodic servicing',
      'Discounted emergency callouts',
      'Compliance documentation',
    ],
  },
];

// const processSteps = [
//   {
//     step: '01',
//     title: 'Initial Consultation',
//     description: 'Our engineers visit your site, assess requirements, and understand your vision.',
//   },
//   {
//     step: '02',
//     title: 'Custom Proposal',
//     description: 'We prepare a detailed proposal with design options, timeline, and transparent pricing.',
//   },
//   {
//     step: '03',
//     title: 'Design & Engineering',
//     description: '3D visualizations and engineering drawings are prepared and approved by you.',
//   },
//   {
//     step: '04',
//     title: 'Precision Installation',
//     description: 'Certified technicians execute the installation with minimal disruption.',
//   },
//   {
//     step: '05',
//     title: 'Safety Handover',
//     description: 'Full safety testing, BIS certification, and operator training before handover.',
//   },
//   {
//     step: '06',
//     title: 'Lifetime Support',
//     description: 'AMC and 24/7 emergency support keeps your lift running at peak performance.',
//   },
// ];

const processSteps = [
  {
    step: '01',
    title: 'Initial Consultation',
    description: 'Our engineers visit your site, assess requirements, and understand your vision.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=75&fit=crop',
    imageAlt: 'Engineer consulting with client at site',
  },
  {
    step: '02',
    title: 'Custom Proposal',
    description: 'We prepare a detailed proposal with design options, timeline, and transparent pricing.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=75&fit=crop',
    imageAlt: 'Proposal document and pricing discussion',
  },
  {
    step: '03',
    title: 'Design & Engineering',
    description: '3D visualizations and engineering drawings are prepared and approved by you.',
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&q=75&fit=crop',
    imageAlt: 'Engineer working on 3D design drawings',
  },
  {
    step: '04',
    title: 'Precision Installation',
    description: 'Certified technicians execute the installation with minimal disruption.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=75&fit=crop',
    imageAlt: 'Certified technicians installing elevator',
  },
  {
    step: '05',
    title: 'Safety Handover',
    description: 'Full safety testing, BIS certification, and operator training before handover.',
    image: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400&q=75&fit=crop',
    imageAlt: 'Safety inspection and certification handover',
  },
  {
    step: '06',
    title: 'Lifetime Support',
    description: 'AMC and 24/7 emergency support keeps your lift running at peak performance.',
    image: 'https://images.unsplash.com/photo-1537671417141-0e4e1d37b6d0?w=400&q=75&fit=crop',
    imageAlt: '24/7 support and maintenance team',
  },
];

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '25+', label: 'Years Experience' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Support Available' },
];

const certifications = ['ISO 9001', 'BIS Certified', 'EN 81 Compliant'];

const whyUsPoints = [
  {
    title: 'Preventive Maintenance Plans',
    desc: 'Customised maintenance schedules to prevent breakdowns and extend equipment life significantly.',
  },
  {
    title: 'Modernization Solutions',
    desc: 'Upgrade ageing systems with the latest technology for improved efficiency and safety.',
  },
  {
    title: 'Extended Warranty Programs',
    desc: 'Comprehensive coverage options to protect your investment and ensure complete peace of mind.',
  },
  {
    title: 'Transparent Pricing',
    desc: 'No hidden charges. Every quote is itemised and approved by you before work begins.',
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export function ServicesPage() {
  return (
    <div className="bg-[#1a3332] min-h-screen font-['Raleway',sans-serif]">
      <Navigation />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative py-24 md:py-36 pt-36 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1772721559246-286e6d986d73?w=1920&q=80&fit=crop"
            alt="Maintenance & Services hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/90 via-[#1a3332]/75 to-[#1a3332]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-orange-500 text-xs sm:text-sm uppercase tracking-[0.2em] mb-4"
          >
            Professional Excellence
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight"
          >
            Maintenance &amp; Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/65 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Comprehensive maintenance and repair services ensuring peak performance, safety compliance,
            and extended longevity for all your vertical mobility systems.
          </motion.p>

          {/* Cert badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap justify-center gap-2 mt-8"
          >
            {certifications.map((c) => (
              <span
                key={c}
                className="bg-orange-500/10 border border-orange-500/30 text-orange-400
                           text-[10px] sm:text-[11px] font-bold tracking-widest uppercase
                           px-3 py-1.5 rounded-full"
              >
                {c}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MAIN SERVICES GRID (8 cards)
      ══════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#1e3836]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-14"
          >
            <h2 className="font-['Great_Vibes'] text-5xl sm:text-6xl lg:text-7xl text-white mb-3 leading-tight">
              What We Offer
            </h2>
            <div className="w-16 sm:w-20 h-[3px] bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mb-5 rounded-full" />
            <p className="text-white/60 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Eight specialised service verticals, each delivered by certified experts to the highest standards
            </p>
          </motion.div>

          {/* Grid: 2-col mobile, 2-col tablet, 4-col desktop */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {mainServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="group bg-[#152e2c] border border-white/[0.07] rounded-xl lg:rounded-2xl
                             overflow-hidden transition-all duration-300
                             hover:-translate-y-1.5 hover:border-orange-500/40
                             hover:shadow-[0_16px_50px_rgba(0,0,0,0.4),0_0_0_1px_rgba(224,123,42,0.10)]"
                >
                  {/* Image */}
                  <div className="relative h-20 sm:h-36 lg:h-44 overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover brightness-[0.8] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#152e2c]/80 pointer-events-none" />
                    <span className="absolute bottom-1.5 left-1.5 sm:bottom-2.5 sm:left-2.5
                                     bg-orange-500/90 text-white
                                     text-[8px] sm:text-[10px] font-bold tracking-widest uppercase
                                     px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded">
                      {service.badge}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="px-3 pt-3 pb-3 sm:px-4 sm:pt-4 sm:pb-5 lg:px-5 lg:pt-5 lg:pb-6">
                    {/* Icon + title */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 lg:w-11 lg:h-11 shrink-0
                                      bg-orange-500/15 border border-orange-500/25
                                      rounded-lg lg:rounded-xl flex items-center justify-center
                                      group-hover:bg-orange-500/25 transition-colors duration-300">
                        <span className="block sm:hidden"><Icon size={12} className="text-orange-500" /></span>
                        <span className="hidden sm:block lg:hidden"><Icon size={17} className="text-orange-500" /></span>
                        <span className="hidden lg:block"><Icon size={22} className="text-orange-500" /></span>
                      </div>
                      <h3 className="font-['Playfair_Display'] text-white leading-tight
                                     text-[11px] sm:text-[14px] lg:text-[16px]">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description — hidden mobile */}
                    <p className="hidden sm:block text-white/55 text-[11.5px] lg:text-[13px] leading-relaxed font-light mb-3">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-1 hidden sm:block">
                      {service.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-white/45 text-[10.5px] lg:text-[11.5px]">
                          <span className="text-orange-500 mt-px shrink-0">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Single feature on mobile */}
                    <p className="block sm:hidden text-white/45 text-[9px] leading-relaxed mt-1">
                      {service.features[0]}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY CHOOSE US — split layout
      ══════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#1a3332]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-72 sm:h-96 lg:h-[520px] rounded-2xl lg:rounded-3xl overflow-hidden"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1719050817004-c76eb7c75c99?w=1080&q=80&fit=crop"
                alt="Professional elevator service engineer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-transparent to-transparent" />

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute bottom-6 left-6 right-6 sm:right-auto sm:w-56
                           bg-[#152e2c]/90 backdrop-blur-sm border border-orange-500/20
                           rounded-xl px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500/20 border border-orange-500/30 rounded-lg flex items-center justify-center shrink-0">
                    <Shield size={18} className="text-orange-500" />
                  </div>
                  <div>
                    <div className="font-['Playfair_Display'] text-white text-lg font-bold leading-none">6 Years</div>
                    <div className="text-white/50 text-[11px] uppercase tracking-wider mt-0.5">of Trusted Service</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-orange-500 text-xs sm:text-sm uppercase tracking-[0.18em] mb-3">
                Our Commitment
              </p>
              <h2 className="font-['Playfair_Display'] text-white text-3xl sm:text-4xl lg:text-5xl mb-5 leading-tight">
                Excellence in Every Service Call
              </h2>
              <div className="w-14 h-[3px] bg-gradient-to-r from-orange-500 to-amber-400 mb-6 rounded-full" />
              <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-8 font-light">
                Our factory-trained technicians bring decades of combined experience to every service call.
                We understand that your elevator is a critical component of your building's infrastructure,
                and we treat it with the care and professionalism it deserves.
              </p>

              <div className="space-y-5">
                {whyUsPoints.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/15 border border-orange-500/25
                                    rounded-xl flex items-center justify-center shrink-0
                                    group-hover:bg-orange-500/25 transition-colors duration-300">
                      <CheckCircle2 size={18} className="text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-[14px] sm:text-[15px] mb-0.5">{point.title}</h4>
                      <p className="text-white/55 text-[12px] sm:text-[13px] leading-relaxed font-light">{point.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW WE WORK — process steps
      ══════════════════════════════════════ */}
      {/* <section className="py-16 md:py-24 bg-[#1e3836]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-14"
          >
            <h2 className="font-['Great_Vibes'] text-5xl sm:text-6xl lg:text-7xl text-white mb-3 leading-tight">
              How We Work
            </h2>
            <div className="w-16 sm:w-20 h-[3px] bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mb-5 rounded-full" />
            <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
              A transparent, step-by-step process designed around your convenience and confidence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group bg-[#152e2c] border border-white/[0.07] rounded-xl p-4 sm:p-5
                           hover:border-orange-500/35 transition-all duration-300 hover:-translate-y-1
                           text-center"
              >
                {/* Step number 
                <div className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold
                                text-orange-500/30 group-hover:text-orange-500/60
                                transition-colors duration-300 mb-3 leading-none">
                  {step.step}
                </div>
                <h4 className="font-['Playfair_Display'] text-white text-[12px] sm:text-[13px] lg:text-[14px]
                                leading-snug mb-2">
                  {step.title}
                </h4>
                <p className="text-white/45 text-[10.5px] sm:text-[11.5px] leading-relaxed font-light hidden sm:block">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ══════════════════════════════════════
    HOW WE WORK — process steps with images
══════════════════════════════════════ */}
<section className="py-16 md:py-24 bg-[#1e3836]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-10 sm:mb-14"
    >
      <h2 className="font-['Great_Vibes'] text-5xl sm:text-6xl lg:text-7xl text-white mb-3 leading-tight">
        How We Work
      </h2>
      <div className="w-16 sm:w-20 h-[3px] bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mb-5 rounded-full" />
      <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
        A transparent, step-by-step process designed around your convenience and confidence
      </p>
    </motion.div>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
      {processSteps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
          className="group bg-[#152e2c] border border-white/[0.07] rounded-xl
                     hover:border-orange-500/35 transition-all duration-300 hover:-translate-y-1
                     overflow-hidden text-center"
        >
          {/* Step image */}
          <div className="relative h-24 sm:h-28 overflow-hidden">
            <ImageWithFallback
              src={step.image}
              alt={step.imageAlt}
              className="w-full h-full object-cover brightness-[0.65] transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#152e2c]/90 pointer-events-none" />
          </div>

          {/* Step content */}
          <div className="p-4 sm:p-5">
            <div className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold
                            text-orange-500/30 group-hover:text-orange-500/60
                            transition-colors duration-300 mb-3 leading-none">
              {step.step}
            </div>
            <h4 className="font-['Playfair_Display'] text-white text-[12px] sm:text-[13px] lg:text-[14px]
                            leading-snug mb-2">
              {step.title}
            </h4>
            <p className="text-white/45 text-[10.5px] sm:text-[11.5px] leading-relaxed font-light hidden sm:block">
              {step.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* ══════════════════════════════════════
          STATS BAND
      ══════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-[#152e2c] border-y border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-0">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="text-center relative"
              >
                {index < stats.length - 1 && (
                  <span className="hidden md:block absolute right-0 top-[15%] h-[70%] w-px bg-white/[0.09]" />
                )}
                <div className="font-['Playfair_Display'] font-bold text-orange-500 leading-none mb-1.5
                                text-3xl sm:text-4xl lg:text-5xl">
                  {stat.value}
                </div>
                <div className="text-white/45 uppercase font-medium tracking-[0.10em] text-[9px] sm:text-[11px]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TRUST / CERT STRIP
      ══════════════════════════════════════ */}
      <section className="py-10 sm:py-12 bg-[#1a3332]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6
                       bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 sm:px-8 py-5 sm:py-6"
          >
            <div className="text-3xl select-none">🏅</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-['Playfair_Display'] text-white text-[14px] sm:text-[16px] mb-1">
                ISO Certified &amp; BIS Compliant Installations
              </h4>
              <p className="text-white/50 text-[12px] sm:text-[13px] leading-relaxed font-light">
                Every project meets international safety standards, Indian Bureau of Standards requirements, and EN 81 compliance.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:ml-4">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="bg-orange-500/10 border border-orange-500/30 text-orange-400
                             text-[10px] sm:text-[11px] font-bold tracking-widest uppercase
                             px-3 py-1.5 rounded-md"
                >
                  {cert}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#1e3836] relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] rounded-full bg-orange-500/5 blur-[100px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center"
        >
          <p className="text-orange-500 text-xs sm:text-sm uppercase tracking-[0.18em] mb-3">
            Get Started Today
          </p>
          <h2 className="font-['Great_Vibes'] text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight">
            Ready to Elevate Your Space?
          </h2>
          <div className="w-14 h-[3px] bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mb-6 rounded-full" />
          <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed mb-8">
            Book a free site survey and receive a detailed, no-obligation proposal within 48 hours.
          </p>
          <a
            href="#inquiry"
            className="inline-flex items-center gap-2
                       bg-orange-500 hover:bg-orange-600 active:scale-95
                       text-white text-[12px] sm:text-[13px] font-bold tracking-widest uppercase
                       px-8 py-4 rounded-full transition-all duration-200
                       shadow-lg shadow-orange-900/30"
          >
            Book a Free Survey
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </section>

      <InquiryForm />
      <Footer />
    </div>
  );
}