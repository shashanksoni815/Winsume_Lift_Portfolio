import { Ruler, Wrench, Shield, Sparkles, Users, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

const services = [
  {
    id: 1,
    icon: Ruler,
    title: 'Bespoke Design',
    description: 'Custom-tailored elevator solutions designed to match your architectural vision and aesthetic preferences.',
  },
  {
    id: 2,
    icon: Wrench,
    title: 'Expert Installation',
    description: 'Professional installation by certified technicians with minimal disruption to your property.',
  },
  {
    id: 3,
    icon: Shield,
    title: 'Safety First',
    description: 'Cutting-edge safety features and compliance with all international elevator safety standards.',
  },
  {
    id: 4,
    icon: Sparkles,
    title: 'Premium Materials',
    description: 'Only the finest materials and finishes, from Italian marble to hand-crafted wood veneers.',
  },
  {
    id: 5,
    icon: Users,
    title: 'White Glove Service',
    description: 'Dedicated project managers ensuring seamless communication throughout the entire process.',
  },
  {
    id: 6,
    icon: Clock,
    title: 'Lifetime Support',
    description: '24/7 maintenance and support services to keep your elevator running at peak performance.',
  },
];

export function Services() {
  return (
    <section id="services" className="bg-[#2a4544] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Great_Vibes'] text-5xl md:text-6xl text-white mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            From initial consultation to ongoing maintenance, we provide end-to-end services for your vertical transportation needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#1a3332] border border-[#3a5554] rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500/30 transition-all">
                  <Icon size={28} className="text-orange-500" />
                </div>
                <h3 className="text-xl text-white mb-3 font-['Playfair_Display']">{service.title}</h3>
                <p className="text-white/60 leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-[#3a5554]"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <div className="text-5xl text-orange-500 mb-2 font-bold">500+</div>
            <div className="text-white/60 uppercase tracking-wider text-sm">Projects</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <div className="text-5xl text-orange-500 mb-2 font-bold">25+</div>
            <div className="text-white/60 uppercase tracking-wider text-sm">Years</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <div className="text-5xl text-orange-500 mb-2 font-bold">98%</div>
            <div className="text-white/60 uppercase tracking-wider text-sm">Satisfaction</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <div className="text-5xl text-orange-500 mb-2 font-bold">24/7</div>
            <div className="text-white/60 uppercase tracking-wider text-sm">Support</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}