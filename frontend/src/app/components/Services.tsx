// import { Ruler, Wrench, Shield, Sparkles, Users, Clock } from 'lucide-react';
// import { motion } from 'motion/react';
// import { useNavigate } from 'react-router';
// import React from 'react';

// const services = [
//   {
//     id: 1,
//     icon: Ruler,
//     title: 'Bespoke Design',
//     description: 'Custom-tailored elevator solutions designed to match your architectural vision and aesthetic preferences.',
//   },
//   {
//     id: 2,
//     icon: Wrench,
//     title: 'Expert Installation',
//     description: 'Professional installation by certified technicians with minimal disruption to your property.',
//   },
//   {
//     id: 3,
//     icon: Shield,
//     title: 'Safety First',
//     description: 'Cutting-edge safety features and compliance with all international elevator safety standards.',
//   },
//   {
//     id: 4,
//     icon: Sparkles,
//     title: 'Premium Materials',
//     description: 'Only the finest materials and finishes, from Italian marble to hand-crafted wood veneers.',
//   },
//   {
//     id: 5,
//     icon: Users,
//     title: 'White Glove Service',
//     description: 'Dedicated project managers ensuring seamless communication throughout the entire process.',
//   },
//   {
//     id: 6,
//     icon: Clock,
//     title: 'Lifetime Support',
//     description: '24/7 maintenance and support services to keep your elevator running at peak performance.',
//   },
// ];

// export function Services() {
//   return (
//     <section id="services" className="bg-[#2a4544] py-24">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="font-['Great_Vibes'] text-5xl md:text-6xl text-white mb-4">
//             Our Services
//           </h2>
//           <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
//           <p className="text-xl text-white/70 max-w-3xl mx-auto">
//             From initial consultation to ongoing maintenance, we provide end-to-end services for your vertical transportation needs
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
//           {services.map((service, index) => {
//             const Icon = service.icon;
//             return (
//               <motion.div
//                 key={service.id}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="bg-[#1a3332] border border-[#3a5554] rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-300 group"
//               >
//                 <div className="w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500/30 transition-all">
//                   <Icon size={28} className="text-orange-500" />
//                 </div>
//                 <h3 className="text-xl text-white mb-3 font-['Playfair_Display']">{service.title}</h3>
//                 <p className="text-white/60 leading-relaxed">{service.description}</p>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Stats Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-[#3a5554]"
//         >
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.5 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="text-center"
//           >
//             <div className="text-5xl text-orange-500 mb-2 font-bold">500+</div>
//             <div className="text-white/60 uppercase tracking-wider text-sm">Projects</div>
//           </motion.div>
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.5 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="text-center"
//           >
//             <div className="text-5xl text-orange-500 mb-2 font-bold">25+</div>
//             <div className="text-white/60 uppercase tracking-wider text-sm">Years</div>
//           </motion.div>
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.5 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="text-center"
//           >
//             <div className="text-5xl text-orange-500 mb-2 font-bold">98%</div>
//             <div className="text-white/60 uppercase tracking-wider text-sm">Satisfaction</div>
//           </motion.div>
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.5 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//             className="text-center"
//           >
//             <div className="text-5xl text-orange-500 mb-2 font-bold">24/7</div>
//             <div className="text-white/60 uppercase tracking-wider text-sm">Support</div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// import { Ruler, Wrench, Shield, Sparkles, Users, Clock } from 'lucide-react';
// import { motion } from 'motion/react';
// import React from 'react';

// const services = [
//   {
//     id: 1,
//     icon: Ruler,
//     title: 'Bespoke Design',
//     description:
//       'Custom-tailored elevator solutions designed to match your architectural vision — from cabin interiors to door finishes and ambient lighting.',
//     image:
//       'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&fit=crop',
//     imageAlt: 'Luxury elevator interior design showcase',
//     badge: 'Design',
//     tags: ['3D Visualization', 'Custom Cabins', 'Lighting Design'],
//   },
//   {
//     id: 2,
//     icon: Wrench,
//     title: 'Expert Installation',
//     description:
//       'Certified technicians with 25+ years of combined experience ensure precision installation with minimal disruption to your property.',
//     image:
//       'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80&fit=crop',
//     imageAlt: 'Professional elevator installation by certified engineers',
//     badge: 'Installation',
//     tags: ['Certified Team', 'On-time Delivery', 'Clean Worksite'],
//   },
//   {
//     id: 3,
//     icon: Shield,
//     title: 'Safety First',
//     description:
//       'Advanced safety systems, ARD backup power, overload protection and full compliance with EN 81 and Indian elevator safety codes.',
//     image:
//       'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=700&q=80&fit=crop',
//     imageAlt: 'Modern elevator safety systems and control panel',
//     badge: 'Safety',
//     tags: ['ARD Backup', 'EN 81 Standard', 'Overload Sensor'],
//   },
//   {
//     id: 4,
//     icon: Sparkles,
//     title: 'Premium Materials',
//     description:
//       'Finest imported materials — Italian marble flooring, hand-crafted wood veneers, brushed stainless steel and tempered glass panels.',
//     image:
//       'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80&fit=crop',
//     imageAlt: 'Premium elevator cabin with marble and wood veneer finishes',
//     badge: 'Premium',
//     tags: ['Italian Marble', 'Wood Veneer', 'Glass Panels'],
//   },
//   {
//     id: 5,
//     icon: Users,
//     title: 'White Glove Service',
//     description:
//       'Dedicated project managers — single point of contact from site survey and design approvals through to handover and beyond.',
//     image:
//       'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=80&fit=crop',
//     imageAlt: 'Professional consultation meeting for elevator project',
//     badge: 'Concierge',
//     tags: ['Dedicated PM', 'Site Surveys', 'Progress Updates'],
//   },
//   {
//     id: 6,
//     icon: Clock,
//     title: 'Lifetime Support',
//     description:
//       '24/7 emergency helpline, annual maintenance contracts (AMC), remote diagnostics and fast-response field engineers across MP.',
//     image:
//       'https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=700&q=80&fit=crop',
//     imageAlt: 'Elevator maintenance and service engineer at work',
//     badge: 'Support',
//     tags: ['24/7 Helpline', 'AMC Plans', 'Remote Diagnostics'],
//   },
// ];

// const stats = [
//   { value: '500+', label: 'Projects Completed' },
//   { value: '25+', label: 'Years Experience' },
//   { value: '98%', label: 'Satisfaction Rate' },
//   { value: '24/7', label: 'Support Available' },
// ];

// const certifications = ['ISO 9001', 'BIS Certified', 'EN 81 Compliant'];

// export function Services() {
//   return (
//     <section id="services" className="bg-[#1e3836] py-24 font-['Raleway',sans-serif]">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-14"
//         >
//           <h2 className="font-['Great_Vibes'] text-6xl md:text-7xl text-white mb-3 leading-tight">
//             Our Services
//           </h2>
//           <div className="w-20 h-[3px] bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mb-6 rounded-full" />
//           <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed font-light">
//             From initial consultation to ongoing maintenance, we provide end-to-end luxury
//             elevator solutions tailored to your space
//           </p>
//         </motion.div>

//         {/* Trust / Certification Strip */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-7 py-5 mb-14"
//         >
//           <div className="text-3xl select-none">🏅</div>
//           <div className="flex-1">
//             <h4 className="font-['Playfair_Display'] text-white text-[15px] mb-1">
//               ISO Certified &amp; BIS Compliant
//             </h4>
//             <p className="text-white/50 text-[13px] leading-relaxed font-light">
//               All installations meet international safety standards and Indian Bureau of
//               Standards requirements for vertical transportation.
//             </p>
//           </div>
//           <div className="flex flex-wrap gap-2 sm:ml-4">
//             {certifications.map((cert) => (
//               <span
//                 key={cert}
//                 className="bg-orange-500/10 border border-orange-500/30 text-orange-400
//                            text-[11px] font-semibold tracking-wide uppercase px-3 py-1 rounded-md"
//               >
//                 {cert}
//               </span>
//             ))}
//           </div>
//         </motion.div>

//         {/* Service Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
//           {services.map((service, index) => {
//             const Icon = service.icon;
//             return (
//               <motion.div
//                 key={service.id}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.08 }}
//                 className="group bg-[#152e2c] border border-white/[0.07] rounded-2xl overflow-hidden
//                            transition-all duration-300 hover:-translate-y-1.5
//                            hover:border-orange-500/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(224,123,42,0.12)]"
//               >
//                 {/* Image */}
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={service.image}
//                     alt={service.imageAlt}
//                     loading="lazy"
//                     className="w-full h-full object-cover brightness-[0.82] transition-transform duration-500 group-hover:scale-105"
//                   />
//                   {/* Gradient overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#152e2c]/80 pointer-events-none" />
//                   {/* Badge */}
//                   <span className="absolute bottom-3 left-3 bg-orange-500/90 text-white
//                                    text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded">
//                     {service.badge}
//                   </span>
//                 </div>

//                 {/* Body */}
//                 <div className="px-5 pt-5 pb-6">
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-10 h-10 bg-orange-500/15 border border-orange-500/25 rounded-xl
//                                     flex items-center justify-center shrink-0
//                                     group-hover:bg-orange-500/25 transition-colors duration-300">
//                       <Icon size={20} className="text-orange-500" />
//                     </div>
//                     <h3 className="font-['Playfair_Display'] text-white text-[17px]">
//                       {service.title}
//                     </h3>
//                   </div>

//                   <p className="text-white/55 text-[13.5px] leading-relaxed font-light mb-4">
//                     {service.description}
//                   </p>

//                   {/* Feature Tags */}
//                   <div className="flex flex-wrap gap-1.5">
//                     {service.tags.map((tag) => (
//                       <span
//                         key={tag}
//                         className="bg-white/[0.05] border border-white/[0.09] text-white/50
//                                    text-[11px] px-2.5 py-1 rounded-full tracking-wide"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Stats Row */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-0 pt-14 border-t border-white/[0.09]"
//         >
//           {stats.map((stat, index) => (
//             <motion.div
//               key={stat.label}
//               initial={{ opacity: 0, scale: 0.6 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.45, delay: 0.15 + index * 0.1 }}
//               className="text-center relative"
//             >
//               {/* Vertical divider between stats (except last) */}
//               {index < stats.length - 1 && (
//                 <span className="hidden md:block absolute right-0 top-[15%] h-[70%] w-px bg-white/[0.09]" />
//               )}
//               <div className="font-['Playfair_Display'] text-5xl font-bold text-orange-500 mb-2 leading-none">
//                 {stat.value}
//               </div>
//               <div className="text-white/45 text-[11px] uppercase tracking-[0.12em] font-medium">
//                 {stat.label}
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//       </div>
//     </section>
//   );
// }

import { Ruler, Wrench, Shield, Sparkles, Users, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import React from 'react';

const services = [
  {
    id: 1,
    icon: Ruler,
    title: 'Bespoke Design',
    description:
      'Custom-tailored elevator solutions designed to match your architectural vision — from cabin interiors to door finishes and ambient lighting.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&fit=crop',
    imageAlt: 'Luxury elevator interior design showcase',
    badge: 'Design',
    tags: ['3D Visualization', 'Custom Cabins', 'Lighting Design'],
  },
  {
    id: 2,
    icon: Wrench,
    title: 'Expert Installation',
    description:
      'Certified technicians with 25+ years of combined experience ensure precision installation with minimal disruption to your property.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80&fit=crop',
    imageAlt: 'Professional elevator installation by certified engineers',
    badge: 'Installation',
    tags: ['Certified Team', 'On-time Delivery', 'Clean Worksite'],
  },
  {
    id: 3,
    icon: Shield,
    title: 'Safety First',
    description:
      'Advanced safety systems, ARD backup power, overload protection and full compliance with EN 81 and Indian elevator safety codes.',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=700&q=80&fit=crop',
    imageAlt: 'Modern elevator safety systems and control panel',
    badge: 'Safety',
    tags: ['ARD Backup', 'EN 81 Standard', 'Overload Sensor'],
  },
  {
    id: 4,
    icon: Sparkles,
    title: 'Premium Materials',
    description:
      'Finest imported materials — Italian marble flooring, hand-crafted wood veneers, brushed stainless steel and tempered glass panels.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80&fit=crop',
    imageAlt: 'Premium elevator cabin with marble and wood veneer finishes',
    badge: 'Premium',
    tags: ['Italian Marble', 'Wood Veneer', 'Glass Panels'],
  },
  {
    id: 5,
    icon: Users,
    title: 'White Glove Service',
    description:
      'Dedicated project managers — single point of contact from site survey and design approvals through to handover and beyond.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=80&fit=crop',
    imageAlt: 'Professional consultation meeting for elevator project',
    badge: 'Concierge',
    tags: ['Dedicated PM', 'Site Surveys', 'Progress Updates'],
  },
  {
    id: 6,
    icon: Clock,
    title: 'Lifetime Support',
    description:
      '24/7 emergency helpline, annual maintenance contracts (AMC), remote diagnostics and fast-response field engineers across MP.',
    image: 'https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=700&q=80&fit=crop',
    imageAlt: 'Elevator maintenance and service engineer at work',
    badge: 'Support',
    tags: ['24/7 Helpline', 'AMC Plans', 'Remote Diagnostics'],
  },
];

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '25+', label: 'Years Experience' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Support Available' },
];

const certifications = ['ISO 9001', 'BIS Certified', 'EN 81 Compliant'];

export function Services() {
  const navigate = useNavigate();

  const handleCardClick = () => navigate('/service');

  return (
    <section
      id="services"
      className="bg-[#1e3836] py-12 sm:py-16 lg:py-24 font-['Raleway',sans-serif]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 lg:mb-14"
        >
          <h2 className="font-['Great_Vibes'] text-5xl sm:text-6xl lg:text-7xl text-white mb-3 leading-tight">
            Our Services
          </h2>
          <div className="w-16 sm:w-20 h-[3px] bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mb-4 sm:mb-6 rounded-full" />
          <p className="text-white/60 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-light px-2">
            From initial consultation to ongoing maintenance, we provide end-to-end luxury
            elevator solutions tailored to your space
          </p>
        </motion.div>

        {/* ── Trust / Certification Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5
                     bg-white/[0.04] border border-white/[0.08] rounded-xl sm:rounded-2xl
                     px-4 sm:px-7 py-4 sm:py-5 mb-8 sm:mb-10 lg:mb-14"
        >
          <div className="text-2xl sm:text-3xl select-none">🏅</div>
          <div className="flex-1 min-w-0">
            <h4 className="font-['Playfair_Display'] text-white text-[13px] sm:text-[15px] mb-0.5">
              ISO Certified &amp; BIS Compliant
            </h4>
            <p className="text-white/50 text-[11px] sm:text-[13px] leading-relaxed font-light">
              All installations meet international safety standards and Indian Bureau of Standards requirements.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 sm:ml-4 mt-1 sm:mt-0">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="bg-orange-500/10 border border-orange-500/30 text-orange-400
                           text-[9px] sm:text-[11px] font-semibold tracking-wide uppercase
                           px-2 sm:px-3 py-0.5 sm:py-1 rounded-md"
              >
                {cert}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Service Cards Grid ──
              Mobile  (<640px)  : 2 columns — compact card, small image, title only, 1 tag
              Tablet  (640–1023px): 2 columns — medium card, short description, all tags
              Desktop (1024px+) : 3 columns — full card with learn-more arrow
        ── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-6 mb-10 sm:mb-14 lg:mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                onClick={handleCardClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
                aria-label={`Learn more about ${service.title}`}
                className="group bg-[#152e2c] border border-white/[0.07] rounded-xl lg:rounded-2xl
                           overflow-hidden cursor-pointer select-none
                           transition-all duration-300
                           hover:-translate-y-1 active:scale-[0.98]
                           hover:border-orange-500/40
                           hover:shadow-[0_12px_40px_rgba(0,0,0,0.35),0_0_0_1px_rgba(224,123,42,0.10)]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60"
              >
                {/* ── Image ── */}
                <div className="relative h-20 sm:h-36 lg:h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover brightness-[0.8]
                               transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Fade to card bg at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#152e2c]/80 pointer-events-none" />
                  {/* Category badge */}
                  <span className="absolute bottom-1.5 left-1.5 sm:bottom-3 sm:left-3
                                   bg-orange-500/90 text-white
                                   text-[8px] sm:text-[10px] font-bold tracking-widest uppercase
                                   px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded">
                    {service.badge}
                  </span>
                </div>

                {/* ── Card Body ── */}
                <div className="px-2.5 pt-2.5 pb-2.5 sm:px-4 sm:pt-4 sm:pb-4 lg:px-5 lg:pt-5 lg:pb-6">

                  {/* Icon + Title */}
                  <div className="flex items-center gap-1.5 sm:gap-3 mb-1.5 sm:mb-3">
                    <div
                      className="w-6 h-6 sm:w-9 sm:h-9 lg:w-10 lg:h-10 shrink-0
                                  bg-orange-500/15 border border-orange-500/25
                                  rounded-md sm:rounded-lg lg:rounded-xl
                                  flex items-center justify-center
                                  group-hover:bg-orange-500/25 transition-colors duration-300"
                    >
                      {/* Responsive icon sizes via explicit classes */}
                      <span className="block sm:hidden">
                        <Icon size={12} className="text-orange-500" />
                      </span>
                      <span className="hidden sm:block lg:hidden">
                        <Icon size={17} className="text-orange-500" />
                      </span>
                      <span className="hidden lg:block">
                        <Icon size={20} className="text-orange-500" />
                      </span>
                    </div>
                    <h3 className="font-['Playfair_Display'] text-white leading-tight
                                   text-[12px] sm:text-[15px] lg:text-[17px]">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description — hidden on mobile, visible tablet+ */}
                  <p className="hidden sm:block text-white/55 text-[12px] lg:text-[13.5px] leading-relaxed font-light mb-3">
                    {service.description}
                  </p>

                  {/* Tags — 1 on mobile, all on sm+ */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {service.tags.map((tag, tagIdx) => (
                      <span
                        key={tag}
                        className={[
                          'bg-white/[0.05] border border-white/[0.09] text-white/50 rounded-full tracking-wide',
                          'text-[9px] sm:text-[11px] px-1.5 sm:px-2.5 py-0.5 sm:py-1',
                          // On mobile show only first tag
                          tagIdx > 0 ? 'hidden sm:inline-flex' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Learn More arrow — desktop hover only */}
                  <div
                    className="hidden lg:flex items-center gap-1 mt-3
                                text-orange-400 text-[12px] font-medium
                                opacity-0 group-hover:opacity-100
                                -translate-x-1 group-hover:translate-x-0
                                transition-all duration-300"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── "View All Services" CTA — shown on mobile & tablet, hidden on desktop ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10 sm:mb-14 lg:hidden"
        >
          <button
            onClick={() => navigate('/services')}
            className="flex items-center gap-2
                       bg-orange-500 hover:bg-orange-600 active:scale-95
                       text-white text-[12px] sm:text-[13px] font-semibold tracking-widest uppercase
                       px-7 py-3 rounded-full transition-all duration-200 shadow-lg shadow-orange-900/30"
          >
            View All Services
            <ArrowRight size={13} />
          </button>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-6 sm:gap-y-8 gap-x-0
                     pt-8 sm:pt-12 lg:pt-14 border-t border-white/[0.09]"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 + index * 0.1 }}
              className="text-center relative"
            >
              {/* Vertical divider — desktop only */}
              {index < stats.length - 1 && (
                <span className="hidden md:block absolute right-0 top-[15%] h-[70%] w-px bg-white/[0.09]" />
              )}
              <div className="font-['Playfair_Display'] font-bold text-orange-500 leading-none mb-1 sm:mb-2
                              text-3xl sm:text-4xl lg:text-5xl">
                {stat.value}
              </div>
              <div className="text-white/45 uppercase font-medium tracking-[0.10em] sm:tracking-[0.12em]
                              text-[9px] sm:text-[11px]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}