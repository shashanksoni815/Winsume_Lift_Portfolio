import { ImageWithFallback } from './figma/ImageWithFallback';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

const collections = [
  {
    id: 'signature-series',
    name: 'Signature Series',
    tagline: 'The pinnacle of elevator design',
    price: 'From $150,000',
    features: [
      'Custom interior finishes',
      'Smart home integration',
      'Whisper-quiet operation',
      'Premium lighting design',
    ],
    image: 'https://images.unsplash.com/photo-1758448511533-e1502259fff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVudGlhbCUyMGVsZXZhdG9yJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczMzAzNDg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'panorama-collection',
    name: 'Panorama Collection',
    tagline: 'Elevate with a view',
    price: 'From $200,000',
    features: [
      'Full glass enclosure',
      'Architectural LED lighting',
      'Climate control system',
      'Premium safety features',
    ],
    image: 'https://images.unsplash.com/photo-1672753782907-d58990efbdc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGVsZXZhdG9yJTIwZXh0ZXJpb3IlMjBob3RlbHxlbnwxfHx8fDE3NzMzMDM0ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'executive-line',
    name: 'Executive Line',
    tagline: 'Commercial excellence',
    price: 'From $120,000',
    features: [
      'High-speed operation',
      'Heavy-duty capacity',
      'Advanced access control',
      'Minimal maintenance',
    ],
    image: 'https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwZWxldmF0b3IlMjBsb2JieXxlbnwxfHx8fDE3NzMzMDM0ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function Collection() {
  const navigate = useNavigate();

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
              onClick={() => navigate(`/collection-detail/${collection.id}`)}
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
                  <h3 className="text-2xl text-white mb-2 font-['Playfair_Display'] group-hover:text-orange-400 transition-colors">{collection.name}</h3>
                  <p className="text-white/60 italic mb-4">{collection.tagline}</p>
                  <div className="text-2xl text-orange-500 font-semibold">{collection.price}</div>
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
                    navigate(`/collection-detail/${collection.id}`);
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