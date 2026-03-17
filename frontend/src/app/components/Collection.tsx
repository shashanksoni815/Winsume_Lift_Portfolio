import { useEffect, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

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

  useEffect(() => {
    const load = async () => {
      try {
        const [configRes, productsRes] = await Promise.all([
          fetch('http://localhost:8000/api/portal-config'),
          fetch('http://localhost:8000/api/products/public')
        ]);

        if (!configRes.ok || !productsRes.ok) return;

        const configData = await configRes.json().catch(() => null);
        const productsData = await productsRes.json().catch(() => null);

        const ids: string[] | undefined = configData?.portalSettings?.homeCollectionsProductIds;
        const products: any[] = Array.isArray(productsData?.items) ? productsData.items : [];

        if (!ids || ids.length === 0) {
          setCollections([]);
          return;
        }

        const allItems: CollectionItem[] = products.map((p: any) => {
          const rawImage = p.heroImage || (Array.isArray(p.images) ? p.images[0] : '');
          const image =
            typeof rawImage === 'string' && rawImage.startsWith('/uploads')
              ? `http://localhost:8000${rawImage}`
              : rawImage;

          const priceNumber = typeof p.price === 'number' ? p.price : Number(p.price || 0);
          const priceLabel = priceNumber > 0 ? `From ₹${priceNumber.toLocaleString('en-IN')}` : undefined;

          const features: string[] = Array.isArray(p.features)
            ? p.features
            : typeof p.features === 'string'
            ? p.features
                .split(',')
                .map((f: string) => f.trim())
                .filter(Boolean)
            : [];

          return {
            id: p._id,
            slug: p.slug,
            name: p.name || 'Lift',
            tagline: p.shortDescription,
            priceLabel,
            features: features.slice(0, 4),
            image
          };
        });

        const selected: CollectionItem[] = ids
          .map((pid) => allItems.find((p) => p.id === pid))
          .filter((p): p is CollectionItem => Boolean(p));

        setCollections(selected.slice(0, 3));
      } catch {
        // keep empty state on error
      }
    };

    load();
  }, []);

  return (
    <section id="collection" className="bg-[#1a3332] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Great_Vibes'] text-5xl md:text-6xl text-white mb-4">
            Our Collections
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Each collection represents the finest in vertical transportation, designed to complement your unique space
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => navigate(`/product/${collection.slug}`)}
              className="bg-[#2a4544] border border-[#3a5554] rounded-2xl overflow-hidden group hover:border-orange-500/50 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-orange-500/20"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <ImageWithFallback
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a4544] via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300"></div>
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl text-white mb-2 font-['Playfair_Display'] group-hover:text-orange-400 transition-colors">
                    {collection.name}
                  </h3>
                  {collection.tagline && (
                    <p className="text-white/60 italic mb-4 line-clamp-2">{collection.tagline}</p>
                  )}
                  {collection.priceLabel && (
                    <div className="text-2xl text-orange-500 font-semibold">{collection.priceLabel}</div>
                  )}
                </div>
                <div className="space-y-3 mb-8">
                  {collection.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                        <Check size={14} className="text-orange-500" />
                      </div>
                      <span className="text-white/70">{feature}</span>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full bg-[#1a3332] hover:bg-orange-500 border border-[#3a5554] hover:border-orange-500 text-white py-3 rounded-full transition-all uppercase tracking-wider text-sm group-hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${collection.slug}`);
                  }}
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}