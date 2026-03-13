import { Navigation } from '../components/Navigation';
import { InquiryForm } from '../components/InquiryForm';
import { Footer } from '../components/Footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { ChevronRight, Filter } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const allProjects = [
  {
    id: 'phoenix-mall-indore',
    title: 'Phoenix Mall, Indore',
    category: 'COMMERCIAL',
    year: '2023',
    location: 'Indore, MP',
    description: 'Premium mall featuring cutting-edge vertical lifts',
    image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yfGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  {
    id: 'sayaji-hotels',
    title: 'Sayaji Hotels',
    category: 'HOSPITALITY',
    year: '2023',
    location: 'Multiple Locations',
    description: 'Elegant lift solutions for premium hospitality',
    image: 'https://images.unsplash.com/photo-1758194090785-8e09b7288199?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGVsZXZhdG9yJTIwbG9iYnklMjBlbGVnYW50fGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  {
    id: 'radisson-blu',
    title: 'Radisson Blu',
    category: 'HOSPITALITY',
    year: '2023',
    location: 'Indore, MP',
    description: 'Sophisticated vertical transport for luxury hotels',
    image: 'https://images.unsplash.com/photo-1763046472163-32c74523903e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZXxlbnwxfHx8fDE3NzMxNzIwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  {
    id: 'corporate-tower-mumbai',
    title: 'Corporate Tower, Mumbai',
    category: 'COMMERCIAL',
    year: '2023',
    location: 'Mumbai, MH',
    description: 'High-speed executive elevator systems',
    image: 'https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwZWxldmF0b3IlMjBsb2JieXxlbnwxfHx8fDE3NzMzMDM0ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
  },
  {
    id: 'luxury-villa-delhi',
    title: 'Luxury Villa, Delhi',
    category: 'RESIDENTIAL',
    year: '2022',
    location: 'New Delhi',
    description: 'Bespoke home elevator with smart integration',
    image: 'https://images.unsplash.com/photo-1758448511533-e1502259fff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVudGlhbCUyMGVsZXZhdG9yJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczMzAzNDg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
  },
  {
    id: 'heritage-hotel-jaipur',
    title: 'Heritage Hotel, Jaipur',
    category: 'HOSPITALITY',
    year: '2022',
    location: 'Jaipur, RJ',
    description: 'Restoration-grade lift preserving architectural integrity',
    image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yfGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
  },
  {
    id: 'it-park-bangalore',
    title: 'IT Park, Bangalore',
    category: 'COMMERCIAL',
    year: '2022',
    location: 'Bangalore, KA',
    description: 'Smart building integrated elevator systems',
    image: 'https://images.unsplash.com/photo-1619155631589-89db583e0bcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnbGFzcyUyMGVsZXZhdG9yfGVufDF8fHx8MTc3MzIzMjUyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
  },
  {
    id: 'penthouse-pune',
    title: 'Penthouse, Pune',
    category: 'RESIDENTIAL',
    year: '2022',
    location: 'Pune, MH',
    description: 'Glass elevator with panoramic city views',
    image: 'https://images.unsplash.com/photo-1672753782907-d58990efbdc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGVsZXZhdG9yJTIwZXh0ZXJpb3IlMjBob3RlbHxlbnwxfHx8fDE3NzMzMDM0ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
  },
  {
    id: 'shopping-complex-ahmedabad',
    title: 'Shopping Complex, Ahmedabad',
    category: 'COMMERCIAL',
    year: '2021',
    location: 'Ahmedabad, GJ',
    description: 'High-capacity passenger lift system',
    image: 'https://images.unsplash.com/photo-1763046472163-32c74523903e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZXxlbnwxfHx8fDE3NzMxNzIwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
  },
  {
    id: 'residential-towers-gurgaon',
    title: 'Residential Towers, Gurgaon',
    category: 'RESIDENTIAL',
    year: '2021',
    location: 'Gurgaon, HR',
    description: 'Multiple elevator installations for high-rise living',
    image: 'https://images.unsplash.com/photo-1770821030454-5e3ccb2d96dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGhvbWUlMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzMyMzM0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
  },
  {
    id: 'boutique-hotel-udaipur',
    title: 'Boutique Hotel, Udaipur',
    category: 'HOSPITALITY',
    year: '2021',
    location: 'Udaipur, RJ',
    description: 'Luxury elevator with traditional design elements',
    image: 'https://images.unsplash.com/photo-1758194090785-8e09b7288199?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGVsZXZhdG9yJTIwbG9iYnklMjBlbGVnYW50fGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
  },
  {
    id: 'medical-center-chennai',
    title: 'Medical Center, Chennai',
    category: 'COMMERCIAL',
    year: '2021',
    location: 'Chennai, TN',
    description: 'Hospital-grade lifts with stretcher capacity',
    image: 'https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwZWxldmF0b3IlMjBsb2JieXxlbnwxfHx8fDE3NzMzMDM0ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
  },
];

const categories = ['ALL', 'COMMERCIAL', 'RESIDENTIAL', 'HOSPITALITY'];

export function AllProjectsPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredProjects = selectedCategory === 'ALL' 
    ? allProjects 
    : allProjects.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-[#1a3332] min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 pt-32 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidWlsZGluZyUyMGVsZXZhdG9yJTIwbHV4dXJ5JTIwbG9iYnl8ZW58MXx8fHwxNzczMjM2NjI5fDA&ixlib=rb-4.1.0&q=80&w=1080"
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
            Our Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Explore our complete portfolio of luxury elevator installations across India.
            <br />
            From residential masterpieces to commercial landmarks.
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-[#2a4544] sticky top-20 z-30 border-b border-[#3a5554]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Filter size={20} className="text-orange-500" />
              <span className="text-white/80 text-sm uppercase tracking-wider">Filter by Category</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-[#1a3332] text-white/60 hover:text-white hover:bg-[#1a3332]/80 border border-[#3a5554]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Count */}
      <section className="py-6 bg-[#1a3332]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/60 text-sm">
            Showing <span className="text-orange-500 font-semibold">{filteredProjects.length}</span> {selectedCategory === 'ALL' ? 'total' : selectedCategory.toLowerCase()} projects
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24 bg-[#1a3332]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                onClick={() => navigate(`/project/${project.id}`)}
                className="relative group overflow-hidden rounded-3xl shadow-2xl cursor-pointer"
              >
                <div className="relative h-[400px]">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-[#1a3332]/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300"></div>
                  
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                        Featured
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-orange-500 text-xs uppercase tracking-widest">
                        {project.category}
                      </span>
                      <span className="text-white/40">•</span>
                      <span className="text-white/60 text-xs">{project.year}</span>
                    </div>
                    <h3 className="text-2xl text-white mb-2 font-['Playfair_Display'] group-hover:text-orange-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-1">{project.location}</p>
                    <p className="text-white/70 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center text-orange-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                      <span>View Project Details</span>
                      <ChevronRight size={16} className="ml-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#2a4544]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-5xl text-orange-500 mb-2 font-bold">200+</div>
              <div className="text-white/60 uppercase tracking-wider text-sm">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-5xl text-orange-500 mb-2 font-bold">15+</div>
              <div className="text-white/60 uppercase tracking-wider text-sm">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-5xl text-orange-500 mb-2 font-bold">98%</div>
              <div className="text-white/60 uppercase tracking-wider text-sm">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-5xl text-orange-500 mb-2 font-bold">6+</div>
              <div className="text-white/60 uppercase tracking-wider text-sm">Years Experience</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1a3332]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-['Great_Vibes'] text-4xl md:text-5xl text-white mb-4">
              Start Your Project
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Let's create something exceptional for your property
            </p>
            <button
              onClick={() => navigate('/bespoke-proposal')}
              className="bg-orange-500 text-white px-10 py-4 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 uppercase tracking-wider shadow-lg inline-flex items-center space-x-2"
            >
              <span>Request a Consultation</span>
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      <InquiryForm />
      <Footer />
    </div>
  );
}
