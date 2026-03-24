import { ImageWithFallback } from './figma/ImageWithFallback';
import { Award, Target, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

export function About() {
  return (
    <section id="about" className="bg-[#1a3332] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Great_Vibes'] text-5xl md:text-6xl text-white mb-4">
            About Us
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1704040686684-be330b48412e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzMyMzExMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a4544] via-transparent to-transparent"></div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-orange-500 rounded-3xl p-6 flex flex-col items-center justify-center shadow-2xl">
              <div className="text-5xl text-white mb-2 font-bold">6</div>
              <div className="text-white text-center text-sm uppercase tracking-wider">Years of Excellence</div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              Since 2018, Winsume Lift India has been at the forefront of bespoke elevator design and installation. We believe that vertical transportation should be more than functional—it should be an experience that enhances your lifestyle.
            </p>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Our team of designers, engineers, and craftspeople work in harmony to create elevators that seamlessly blend cutting-edge technology with timeless elegance. Each project is a testament to our commitment to excellence and attention to detail.
            </p>

            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start"
              >
                <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Award size={24} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl text-white mb-2 font-['Playfair_Display']">Award-Winning Design</h3>
                  <p className="text-white/60">Recognized globally for innovative elevator design and engineering excellence.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-start"
              >
                <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Target size={24} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl text-white mb-2 font-['Playfair_Display']">Precision Engineering</h3>
                  <p className="text-white/60">Every component is meticulously engineered for safety, reliability, and performance.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-start"
              >
                <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Heart size={24} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl text-white mb-2 font-['Playfair_Display']">Client-Centered Approach</h3>
                  <p className="text-white/60">Your vision guides our process, ensuring a result that exceeds expectations.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}