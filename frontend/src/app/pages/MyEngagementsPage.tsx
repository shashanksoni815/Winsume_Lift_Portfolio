import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Medal, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// Mock engagement data
const engagements = [
  {
    id: 'ID: 654340',
    title: 'ConsultExec for Gwalior',
    description: 'Personalized consultations to understand client needs, preferences, and budget. Custom proposals and quotations tailored for each customer.',
    status: 'BOOKING ASSIGNED',
    timeline: 'Assigned on January 5th, 2025',
    price: 'RS 54,00,000',
    statusLabel: 'BOOKING PLACED',
    statusColor: 'text-green-400'
  },
  {
    id: 'ID: 227806',
    title: 'ConsultExec for Sonpat',
    description: 'Technical design that transforms vision into reality - elevating spaces with unmatched precision and innovative solutions.',
    status: 'BOOKING ASSIGNED',
    timeline: 'Assigned',
    price: 'RS 47,50,000',
    statusLabel: 'TECHNICAL PROPOSAL',
    statusColor: 'text-green-400'
  },
  {
    id: 'ID: 651342',
    title: 'ConsultExec for Delhi',
    description: 'Dedicated to crafting lifts that meet the highest standards of quality, aesthetics, and functionality.',
    status: 'BOOKING ASSIGNED',
    timeline: 'Assigned last December 10th, 2024',
    price: 'RS 65,00,000',
    statusLabel: 'INSTALLATION ONGOING',
    statusColor: 'text-blue-400'
  },
  {
    id: 'ID: 714647',
    title: 'ConsultExec for Indore',
    description: 'Professional installation teams ensuring seamless integration into residential & commercial properties.',
    status: 'BOOKING ASSIGNED',
    timeline: 'Assigned last December 5th, 2024',
    price: 'RS 78,00,000',
    statusLabel: 'PROJECT COMPLETED',
    statusColor: 'text-orange-400'
  },
  {
    id: 'ID: 674321',
    title: 'ConsultExec for projects',
    description: 'State-of-the-art lift technologies to transform vertical mobility with premium engineering.',
    status: 'BOOKING ASSIGNED',
    timeline: 'Assigned',
    price: 'RS 82,00,000',
    statusLabel: 'AWAITING APPROVAL',
    statusColor: 'text-yellow-400'
  },
  {
    id: 'ID: 542310',
    title: 'ConsultExec for Gurugram',
    description: 'Delivering excellence through bespoke vertical transportation solutions.',
    status: 'BOOKING ASSIGNED',
    timeline: 'Assigned',
    price: 'RS 91,00,000',
    statusLabel: 'DESIGN IN PROGRESS',
    statusColor: 'text-purple-400'
  },
  {
    id: 'ID: 491007',
    title: 'ConsultExec for Allahabad',
    description: 'Comprehensive maintenance and support services ensuring long-term reliability.',
    status: 'BOOKING ASSIGNED',
    timeline: 'Assigned',
    price: 'RS 56,00,000',
    statusLabel: 'PENDING PAYMENT',
    statusColor: 'text-red-400'
  },
  {
    id: 'ID: 347851',
    title: 'ConsultExec for Chandigarh',
    description: 'NA',
    status: 'BOOKING ASSIGNED',
    timeline: 'Assigned',
    price: 'RS 69,00,000',
    statusLabel: 'INSPECTION SCHEDULED',
    statusColor: 'text-cyan-400'
  },
  {
    id: 'ID: 414943',
    title: 'ConsultExec for Indore',
    description: 'Premium lift installations with sophisticated design and superior engineering.',
    status: 'BOOKING ASSIGNED',
    timeline: 'Assigned',
    price: 'RS 73,00,000',
    statusLabel: 'MATERIALS ORDERED',
    statusColor: 'text-green-400'
  }
];

export function MyEngagementsPage() {
  const handleCallback = (engagementId: string) => {
    alert(`Callback requested for ${engagementId}`);
  };

  return (
    <div className="min-h-screen bg-[#1a3332]">
      <Navigation />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600"
          alt="My Engagements Background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      {/* Page Content */}
      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-orange-500 text-xs uppercase tracking-widest mb-3">
              CLIENT PORTAL AREA
            </p>
            <h1 className="text-white mb-4">
              <span className="text-4xl md:text-5xl">My </span>
              <span className="font-['Great_Vibes'] text-5xl md:text-6xl text-orange-500">
                Engagements
              </span>
            </h1>
            <div className="w-24 h-0.5 bg-orange-500 mx-auto"></div>
          </motion.div>

          {/* Engagements List */}
          <div className="space-y-6">
            {engagements.map((engagement, index) => (
              <motion.div
                key={engagement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6 hover:border-orange-500/40 transition-all"
              >
                <div className="flex items-start gap-6">
                  {/* Medal Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/40 rounded-full flex items-center justify-center">
                      <Medal size={24} className="text-orange-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      {/* ID */}
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                          Project ID
                        </p>
                        <p className="text-white font-semibold font-['Inter']">
                          {engagement.id}
                        </p>
                      </div>

                      {/* Status */}
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                          Status
                        </p>
                        <p className="text-white text-sm font-['Inter']">
                          {engagement.status}
                        </p>
                      </div>

                      {/* Timeline */}
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                          Timeline
                        </p>
                        <p className="text-white text-sm font-['Inter']">
                          {engagement.timeline}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                          Project Value
                        </p>
                        <p className={`text-lg font-bold font-['Inter'] ${engagement.statusColor}`}>
                          {engagement.price}
                        </p>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-white text-lg font-semibold mb-2">
                      {engagement.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/60 text-sm mb-4 leading-relaxed">
                      {engagement.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      {/* Status Label */}
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${engagement.statusColor.replace('text-', 'bg-')}`}></div>
                        <span className={`text-xs uppercase tracking-wider font-semibold font-['Inter'] ${engagement.statusColor}`}>
                          {engagement.statusLabel}
                        </span>
                      </div>

                      {/* Callback Button */}
                      <button
                        onClick={() => handleCallback(engagement.id)}
                        className="flex items-center gap-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 hover:border-orange-500 text-orange-500 px-4 py-2 rounded-full transition-all text-sm uppercase tracking-wider font-semibold"
                      >
                        <Phone size={14} />
                        <span>Callback</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State Message (if no engagements) */}
          {engagements.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6">
                <Medal size={40} className="text-orange-500" />
              </div>
              <h3 className="text-white text-2xl font-semibold mb-3">
                No Engagements Yet
              </h3>
              <p className="text-white/60 max-w-md mx-auto">
                You don't have any active projects or bookings at the moment. 
                Explore our collection to start your vertical mobility journey.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
