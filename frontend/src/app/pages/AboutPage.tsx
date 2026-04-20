import { Navigation } from '../components/Navigation';
import { InquiryForm } from '../components/InquiryForm';
import { Footer } from '../components/Footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import React from 'react';

// const companyStats = [
//   {
//     label: 'YEARS IN BUSINESS',
//     value: 'Quality Elevate since 1 Year',
//   },
//   {
//     label: 'GLOBAL MANUFACTURING',
//     value: 'Sites in Punjab',
//   },
//   {
//     label: 'ISO CERTIFIED OPERATIONS',
//     value: '',
//   },
//   {
//     label: 'YEARS OF EXCELLENCE',
//     value: 'National Company',
//   },
//   {
//     label: 'PROJECTS COMPLETED',
//     value: '14 + 12+',
//   },
//   {
//     label: 'WARRANTY',
//     value: 'Lifetime',
//   },
//   {
//     label: 'TRAINED TECHNICIANS',
//     value: 'Specialized Security',
//   },
// ];
const companyStats = [
  {
    label: 'YEARS IN BUSINESS',
    value: 'Quality Elevate since 1 Year',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=75&fit=crop',
    imageAlt: 'Business building in operation',
    badge: 'Est. 2018',
  },
  {
    label: 'GLOBAL MANUFACTURING',
    value: 'Sites in Punjab',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=75&fit=crop',
    imageAlt: 'Manufacturing facility',
    badge: 'Punjab',
  },
  {
    label: 'ISO CERTIFIED OPERATIONS',
    value: 'BIS & EN 81 Compliant',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=75&fit=crop',
    imageAlt: 'ISO certification documentation',
    badge: 'ISO 9001',
  },
  {
    label: 'YEARS OF EXCELLENCE',
    value: 'National Company',
    image: 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=500&q=75&fit=crop',
    imageAlt: 'National excellence award',
    badge: 'National',
  },
  {
    label: 'PROJECTS COMPLETED',
    value: '14 + 12+',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=75&fit=crop',
    imageAlt: 'Elevator installation projects',
    badge: '26+ Projects',
  },
  {
    label: 'WARRANTY',
    value: 'Lifetime',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=75&fit=crop',
    imageAlt: 'Luxury elevator with lifetime warranty',
    badge: 'Lifetime',
  },
  {
    label: 'TRAINED TECHNICIANS',
    value: 'Specialized Security',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&q=75&fit=crop',
    imageAlt: 'Certified technician team',
    badge: 'Certified',
  },
];


export function AboutPage() {
  return (
    <div className="bg-[#1a3332] min-h-screen">
      <Navigation />

      {/* Hero Section - Our Story */}
      <section className="relative py-20 md:py-32 pt-32 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGV2YXRvciUyMGNhYmluJTIwaW50ZXJpb3IlMjBnb2xkfGVufDF8fHx8MTc3MzIzNjYyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury Elevator Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/80 via-[#1a3332]/70 to-[#1a3332]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Crafting exceptional vertical transportation solutions since 2018.
            <br />
            A legacy of innovation, precision engineering, and timeless elegance.
          </motion.p>
        </div>
      </section>

      {/* Mastery in Craftsmanship Section */}
      <section className="py-16 md:py-24 bg-[#2a4544]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6">
                <span className="text-white">Mastery in</span>
                <br />
                <span className="font-['Great_Vibes'] text-orange-500 text-5xl sm:text-6xl md:text-7xl">
                  Craftsmanship
                </span>
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-6">
                Crafted from a blend of cutting edge innovation and expert experience. From luxurious
                cabins to fine hand-crafted finishes. Every elevator we develop is built with meticulous
                detail to give years of seamless operation and visual brilliance.
              </p>
              <p className="text-orange-500/80 text-sm uppercase tracking-widest">
                — THE MATERIAL SOURCES
              </p>
            </motion.div>

            {/* Right Images */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {/* <div className="relative h-[300px] rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  alt="Golden Elevator Doors"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 text-white text-xs">
                  Metal (Stainless/Bronze)
                </div>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800&q=80"
                  alt="Premium Wood Paneling"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 text-white text-xs">
                  Artisan Wood Finishes
                </div>
              </div> */}
              {/* LEFT IMAGE */}
<div className="relative h-[300px] rounded-lg overflow-hidden">
  <img
    src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
    alt="Golden Elevator Doors"
    className="w-full h-full object-cover"
  />
  <div className="absolute bottom-4 left-4 text-white text-xs">
    Metal (Stainless/Bronze)
  </div>
</div>

{/* RIGHT IMAGE */}
<div className="relative h-[300px] rounded-lg overflow-hidden">
  <img
    src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&w=800"
    alt="Premium Wood Paneling"
    className="w-full h-full object-cover"
  />
  <div className="absolute bottom-4 left-4 text-white text-xs">
    Artisan Wood Finishes
  </div>
</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company & Compliance Section */}
      <section className="py-16 md:py-24 bg-[#1a3332]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl mb-3">
              <span className="text-white">Company &</span>
              <br />
              <span className="font-['Great_Vibes'] text-orange-500 text-5xl sm:text-6xl md:text-7xl">
                Compliance
              </span>
            </h2>
          </motion.div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {companyStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#2a4544] border border-orange-500/30 rounded-lg p-6 hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-500 text-lg">◆</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-orange-500 text-xs uppercase tracking-wider mb-2">{stat.label}</p>
                    {stat.value && <p className="text-white text-sm">{stat.value}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {companyStats.map((stat, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-[#2a4544] border border-orange-500/30 rounded-lg
                 overflow-hidden hover:border-orange-500/60 hover:-translate-y-1
                 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-32 overflow-hidden">
        <ImageWithFallback
          src={stat.image}
          alt={stat.imageAlt}
          className="w-full h-full object-cover brightness-[0.55]
                     transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2a4544] pointer-events-none" />
        <span className="absolute bottom-2 left-3 z-10
                         bg-orange-500/85 text-white
                         text-[9px] font-bold tracking-widest uppercase
                         px-2 py-0.5 rounded">
          {stat.badge}
        </span>
      </div>

      {/* Body */}
      <div className="flex items-start gap-3 px-4 py-4">
        <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-orange-500 text-sm">◆</span>
        </div>
        <div className="flex-1">
          <p className="text-orange-500 text-[10px] uppercase tracking-wider mb-1.5 font-semibold">
            {stat.label}
          </p>
          {stat.value && (
            <p className="text-white text-sm leading-snug">{stat.value}</p>
          )}
        </div>
      </div>
    </motion.div>
  ))}
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