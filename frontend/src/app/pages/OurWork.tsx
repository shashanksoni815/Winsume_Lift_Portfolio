import { Navigation } from '../components/Navigation';
import { InquiryForm } from '../components/InquiryForm';
import { Footer } from '../components/Footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

const projects = [
  {
    id: 'phoenix-mall-indore',
    title: 'Phoenix Mall, Indore',
    category: 'LUXURY - 2023',
    description: 'Our premium mall project featuring cutting-edge vertical lifts',
    image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yfGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    size: 'large',
  },
  {
    id: 'sayaji-hotels',
    title: 'Sayaji Hotels',
    category: 'HOME - 2023',
    description: 'Elegant lift solutions for premium hospitality',
    image: 'https://images.unsplash.com/photo-1758194090785-8e09b7288199?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGVsZXZhdG9yJTIwbG9iYnklMjBlbGVnYW50fGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    size: 'small',
  },
  {
    id: 'radisson-blu',
    title: 'Radisson Blu',
    category: 'HOTEL - 2023',
    description: 'Sophisticated vertical transport for luxury hotels',
    image: 'https://images.unsplash.com/photo-1763046472163-32c74523903e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZXxlbnwxfHx8fDE3NzMxNzIwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    size: 'small',
  },
];

export function OurWork() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1a3332] min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 pt-32 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidWlsZGluZyUyMGVsZXZhdG9yJTIwbHV4dXJ5JTIwbG9iYnl8ZW58MXx8fHwxNzczMjM2NjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Modern Luxury Elevator Lobby"
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
            Our Work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Setting the standard in vertical-interior mobility with bespoke architect-curated solutions.
            <br />
            Discover our prestigious installations across India's premier commercial and residential developments.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
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
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover our exceptional collection of luxury elevator installations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Large Project - Phoenix Mall */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onClick={() => navigate(`/project/${projects[0].id}`)}
              className="md:row-span-2 relative group overflow-hidden rounded-3xl shadow-2xl cursor-pointer"
            >
              <div className="relative h-[400px] md:h-full aspect-[3/4]">
                <ImageWithFallback
                  src={projects[0].image}
                  alt={projects[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-[#1a3332]/40 to-transparent"></div>
                <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-orange-500 text-xs uppercase tracking-widest mb-2 block">
                    {projects[0].category}
                  </span>
                  <h3 className="text-2xl md:text-3xl text-white mb-2 font-['Playfair_Display'] group-hover:text-orange-400 transition-colors">
                    {projects[0].title}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {projects[0].description}
                  </p>
                  <div className="mt-4 flex items-center text-orange-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <span>View Details</span>
                    <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Small Project - Sayaji Hotels */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => navigate(`/project/${projects[1].id}`)}
              className="relative group overflow-hidden rounded-3xl shadow-2xl cursor-pointer"
            >
              <div className="relative h-[300px]">
                <ImageWithFallback
                  src={projects[1].image}
                  alt={projects[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-[#1a3332]/40 to-transparent"></div>
                <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-orange-500 text-xs uppercase tracking-widest mb-2 block">
                    {projects[1].category}
                  </span>
                  <h3 className="text-xl text-white font-['Playfair_Display'] group-hover:text-orange-400 transition-colors">
                    {projects[1].title}
                  </h3>
                  <div className="mt-3 flex items-center text-orange-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <span>View Details</span>
                    <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Small Project - Radisson Blu */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={() => navigate(`/project/${projects[2].id}`)}
              className="relative group overflow-hidden rounded-3xl shadow-2xl cursor-pointer"
            >
              <div className="relative h-[300px]">
                <ImageWithFallback
                  src={projects[2].image}
                  alt={projects[2].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-[#1a3332]/40 to-transparent"></div>
                <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-orange-500 text-xs uppercase tracking-widest mb-2 block">
                    {projects[2].category}
                  </span>
                  <h3 className="text-xl text-white font-['Playfair_Display'] group-hover:text-orange-400 transition-colors">
                    {projects[2].title}
                  </h3>
                  <div className="mt-3 flex items-center text-orange-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <span>View Details</span>
                    <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <button 
              onClick={() => navigate('/all-projects')}
              className="bg-orange-500 text-white px-10 py-4 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 uppercase tracking-wider shadow-lg"
            >
              View All Projects
            </button>
          </motion.div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <InquiryForm />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}