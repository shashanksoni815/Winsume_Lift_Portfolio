// import { ImageWithFallback } from './figma/ImageWithFallback';
// import { Award, Target, Heart } from 'lucide-react';
// import { motion } from 'motion/react';
// import React from 'react';

// export function About() {
//   return (
//     <section id="about" className="bg-[#1a3332] py-16 md:py-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12 md:mb-16"
//         >
//           <h2 className="font-['Great_Vibes'] text-5xl md:text-6xl text-white mb-4">
//             About Us
//           </h2>
//           <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
//           {/* Image Side */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="relative pb-10 lg:pb-0"
//           >
//             <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/5]">
//               <img
//                 src="https://images.pexels.com/photos/3935331/pexels-photo-3935331.jpeg?auto=compress&cs=tinysrgb&w=800"
//                 alt="Modern architecture"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-[#2a4544] via-transparent to-transparent"></div>
//             </div>
//             {/* Badge - repositioned for mobile */}
//             <div className="absolute bottom-0 right-4 sm:right-0 lg:-bottom-8 lg:-right-8 w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 bg-orange-500 rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-2xl">
//               <div className="text-4xl sm:text-5xl text-white mb-1 sm:mb-2 font-bold">6</div>
//               <div className="text-white text-center text-xs sm:text-sm uppercase tracking-wider">Years of Excellence</div>
//             </div>
//           </motion.div>

//           {/* Content Side */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="mt-4 lg:mt-0"
//           >
//             <p className="text-base sm:text-lg text-white/70 mb-4 sm:mb-6 leading-relaxed">
//               Since 2018, Winsume Lift India has been at the forefront of bespoke elevator design and installation. We believe that vertical transportation should be more than functional—it should be an experience that enhances your lifestyle.
//             </p>
//             <p className="text-base sm:text-lg text-white/70 mb-6 sm:mb-8 leading-relaxed">
//               Our team of designers, engineers, and craftspeople work in harmony to create elevators that seamlessly blend cutting-edge technology with timeless elegance. Each project is a testament to our commitment to excellence and attention to detail.
//             </p>

//             <div className="space-y-5 sm:space-y-6">
//               {[
//                 {
//                   icon: Award,
//                   title: 'Award-Winning Design',
//                   desc: 'Recognized globally for innovative elevator design and engineering excellence.',
//                   delay: 0.2,
//                 },
//                 {
//                   icon: Target,
//                   title: 'Precision Engineering',
//                   desc: 'Every component is meticulously engineered for safety, reliability, and performance.',
//                   delay: 0.3,
//                 },
//                 {
//                   icon: Heart,
//                   title: 'Client-Centered Approach',
//                   desc: 'Your vision guides our process, ensuring a result that exceeds expectations.',
//                   delay: 0.4,
//                 },
//               ].map(({ icon: Icon, title, desc, delay }) => (
//                 <motion.div
//                   key={title}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay }}
//                   className="flex items-start gap-3 sm:gap-4"
//                 >
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <Icon size={20} className="text-orange-500" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg sm:text-xl text-white mb-1 sm:mb-2 font-['Playfair_Display']">{title}</h3>
//                     <p className="text-sm sm:text-base text-white/60 leading-relaxed">{desc}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }



import { Award, Target, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

interface Feature {
  icon: React.ElementType;
  title: string;
  desc: string;
  img: string;
  imgAlt: string;
}

const features: Feature[] = [
  {
    icon: Award,
    title: 'Award-Winning Design',
    desc: 'Recognized globally for innovative elevator design and engineering excellence that sets new industry benchmarks.',
    img: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
    imgAlt: 'Award-winning elevator interior design',
  },
  {
    icon: Target,
    title: 'Precision Engineering',
    desc: 'Every component is meticulously engineered for safety, reliability, and flawless performance across all conditions.',
    img: 'https://images.pexels.com/photos/257700/pexels-photo-257700.jpeg?auto=compress&cs=tinysrgb&w=600',
    imgAlt: 'Precision engineering and manufacturing',
  },
  {
    icon: Heart,
    title: 'Client-Centered Approach',
    desc: 'Your vision guides our entire process, ensuring every detail aligns with your expectations and lifestyle.',
    img: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
    imgAlt: 'Client-centered team collaboration',
  },
];

export function About() {
  return (
    <section
      id="about"
      className="bg-[#1a3332] py-16 md:py-24"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ── */}
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
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full" />
        </motion.div>

        {/* ── Main Two-Column Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12 md:mb-16">

          {/* ── Image Side ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative pb-10 lg:pb-0"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-[4/5]">
              <img
                src="https://images.pexels.com/photos/3935331/pexels-photo-3935331.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern elevator installation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332]/80 via-transparent to-transparent" />
            </div>

            {/* Badge */}
            <div className="absolute bottom-0 right-4 sm:right-0 lg:-bottom-8 lg:-right-8 w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 bg-orange-500 rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-2xl shadow-orange-500/30">
              <div className="text-4xl sm:text-5xl text-white mb-1 sm:mb-2 font-bold leading-none">6+</div>
              <div className="text-white text-center text-xs sm:text-sm uppercase tracking-widest leading-snug">
                Years of<br />Excellence
              </div>
            </div>
          </motion.div>

          {/* ── Content Side ── */}
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
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              Our team of designers, engineers, and craftspeople work in harmony to create elevators that seamlessly blend cutting-edge technology with timeless elegance. Each project is a testament to our commitment to excellence and attention to detail.
            </p>
          </motion.div>
        </div>

        {/* ── Feature Cards Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map(({ icon: Icon, title, desc, img, imgAlt }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-400 cursor-default"
            >
              {/* Card Image */}
              <div className="relative w-full overflow-hidden"
                style={{ aspectRatio: '16/9' }}>
                <img
                  src={img}
                  alt={imgAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a3332]/40 to-[#1a3332]/90" />

                {/* Icon pill floating on image */}
                <div className="absolute bottom-3 left-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/40">
                    <Icon size={18} className="text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Subtle orange corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/10 rounded-bl-3xl" />
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6">
                <h3 className="font-['Playfair_Display'] text-lg sm:text-xl text-white mb-2 font-semibold leading-snug">
                  {title}
                </h3>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                  {desc}
                </p>

                {/* Bottom accent bar on hover */}
                <div className="mt-4 h-px w-0 bg-orange-500 group-hover:w-full transition-all duration-500 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}