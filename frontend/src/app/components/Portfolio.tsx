import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

const projects = [
  {
    id: 'manhattan-penthouse',
    title: 'Manhattan Penthouse',
    category: 'Residential',
    description: 'Custom glass elevator with panoramic city views',
    image: 'https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGV2YXRvciUyMGludGVyaW9yJTIwZ29sZHxlbnwxfHx8fDE3NzMyMzI1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'corporate-tower-mumbai',
    title: 'Corporate Tower',
    category: 'Commercial',
    description: 'High-speed executive lift system',
    image: 'https://images.unsplash.com/photo-1619155631589-89db583e0bcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnbGFzcyUyMGVsZXZhdG9yfGVufDF8fHx8MTc3MzIzMjUyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'luxury-villa-delhi',
    title: 'Modern Villa',
    category: 'Residential',
    description: 'Minimalist home elevator with smart integration',
    image: 'https://images.unsplash.com/photo-1770821030454-5e3ccb2d96dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGhvbWUlMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzMyMzM0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'heritage-hotel-jaipur',
    title: 'Heritage Building',
    category: 'Commercial',
    description: 'Restoration-grade lift preserving architectural integrity',
    image: 'https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzMyMzM0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function Portfolio() {
  const navigate = useNavigate();

  return (
    <section id="portfolio" className="bg-[#2a4544] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Great_Vibes'] text-5xl md:text-6xl text-white mb-4">
            Our Portfolio
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover our exceptional collection of luxury elevator installations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => navigate(`/project/${project.id}`)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl aspect-[3/4] mb-4">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-[#1a3332]/40 to-transparent"></div>
                <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-orange-500 text-xs tracking-widest uppercase mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-xl text-white mb-2 group-hover:text-orange-400 transition-colors">{project.title}</h3>
                  <p className="text-white/70 text-sm">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button 
            onClick={() => navigate('/our-work')}
            className="bg-orange-500 text-white px-10 py-4 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 uppercase tracking-wider shadow-lg"
          >
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
}