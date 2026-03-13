import { useParams, useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { InquiryForm } from '../components/InquiryForm';
import { Footer } from '../components/Footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, MapPin, Building, Users, Award, ChevronRight } from 'lucide-react';

const projectsData = [
  {
    id: 'phoenix-mall-indore',
    title: 'Phoenix Mall, Indore',
    category: 'LUXURY COMMERCIAL',
    year: '2023',
    location: 'Indore, Madhya Pradesh',
    client: 'Phoenix Mills Limited',
    description: 'A landmark commercial development featuring cutting-edge vertical mobility solutions. This prestigious project showcases our expertise in delivering high-capacity, luxury elevator systems for premium shopping destinations.',
    challenge: 'Designing a vertical transport system capable of handling peak hour traffic of 5000+ visitors while maintaining aesthetic excellence and operational efficiency.',
    solution: 'Implemented 12 high-speed passenger elevators with advanced traffic management systems, custom interior finishes, and energy-efficient technologies.',
    mainImage: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yfGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yfGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidWlsZGluZyUyMGVsZXZhdG9yJTIwbHV4dXJ5JTIwbG9iYnl8ZW58MXx8fHwxNzczMjM2NjI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1763046472163-32c74523903e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZXxlbnwxfHx8fDE3NzMxNzIwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    specifications: [
      { label: 'Total Lifts', value: '12 Passenger Elevators' },
      { label: 'Speed', value: '2.5 m/s' },
      { label: 'Capacity', value: '21 Persons per cabin' },
      { label: 'Technology', value: 'Smart Traffic Management' },
      { label: 'Finish', value: 'Premium Glass & Steel' },
      { label: 'Features', value: 'Energy Recovery System' },
    ],
    testimonial: {
      quote: 'WINSUME delivered exceptional vertical mobility solutions that perfectly complement our luxury retail environment.',
      author: 'Project Director',
      company: 'Phoenix Mills Limited',
    },
  },
  {
    id: 'sayaji-hotels',
    title: 'Sayaji Hotels',
    category: 'LUXURY HOSPITALITY',
    year: '2023',
    location: 'Multiple Locations',
    client: 'Sayaji Hotels',
    description: 'Elegant lift solutions designed specifically for premium hospitality environments. Each installation reflects the refined aesthetic and operational excellence demanded by luxury hotels.',
    challenge: 'Creating a seamless guest experience with whisper-quiet operation, elegant aesthetics, and reliability for 24/7 hotel operations.',
    solution: 'Installed premium passenger elevators with custom cabin designs, noise-reduction technology, and integrated security features for guest safety.',
    mainImage: 'https://images.unsplash.com/photo-1758194090785-8e09b7288199?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGVsZXZhdG9yJTIwbG9iYnklMjBlbGVnYW50fGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1758194090785-8e09b7288199?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGVsZXZhdG9yJTIwbG9iYnklMjBlbGVnYW50fGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yfGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidWlsZGluZyUyMGVsZXZhdG9yJTIwbHV4dXJ5JTIwbG9iYnl8ZW58MXx8fHwxNzczMjM2NjI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    specifications: [
      { label: 'Total Lifts', value: '6 Passenger Elevators' },
      { label: 'Speed', value: '2.0 m/s' },
      { label: 'Capacity', value: '13 Persons per cabin' },
      { label: 'Technology', value: 'Ultra-Quiet Operation' },
      { label: 'Finish', value: 'Luxury Wood & Mirror' },
      { label: 'Features', value: 'Card Access System' },
    ],
    testimonial: {
      quote: 'The elevator systems installed by WINSUME perfectly match our hotel\'s luxury standards and guest expectations.',
      author: 'General Manager',
      company: 'Sayaji Hotels',
    },
  },
  {
    id: 'radisson-blu',
    title: 'Radisson Blu',
    category: 'LUXURY HOTEL',
    year: '2023',
    location: 'Indore, Madhya Pradesh',
    client: 'Radisson Hotel Group',
    description: 'Sophisticated vertical transport solutions for an internationally acclaimed luxury hotel brand. This project demonstrates our capability to meet global hospitality standards.',
    challenge: 'Meeting international hotel brand standards while ensuring seamless integration with existing architectural elements and 24/7 operational reliability.',
    solution: 'Deployed state-of-the-art elevator systems with smart destination control, elegant interiors, and comprehensive maintenance programs.',
    mainImage: 'https://images.unsplash.com/photo-1763046472163-32c74523903e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZXxlbnwxfHx8fDE3NzMxNzIwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1763046472163-32c74523903e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZXxlbnwxfHx8fDE3NzMxNzIwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1758194090785-8e09b7288199?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGVsZXZhdG9yJTIwbG9iYnklMjBlbGVnYW50fGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yfGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    specifications: [
      { label: 'Total Lifts', value: '8 Passenger Elevators' },
      { label: 'Speed', value: '2.5 m/s' },
      { label: 'Capacity', value: '17 Persons per cabin' },
      { label: 'Technology', value: 'Destination Control' },
      { label: 'Finish', value: 'Premium Marble & Steel' },
      { label: 'Features', value: 'Smart Building Integration' },
    ],
    testimonial: {
      quote: 'Outstanding craftsmanship and attention to detail. WINSUME understands the nuances of luxury hospitality.',
      author: 'Operations Manager',
      company: 'Radisson Blu Indore',
    },
  },
  {
    id: 'manhattan-penthouse',
    title: 'Manhattan Penthouse',
    category: 'LUXURY RESIDENTIAL',
    year: '2022',
    location: 'South Mumbai, Maharashtra',
    client: 'Private Residence',
    description: 'An exclusive penthouse installation featuring a custom glass elevator with breathtaking panoramic city views. This project exemplifies our ability to create bespoke vertical mobility solutions for ultra-luxury residences.',
    challenge: 'Integrating a modern glass elevator into a heritage building structure while maintaining architectural integrity and providing stunning 360-degree views of the Mumbai skyline.',
    solution: 'Designed and installed a fully-transparent glass elevator with minimal structural intervention, featuring climate control, smart home integration, and whisper-quiet operation.',
    mainImage: 'https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGV2YXRvciUyMGludGVyaW9yJTIwZ29sZHxlbnwxfHx8fDE3NzMyMzI1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGV2YXRvciUyMGludGVyaW9yJTIwZ29sZHxlbnwxfHx8fDE3NzMyMzI1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1672753782907-d58990efbdc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGVsZXZhdG9yJTIwZXh0ZXJpb3IlMjBob3RlbHxlbnwxfHx8fDE3NzMzMDM0ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1758448511533-e1502259fff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVudGlhbCUyMGVsZXZhdG9yJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczMzAzNDg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    specifications: [
      { label: 'Total Lifts', value: '1 Glass Panoramic Elevator' },
      { label: 'Speed', value: '1.0 m/s' },
      { label: 'Capacity', value: '6 Persons' },
      { label: 'Technology', value: 'Smart Home IoT Integration' },
      { label: 'Finish', value: 'Full Glass with Gold Accents' },
      { label: 'Features', value: 'Climate Control & Voice Commands' },
    ],
    testimonial: {
      quote: 'WINSUME transformed our vision into reality. The glass elevator is not just functional—it\'s a stunning architectural statement.',
      author: 'Property Owner',
      company: 'Manhattan Penthouse',
    },
  },
  {
    id: 'corporate-tower-mumbai',
    title: 'Corporate Tower, Mumbai',
    category: 'COMMERCIAL HIGH-RISE',
    year: '2023',
    location: 'BKC, Mumbai',
    client: 'Leading Corporate Group',
    description: 'A prestigious corporate tower equipped with high-speed executive elevator systems designed to handle high traffic volumes while maintaining luxury aesthetics and operational efficiency.',
    challenge: 'Providing rapid vertical transportation for 2000+ employees across 35 floors with minimal wait times during peak hours while ensuring energy efficiency.',
    solution: 'Implemented 16 high-speed elevators with destination dispatch technology, regenerative drives, and executive floor access control systems.',
    mainImage: 'https://images.unsplash.com/photo-1619155631589-89db583e0bcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnbGFzcyUyMGVsZXZhdG9yfGVufDF8fHx8MTc3MzIzMjUyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1619155631589-89db583e0bcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnbGFzcyUyMGVsZXZhdG9yfGVufDF8fHx8MTc3MzIzMjUyNXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1763046472163-32c74523903e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZXxlbnwxfHx8fDE3NzMxNzIwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwZWxldmF0b3IlMjBsb2JieXxlbnwxfHx8fDE3NzMzMDM0ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    specifications: [
      { label: 'Total Lifts', value: '16 High-Speed Elevators' },
      { label: 'Speed', value: '4.0 m/s' },
      { label: 'Capacity', value: '21 Persons per cabin' },
      { label: 'Technology', value: 'Destination Dispatch System' },
      { label: 'Finish', value: 'Stainless Steel & Glass' },
      { label: 'Features', value: 'Energy Recovery & Access Control' },
    ],
    testimonial: {
      quote: 'The elevator system has significantly improved building efficiency. WINSUME delivered world-class technology and service.',
      author: 'Facility Manager',
      company: 'Corporate Tower Mumbai',
    },
  },
  {
    id: 'luxury-villa-delhi',
    title: 'Luxury Villa, New Delhi',
    category: 'PREMIUM RESIDENTIAL',
    year: '2022',
    location: 'New Delhi',
    client: 'Private Residence',
    description: 'A minimalist home elevator designed to seamlessly integrate with modern architectural aesthetics while providing smart home connectivity and whisper-quiet operation for a luxury villa.',
    challenge: 'Creating an elevator that disappears into the minimalist interior design while offering cutting-edge technology and accessibility features.',
    solution: 'Installed a custom-designed elevator with concealed cabin walls, smart home integration, voice control, and IoT connectivity for predictive maintenance.',
    mainImage: 'https://images.unsplash.com/photo-1770821030454-5e3ccb2d96dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGhvbWUlMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzMyMzM0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1770821030454-5e3ccb2d96dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGhvbWUlMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzMyMzM0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1758448511533-e1502259fff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVudGlhbCUyMGVsZXZhdG9yJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczMzAzNDg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yfGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    specifications: [
      { label: 'Total Lifts', value: '1 Home Elevator' },
      { label: 'Speed', value: '0.63 m/s' },
      { label: 'Capacity', value: '5 Persons' },
      { label: 'Technology', value: 'Smart Home Integration' },
      { label: 'Finish', value: 'Minimalist White & Wood' },
      { label: 'Features', value: 'Voice Control & IoT Monitoring' },
    ],
    testimonial: {
      quote: 'The elevator blends perfectly with our home\'s design. It\'s elegant, quiet, and incredibly smart.',
      author: 'Homeowner',
      company: 'Luxury Villa Delhi',
    },
  },
  {
    id: 'heritage-hotel-jaipur',
    title: 'Heritage Hotel, Jaipur',
    category: 'HERITAGE RESTORATION',
    year: '2021',
    location: 'Jaipur, Rajasthan',
    client: 'Heritage Hotels Group',
    description: 'A restoration-grade lift installation that preserves the architectural integrity of a 150-year-old heritage building while providing modern accessibility and luxury guest experience.',
    challenge: 'Installing a modern elevator system without compromising the historical architecture, ornate interiors, and structural limitations of a protected heritage building.',
    solution: 'Custom-engineered compact elevator with period-appropriate cabin finishes, minimal structural modification, and advanced safety systems meeting heritage conservation guidelines.',
    mainImage: 'https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzMyMzM0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzMyMzM0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1758194090785-8e09b7288199?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGVsZXZhdG9yJTIwbG9iYnklMjBlbGVnYW50fGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yfGVufDF8fHx8MTc3MzIzNTI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    specifications: [
      { label: 'Total Lifts', value: '2 Heritage Elevators' },
      { label: 'Speed', value: '1.0 m/s' },
      { label: 'Capacity', value: '8 Persons per cabin' },
      { label: 'Technology', value: 'Conservation-Compliant System' },
      { label: 'Finish', value: 'Traditional Wood & Brass' },
      { label: 'Features', value: 'Minimal Structural Impact' },
    ],
    testimonial: {
      quote: 'WINSUME achieved the impossible—modern convenience without disturbing our heritage. Exceptional craftsmanship.',
      author: 'General Manager',
      company: 'Heritage Hotels Jaipur',
    },
  },
];

export function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return (
      <div className="bg-[#1a3332] min-h-screen flex items-center justify-center">
        <Navigation />
        <div className="text-center pt-32">
          <h1 className="text-4xl text-white mb-4">Project Not Found</h1>
          <button 
            onClick={() => navigate('/our-work')}
            className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a3332] min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 pt-32 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={project.mainImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/90 via-[#1a3332]/80 to-[#1a3332]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate('/our-work')}
            className="flex items-center space-x-2 text-white/80 hover:text-orange-500 transition-all mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm uppercase tracking-wider">Back to Portfolio</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange-500 text-sm uppercase tracking-widest mb-4 block">
              {project.category}
            </span>
            <h1 className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6">
              {project.title}
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <Calendar className="text-orange-500 mb-3" size={24} />
              <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Year</div>
              <div className="text-white font-semibold">{project.year}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <MapPin className="text-orange-500 mb-3" size={24} />
              <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Location</div>
              <div className="text-white font-semibold text-sm">{project.location}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <Building className="text-orange-500 mb-3" size={24} />
              <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Client</div>
              <div className="text-white font-semibold text-sm">{project.client}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <Award className="text-orange-500 mb-3" size={24} />
              <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Status</div>
              <div className="text-white font-semibold">Completed</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-16 md:py-24 bg-[#2a4544]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white mb-6">
                The Challenge
              </h2>
              <div className="w-16 h-1 bg-orange-500 mb-6"></div>
              <p className="text-white/70 text-lg leading-relaxed">
                {project.challenge}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white mb-6">
                Our Solution
              </h2>
              <div className="w-16 h-1 bg-orange-500 mb-6"></div>
              <p className="text-white/70 text-lg leading-relaxed">
                {project.solution}
              </p>
            </motion.div>
          </div>
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
              Project Gallery
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.gallery.map((image, index) => (
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
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 md:py-24 bg-[#2a4544]">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.specifications.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#1a3332]/50 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-6"
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

      {/* Testimonial */}
      <section className="py-16 md:py-24 bg-[#1a3332]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-sm border border-orange-500/20 rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="text-orange-500 text-6xl mb-6">"</div>
            <p className="text-white/90 text-xl md:text-2xl font-['Playfair_Display'] italic mb-8 leading-relaxed">
              {project.testimonial.quote}
            </p>
            <div className="w-16 h-1 bg-orange-500 mx-auto mb-6"></div>
            <div className="text-white font-semibold text-lg">{project.testimonial.author}</div>
            <div className="text-white/60 text-sm">{project.testimonial.company}</div>
          </motion.div>
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
              Inspired by this project?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Let's create something exceptional for your property
            </p>
            <button
              onClick={() => navigate('/bespoke-proposal')}
              className="bg-orange-500 text-white px-10 py-4 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 uppercase tracking-wider shadow-lg inline-flex items-center space-x-2"
            >
              <span>Start Your Project</span>
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      <InquiryForm />
      <Footer />
    </div>
  );
}