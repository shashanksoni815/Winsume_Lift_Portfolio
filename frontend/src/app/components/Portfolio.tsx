

// import React, { useEffect, useState } from 'react';
// import { ImageWithFallback } from './figma/ImageWithFallback';
// import { motion } from 'motion/react';
// import { useNavigate } from 'react-router';
// import { apiUrl, assetUrl } from '../api';

// interface PortfolioItem {
//   id: string;
//   slug: string;
//   title: string;
//   category: string;
//   description?: string;
//   image?: string;
// }

// export function Portfolio() {
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState<PortfolioItem[]>([]);
//   const scrollRef = React.useRef<HTMLDivElement | null>(null);
// const [showArrow, setShowArrow] = useState(false);

// useEffect(() => {
//   const el = scrollRef.current;
//   if (!el) return;

//   const handleScroll = () => {
//     const scrollLeft = el.scrollLeft;
//     const maxScroll = el.scrollWidth - el.clientWidth;

//     // show arrow only after 60% scroll
//     if (scrollLeft > maxScroll * 0.6) {
//       setShowArrow(true);
//     } else {
//       setShowArrow(false);
//     }
//   };

//   el.addEventListener("scroll", handleScroll);
//   return () => el.removeEventListener("scroll", handleScroll);
// }, []);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const [configRes, productsRes] = await Promise.all([
//           fetch(apiUrl('/portal-config')),
//           fetch(apiUrl('/products/public'))
//         ]);

//         if (!configRes.ok || !productsRes.ok) return;

//         const configData = await configRes.json().catch(() => null);
//         const productsData = await productsRes.json().catch(() => null);

//         const ids: string[] | undefined =
//           configData?.portalSettings?.homePortfolioProjectIds;
//         const products: any[] = Array.isArray(productsData?.items)
//           ? productsData.items
//           : [];

//         if (!ids || ids.length === 0) {
//           setProjects([]);
//           return;
//         }

//         const allItems: PortfolioItem[] = products.map((p: any) => {
//           const rawImage = p.heroImage || (Array.isArray(p.images) ? p.images[0] : '');
//           const image = assetUrl(rawImage);
//           const category = (p.category || '').toString().toUpperCase();

//           return {
//             id: p._id,
//             slug: p.slug,
//             title: p.name || 'Lift',
//             category,
//             description: p.shortDescription,
//             image
//           };
//         });

//         const selected: PortfolioItem[] = ids
//           .map((pid) => allItems.find((p) => p.id === pid))
//           .filter((p): p is PortfolioItem => Boolean(p));

//         setProjects(selected.slice(0, 6));
//       } catch {
//         // ignore errors; keep empty state
//       }
//     };

//     load();
//   }, []);

//   return (
//     <section id="portfolio" className="bg-[#2a4544] py-14 sm:py-18 lg:py-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-10 sm:mb-12 lg:mb-16"
//         >
//           <h2 className="font-['Great_Vibes'] text-4xl sm:text-5xl md:text-6xl text-white mb-4">
//             Our Portfolio
//           </h2>
//           <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
//           <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
//             Discover our exceptional collection of luxury elevator installations
//           </p>
//         </motion.div>

//         {/* Single line horizontal scroll - no wrapping */}
//         <div className="-mx-1 px-1 flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
//           {projects.map((project, index) => (
//             <motion.div
//               key={project.id}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               onClick={() => navigate(`/product/${project.slug}`)}
//               className="group cursor-pointer snap-start shrink-0 w-[165px] sm:w-[190px] md:w-[210px] lg:w-[240px]"
//             >
//               <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl aspect-[3/4] mb-3 lg:mb-4">
//                 <ImageWithFallback
//                   src={project.image}
//                   alt={project.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-[#1a3332]/40 to-transparent"></div>
//                 <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300"></div>
//                 <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 lg:bottom-6 lg:left-6 lg:right-6">
//                   <span className="text-orange-500 text-[10px] sm:text-xs tracking-widest uppercase mb-1 sm:mb-2 block">
//                     {project.category}
//                   </span>
//                   <h3 className="text-base sm:text-lg lg:text-xl text-white mb-1 sm:mb-2 group-hover:text-orange-400 transition-colors line-clamp-1 sm:line-clamp-2">
//                     {project.title}
//                   </h3>
//                   <p className="text-white/70 text-xs sm:text-sm line-clamp-2">{project.description}</p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}

//           {/* View More Portfolio Card */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: projects.length * 0.1 }}
//             onClick={() => navigate('/our-work')}
//             className="group cursor-pointer snap-start shrink-0 w-[165px] sm:w-[190px] md:w-[210px] lg:w-[240px]"
//           >
//             <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl aspect-[3/4] mb-3 lg:mb-4 bg-gradient-to-br from-[#1e3b3a] to-[#162928] border-2 border-orange-500/50 group-hover:border-orange-500 transition-all duration-300 flex flex-col items-center justify-center p-6">
//               {/* Background glow effect */}
//               <div className="absolute inset-0 bg-orange-500/5 group-hover:bg-orange-500/10 transition-all duration-300"></div>
              
//               {/* Animated circle background */}
//               <div className="relative mb-4 sm:mb-6 z-10">
//                 <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl group-hover:bg-orange-500/30 transition-all duration-300"></div>
//                 <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border-2 border-orange-500 flex items-center justify-center bg-[#1a3332] group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
//                   >
//                     <path d="M5 12h14M12 5l7 7-7 7" />
//                   </svg>
//                 </div>
//               </div>

//               {/* Text content */}
//               <div className="text-center z-10">
//                 <h3 className="text-base sm:text-lg lg:text-xl text-white font-['Playfair_Display'] mb-1 sm:mb-2 group-hover:text-orange-400 transition-colors">
//                   View More
//                 </h3>
//                 <p className="text-white/70 text-xs sm:text-sm">
//                   Explore Portfolio
//                 </p>
//               </div>

//               {/* Decorative corner accents */}
//               <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-bl-full"></div>
//               <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-tr-full"></div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { apiUrl, assetUrl } from "../api";

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
  const [showViewMore, setShowViewMore] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // =========================
  // FETCH DATA (UNCHANGED CORE)
  // =========================
  useEffect(() => {
    const load = async () => {
      try {
        const [configRes, productsRes] = await Promise.all([
          fetch(apiUrl("/portal-config")),
          fetch(apiUrl("/products/public")),
        ]);

        if (!configRes.ok || !productsRes.ok) return;

        const configData = await configRes.json().catch(() => null);
        const productsData = await productsRes.json().catch(() => null);

        const ids: string[] | undefined =
          configData?.portalSettings?.homePortfolioProjectIds;

        const products: any[] = Array.isArray(productsData?.items)
          ? productsData.items
          : [];

        if (!ids || ids.length === 0) {
          setProjects([]);
          return;
        }

        const allItems: PortfolioItem[] = products.map((p: any) => {
          const rawImage =
            p.heroImage || (Array.isArray(p.images) ? p.images[0] : "");
          const image = assetUrl(rawImage);

          return {
            id: p._id,
            slug: p.slug,
            title: p.name || "Lift",
            category: (p.category || "").toUpperCase(),
            description: p.shortDescription,
            image,
          };
        });

        const selected: PortfolioItem[] = ids
          .map((pid) => allItems.find((p) => p.id === pid))
          .filter((p): p is PortfolioItem => Boolean(p));

        setProjects(selected.slice(0, 6));
      } catch {
        // ignore
      }
    };

    load();
  }, []);

  // =========================
  // SCROLL LOGIC (NEW FIX)
  // =========================
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const maxScroll = el.scrollWidth - el.clientWidth;

      // show after 60% scroll
      if (scrollLeft > maxScroll * 0.6) {
        setShowViewMore(true);
      } else {
        setShowViewMore(false);
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-[#2a4544] py-14 sm:py-18 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
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

        {/* SCROLL CONTAINER */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/product/${project.slug}`)}
              className="snap-start shrink-0 w-[180px] sm:w-[200px] md:w-[220px] lg:w-[250px] cursor-pointer group"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-[#1a3332]/40 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-orange-500 text-xs uppercase tracking-widest">
                    {project.category}
                  </span>

                  <h3 className="text-white text-lg font-semibold mt-1 group-hover:text-orange-400">
                    {project.title}
                  </h3>

                  <p className="text-white/70 text-sm line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* VIEW MORE (APPEARS AFTER SCROLL) */}
          {showViewMore && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => navigate("/our-work")}
              className="snap-start shrink-0 w-[180px] sm:w-[200px] md:w-[220px] lg:w-[250px] cursor-pointer group"
            >
              <div className="h-full aspect-[3/4] flex flex-col items-center justify-center rounded-2xl border-2 border-orange-500/50 bg-gradient-to-br from-[#1e3b3a] to-[#162928]">
                <div className="w-20 h-20 rounded-full border-2 border-orange-500 flex items-center justify-center group-hover:bg-orange-500 transition">
                  <svg
                    className="w-8 h-8 text-orange-500 group-hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

                <h3 className="text-white mt-4 text-lg group-hover:text-orange-400">
                  View More
                </h3>

                <p className="text-white/60 text-sm">
                  Explore Portfolio
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}