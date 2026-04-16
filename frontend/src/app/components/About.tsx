// import { ImageWithFallback } from './figma/ImageWithFallback';
// import { Award, Target, Heart } from 'lucide-react';
// import { motion } from 'motion/react';
// import React from 'react';

// export function About() {
//   return (
//     <section id="about" className="bg-[#1a3332] py-24">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="font-['Great_Vibes'] text-5xl md:text-6xl text-white mb-4">
//             About Us
//           </h2>
//           <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//           {/* Image Side */}
//           <motion.div 
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="relative"
//           >
//             <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
//               <ImageWithFallback
//                 src="https://images.unsplash.com/photo-1704040686684-be330b48412e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzMyMzExMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
//                 alt="Modern architecture"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-[#2a4544] via-transparent to-transparent"></div>
//             </div>
//             <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-orange-500 rounded-3xl p-6 flex flex-col items-center justify-center shadow-2xl">
//               <div className="text-5xl text-white mb-2 font-bold">6</div>
//               <div className="text-white text-center text-sm uppercase tracking-wider">Years of Excellence</div>
//             </div>
//           </motion.div>

//           {/* Content Side */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <p className="text-lg text-white/70 mb-6 leading-relaxed">
//               Since 2018, Winsume Lift India has been at the forefront of bespoke elevator design and installation. We believe that vertical transportation should be more than functional—it should be an experience that enhances your lifestyle.
//             </p>
//             <p className="text-lg text-white/70 mb-8 leading-relaxed">
//               Our team of designers, engineers, and craftspeople work in harmony to create elevators that seamlessly blend cutting-edge technology with timeless elegance. Each project is a testament to our commitment to excellence and attention to detail.
//             </p>

//             <div className="space-y-6">
//               <motion.div 
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 className="flex items-start"
//               >
//                 <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
//                   <Award size={24} className="text-orange-500" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl text-white mb-2 font-['Playfair_Display']">Award-Winning Design</h3>
//                   <p className="text-white/60">Recognized globally for innovative elevator design and engineering excellence.</p>
//                 </div>
//               </motion.div>

//               <motion.div 
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//                 className="flex items-start"
//               >
//                 <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
//                   <Target size={24} className="text-orange-500" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl text-white mb-2 font-['Playfair_Display']">Precision Engineering</h3>
//                   <p className="text-white/60">Every component is meticulously engineered for safety, reliability, and performance.</p>
//                 </div>
//               </motion.div>

//               <motion.div 
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//                 className="flex items-start"
//               >
//                 <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
//                   <Heart size={24} className="text-orange-500" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl text-white mb-2 font-['Playfair_Display']">Client-Centered Approach</h3>
//                   <p className="text-white/60">Your vision guides our process, ensuring a result that exceeds expectations.</p>
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { ImageWithFallback } from './figma/ImageWithFallback';
import { Award, Target, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

export function About() {
  return (
    <section id="about" className="bg-[#1a3332] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-['Great_Vibes'] text-5xl md:text-6xl text-white mb-4">
            About Us
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative pb-10 lg:pb-0"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/5]">
              <img
                src="https://images.pexels.com/photos/3935331/pexels-photo-3935331.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a4544] via-transparent to-transparent"></div>
            </div>
            {/* Badge - repositioned for mobile */}
            <div className="absolute bottom-0 right-4 sm:right-0 lg:-bottom-8 lg:-right-8 w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 bg-orange-500 rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-2xl">
              <div className="text-4xl sm:text-5xl text-white mb-1 sm:mb-2 font-bold">6</div>
              <div className="text-white text-center text-xs sm:text-sm uppercase tracking-wider">Years of Excellence</div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-4 lg:mt-0"
          >
            <p className="text-base sm:text-lg text-white/70 mb-4 sm:mb-6 leading-relaxed">
              Since 2018, Winsume Lift India has been at the forefront of bespoke elevator design and installation. We believe that vertical transportation should be more than functional—it should be an experience that enhances your lifestyle.
            </p>
            <p className="text-base sm:text-lg text-white/70 mb-6 sm:mb-8 leading-relaxed">
              Our team of designers, engineers, and craftspeople work in harmony to create elevators that seamlessly blend cutting-edge technology with timeless elegance. Each project is a testament to our commitment to excellence and attention to detail.
            </p>

            <div className="space-y-5 sm:space-y-6">
              {[
                {
                  icon: Award,
                  title: 'Award-Winning Design',
                  desc: 'Recognized globally for innovative elevator design and engineering excellence.',
                  delay: 0.2,
                },
                {
                  icon: Target,
                  title: 'Precision Engineering',
                  desc: 'Every component is meticulously engineered for safety, reliability, and performance.',
                  delay: 0.3,
                },
                {
                  icon: Heart,
                  title: 'Client-Centered Approach',
                  desc: 'Your vision guides our process, ensuring a result that exceeds expectations.',
                  delay: 0.4,
                },
              ].map(({ icon: Icon, title, desc, delay }) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay }}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl text-white mb-1 sm:mb-2 font-['Playfair_Display']">{title}</h3>
                    <p className="text-sm sm:text-base text-white/60 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}