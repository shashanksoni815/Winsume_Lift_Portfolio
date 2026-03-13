import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

export function Footer() {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1a3332] border-t border-[#3a5554] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand */}
          <div>
            <div className="text-white mb-6">
              <div className="font-serif text-2xl tracking-tight">WINSUME</div>
              <div className="text-orange-500 text-xs tracking-widest uppercase">Lift India</div>
            </div>
            <p className="text-white/60 mb-6">
              Service Provider and Manufacturer of Lift Installation Services, Passenger Lifts, and Maintenance Services Since 2018 in Indore, Madhya Pradesh.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-[#2a4544] hover:bg-orange-500/20 border border-[#3a5554] hover:border-orange-500/50 rounded-lg flex items-center justify-center transition-all">
                <Facebook size={18} className="text-white/70 hover:text-orange-500" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#2a4544] hover:bg-orange-500/20 border border-[#3a5554] hover:border-orange-500/50 rounded-lg flex items-center justify-center transition-all">
                <Instagram size={18} className="text-white/70 hover:text-orange-500" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#2a4544] hover:bg-orange-500/20 border border-[#3a5554] hover:border-orange-500/50 rounded-lg flex items-center justify-center transition-all">
                <Linkedin size={18} className="text-white/70 hover:text-orange-500" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#2a4544] hover:bg-orange-500/20 border border-[#3a5554] hover:border-orange-500/50 rounded-lg flex items-center justify-center transition-all">
                <Twitter size={18} className="text-white/70 hover:text-orange-500" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4 font-['Playfair_Display'] text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('portfolio')} className="text-white/60 hover:text-orange-500 transition-colors text-sm">
                  Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('collection')} className="text-white/60 hover:text-orange-500 transition-colors text-sm">
                  Collections
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-white/60 hover:text-orange-500 transition-colors text-sm">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="text-white/60 hover:text-orange-500 transition-colors text-sm">
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white mb-4 font-['Playfair_Display'] text-lg">Services</h3>
            <ul className="space-y-3">
              <li className="text-white/60 text-sm">Residential Elevators</li>
              <li className="text-white/60 text-sm">Commercial Solutions</li>
              <li className="text-white/60 text-sm">Custom Design</li>
              <li className="text-white/60 text-sm">Maintenance & Support</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4 font-['Playfair_Display'] text-lg">Contact</h3>
            <ul className="space-y-3">
              <li className="text-white/60 text-sm">1, Nirmal Nagar, Pipliyahana</li>
              <li className="text-white/60 text-sm">Bichholi Hapsi, Indore - 452016</li>
              <li className="text-white/60 text-sm">Madhya Pradesh, India</li>
              <li className="text-white/60 text-sm">+91 79 428 29113</li>
              <li className="text-white/60 text-sm">concierge@winsumelift.com</li>
            </ul>
          </div>
        </motion.div>

        <div className="border-t border-[#3a5554] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-4 md:mb-0">
              © 2026 Winsume Lift India Private Limited. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/50 hover:text-orange-500 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/50 hover:text-orange-500 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/50 hover:text-orange-500 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}