import { useParams, useNavigate } from 'react-router';
import React from 'react';
import { Navigation } from '../components/Navigation';
import { InquiryForm } from '../components/InquiryForm';
import { Footer } from '../components/Footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Shield, Zap, Award, Cpu, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const collectionsData = [
  {
    id: 'signature-series',
    name: 'Signature Series',
    tagline: 'The pinnacle of elevator design',
    price: 'From ₹1,20,00,000',
    priceUSD: 'From $150,000',
    category: 'LUXURY RESIDENTIAL',
    description: 'The Signature Series represents the ultimate in residential elevator luxury. Each unit is a masterpiece of engineering and design, custom-crafted to seamlessly integrate with the finest homes. With unparalleled attention to detail and premium materials, this collection sets the standard for vertical mobility excellence.',
    fullDescription: 'Experience the epitome of luxury vertical transportation with our Signature Series. Every element is meticulously designed and crafted to provide an exceptional experience. From hand-selected materials to cutting-edge technology, the Signature Series transforms a functional necessity into a statement of refined taste and sophisticated living.',
    mainImage: 'https://images.unsplash.com/photo-1758448511533-e1502259fff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVudGlhbCUyMGVsZXZhdG9yJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczMzAzNDg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1758448511533-e1502259fff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVudGlhbCUyMGVsZXZhdG9yJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczMzAzNDg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yfGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGV2YXRvciUyMGludGVyaW9yJTIwZ29sZHxlbnwxfHx8fDE3NzMzMDI1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1770821030454-5e3ccb2d96dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGhvbWUlMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzMzMDM0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    features: [
      'Custom interior finishes with premium materials',
      'Smart home integration with voice control',
      'Whisper-quiet operation below 45 dB',
      'Premium architectural LED lighting design',
      'Italian marble & hand-crafted wood options',
      'Advanced safety systems with backup power',
      'Climate control for optimal comfort',
      'Touchless controls with smartphone app',
    ],
    specifications: [
      { label: 'Capacity', value: '6-8 Persons' },
      { label: 'Speed', value: '1.0 - 1.5 m/s' },
      { label: 'Max Travel', value: 'Up to 15 meters' },
      { label: 'Drive System', value: 'Gearless Traction' },
      { label: 'Cabin Size', value: '1400 x 1100 mm' },
      { label: 'Power Supply', value: '3 Phase, 415V' },
      { label: 'Control System', value: 'Microprocessor VVVF' },
      { label: 'Warranty', value: '5 Years Comprehensive' },
    ],
    highlights: [
      {
        icon: Shield,
        title: 'Premium Safety',
        description: 'Advanced safety features including emergency brake, overload protection, and automatic rescue device',
      },
      {
        icon: Zap,
        title: 'Energy Efficient',
        description: 'LED lighting and regenerative drive system reducing energy consumption by up to 40%',
      },
      {
        icon: Award,
        title: 'Award Winning',
        description: 'Recognized internationally for design excellence and engineering innovation',
      },
      {
        icon: Cpu,
        title: 'Smart Technology',
        description: 'IoT-enabled with remote diagnostics and predictive maintenance capabilities',
      },
    ],
  },
  {
    id: 'panorama-collection',
    name: 'Panorama Collection',
    tagline: 'Elevate with a view',
    price: 'From ₹1,60,00,000',
    priceUSD: 'From $200,000',
    category: 'LUXURY GLASS ELEVATOR',
    description: 'The Panorama Collection redefines vertical travel with breathtaking transparency. Featuring full glass enclosures and architectural LED lighting, these elevators transform movement into an experience, offering stunning views while maintaining the highest standards of safety and comfort.',
    fullDescription: 'Step into a world where engineering meets artistry. The Panorama Collection\'s full-glass design creates an illusion of floating as you ascend, while advanced climate control ensures comfort in any season. Perfect for properties where the view is as important as the destination.',
    mainImage: 'https://images.unsplash.com/photo-1672753782907-d58990efbdc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGVsZXZhdG9yJTIwZXh0ZXJpb3IlMjBob3RlbHxlbnwxfHx8fDE3NzMzMDM0ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1672753782907-d58990efbdc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGVsZXZhdG9yJTIwZXh0ZXJpb3IlMjBob3RlbHxlbnwxfHx8fDE3NzMzMDM0ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1619155631589-89db583e0bcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnbGFzcyUyMGVsZXZhdG9yfGVufDF8fHx8MTc3MzIzMjUyNXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yfGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1763046472163-32c74523903e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZXxlbnwxfHx8fDE3NzMxNzIwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    features: [
      'Full glass enclosure with panoramic views',
      'Architectural LED lighting with color options',
      'Advanced climate control system',
      'Premium safety features with tempered glass',
      'Stainless steel structural framework',
      'Weather-resistant exterior design',
      'UV-protective glass coating',
      'Night lighting mode for ambiance',
    ],
    specifications: [
      { label: 'Capacity', value: '6-10 Persons' },
      { label: 'Speed', value: '1.5 - 2.0 m/s' },
      { label: 'Max Travel', value: 'Up to 25 meters' },
      { label: 'Drive System', value: 'Gearless Traction' },
      { label: 'Cabin Size', value: '1600 x 1200 mm' },
      { label: 'Glass Type', value: 'Tempered Safety Glass' },
      { label: 'Control System', value: 'VVVF Smart Control' },
      { label: 'Warranty', value: '5 Years Comprehensive' },
    ],
    highlights: [
      {
        icon: Shield,
        title: 'Structural Safety',
        description: 'Reinforced tempered glass with safety film and backup structural support systems',
      },
      {
        icon: Zap,
        title: 'Smart Lighting',
        description: 'Programmable LED lighting with multiple color modes and automatic scheduling',
      },
      {
        icon: Award,
        title: 'Architectural Excellence',
        description: 'Seamlessly integrates with building design while becoming a focal architectural feature',
      },
      {
        icon: Cpu,
        title: 'Climate Smart',
        description: 'Intelligent climate control maintains comfort regardless of weather conditions',
      },
    ],
  },
  {
    id: 'executive-line',
    name: 'Executive Line',
    tagline: 'Commercial excellence',
    price: 'From ₹96,00,000',
    priceUSD: 'From $120,000',
    category: 'COMMERCIAL SOLUTION',
    description: 'The Executive Line is engineered for the demands of commercial environments. Combining high-speed operation with heavy-duty capacity, advanced access control, and minimal maintenance requirements, this collection ensures seamless vertical mobility for businesses that demand excellence.',
    fullDescription: 'Designed for high-traffic commercial environments, the Executive Line delivers reliable performance day after day. With advanced traffic management systems, durable construction, and enterprise-grade security features, it\'s the intelligent choice for modern commercial properties.',
    mainImage: 'https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwZWxldmF0b3IlMjBsb2JieXxlbnwxfHx8fDE3NzMzMDM0ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwZWxldmF0b3IlMjBsb2JieXxlbnwxfHx8fDE3NzMzMDM0ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yfGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1763046472163-32c74523903e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZXxlbnwxfHx8fDE3NzMxNzIwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1758194090785-8e09b7288199?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGVsZXZhdG9yJTIwbG9iYnklMjBlbGVnYW50fGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    features: [
      'High-speed operation up to 2.5 m/s',
      'Heavy-duty capacity up to 21 persons',
      'Advanced access control system',
      'Minimal maintenance requirements',
      'Energy-efficient LED lighting',
      'Anti-vandal interior panels',
      'Group control system for multiple elevators',
      'Emergency communication system',
    ],
    specifications: [
      { label: 'Capacity', value: '13-21 Persons' },
      { label: 'Speed', value: '1.75 - 2.5 m/s' },
      { label: 'Max Travel', value: 'Up to 100 meters' },
      { label: 'Drive System', value: 'Gearless High-Speed' },
      { label: 'Cabin Size', value: '1800 x 1400 mm' },
      { label: 'Load Capacity', value: '1000-1600 kg' },
      { label: 'Control System', value: 'Destination Control' },
      { label: 'Warranty', value: '3 Years + AMC' },
    ],
    highlights: [
      {
        icon: Shield,
        title: 'Enterprise Security',
        description: 'Card access integration, floor lockout, and comprehensive monitoring systems',
      },
      {
        icon: Zap,
        title: 'High Performance',
        description: 'Advanced traffic management reduces waiting time and optimizes building flow',
      },
      {
        icon: Award,
        title: 'Proven Reliability',
        description: 'Engineered for 24/7 operation with minimal downtime and long service life',
      },
      {
        icon: Cpu,
        title: 'Smart Management',
        description: 'Remote monitoring and predictive maintenance minimize operational disruptions',
      },
    ],
  },
];

export function CollectionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const collection = collectionsData.find(c => c.id === id);

  if (!collection) {
    return (
      <div className="bg-[#1a3332] min-h-screen flex items-center justify-center">
        <Navigation />
        <div className="text-center pt-32">
          <h1 className="text-4xl text-white mb-4">Collection Not Found</h1>
          <button 
            onClick={() => navigate('/collection')}
            className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all"
          >
            Back to Collections
          </button>
        </div>
      </div>
    );
  }

  const handleAddToConsultation = () => {
    addToCart({
      id: collection.id,
      name: collection.name,
      price: 0,
      image: collection.mainImage,
      category: collection.category,
      specifications: collection.tagline,
    });
    navigate('/inquiry');
  };

  return (
    <div className="bg-[#1a3332] min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 pt-32 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={collection.mainImage}
            alt={collection.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/90 via-[#1a3332]/80 to-[#1a3332]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate('/collection')}
            className="flex items-center space-x-2 text-white/80 hover:text-orange-500 transition-all mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm uppercase tracking-wider">Back to Collections</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange-500 text-sm uppercase tracking-widest mb-4 block">
              {collection.category}
            </span>
            <h1 className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6">
              {collection.name}
            </h1>
            <p className="text-white/60 text-xl md:text-2xl italic mb-6">
              {collection.tagline}
            </p>
            <div className="text-3xl md:text-4xl text-orange-500 font-semibold mb-8">
              {collection.price}
            </div>
            <p className="text-white/80 text-lg md:text-xl max-w-3xl leading-relaxed">
              {collection.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-4 mt-12"
          >
            <button
              onClick={handleAddToConsultation}
              className="bg-orange-500 text-white px-10 py-4 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 uppercase tracking-wider shadow-lg inline-flex items-center space-x-2"
            >
              <span>Proceed to Payment</span>
              <ChevronRight size={20} />
            </button>
            <button
              onClick={() => navigate('/bespoke-proposal')}
              className="border-2 border-white/40 text-white px-10 py-4 rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-300 uppercase tracking-wider"
            >
              Custom Design Request
            </button>
          </motion.div>
        </div>
      </section>

      {/* Full Description */}
      <section className="py-16 md:py-24 bg-[#2a4544]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white mb-6">
              Uncompromising Excellence
            </h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-white/70 text-lg leading-relaxed">
              {collection.fullDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24 bg-[#1a3332]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-['Great_Vibes'] text-5xl md:text-6xl text-white mb-4">
              Design Gallery
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collection.gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-2xl shadow-2xl aspect-[4/3]"
              >
                <ImageWithFallback
                  src={image}
                  alt={`${collection.name} - Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Highlights */}
      <section className="py-16 md:py-24 bg-[#2a4544]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white mb-8">
                Premium Features
              </h2>
              <div className="space-y-4">
                {collection.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex items-start"
                  >
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5 mr-4 flex-shrink-0">
                      <Check size={14} className="text-orange-500" />
                    </div>
                    <span className="text-white/70 text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white mb-8">
                Key Highlights
              </h2>
              <div className="space-y-6">
                {collection.highlights.map((highlight, index) => {
                  const Icon = highlight.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-[#1a3332]/50 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-6"
                    >
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                          <Icon size={24} className="text-orange-500" />
                        </div>
                        <div>
                          <h3 className="text-xl text-white mb-2 font-['Playfair_Display']">
                            {highlight.title}
                          </h3>
                          <p className="text-white/60">{highlight.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 md:py-24 bg-[#1a3332]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-['Great_Vibes'] text-5xl md:text-6xl text-white mb-4">
              Technical Specifications
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collection.specifications.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-[#2a4544]/50 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-6"
              >
                <div className="text-orange-500 text-sm uppercase tracking-widest mb-2">
                  {spec.label}
                </div>
                <div className="text-white text-lg font-semibold">
                  {spec.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2a4544]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-['Great_Vibes'] text-4xl md:text-5xl text-white mb-4">
              Ready to elevate your space?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Schedule a consultation with our design team to discuss your vision
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleAddToConsultation}
                className="bg-orange-500 text-white px-10 py-4 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 uppercase tracking-wider shadow-lg inline-flex items-center space-x-2"
              >
                <span>Proceed to Payment</span>
                <ChevronRight size={20} />
              </button>
              <button
                onClick={() => navigate('/bespoke-proposal')}
                className="border-2 border-white/40 text-white px-10 py-4 rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-300 uppercase tracking-wider"
              >
                Custom Design Request
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <InquiryForm />
      <Footer />
    </div>
  );
}