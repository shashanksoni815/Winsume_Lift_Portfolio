// import React, { useEffect, useRef, useState } from "react";
// import { ImageWithFallback } from "./figma/ImageWithFallback";
// import { motion } from "motion/react";
// import { useNavigate } from "react-router";
// import { apiUrl, assetUrl } from "../api";

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
//   const [showViewMore, setShowViewMore] = useState(false);

//   const scrollRef = useRef<HTMLDivElement | null>(null);

//   // =========================
//   // FETCH DATA (UNCHANGED CORE)
//   // =========================
//   useEffect(() => {
//     const load = async () => {
//       try {
//         const [configRes, productsRes] = await Promise.all([
//           fetch(apiUrl("/portal-config")),
//           fetch(apiUrl("/products/public")),
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
//           const rawImage =
//             p.heroImage || (Array.isArray(p.images) ? p.images[0] : "");
//           const image = assetUrl(rawImage);

//           return {
//             id: p._id,
//             slug: p.slug,
//             title: p.name || "Lift",
//             category: (p.category || "").toUpperCase(),
//             description: p.shortDescription,
//             image,
//           };
//         });

//         const selected: PortfolioItem[] = ids
//           .map((pid) => allItems.find((p) => p.id === pid))
//           .filter((p): p is PortfolioItem => Boolean(p));

//         setProjects(selected.slice(0, 6));
//       } catch {
//         // ignore
//       }
//     };

//     load();
//   }, []);

//   // =========================
//   // SCROLL LOGIC
//   // =========================
//   useEffect(() => {
//     const el = scrollRef.current;
//     if (!el) return;

//     const handleScroll = () => {
//       const scrollLeft = el.scrollLeft;
//       const maxScroll = el.scrollWidth - el.clientWidth;

//       // show after 60% scroll
//       if (scrollLeft > maxScroll * 0.6) {
//         setShowViewMore(true);
//       } else {
//         setShowViewMore(false);
//       }
//     };

//     el.addEventListener("scroll", handleScroll);
//     return () => el.removeEventListener("scroll", handleScroll);
//   }, []);

//   // =========================
//   // PREVENT VERTICAL SCROLL
//   // =========================
//   useEffect(() => {
//     const el = scrollRef.current;
//     if (!el) return;

//     const preventVerticalScroll = (e: WheelEvent) => {
//       // Only prevent default if scrolling vertically
//       if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
//         e.preventDefault();
//         // Convert vertical scroll to horizontal
//         el.scrollLeft += e.deltaY;
//       }
//     };

//     el.addEventListener("wheel", preventVerticalScroll, { passive: false });
//     return () => el.removeEventListener("wheel", preventVerticalScroll);
//   }, []);

//   return (
//     <section className="bg-[#2a4544] py-14 sm:py-18 lg:py-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* HEADER */}
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

//         {/* SCROLL CONTAINER - Fixed height to prevent vertical growth */}
//         <div className="relative -mx-1 px-1">
//           <div
//             ref={scrollRef}
//             className="flex items-center gap-3 sm:gap-4 overflow-x-auto overflow-y-hidden pb-2 snap-x snap-mandatory scrollbar-hide"
//             style={{ 
//               touchAction: 'pan-x',
//               overscrollBehaviorX: 'contain',
//               overscrollBehaviorY: 'none'
//             }}
//           >
//             {projects.map((project, index) => (
//               <motion.div
//                 key={project.id}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 onClick={() => navigate(`/product/${project.slug}`)}
//                 className="snap-start shrink-0 w-[165px] sm:w-[190px] md:w-[210px] lg:w-[240px] cursor-pointer group"
//               >
//                 <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-[3/4]">
//                   <ImageWithFallback
//                     src={project.image}
//                     alt={project.title}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                   />

//                   <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-[#1a3332]/40 to-transparent" />
//                   <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300" />

//                   <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 lg:bottom-6 lg:left-6 lg:right-6">
//                     <span className="text-orange-500 text-[10px] sm:text-xs tracking-widest uppercase mb-1 sm:mb-2 block">
//                       {project.category}
//                     </span>

//                     <h3 className="text-base sm:text-lg lg:text-xl text-white mb-1 sm:mb-2 group-hover:text-orange-400 transition-colors line-clamp-1 sm:line-clamp-2">
//                       {project.title}
//                     </h3>

//                     <p className="text-white/70 text-xs sm:text-sm line-clamp-2">
//                       {project.description}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}

//             {/* VIEW MORE (APPEARS AFTER SCROLL) */}
//             {showViewMore && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.85 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 onClick={() => navigate("/our-work")}
//                 className="snap-start shrink-0 w-[165px] sm:w-[190px] md:w-[210px] lg:w-[240px] cursor-pointer group"
//               >
//                 <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl aspect-[3/4] bg-gradient-to-br from-[#1e3b3a] to-[#162928] border-2 border-orange-500/50 group-hover:border-orange-500 transition-all duration-300 flex flex-col items-center justify-center p-6">
//                   {/* Background glow effect */}
//                   <div className="absolute inset-0 bg-orange-500/5 group-hover:bg-orange-500/10 transition-all duration-300"></div>
                  
//                   {/* Animated circle background */}
//                   <div className="relative mb-4 sm:mb-6 z-10">
//                     <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl group-hover:bg-orange-500/30 transition-all duration-300"></div>
//                     <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border-2 border-orange-500 flex items-center justify-center bg-[#1a3332] group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2.5"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
//                       >
//                         <path d="M5 12h14M12 5l7 7-7 7" />
//                       </svg>
//                     </div>
//                   </div>

//                   {/* Text content */}
//                   <div className="text-center z-10">
//                     <h3 className="text-base sm:text-lg lg:text-xl text-white font-['Playfair_Display'] mb-1 sm:mb-2 group-hover:text-orange-400 transition-colors">
//                       View More
//                     </h3>
//                     <p className="text-white/70 text-xs sm:text-sm">
//                       Explore Portfolio
//                     </p>
//                   </div>

//                   {/* Decorative corner accents */}
//                   <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-bl-full"></div>
//                   <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-tr-full"></div>
//                 </div>
//               </motion.div>
//             )}
//           </div>
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
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // =========================
  // FETCH DATA
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
  // SMART SCROLL HANDLING (ONLY WHEN HOVERING)
  // =========================
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isHovering = false;

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    const handleWheel = (e: WheelEvent) => {
      // Only convert vertical to horizontal when:
      // 1. Mouse is hovering over the container
      // 2. There's horizontal scroll available
      // 3. User is scrolling vertically
      if (!isHovering) return;

      const hasHorizontalScroll = el.scrollWidth > el.clientWidth;
      if (hasHorizontalScroll && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("wheel", handleWheel);
    };
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

        {/* SCROLL CONTAINER WITH RIGHT PADDING */}
        <div className="relative -mx-1 px-1">
          <div
            ref={scrollRef}
            className="flex items-center gap-3 sm:gap-4 overflow-x-auto overflow-y-hidden pb-2 pr-4 snap-x snap-mandatory scrollbar-hide"
            style={{
              touchAction: "pan-x",
              overscrollBehaviorX: "contain",
              overscrollBehaviorY: "none",
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/product/${project.slug}`)}
                className="snap-start shrink-0 w-[165px] sm:w-[190px] md:w-[210px] lg:w-[240px] cursor-pointer group"
              >
                <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-[3/4]">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-[#1a3332]/40 to-transparent" />
                  <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300" />

                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 lg:bottom-6 lg:left-6 lg:right-6">
                    <span className="text-orange-500 text-[10px] sm:text-xs tracking-widest uppercase mb-1 sm:mb-2 block">
                      {project.category}
                    </span>

                    <h3 className="text-base sm:text-lg lg:text-xl text-white mb-1 sm:mb-2 group-hover:text-orange-400 transition-colors line-clamp-1 sm:line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="text-white/70 text-xs sm:text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* VIEW MORE - ALWAYS RENDERED, NO LAYOUT SHIFT */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: projects.length * 0.1 }}
              onClick={() => navigate("/our-work")}
              className="snap-start shrink-0 w-[165px] sm:w-[190px] md:w-[210px] lg:w-[240px] cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl aspect-[3/4] bg-gradient-to-br from-[#1e3b3a] to-[#162928] border-2 border-orange-500/50 group-hover:border-orange-500 transition-all duration-300 flex flex-col items-center justify-center p-6">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-orange-500/5 group-hover:bg-orange-500/10 transition-all duration-300"></div>

                {/* Animated circle background */}
                <div className="relative mb-4 sm:mb-6 z-10">
                  <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl group-hover:bg-orange-500/30 transition-all duration-300"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border-2 border-orange-500 flex items-center justify-center bg-[#1a3332] group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Text content */}
                <div className="text-center z-10">
                  <h3 className="text-base sm:text-lg lg:text-xl text-white font-['Playfair_Display'] mb-1 sm:mb-2 group-hover:text-orange-400 transition-colors">
                    View More
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm">
                    Explore Portfolio
                  </p>
                </div>

                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-tr-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}