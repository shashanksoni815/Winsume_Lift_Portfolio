import { Navigation } from '../components/Navigation';
import { InquiryForm } from '../components/InquiryForm';
import { Footer } from '../components/Footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { ChevronRight, Filter } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

interface ProjectCardItem {
  id: string;
  slug?: string;
  title: string;
  category: string;
  description?: string;
  image?: string;
  featured?: boolean;
}

const categories = ['ALL', 'COMMERCIAL', 'RESIDENTIAL', 'HOSPITALITY'];

export function AllProjectsPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [items, setItems] = useState<ProjectCardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        // Reuse the same products that power the Collection page
        const res = await fetch('https://winsume-lift-backend01.onrender.com/api/products/public');
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          setLoadError(data?.message || 'Failed to load products.');
          return;
        }
        const data = await res.json().catch(() => null);
        const list = Array.isArray(data?.items) ? data.items : [];
        const mapped: ProjectCardItem[] = list.map((p: any) => {
          const rawImage = p.heroImage || (Array.isArray(p.images) ? p.images[0] : '');
          const image =
            typeof rawImage === 'string' && rawImage.startsWith('/uploads')
              ? `https://winsume-lift-backend01.onrender.com${rawImage}`
              : rawImage;

          const rawCategory = (p.category || '').toString().toLowerCase();
          let category: string;
          if (rawCategory === 'residential') category = 'RESIDENTIAL';
          else if (rawCategory === 'hotel' || rawCategory === 'hospitality') category = 'HOSPITALITY';
          else category = 'COMMERCIAL';

          return {
            id: p._id,
            slug: p.slug,
            title: p.name || 'Lift',
            category,
            description: p.shortDescription,
            image,
            featured: true,
          };
        });
        setItems(mapped);
      } catch {
        setLoadError('Unable to load products. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const filteredProjects =
    selectedCategory === 'ALL'
      ? items
      : items.filter((p) => p.category === selectedCategory);

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
          {loadError ? (
            <p className="text-red-400 text-sm">{loadError}</p>
          ) : (
                  <p className="text-white/60 text-sm">
              {isLoading
                ? 'Loading lifts...'
                : filteredProjects.length > 0
                ? <>
                    Showing{' '}
                    <span className="text-orange-500 font-semibold">
                      {filteredProjects.length}
                    </span>{' '}
                    {selectedCategory === 'ALL' ? 'total' : selectedCategory.toLowerCase()} products
                  </>
                : 'No products found yet.'}
            </p>
          )}
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
                onClick={() =>
                  project.slug ? navigate(`/product/${project.slug}`) : undefined
                }
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
                      {/* Year is optional for products; hide if not present */}
                      {project.description && (
                        <span className="text-white/60 text-xs">Featured</span>
                      )}
                    </div>
                    <h3 className="text-2xl text-white mb-2 font-['Playfair_Display'] group-hover:text-orange-400 transition-colors">
                      {project.title}
                    </h3>
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
