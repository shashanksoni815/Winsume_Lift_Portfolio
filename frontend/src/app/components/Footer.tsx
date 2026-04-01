import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import React from 'react';

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
            <div className="flex items-center space-x-3 text-white mb-6">
              
              {/* Logo */}
              <div className="w-12 h-12">
                <img
                  src="/logo.png"
                  alt="Winsume Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Brand Text */}
              <div>
                <div className="font-serif text-2xl tracking-tight">WINSUME</div>
                <div className="text-orange-500 text-xs tracking-widest uppercase">
                  Lift India
                </div>
              </div>

            </div>

            <p className="text-white/60 mb-6">
              Service Provider and Manufacturer of Lift Installation Services, Passenger Lifts, and Maintenance Services Since 2018 in Indore, Madhya Pradesh.
            </p>

            {/* <div className="flex space-x-4">
              <a href="https://www.facebook.com/winsome.lift" className="w-10 h-10 bg-[#2a4544] hover:bg-orange-500/20 border border-[#3a5554] hover:border-orange-500/50 rounded-lg flex items-center justify-center transition-all">
                <Facebook size={18} className="text-white/70 hover:text-orange-500" />
              </a>
              <a href="https://www.instagram.com/winsumeliftindia?igsh=MW4zMm45ZWpqYjU3bA==" className="w-10 h-10 bg-[#2a4544] hover:bg-orange-500/20 border border-[#3a5554] hover:border-orange-500/50 rounded-lg flex items-center justify-center transition-all">
                <Instagram size={18} className="text-white/70 hover:text-orange-500" />
              </a>
            </div> */}
            <div className="flex space-x-4">

{/* Facebook */}
<a
  href="https://www.facebook.com/winsome.lift"
  target="_blank"
  rel="noopener noreferrer"
  className="w-10 h-10 bg-[#1877F2]/10 hover:bg-[#1877F2] border border-[#1877F2]/30 hover:border-[#1877F2] rounded-lg flex items-center justify-center transition-all group"
>
  <Facebook
    size={18}
    className="text-[#1877F2] group-hover:text-white transition"
  />
</a>

{/* Instagram */}
<a
  href="https://www.instagram.com/winsumeliftindia?igsh=MW4zMm45ZWpqYjU3bA=="
  target="_blank"
  rel="noopener noreferrer"
  className="w-10 h-10 bg-gradient-to-br from-[#f58529]/10 via-[#dd2a7b]/10 to-[#515bd4]/10 
             hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#515bd4]
             border border-[#dd2a7b]/30 hover:border-transparent
             rounded-lg flex items-center justify-center transition-all group"
>
  <Instagram
    size={18}
    className="text-[#dd2a7b] group-hover:text-white transition"
  />
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
          {/* Contact */}
<div>
  <h3 className="text-white mb-4 font-['Playfair_Display'] text-lg">Contact</h3>
  <ul className="space-y-3">
    
    {/* Address */}
    <li className="text-white/60 text-sm leading-relaxed">
      1st Floor, 100 Sanvid Nagar
      <br />
      Near Hanuman Mandir
      <br />
      Kanadiya Road
      <br />
      Indore, Madhya Pradesh – 452018
      <br />
      India
    </li>

    {/* Phone */}
    <li className="text-white/60 text-sm space-y-1">
      <a href="tel:+919993277492" className="block hover:text-orange-400 transition">
        +91 99932 77492
      </a>
      <a href="tel:+917089344991" className="block hover:text-orange-400 transition">
        +91 70893 44991
      </a>
    </li>

    {/* Email */}
    <li className="text-white/60 text-sm">
      <a
        href="mailto:concierge@winsumelift.com"
        className="hover:text-orange-400 transition"
      >
        concierge@winsumelift.com
      </a>
    </li>

  </ul>
</div>
        </motion.div>

        <div className="border-t border-[#3a5554] pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            
            <p className="text-white/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Winsume Lift India Private Limited. All rights reserved.
            </p>

            <p className="text-white/50 text-sm">
              Developed by{" "}
              <a
                href="https://www.alphanexis.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-400 font-medium transition-colors duration-200"
              >
                Alphanexis Tech Pvt Ltd
              </a>
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
}