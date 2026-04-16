import React, { useEffect, useState } from 'react';
import { apiUrl } from "../api";
import { ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

export function Hero() {
  const navigate = useNavigate();
  const [heading, setHeading] = useState('The Art of Vertical Mastery');
  const [tagline, setTagline] = useState('Elevating your lifestyle with bespoke vertical transportation solutions');
  const [projectsCompleted, setProjectsCompleted] = useState(200);
  const [citiesServed, setCitiesServed] = useState(15);
  const [yearsExperience, setYearsExperience] = useState(6);
  const [satisfactionRate, setSatisfactionRate] = useState(98);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCollectionClick = () => {
    navigate('/collection');
  };

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await fetch(apiUrl('/portal-config'));
        if (!res.ok) return;
        const data = await res.json().catch(() => null);
        if (!data) return;
        const ps = data.portalSettings || {};
        if (ps.tagline) {
          setTagline(ps.tagline as string);
        }
        if (ps.heroHeading) {
          setHeading(ps.heroHeading as string);
        } else if (ps.siteName) {
          setHeading(ps.siteName as string);
        }
        if (typeof ps.projectsCompleted === 'number') {
          setProjectsCompleted(ps.projectsCompleted);
        }
        if (typeof ps.citiesServed === 'number') {
          setCitiesServed(ps.citiesServed);
        }
        if (typeof ps.yearsExperience === 'number') {
          setYearsExperience(ps.yearsExperience);
        }
        if (typeof ps.satisfactionRate === 'number') {
          setSatisfactionRate(ps.satisfactionRate);
        }
      } catch {
        // ignore, keep defaults
      }
    };
    loadConfig();
  }, []);

  return (
    <div className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGV2YXRvciUyMGludGVyaW9yJTIwZ29sZHxlbnwxfHx8fDE3NzMyMzI1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury elevator interior"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/80 via-[#1a3332]/70 to-[#2a4544]"></div>
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-28 pb-16 sm:pb-20"
      >
        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-['Great_Vibes'] text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-5 sm:mb-8 leading-tight"
        >
          {heading}
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-base sm:text-lg md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 sm:mb-14 px-2 sm:px-4 leading-relaxed"
        >
          {tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-20 px-0 sm:px-4 w-full"
        >
          <button
            onClick={handleCollectionClick}
            className="w-full sm:w-auto bg-orange-500 text-white px-6 sm:px-8 py-3 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 text-sm sm:text-base uppercase tracking-wider shadow-lg"
          >
            Explore Collection
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="w-full sm:w-auto border-2 border-white/40 text-white px-6 sm:px-8 py-3 rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-300 text-sm sm:text-base uppercase tracking-wider"
          >
            View Projects
          </button>
        </motion.div>

        {/* Key Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto px-0 sm:px-4"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-center p-2.5 sm:p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="text-xl sm:text-3xl md:text-4xl text-orange-500 mb-1 sm:mb-2 font-bold">
              {projectsCompleted}+
            </div>
            <div className="text-white/80 text-[10px] sm:text-xs uppercase tracking-wide">Projects Completed</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="text-center p-2.5 sm:p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="text-xl sm:text-3xl md:text-4xl text-orange-500 mb-1 sm:mb-2 font-bold">
              {citiesServed}+
            </div>
            <div className="text-white/80 text-[10px] sm:text-xs uppercase tracking-wide">Cities Served</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-center p-2.5 sm:p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="text-xl sm:text-3xl md:text-4xl text-orange-500 mb-1 sm:mb-2 font-bold">
              {yearsExperience}+
            </div>
            <div className="text-white/80 text-[10px] sm:text-xs uppercase tracking-wide">Years Experience</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="text-center p-2.5 sm:p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="text-xl sm:text-3xl md:text-4xl text-orange-500 mb-1 sm:mb-2 font-bold">
              {satisfactionRate}%
            </div>
            <div className="text-white/80 text-[10px] sm:text-xs uppercase tracking-wide">Satisfaction Rate</div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => scrollToSection('portfolio')}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce z-20"
      >
        <ChevronDown size={28} className="sm:w-8 sm:h-8" />
      </motion.button>
    </div>
  );
}