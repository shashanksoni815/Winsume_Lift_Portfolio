

// // import React, { useEffect, useState } from 'react';
// // import { ImageWithFallback } from './figma/ImageWithFallback';
// // import { Check, ArrowRight } from 'lucide-react';
// // import { motion } from 'motion/react';
// // import { useNavigate } from 'react-router';
// // import { apiUrl, assetUrl } from '../api';

// // interface CollectionItem {
// //   id: string;
// //   slug: string;
// //   name: string;
// //   tagline?: string;
// //   priceLabel?: string;
// //   features: string[];
// //   image?: string;
// // }

// // export function Collection() {
// //   const navigate = useNavigate();
// //   const [collections, setCollections] = useState<CollectionItem[]>([]);

// //   useEffect(() => {
// //     const load = async () => {
// //       try {
// //         const [configRes, productsRes] = await Promise.all([
// //           fetch(apiUrl('/api/portal-config')),
// //           fetch(apiUrl('/api/products/public'))
// //         ]);

// //         if (!configRes.ok || !productsRes.ok) return;

// //         const configData = await configRes.json().catch(() => null);
// //         const productsData = await productsRes.json().catch(() => null);

// //         const ids: string[] | undefined = configData?.portalSettings?.homeCollectionsProductIds;
// //         const products: any[] = Array.isArray(productsData?.items) ? productsData.items : [];

// //         if (!ids || ids.length === 0) {
// //           setCollections([]);
// //           return;
// //         }

// //         const allItems: CollectionItem[] = products.map((p: any) => {
// //           const rawImage = p.heroImage || (Array.isArray(p.images) ? p.images[0] : '');
// //           const image = assetUrl(rawImage);

// //           const priceNumber = typeof p.price === 'number' ? p.price : Number(p.price || 0);
// //           const priceLabel = priceNumber > 0 ? `From ₹${priceNumber.toLocaleString('en-IN')}` : undefined;

// //           const features: string[] = Array.isArray(p.features)
// //             ? p.features
// //             : typeof p.features === 'string'
// //             ? p.features
// //                 .split(',')
// //                 .map((f: string) => f.trim())
// //                 .filter(Boolean)
// //             : [];

// //           return {
// //             id: p._id,
// //             slug: p.slug,
// //             name: p.name || 'Lift',
// //             tagline: p.shortDescription,
// //             priceLabel,
// //             features: features.slice(0, 4),
// //             image
// //           };
// //         });

// //         const selected: CollectionItem[] = ids
// //           .map((pid) => allItems.find((p) => p.id === pid))
// //           .filter((p): p is CollectionItem => Boolean(p));

// //         setCollections(selected.slice(0, 6));
// //       } catch {
// //         // keep empty state on error
// //       }
// //     };

// //     load();
// //   }, []);

// //   return (
// //     <section id="collection" className="bg-[#1a3332] py-14 sm:py-18 lg:py-24">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <motion.div 
// //           initial={{ opacity: 0, y: 30 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //           transition={{ duration: 0.8 }}
// //           className="text-center mb-10 sm:mb-12 lg:mb-16"
// //         >
// //           <h2 className="font-['Great_Vibes'] text-4xl sm:text-5xl md:text-6xl text-white mb-4">
// //             Our Collections
// //           </h2>
// //           <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
// //           <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
// //             Each collection represents the finest in vertical transportation, designed to complement your unique space
// //           </p>
// //         </motion.div>

// //         <div className="-mx-1 px-1 flex gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0 lg:mx-0">
// //           {collections.map((collection, index) => (
// //             <motion.div
// //               key={collection.id}
// //               initial={{ opacity: 0, y: 50 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: index * 0.15 }}
// //               onClick={() => navigate(`/product/${collection.slug}`)}
// //               className="bg-[#2a4544] border border-[#3a5554] rounded-2xl overflow-hidden group hover:border-orange-500/50 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-orange-500/20 snap-start shrink-0 w-[220px] sm:w-[250px] md:w-[280px] lg:w-auto"
// //             >
// //               <div className="relative overflow-hidden aspect-[4/3]">
// //                 <ImageWithFallback
// //                   src={collection.image}
// //                   alt={collection.name}
// //                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
// //                 />
// //                 <div className="absolute inset-0 bg-gradient-to-t from-[#2a4544] via-transparent to-transparent"></div>
// //                 <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300"></div>
// //               </div>
// //               <div className="p-4 sm:p-5 lg:p-8">
// //                 <div className="mb-4 sm:mb-5 lg:mb-6">
// //                   <h3 className="text-lg sm:text-xl lg:text-2xl text-white mb-2 font-['Playfair_Display'] group-hover:text-orange-400 transition-colors line-clamp-1 sm:line-clamp-2">
// //                     {collection.name}
// //                   </h3>
// //                   {collection.tagline && (
// //                     <p className="text-white/60 italic mb-3 lg:mb-4 text-sm lg:text-base line-clamp-2">{collection.tagline}</p>
// //                   )}
// //                   {collection.priceLabel && (
// //                     <div className="text-lg sm:text-xl lg:text-2xl text-orange-500 font-semibold">{collection.priceLabel}</div>
// //                   )}
// //                 </div>
// //                 <div className="space-y-2 lg:space-y-3 mb-5 sm:mb-6 lg:mb-8">
// //                   {collection.features.map((feature, idx) => (
// //                     <div key={idx} className="flex items-start">
// //                       <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5 mr-2 lg:mr-3 flex-shrink-0">
// //                         <Check size={12} className="text-orange-500 lg:w-[14px] lg:h-[14px]" />
// //                       </div>
// //                       <span className="text-white/70 text-xs sm:text-sm lg:text-base line-clamp-1">{feature}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //                 <button
// //                   className="w-full bg-[#1a3332] hover:bg-orange-500 border border-[#3a5554] hover:border-orange-500 text-white py-2.5 lg:py-3 rounded-full transition-all uppercase tracking-wider text-xs sm:text-sm group-hover:scale-105"
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     navigate(`/product/${collection.slug}`);
// //                   }}
// //                 >
// //                   View Details
// //                 </button>
// //               </div>
// //             </motion.div>
// //           ))}

// //           {/* View More Collections Card - Mobile/Tablet Only */}
// //           <motion.div
// //             initial={{ opacity: 0, x: 20 }}
// //             whileInView={{ opacity: 1, x: 0 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.6, delay: collections.length * 0.15 }}
// //             onClick={() => navigate('/collection')}
// //             className="lg:hidden bg-gradient-to-br from-[#2a4544] to-[#1e3b3a] border-2 border-orange-500/50 rounded-2xl overflow-hidden group hover:border-orange-500 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-orange-500/30 snap-start shrink-0 w-[220px] sm:w-[250px] md:w-[280px] flex flex-col items-center justify-center p-6 sm:p-8"
// //           >
// //             {/* Animated circle background */}
// //             <div className="relative mb-6">
// //               <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl group-hover:bg-orange-500/30 transition-all duration-300"></div>
// //               <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-orange-500 flex items-center justify-center bg-[#1a3332] group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
// //                 <ArrowRight className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
// //               </div>
// //             </div>

// //             {/* Text content */}
// //             <div className="text-center">
// //               <h3 className="text-xl sm:text-2xl text-white font-['Playfair_Display'] mb-2 group-hover:text-orange-400 transition-colors">
// //                 View More
// //               </h3>
// //               <p className="text-white/70 text-sm sm:text-base">
// //                 Explore All Collections
// //               </p>
// //             </div>

// //             {/* Decorative corner accent */}
// //             <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-bl-full"></div>
// //             <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-tr-full"></div>
// //           </motion.div>
// //         </div>

// //         {/* Desktop View More Button */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //           transition={{ duration: 0.6, delay: 0.3 }}
// //           className="hidden lg:flex justify-center mt-12"
// //         >
// //           <button
// //             onClick={() => navigate('/collection')}
// //             className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
// //           >
// //             <span>View All Collections</span>
// //             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
// //           </button>
// //         </motion.div>
// //       </div>
// //     </section>
// //   );
// // }

// import React, { useEffect, useState } from 'react';
// import { ImageWithFallback } from './figma/ImageWithFallback';
// import { Check } from 'lucide-react';
// import { motion } from 'motion/react';
// import { useNavigate } from 'react-router';
// import { apiUrl, assetUrl } from '../api';

// interface CollectionItem {
//   id: string;
//   slug: string;
//   name: string;
//   tagline?: string;
//   priceLabel?: string;
//   features: string[];
//   image?: string;
// }

// export function Collection() {
//   const navigate = useNavigate();
//   const [collections, setCollections] = useState<CollectionItem[]>([]);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const [configRes, productsRes] = await Promise.all([
//           fetch(apiUrl('/api/portal-config')),
//           fetch(apiUrl('/api/products/public'))
//         ]);

//         if (!configRes.ok || !productsRes.ok) return;

//         const configData = await configRes.json().catch(() => null);
//         const productsData = await productsRes.json().catch(() => null);

//         const ids: string[] | undefined = configData?.portalSettings?.homeCollectionsProductIds;
//         const products: any[] = Array.isArray(productsData?.items) ? productsData.items : [];

//         if (!ids || ids.length === 0) {
//           setCollections([]);
//           return;
//         }

//         const allItems: CollectionItem[] = products.map((p: any) => {
//           const rawImage = p.heroImage || (Array.isArray(p.images) ? p.images[0] : '');
//           const image = assetUrl(rawImage);

//           const priceNumber = typeof p.price === 'number' ? p.price : Number(p.price || 0);
//           const priceLabel = priceNumber > 0 ? `From ₹${priceNumber.toLocaleString('en-IN')}` : undefined;

//           const features: string[] = Array.isArray(p.features)
//             ? p.features
//             : typeof p.features === 'string'
//             ? p.features
//                 .split(',')
//                 .map((f: string) => f.trim())
//                 .filter(Boolean)
//             : [];

//           return {
//             id: p._id,
//             slug: p.slug,
//             name: p.name || 'Lift',
//             tagline: p.shortDescription,
//             priceLabel,
//             features: features.slice(0, 4),
//             image
//           };
//         });

//         const selected: CollectionItem[] = ids
//           .map((pid) => allItems.find((p) => p.id === pid))
//           .filter((p): p is CollectionItem => Boolean(p));

//         setCollections(selected.slice(0, 6));
//       } catch {
//         // keep empty state on error
//       }
//     };

//     load();
//   }, []);

//   return (
//     <section id="collection" className="bg-[#1a3332] py-14 sm:py-18 lg:py-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-10 sm:mb-12 lg:mb-16"
//         >
//           <h2 className="font-['Great_Vibes'] text-4xl sm:text-5xl md:text-6xl text-white mb-4">
//             Our Collections
//           </h2>
//           <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
//           <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
//             Each collection represents the finest in vertical transportation, designed to complement your unique space
//           </p>
//         </motion.div>

//         {/* Single line horizontal scroll - no wrapping */}
//         <div className="-mx-1 px-1 flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
//           {collections.map((collection, index) => (
//             <motion.div
//               key={collection.id}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: index * 0.15 }}
//               onClick={() => navigate(`/product/${collection.slug}`)}
//               className="bg-[#2a4544] border border-[#3a5554] rounded-2xl overflow-hidden group hover:border-orange-500/50 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-orange-500/20 snap-start shrink-0 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px]"
//             >
//               <div className="relative overflow-hidden aspect-[4/3]">
//                 <ImageWithFallback
//                   src={collection.image}
//                   alt={collection.name}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#2a4544] via-transparent to-transparent"></div>
//                 <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300"></div>
//               </div>
//               <div className="p-3 sm:p-4 lg:p-5">
//                 <div className="mb-3 sm:mb-4">
//                   <h3 className="text-base sm:text-lg lg:text-xl text-white mb-1 sm:mb-2 font-['Playfair_Display'] group-hover:text-orange-400 transition-colors line-clamp-1">
//                     {collection.name}
//                   </h3>
//                   {collection.tagline && (
//                     <p className="text-white/60 italic mb-2 sm:mb-3 text-xs sm:text-sm line-clamp-2">{collection.tagline}</p>
//                   )}
//                   {collection.priceLabel && (
//                     <div className="text-base sm:text-lg lg:text-xl text-orange-500 font-semibold">{collection.priceLabel}</div>
//                   )}
//                 </div>
//                 <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
//                   {collection.features.slice(0, 3).map((feature, idx) => (
//                     <div key={idx} className="flex items-start">
//                       <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
//                         <Check size={10} className="text-orange-500 sm:w-[12px] sm:h-[12px]" />
//                       </div>
//                       <span className="text-white/70 text-[10px] sm:text-xs lg:text-sm line-clamp-1">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//                 <button
//                   className="w-full bg-[#1a3332] hover:bg-orange-500 border border-[#3a5554] hover:border-orange-500 text-white py-2 sm:py-2.5 rounded-full transition-all uppercase tracking-wider text-[10px] sm:text-xs group-hover:scale-105"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     navigate(`/product/${collection.slug}`);
//                   }}
//                 >
//                   View Details
//                 </button>
//               </div>
//             </motion.div>
//           ))}

//           {/* View More Collections Card */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: collections.length * 0.15 }}
//             onClick={() => navigate('/collection')}
//             className="group cursor-pointer snap-start shrink-0 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px]"
//           >
//             <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-gradient-to-br from-[#1e3b3a] to-[#162928] border-2 border-orange-500/50 group-hover:border-orange-500 transition-all duration-300 flex flex-col items-center justify-center p-4 sm:p-6">
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
//                   Explore Collections
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
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { apiUrl, assetUrl } from "../api";

interface CollectionItem {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  priceLabel?: string;
  features: string[];
  image?: string;
}

export function Collection() {
  const navigate = useNavigate();

  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [showViewMore, setShowViewMore] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ================= FETCH =================
  useEffect(() => {
    const load = async () => {
      try {
        const [configRes, productsRes] = await Promise.all([
          fetch(apiUrl("/api/portal-config")),
          fetch(apiUrl("/api/products/public")),
        ]);

        if (!configRes.ok || !productsRes.ok) return;

        const configData = await configRes.json().catch(() => null);
        const productsData = await productsRes.json().catch(() => null);

        const ids: string[] | undefined =
          configData?.portalSettings?.homeCollectionsProductIds;

        const products: any[] = Array.isArray(productsData?.items)
          ? productsData.items
          : [];

        if (!ids || ids.length === 0) {
          setCollections([]);
          return;
        }

        const allItems: CollectionItem[] = products.map((p: any) => {
          const rawImage =
            p.heroImage || (Array.isArray(p.images) ? p.images[0] : "");
          const image = assetUrl(rawImage);

          const priceNumber =
            typeof p.price === "number" ? p.price : Number(p.price || 0);

          const priceLabel =
            priceNumber > 0
              ? `From ₹${priceNumber.toLocaleString("en-IN")}`
              : undefined;

          const features: string[] = Array.isArray(p.features)
            ? p.features
            : typeof p.features === "string"
            ? p.features.split(",").map((f: string) => f.trim()).filter(Boolean)
            : [];

          return {
            id: p._id,
            slug: p.slug,
            name: p.name || "Lift",
            tagline: p.shortDescription,
            priceLabel,
            features: features.slice(0, 4),
            image,
          };
        });

        const selected: CollectionItem[] = ids
          .map((pid) => allItems.find((p) => p.id === pid))
          .filter((p): p is CollectionItem => Boolean(p));

        setCollections(selected.slice(0, 6));
      } catch {}
    };

    load();
  }, []);

  // ================= SCROLL FIX =================
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const maxScroll = el.scrollWidth - el.clientWidth;

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
    <section className="bg-[#1a3332] py-14 sm:py-18 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="font-['Great_Vibes'] text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            Our Collections
          </h2>

          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>

          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            Each collection represents the finest in vertical transportation
          </p>
        </motion.div>

        {/* SCROLL ROW */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/product/${collection.slug}`)}
              className="snap-start shrink-0 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] cursor-pointer group bg-[#2a4544] border border-[#3a5554] rounded-2xl overflow-hidden hover:border-orange-500/50 transition"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              <div className="p-4">
                <h3 className="text-white text-lg mb-1 group-hover:text-orange-400">
                  {collection.name}
                </h3>

                {collection.tagline && (
                  <p className="text-white/60 text-sm mb-2 line-clamp-2">
                    {collection.tagline}
                  </p>
                )}

                {collection.priceLabel && (
                  <div className="text-orange-500 font-semibold mb-2">
                    {collection.priceLabel}
                  </div>
                )}

                <div className="space-y-1 mb-3">
                  {collection.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-white/70">
                      <Check size={12} className="text-orange-500" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* VIEW MORE (AFTER SCROLL) */}
          {showViewMore && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => navigate("/collection")}
              className="snap-start shrink-0 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] flex items-center justify-center cursor-pointer border-2 border-orange-500 rounded-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 border-2 border-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  →
                </div>
                <h3 className="text-white">View More</h3>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}