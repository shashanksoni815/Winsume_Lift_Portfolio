import { ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

export function Hero() {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCollectionClick = () => {
    navigate('/collection');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20"
      >
        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 sm:mb-8 leading-tight"
        >
          The Art of Vertical Mastery
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 sm:mb-14 px-4"
        >
          Elevating your lifestyle with bespoke vertical transportation solutions
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16 sm:mb-20 px-4"
        >
          <button
            onClick={handleCollectionClick}
            className="w-full sm:w-auto bg-orange-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 text-sm sm:text-base uppercase tracking-wider shadow-lg"
          >
            Explore Collection
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="w-full sm:w-auto border-2 border-white/40 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-300 text-sm sm:text-base uppercase tracking-wider"
          >
            View Projects
          </button>
        </motion.div>

        {/* Key Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto px-4"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-center p-3 sm:p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl text-orange-500 mb-1 sm:mb-2 font-bold">200+</div>
            <div className="text-white/80 text-[10px] sm:text-xs uppercase tracking-wider">Projects Completed</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="text-center p-3 sm:p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl text-orange-500 mb-1 sm:mb-2 font-bold">15+</div>
            <div className="text-white/80 text-[10px] sm:text-xs uppercase tracking-wider">Cities Served</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-center p-3 sm:p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl text-orange-500 mb-1 sm:mb-2 font-bold">6+</div>
            <div className="text-white/80 text-[10px] sm:text-xs uppercase tracking-wider">Years Experience</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="text-center p-3 sm:p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl text-orange-500 mb-1 sm:mb-2 font-bold">98%</div>
            <div className="text-white/80 text-[10px] sm:text-xs uppercase tracking-wider">Satisfaction Rate</div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => scrollToSection('portfolio')}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce z-20"
      >
        <ChevronDown size={32} />
      </motion.button>
    </div>
  );
}