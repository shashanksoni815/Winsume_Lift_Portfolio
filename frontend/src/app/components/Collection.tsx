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
            features: features.slice(0, 3),
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

  // ================= SCROLL LOGIC =================
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

  // ================= PREVENT VERTICAL SCROLL =================
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const preventVerticalScroll = (e: WheelEvent) => {
      // Only prevent default if scrolling vertically
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        // Convert vertical scroll to horizontal
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", preventVerticalScroll, { passive: false });
    return () => el.removeEventListener("wheel", preventVerticalScroll);
  }, []);

  return (
    <section className="bg-[#1a3332] py-14 sm:py-18 lg:py-24">
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
            Our Collections
          </h2>

          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>

          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            Each collection represents the finest in vertical transportation
          </p>
        </motion.div>

        {/* SCROLL CONTAINER - All cards same size */}
        <div className="relative -mx-1 px-1">
          <div
            ref={scrollRef}
            className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto overflow-y-hidden pb-2 snap-x snap-mandatory scrollbar-hide"
            style={{ 
              touchAction: 'pan-x',
              overscrollBehaviorX: 'contain',
              overscrollBehaviorY: 'none'
            }}
          >
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/product/${collection.slug}`)}
                className="snap-start shrink-0 w-[240px] sm:w-[260px] md:w-[280px] lg:w-[300px] cursor-pointer group"
              >
                <div className="h-full bg-[#2a4544] border border-[#3a5554] rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 flex flex-col">
                  {/* Image - Fixed aspect ratio */}
                  <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2a4544] via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300"></div>
                  </div>

                  {/* Content - Fixed height */}
                  <div className="p-4 sm:p-5 flex flex-col flex-grow">
                    {/* Title and Price Section - Fixed height */}
                    <div className="mb-4 min-h-[100px] sm:min-h-[110px]">
                      <h3 className="text-base sm:text-lg lg:text-xl text-white mb-2 font-['Playfair_Display'] group-hover:text-orange-400 transition-colors line-clamp-2 min-h-[3rem]">
                        {collection.name}
                      </h3>
                      {collection.tagline && (
                        <p className="text-white/60 italic mb-2 text-xs sm:text-sm line-clamp-2">
                          {collection.tagline}
                        </p>
                      )}
                      {collection.priceLabel && (
                        <div className="text-lg sm:text-xl lg:text-2xl text-orange-500 font-semibold">
                          {collection.priceLabel}
                        </div>
                      )}
                    </div>

                    {/* Features Section - Fixed height */}
                    <div className="space-y-2 mb-4 min-h-[80px]">
                      {collection.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                            <Check size={12} className="text-orange-500" />
                          </div>
                          <span className="text-white/70 text-xs sm:text-sm line-clamp-1">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Button - Always at bottom */}
                    <button
                      className="w-full bg-[#1a3332] hover:bg-orange-500 border border-[#3a5554] hover:border-orange-500 text-white py-2.5 sm:py-3 rounded-full transition-all uppercase tracking-wider text-xs sm:text-sm group-hover:scale-105 mt-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${collection.slug}`);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* VIEW MORE (APPEARS AFTER SCROLL) - Same size as collection cards */}
            {showViewMore && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => navigate("/collection")}
                className="snap-start shrink-0 w-[240px] sm:w-[260px] md:w-[280px] lg:w-[300px] cursor-pointer group"
              >
                <div className="h-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e3b3a] to-[#162928] border-2 border-orange-500/50 group-hover:border-orange-500 transition-all duration-300 flex flex-col items-center justify-center p-6">
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-orange-500/5 group-hover:bg-orange-500/10 transition-all duration-300"></div>
                  
                  {/* Animated circle background */}
                  <div className="relative mb-6 z-10">
                    <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl group-hover:bg-orange-500/30 transition-all duration-300"></div>
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-orange-500 flex items-center justify-center bg-[#1a3332] group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="text-center z-10">
                    <h3 className="text-xl sm:text-2xl text-white font-['Playfair_Display'] mb-2 group-hover:text-orange-400 transition-colors">
                      View More
                    </h3>
                    <p className="text-white/70 text-sm sm:text-base">
                      Explore All Collections
                    </p>
                  </div>

                  {/* Decorative corner accents */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-tr-full"></div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}