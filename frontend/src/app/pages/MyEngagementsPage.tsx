import { useEffect, useState } from 'react';
import { apiUrl, assetUrl } from "../api";
import { useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Medal, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import React from 'react';

interface Engagement {
  id: string;
  title: string;
  description: string;
  status: string;
  timeline: string;
  price: string;
  statusLabel: string;
  statusColor: string;
}

export function MyEngagementsPage() {
  const navigate = useNavigate();
  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEngagements = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        navigate('/login');
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch(apiUrl('/projects/user/me'), {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('userRole');
          localStorage.removeItem('isLoggedIn');
          navigate('/login');
          return;
        }

        const data = await res.json().catch(() => null);
        const items = Array.isArray(data?.items) ? data.items : [];

        const mapped: Engagement[] = items.map((p: any) => {
          const status = p.status ?? 'pending';
          let statusLabel = 'AWAITING APPROVAL';
          let statusColor = 'text-yellow-400';

          if (status === 'in-progress') {
            statusLabel = 'INSTALLATION ONGOING';
            statusColor = 'text-blue-400';
          } else if (status === 'completed') {
            statusLabel = 'PROJECT COMPLETED';
            statusColor = 'text-green-400';
          } else if (status === 'on-hold') {
            statusLabel = 'ON HOLD';
            statusColor = 'text-red-400';
          }

          const price =
            typeof p.budget === 'number'
              ? `₹ ${p.budget.toLocaleString('en-IN')}`
              : '—';

          const start = p.startDate ? new Date(p.startDate).toISOString().slice(0, 10) : '';
          const end = p.endDate ? new Date(p.endDate).toISOString().slice(0, 10) : '';
          const timeline =
            start && end ? `${start} – ${end}` : start || end || 'Not scheduled';

          return {
            id: p.externalId || `ID: ${p._id?.slice(-6) || ''}`,
            title: p.name || 'Project',
            description: p.description || 'No description available.',
            status: status.toUpperCase(),
            timeline,
            price,
            statusLabel,
            statusColor,
          };
        });

        setEngagements(mapped);
      } catch (error) {
        console.error('Failed to load engagements', error);
        setEngagements([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadEngagements();
  }, [navigate]);

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

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-white/70"
            >
              Loading your engagements…
            </motion.div>
          )}

          {/* Engagements List */}
          {!isLoading && engagements.length > 0 && (
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
          )}

          {/* Empty State Message (if no engagements) */}
          {!isLoading && engagements.length === 0 && (
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
