import { Navigation } from '../components/Navigation';
import { apiUrl, assetUrl } from "../api";
import { InquiryForm } from '../components/InquiryForm';
import { Footer } from '../components/Footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';
import React from 'react';

interface Product {
  id: string;
  slug: string;
  name: string;
  category?: string;
  price?: number;
  features?: string[];
  shortDescription?: string;
  heroImage?: string;
}

const filterCategories = [
  { id: 'all', label: 'All' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'goods', label: 'Goods' },
];

const priceRanges = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: '25to50', label: '₹25,000 - ₹50,000', min: 25000, max: 50000 },
  { id: '50to100', label: '₹50,000 - ₹1,00,000', min: 50000, max: 100000 },
  { id: '100to300', label: '₹1,00,000 - ₹3,00,000', min: 100000, max: 300000 },
  { id: '300to500', label: '₹3,00,000 - ₹5,00,000', min: 300000, max: 500000 },
  { id: '500to1000', label: '₹5,00,000 - ₹10,00,000', min: 500000, max: 1000000 },
  { id: '1000to2500', label: '₹10,00,000 - ₹25,00,000', min: 1000000, max: 2500000 },
  { id: '2500to5000', label: '₹25,00,000 - ₹50,00,000', min: 2500000, max: 5000000 },
  { id: 'above5000', label: '₹50,00,000+', min: 5000000, max: Infinity },
];

export function CollectionPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activePriceRange, setActivePriceRange] = useState('all');
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPriceDropdownOpen(false);
      }
    };

    if (isPriceDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPriceDropdownOpen]);

  // Helper function to parse price string to number
  const parsePrice = (price?: number): number => {
    return typeof price === 'number' ? price : 0;
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        const res = await fetch(apiUrl('/products/public'));
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          setLoadError(data?.message || 'Failed to load products.');
          return;
        }
        const data = await res.json().catch(() => null);
        const items = Array.isArray(data?.items) ? data.items : [];
        const mapped: Product[] = items.map((p: any) => {
          const rawHero =
            p.heroImage || (Array.isArray(p.images) ? p.images[0] : undefined);
          const heroImage =
            typeof rawHero === 'string' && rawHero.startsWith('/uploads')
              ? assetUrl(rawHero)
              : rawHero;

          return {
            id: p._id,
            slug: p.slug,
            name: p.name,
            category: p.category,
            price: typeof p.price === 'number' ? p.price : undefined,
            features: Array.isArray(p.features) ? p.features : [],
            shortDescription: p.shortDescription,
            heroImage,
          };
        });
        setProducts(mapped);
      } catch {
        setLoadError('Unable to load products. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    // Filter by category
    const categoryMatch =
      activeFilter === 'all'
        ? true
        : (product.category || '').toLowerCase().includes(activeFilter.toLowerCase());
    
    // Filter by price range
    const productPrice = parsePrice(product.price);
    const selectedRange = priceRanges.find(range => range.id === activePriceRange);
    const priceMatch = selectedRange 
      ? productPrice >= selectedRange.min && productPrice < selectedRange.max
      : true;
    
    return categoryMatch && priceMatch;
  });

  return (
    <div className="bg-[#1a3332] min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 pt-32 overflow-visible">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGV2YXRvciUyMGNhYmluJTIwaW50ZXJpb3IlMjBnb2xkfGVufDF8fHx8MTc3MzIzNjYyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury Elevator Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/85 via-[#1a3332]/75 to-[#1a3332]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-orange-500 text-sm uppercase tracking-widest mb-4"
          >
            MINI COLLECTION
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-8"
          >
            Elevators & Lifts
          </motion.h1>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-4 max-w-4xl mx-auto"
          >
            {filterCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 sm:px-6 py-2 text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 rounded-full ${
                  activeFilter === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Price Range Dropdown - Separate Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center mt-4"
          >
            <div className="relative inline-block" ref={dropdownRef}>
              <button
                onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
                className={`px-4 sm:px-6 py-2 text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 rounded-full flex items-center gap-2 ${
                  activePriceRange === 'all'
                    ? 'bg-[#b8914d] text-white hover:bg-[#a67f3c]'
                    : activePriceRange !== 'all'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {priceRanges.find(range => range.id === activePriceRange)?.label || 'Prices'}
                <ChevronDown className={`w-4 h-4 transition-transform ${isPriceDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isPriceDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-[#2a4544] border-2 border-orange-500/30 rounded-lg shadow-2xl z-[9999] max-h-[450px] overflow-y-auto">
                  {priceRanges.map((range, index) => (
                    <button
                      key={range.id}
                      onClick={() => {
                        setActivePriceRange(range.id);
                        setIsPriceDropdownOpen(false);
                      }}
                      className={`block px-5 py-3.5 text-sm w-full text-left transition-all border-b border-white/5 last:border-b-0 ${
                        index === 0
                          ? activePriceRange === range.id
                            ? 'bg-orange-500 text-white font-medium'
                            : 'bg-[#b8914d] text-white hover:bg-[#a67f3c] font-medium'
                          : activePriceRange === range.id 
                          ? 'bg-orange-500 text-white font-medium' 
                          : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-24 bg-[#2a4544]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loadError && (
            <p className="text-red-400 mb-6 text-center text-sm">{loadError}</p>
          )}
          {isLoading && (
            <p className="text-white/60 mb-6 text-center text-sm">Loading lifts...</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#1a3332] border border-[#3a5554] rounded-2xl overflow-hidden group hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/product/${product.slug}`)}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <ImageWithFallback
                    src={product.heroImage || 'https://images.unsplash.com/photo-1772721559246-286e6d986d73?auto=format&fit=crop&w=1200&q=80'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                      {product.category || 'GENERAL'}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl text-white mb-2 font-['Playfair_Display']">{product.name}</h3>
                    <p className="text-white/60 mb-4">{product.shortDescription}</p>
                    <div className="text-2xl text-orange-500 font-semibold">
                      {product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Price on request'}
                    </div>
                  </div>
                  <div className="space-y-2 mb-8">
                    {(product.features || []).slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        </div>
                        <span className="text-white/70 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full bg-[#2a4544] hover:bg-orange-500/10 border border-[#3a5554] hover:border-orange-500/50 text-white py-3 rounded-full transition-all uppercase tracking-wider text-sm">
                    Learn More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <InquiryForm />

      {/* Footer */}
      <Footer />
    </div>
  );
}