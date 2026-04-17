// import { Navigation } from '../components/Navigation';
// import { apiUrl, assetUrl } from "../api";
// import { InquiryForm } from '../components/InquiryForm';
// import { Footer } from '../components/Footer';
// import { ImageWithFallback } from '../components/figma/ImageWithFallback';
// import { motion } from 'motion/react';
// import { ChevronRight } from 'lucide-react';
// import { useNavigate } from 'react-router';
// import { useEffect, useState } from 'react';
// import React from 'react';

// interface FeaturedItem {
//   id: string;
//   slug: string;
//   title: string;
//   category: string;
//   description?: string;
//   image?: string;
// }

// export function OurWork() {
//   const navigate = useNavigate();
//   const [items, setItems] = useState<FeaturedItem[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadError, setLoadError] = useState<string | null>(null);
//   const HERO_FALLBACK = 'https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGV2YXRvciUyMGNhYmluJTIwaW50ZXJpb3IlMjBnb2xkfGVufDF8fHx8MTc3MzIzNjYyOXww&ixlib=rb-4.1.0&q=80&w=1080';
// const heroImage =  HERO_FALLBACK; 

//   useEffect(() => {
//     const load = async () => {
//       try {
//         setIsLoading(true);
//         setLoadError(null);

//         const [configRes, productsRes] = await Promise.all([
//           fetch(apiUrl('/portal-config')),
//           fetch(apiUrl('/products/public'))
//         ]);

//         const configData = await configRes.json().catch(() => null);
//         const productData = await productsRes.json().catch(() => null);

//         const featuredIds: string[] =
//           configData?.portalSettings?.ourWorkFeaturedProductIds || [];
//         const products: any[] = Array.isArray(productData?.items)
//           ? productData.items
//           : [];

//         const selected = featuredIds
//           .map((pid) => products.find((p) => p._id === pid))
//           .filter(Boolean)
//           .slice(0, 3)
//           .map((p: any) => {
//             const rawImage = p.heroImage || (Array.isArray(p.images) ? p.images[0] : '');
//             const image =
//               typeof rawImage === 'string' && rawImage.startsWith('/uploads')
//                 ? assetUrl(rawImage)
//                 : rawImage;
//             const categoryLabel = (p.category || '').toString().toUpperCase();

//             return {
//               id: p._id,
//               slug: p.slug,
//               title: p.name || 'Lift',
//               category: categoryLabel,
//               description: p.shortDescription,
//               image
//             };
//           });

//         setItems(selected);
//       } catch {
//         setLoadError('Unable to load featured projects. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     load();
//   }, []);

//   return (
//     <div className="bg-[#1a3332] min-h-screen">
//       <Navigation />
      
//       {/* Hero Section */}
//       <section className="relative min-h-[65vh] md:min-h-[72vh] flex items-center py-20 md:py-32 pt-32 overflow-hidden">
//         <div className="absolute inset-0 -z-0">
//           <ImageWithFallback
//             src={heroImage}
//             alt="Modern Luxury Elevator Lobby"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/80 via-[#1a3332]/70 to-[#1a3332]"></div>
//         </div>

//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6"
//           >
//             Our Work
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-white/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
//           >
//             Setting the standard in vertical-interior mobility with bespoke architect-curated solutions.
//             <br />
//             Discover our prestigious installations across India's premier commercial and residential developments.
//           </motion.p>
//         </div>
//       </section>

//       {/* Projects Grid */}
//       <section className="py-16 md:py-24 bg-[#2a4544]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {loadError && (
//             <p className="text-red-400 text-sm mb-6 text-center">{loadError}</p>
//           )}
//           {isLoading && !items.length && (
//             <p className="text-white/70 text-sm mb-6 text-center">Loading featured projects...</p>
//           )}
//           <motion.div 
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className="font-['Great_Vibes'] text-5xl md:text-6xl text-white mb-4">
//               Featured Projects
//             </h2>
//             <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
//             <p className="text-xl text-white/70 max-w-2xl mx-auto">
//               Discover our exceptional collection of luxury elevator installations
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
//             {/* Large card - first featured item */}
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//                 onClick={() => items[0]?.id && navigate(`/product/${items[0].id}`)}
//               className="md:row-span-2 relative group overflow-hidden rounded-3xl shadow-2xl cursor-pointer"
//             >
//               <div className="relative h-[400px] md:h-full aspect-[3/4]">
//                 <ImageWithFallback
//                   src={items[0]?.image || 'https://images.unsplash.com/photo-1621293954908-907159247fc8?w=1200'}
//                   alt={items[0]?.title || 'Featured lift'}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-[#1a3332]/40 to-transparent"></div>
//                 <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300"></div>
//                 <div className="absolute bottom-6 left-6 right-6">
//                   <span className="text-orange-500 text-xs uppercase tracking-widest mb-2 block">
//                     {items[0]?.category || 'PROJECT'}
//                   </span>
//                   <h3 className="text-2xl md:text-3xl text-white mb-2 font-['Playfair_Display'] group-hover:text-orange-400 transition-colors">
//                     {items[0]?.title || 'Featured Project'}
//                   </h3>
//                   <p className="text-white/70 text-sm">
//                     {items[0]?.description || 'Premium bespoke elevator installation.'}
//                   </p>
//                   <div className="mt-4 flex items-center text-orange-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
//                     <span>View Details</span>
//                     <ChevronRight size={16} className="ml-1" />
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Small card - second item */}
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               onClick={() => items[1]?.id && navigate(`/product/${items[1].id}`)}
//               className="relative group overflow-hidden rounded-3xl shadow-2xl cursor-pointer"
//             >
//               <div className="relative h-[300px]">
//                 <ImageWithFallback
//                   src={items[1]?.image || items[0]?.image || 'https://images.unsplash.com/photo-1758194090785-8e09b7288199?w=1200'}
//                   alt={items[1]?.title || 'Featured lift'}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-[#1a3332]/40 to-transparent"></div>
//                 <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300"></div>
//                 <div className="absolute bottom-6 left-6 right-6">
//                   <span className="text-orange-500 text-xs uppercase tracking-widest mb-2 block">
//                     {items[1]?.category || 'PROJECT'}
//                   </span>
//                   <h3 className="text-xl text-white font-['Playfair_Display'] group-hover:text-orange-400 transition-colors">
//                     {items[1]?.title || 'Featured Project'}
//                   </h3>
//                   <div className="mt-3 flex items-center text-orange-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
//                     <span>View Details</span>
//                     <ChevronRight size={16} className="ml-1" />
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Small card - third item */}
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               onClick={() => items[2]?.id && navigate(`/product/${items[2].id}`)}
//               className="relative group overflow-hidden rounded-3xl shadow-2xl cursor-pointer"
//             >
//               <div className="relative h-[300px]">
//                 <ImageWithFallback
//                   src={items[2]?.image || items[0]?.image || 'https://images.unsplash.com/photo-1763046472163-32c74523903e?w=1200'}
//                   alt={items[2]?.title || 'Featured lift'}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-[#1a3332]/40 to-transparent"></div>
//                 <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300"></div>
//                 <div className="absolute bottom-6 left-6 right-6">
//                   <span className="text-orange-500 text-xs uppercase tracking-widest mb-2 block">
//                     {items[2]?.category || 'PROJECT'}
//                   </span>
//                   <h3 className="text-xl text-white font-['Playfair_Display'] group-hover:text-orange-400 transition-colors">
//                     {items[2]?.title || 'Featured Project'}
//                   </h3>
//                   <div className="mt-3 flex items-center text-orange-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
//                     <span>View Details</span>
//                     <ChevronRight size={16} className="ml-1" />
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="text-center mt-12"
//           >
//             <button 
//               onClick={() => navigate('/all-projects')}
//               className="bg-orange-500 text-white px-10 py-4 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 uppercase tracking-wider shadow-lg"
//             >
//               View All Projects
//             </button>
//           </motion.div>
//         </div>
//       </section>

//       {/* Inquiry Form Section */}
//       <InquiryForm />
      
//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

import { Navigation } from '../components/Navigation';
import { apiUrl, assetUrl } from "../api";
import { InquiryForm } from '../components/InquiryForm';
import { Footer } from '../components/Footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import React from 'react';

interface FeaturedItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  description?: string;
  image?: string;
}

export function OurWork() {
  const navigate = useNavigate();
  const [items, setItems] = useState<FeaturedItem[]>([]);
  const [heroImage, setHeroImage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);

        const [configRes, productsRes] = await Promise.all([
          fetch(apiUrl('/portal-config')),
          fetch(apiUrl('/products/public'))
        ]);

        const configData = await configRes.json().catch(() => null);
        const productData = await productsRes.json().catch(() => null);

        const products: any[] = Array.isArray(productData?.items)
          ? productData.items
          : [];

        // Hero: try portal config first, then first featured product's image
        const HERO_FALLBACK = 'https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGV2YXRvciUyMGNhYmluJTIwaW50ZXJpb3IlMjBnb2xkfGVufDF8fHx8MTc3MzIzNjYyOXww&ixlib=rb-4.1.0&q=80&w=1080';
        // const heroImage =  HERO_FALLBACK;
          const rawHero = configData?.portalSettings?.ourWorkHeroImage;

        const featuredIds: string[] =
          configData?.portalSettings?.ourWorkFeaturedProductIds || [];

        const selected = featuredIds
          .map((pid) => products.find((p) => p._id === pid))
          .filter(Boolean)
          .slice(0, 3)
          .map((p: any) => {
            const rawImage = p.heroImage || (Array.isArray(p.images) ? p.images[0] : '');
            const image =
              typeof rawImage === 'string' && rawImage.startsWith('/uploads')
                ? assetUrl(rawImage)
                : rawImage || undefined;
            return {
              id: p._id,
              slug: p.slug,
              title: p.name,
              category: (p.category || '').toString().toUpperCase(),
              description: p.shortDescription,
              image
            };
          });

        const resolvedHero = rawHero
  ? (rawHero.startsWith('/uploads') ? assetUrl(rawHero) : rawHero)
  : selected[0]?.image || HERO_FALLBACK;

setHeroImage(resolvedHero);
setItems(selected);

        // Resolve hero image: config → first product image → undefined
        // const resolvedHero = rawHero
        //   ? assetUrl(rawHero)
        //   : selected[0]?.image || undefined;

        // setHeroImage(resolvedHero);
        setItems(selected);
      } catch {
        setLoadError('Unable to load featured projects. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="bg-[#1a3332] min-h-screen">
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] md:min-h-[72vh] flex items-center pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Background */}
        {/* <div className="absolute inset-0">
          {heroImage ? (
            <>
              <ImageWithFallback
                src={heroImage}
                alt="Our Work"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/75 via-[#1a3332]/60 to-[#1a3332]" />
            </>
          ) : (
            /* Solid bg when no image is available 
            <div className="w-full h-full bg-[#1a3332]" />
          )}
        </div> */}
        <div className="absolute inset-0 -z-0">
            <ImageWithFallback
              src={ 'https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGV2YXRvciUyMGNhYmluJTIwaW50ZXJpb3IlMjBnb2xkfGVufDF8fHx8MTc3MzIzNjYyOXww&ixlib=rb-4.1.0&q=80&w=1080'}
              alt="Modern Luxury Elevator Lobby"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/80 via-[#1a3332]/70 to-[#1a3332]"></div>
          </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-orange-400 text-xs sm:text-sm uppercase tracking-[0.25em] mb-3"
          >
            Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-5 leading-tight"
          >
            Our Work
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-[2px] bg-orange-500 mx-auto mb-5"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-white/75 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2"
          >
            Setting the standard in vertical-interior mobility with bespoke
            architect-curated solutions. Discover our prestigious installations
            across India's premier developments.
          </motion.p>
        </div>
      </section>

      {/* ── Featured Projects ────────────────────────────────── */}
      <section className="py-14 sm:py-16 md:py-20 lg:py-24 bg-[#2a4544]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Error */}
          {loadError && (
            <p className="text-red-400 text-sm mb-8 text-center">{loadError}</p>
          )}

          {/* Loading skeleton */}
          {isLoading && items.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 animate-pulse">
              <div className="md:row-span-2 rounded-3xl bg-white/10 aspect-[3/4]" />
              <div className="rounded-3xl bg-white/10 h-[200px] sm:h-[260px] md:h-[300px]" />
              <div className="rounded-3xl bg-white/10 h-[200px] sm:h-[260px] md:h-[300px]" />
            </div>
          )}

          {/* Items */}
          {items.length > 0 && (
            <>
              {/* Section heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-10 sm:mb-12 lg:mb-16"
              >
                <h2 className="font-['Great_Vibes'] text-4xl sm:text-5xl md:text-6xl text-white mb-4">
                  Featured Projects
                </h2>
                <div className="w-20 h-[2px] bg-orange-500 mx-auto mb-5" />
                <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
                  Discover our exceptional collection of luxury elevator installations
                </p>
              </motion.div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">

                {/* ── Card 1 — large (spans 2 rows on md+) ── */}
                {items[0] && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    onClick={() => navigate(`/product/${items[0].slug}`)}
                    className="md:row-span-2 relative group overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl cursor-pointer"
                  >
                    {/* Fixed height on mobile, full height on md+ */}
                    <div className="relative w-full h-[280px] sm:h-[360px] md:h-full md:min-h-[620px]">
                      <ImageWithFallback
                        src={items[0].image}
                        alt={items[0].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-[#1a3332]/30 to-transparent" />
                      <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                        {items[0].category && (
                          <span className="text-orange-500 text-[10px] sm:text-xs uppercase tracking-widest mb-1 sm:mb-2 block">
                            {items[0].category}
                          </span>
                        )}
                        {items[0].title && (
                          <h3 className="text-xl sm:text-2xl md:text-3xl text-white mb-1 sm:mb-2 font-['Playfair_Display'] group-hover:text-orange-400 transition-colors leading-snug">
                            {items[0].title}
                          </h3>
                        )}
                        {items[0].description && (
                          <p className="text-white/70 text-xs sm:text-sm line-clamp-2">
                            {items[0].description}
                          </p>
                        )}
                        <div className="mt-3 sm:mt-4 flex items-center text-orange-500 text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                          <span>View Details</span>
                          <ChevronRight size={15} className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── Card 2 ── */}
                {items[1] && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    onClick={() => navigate(`/product/${items[1].slug}`)}
                    className="relative group overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl cursor-pointer"
                  >
                    <div className="relative w-full h-[220px] sm:h-[280px] md:h-[300px] lg:h-[310px]">
                      <ImageWithFallback
                        src={items[1].image}
                        alt={items[1].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-[#1a3332]/30 to-transparent" />
                      <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                        {items[1].category && (
                          <span className="text-orange-500 text-[10px] sm:text-xs uppercase tracking-widest mb-1 sm:mb-2 block">
                            {items[1].category}
                          </span>
                        )}
                        {items[1].title && (
                          <h3 className="text-lg sm:text-xl text-white font-['Playfair_Display'] group-hover:text-orange-400 transition-colors leading-snug">
                            {items[1].title}
                          </h3>
                        )}
                        {items[1].description && (
                          <p className="text-white/70 text-xs sm:text-sm mt-1 line-clamp-2">
                            {items[1].description}
                          </p>
                        )}
                        <div className="mt-2 sm:mt-3 flex items-center text-orange-500 text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                          <span>View Details</span>
                          <ChevronRight size={15} className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── Card 3 ── */}
                {items[2] && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    onClick={() => navigate(`/product/${items[2].slug}`)}
                    className="relative group overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl cursor-pointer"
                  >
                    <div className="relative w-full h-[220px] sm:h-[280px] md:h-[300px] lg:h-[310px]">
                      <ImageWithFallback
                        src={items[2].image}
                        alt={items[2].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-[#1a3332]/30 to-transparent" />
                      <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                        {items[2].category && (
                          <span className="text-orange-500 text-[10px] sm:text-xs uppercase tracking-widest mb-1 sm:mb-2 block">
                            {items[2].category}
                          </span>
                        )}
                        {items[2].title && (
                          <h3 className="text-lg sm:text-xl text-white font-['Playfair_Display'] group-hover:text-orange-400 transition-colors leading-snug">
                            {items[2].title}
                          </h3>
                        )}
                        {items[2].description && (
                          <p className="text-white/70 text-xs sm:text-sm mt-1 line-clamp-2">
                            {items[2].description}
                          </p>
                        )}
                        <div className="mt-2 sm:mt-3 flex items-center text-orange-500 text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                          <span>View Details</span>
                          <ChevronRight size={15} className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mt-10 sm:mt-12 lg:mt-14"
              >
                <button
                  onClick={() => navigate('/all-projects')}
                  className="bg-orange-500 text-white text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-4 rounded-full hover:bg-orange-600 hover:scale-105 active:scale-95 transition-all duration-300 uppercase tracking-wider shadow-lg"
                >
                  View All Projects
                </button>
              </motion.div>
            </>
          )}

          {/* Empty state */}
          {!isLoading && !loadError && items.length === 0 && (
            <p className="text-white/40 text-center py-20 text-sm">
              No featured projects available at the moment.
            </p>
          )}
        </div>
      </section>

      <InquiryForm />
      <Footer />
    </div>
  );
}