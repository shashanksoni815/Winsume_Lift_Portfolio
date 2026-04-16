import React, { useEffect, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { apiUrl, assetUrl } from '../api';

interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  description?: string;
  image?: string;
}

export function Portfolio() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [configRes, productsRes] = await Promise.all([
          fetch(apiUrl('/portal-config')),
          fetch(apiUrl('/products/public'))
        ]);

        if (!configRes.ok || !productsRes.ok) return;

        const configData = await configRes.json().catch(() => null);
        const productsData = await productsRes.json().catch(() => null);

        const ids: string[] | undefined =
          configData?.portalSettings?.homePortfolioProjectIds;
        const products: any[] = Array.isArray(productsData?.items)
          ? productsData.items
          : [];

        // If no selection is configured, show nothing in the portfolio
        if (!ids || ids.length === 0) {
          setProjects([]);
          return;
        }

        const allItems: PortfolioItem[] = products.map((p: any) => {
          const rawImage = p.heroImage || (Array.isArray(p.images) ? p.images[0] : '');
          const image = assetUrl(rawImage);
          const category = (p.category || '').toString().toUpperCase();

          return {
            id: p._id,
            slug: p.slug,
            title: p.name || 'Lift',
            category,
            description: p.shortDescription,
            image
          };
        });

        // Only show projects explicitly selected by the admin, in that order
        const selected: PortfolioItem[] = ids
          .map((pid) => allItems.find((p) => p.id === pid))
          .filter((p): p is PortfolioItem => Boolean(p));

        setProjects(selected.slice(0, 4));
      } catch {
        // ignore errors; keep empty state
      }
    };

    load();
  }, []);

  return (
    <section id="portfolio" className="bg-[#2a4544] py-14 sm:py-18 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="font-['Great_Vibes'] text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            Our Portfolio
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
            Discover our exceptional collection of luxury elevator installations
          </p>
        </motion.div>

        <div className="-mx-1 px-1 flex gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:mx-0">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => navigate(`/product/${project.slug}`)}
              className="group cursor-pointer snap-start shrink-0 w-[165px] sm:w-[190px] md:w-[210px] lg:w-auto"
            >
              <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl aspect-[3/4] mb-3 lg:mb-4">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-[#1a3332]/40 to-transparent"></div>
                <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300"></div>
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 lg:bottom-6 lg:left-6 lg:right-6">
                  <span className="text-orange-500 text-[10px] sm:text-xs tracking-widest uppercase mb-1 sm:mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-base sm:text-lg lg:text-xl text-white mb-1 sm:mb-2 group-hover:text-orange-400 transition-colors line-clamp-1 sm:line-clamp-2">{project.title}</h3>
                  <p className="text-white/70 text-xs sm:text-sm line-clamp-2">{project.description}</p>
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