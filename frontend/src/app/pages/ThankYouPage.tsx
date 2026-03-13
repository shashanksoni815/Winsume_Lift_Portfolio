import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { useEffect } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function ThankYouPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from navigation state
  const { name = 'Valued Client', application = 'Commercial', city = 'Kanpur', inquiryId = 'WL-7155' } = location.state || {};

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a3332]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGV2YXRvciUyMGludGVyaW9yJTIwZ29sZHxlbnwxfHx8fDE3NzMyMzI1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury elevator interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/90 via-[#1a3332]/85 to-[#2a4544]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <CheckCircle size={40} className="text-white" strokeWidth={2.5} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-orange-500/80 text-xs uppercase tracking-widest mb-6">REQUEST RECEIVED</p>
            <h1 className="font-['Great_Vibes'] text-5xl md:text-6xl lg:text-7xl text-white mb-8">
              Thank You, {name}.
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Your inquiry for a <span className="text-white font-medium">{application}</span> system has been successfully transmitted to our engineering team. 
              A technical consultant will contact you within <span className="text-white font-medium">24 hours</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Details Section */}
      <section className="pb-24 bg-[#2a4544]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Consultation Details Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#1a3332] border border-orange-500/20 rounded-2xl p-8"
            >
              <h2 className="text-white/50 text-xs uppercase tracking-widest mb-8">CONSULTATION DETAILS</h2>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-orange-500/80 text-sm">Inquiry ID</span>
                  <span className="text-white font-medium">{inquiryId}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-orange-500/80 text-sm">Application</span>
                  <span className="text-white font-medium">{application}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-orange-500/80 text-sm">Location</span>
                  <span className="text-white font-medium">{city}</span>
                </div>
              </div>
            </motion.div>

            {/* Next Steps Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-[#1a3332] border border-orange-500/20 rounded-2xl p-8"
            >
              <h2 className="text-white/50 text-xs uppercase tracking-widest mb-8">NEXT STEPS</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-500/10 border border-orange-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-500 text-sm font-semibold">01</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-white/80 text-sm leading-relaxed">
                      TECHNICAL FEASIBILITY REVIEW BY OUR SENIOR ENGINEERS
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-500/10 border border-orange-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-500 text-sm font-semibold">02</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-white/80 text-sm leading-relaxed">
                      INITIAL CONSULTATION CALL TO DISCUSS SITE REQUIREMENTS
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Continue Exploring Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16"
          >
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-white/60 hover:text-orange-500 transition-colors text-sm uppercase tracking-widest"
            >
              <span>CONTINUE EXPLORING</span>
              <span>→</span>
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}