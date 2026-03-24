import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import React from 'react';
import {
  Package,
  Clock,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  User,
  Settings,
  Calendar,
  FileText,
  MessageSquare,
  Bell,
  ChevronRight,
  Download,
  Eye
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Navigation } from '../components/Navigation';

interface Engagement {
  id: string;
  projectName: string;
  status: 'active' | 'completed' | 'pending';
  startDate: string;
  endDate: string;
  location: string;
  progress: number;
  type: string;
}

interface UserData {
  name: string;
  email: string;
  phone?: string;
  joinDate?: string;
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
}

interface UserInquiry {
  _id: string;
  externalId: string;
  subject?: string;
  message: string;
  type?: string;
  status: 'new' | 'in-review' | 'responded' | 'closed';
  createdAt: string;
}

export function UserPortal() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'documents' | 'messages'>('overview');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [inquiries, setInquiries] = useState<UserInquiry[]>([]);
  const [documents, setDocuments] = useState<
    { _id: string; name: string; url: string; sizeBytes?: number; createdAt: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        navigate('/login');
        return;
      }

      try {
        setIsLoading(true);
        const [profileRes, inquiriesRes, projectsRes, documentsRes] = await Promise.all([
          fetch('https://winsume-lift-backend01.onrender.com/api/users/me/profile', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          fetch('https://winsume-lift-backend01.onrender.com/api/inquiries/user', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          fetch('https://winsume-lift-backend01.onrender.com/api/projects/user/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          fetch('https://winsume-lift-backend01.onrender.com/api/documents/user/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
        ]);

        if (profileRes.status === 401 || profileRes.status === 403) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('userRole');
          localStorage.removeItem('isLoggedIn');
          navigate('/login');
          return;
        }

        const profileData = await profileRes.json().catch(() => null);
        const inquiriesData = await inquiriesRes.json().catch(() => null);
        const projectsData = await projectsRes.json().catch(() => null);
        const documentsData = await documentsRes.json().catch(() => null);

        const projectItems = Array.isArray(projectsData?.items) ? projectsData.items : [];
        const engagementItems: Engagement[] = projectItems.map((p: any) => ({
          id: p.externalId || p._id,
          projectName: p.name,
          status: p.status === 'in-progress' ? 'active' : (p.status ?? 'pending'),
          startDate: p.startDate ? new Date(p.startDate).toISOString().slice(0, 10) : '—',
          endDate: p.endDate ? new Date(p.endDate).toISOString().slice(0, 10) : '—',
          location: p.location ?? 'Not specified',
          progress: typeof p.progress === 'number' ? p.progress : 0,
          type: p.type ?? 'Project',
        }));
        setEngagements(engagementItems);

        if (profileData?.user) {
          const u = profileData.user;
          const totalProjects = engagementItems.length;
          const activeProjects = engagementItems.filter((p) => p.status === 'active').length;
          const completedProjects = engagementItems.filter((p) => p.status === 'completed').length;

          setUserData({
            name: u.fullName || u.email,
            email: u.email,
            phone: u.phone,
            joinDate: u.createdAt ? new Date(u.createdAt).toISOString().slice(0, 10) : undefined,
            totalProjects,
            activeProjects,
            completedProjects,
          });
        } else {
          setUserData(null);
        }

        if (Array.isArray(inquiriesData?.items)) {
          setInquiries(inquiriesData.items);
        } else {
          setInquiries([]);
        }

        if (Array.isArray(documentsData?.items)) {
          setDocuments(
            documentsData.items.map((d: any) => ({
              _id: d._id,
              name: d.name,
              url: d.url,
              sizeBytes: d.sizeBytes,
              createdAt: d.createdAt,
            }))
          );
        } else {
          setDocuments([]);
        }
      } catch (error) {
        console.error('Failed to load user portal data', error);
        setUserData(null);
        setInquiries([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1514]">
      <Navigation />
      
      <div className="fixed inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600"
          alt="User Portal Background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-orange-500 text-xs uppercase tracking-widest mb-3">CLIENT DASHBOARD</p>
            <h1 className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-tight">
              User Portal
            </h1>
            <div className="w-24 h-0.5 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-white/60 max-w-2xl mx-auto">
              Track your projects, view documents, and manage your engagements
            </p>
          </motion.div>

          {/* User Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {(userData?.name || userData?.email || 'U').charAt(0)}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-white text-2xl font-semibold mb-2">
                  {userData?.name || 'User'}
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 text-white/60 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-orange-500" />
                    <span>{userData?.email || 'Not available'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-orange-500" />
                    <span>{userData?.phone || 'Not available'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-orange-500" />
                    <span>Joined {userData?.joinDate || '—'}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/user-settings')}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2"
              >
                <Settings size={18} />
                <span>Settings</span>
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Package size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-sm uppercase tracking-wider">Total Projects</p>
                  <p className="text-white text-3xl font-bold">{userData?.totalProjects ?? 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Clock size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-sm uppercase tracking-wider">Active</p>
                  <p className="text-white text-3xl font-bold">{userData?.activeProjects ?? 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircle2 size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-sm uppercase tracking-wider">Completed</p>
                  <p className="text-white text-3xl font-bold">{userData?.completedProjects ?? 0}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-2 mb-8 flex gap-2 overflow-x-auto"
          >
            {/* <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'overview' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Overview
            </button> */}
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'projects' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              My Projects
            </button>
            {/* <button
              onClick={() => setActiveTab('documents')}
              className={`px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'documents' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Documents
            </button> */}
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'messages' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Messages
            </button>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {isLoading && (
              <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-8 text-center text-white/70">
                Loading your dashboard…
              </div>
            )}

            {!isLoading && activeTab === 'overview' && (
              <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6">
                <h3 className="text-white text-xl font-semibold mb-4">Recent Activity</h3>
                <p className="text-white/60 text-sm">
                  Activity details will appear here as your projects progress.
                </p>
              </div>
            )}

            {!isLoading && activeTab === 'projects' && (
              <div className="space-y-4">
                {engagements.length === 0 ? (
                  <p className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6 text-white/60 text-sm">
                    No projects are linked to your account yet.
                  </p>
                ) : (
                  engagements.map((engagement) => (
                    <div key={engagement.id} className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6 hover:border-orange-500/40 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-white text-xl font-semibold">{engagement.projectName}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border uppercase ${getStatusBadge(engagement.status)}`}>
                              {engagement.status}
                            </span>
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-semibold">
                              {engagement.type}
                            </span>
                          </div>
                          <p className="text-white/60 text-sm mb-3">{engagement.id}</p>
                          
                          <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
                            <MapPin size={16} className="text-orange-500" />
                            <span>{engagement.location}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-white/40 text-xs mb-1">Start Date</p>
                              <p className="text-white font-semibold">{engagement.startDate}</p>
                            </div>
                            <div>
                              <p className="text-white/40 text-xs mb-1">End Date</p>
                              <p className="text-white font-semibold">{engagement.endDate}</p>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white/60 text-sm">Progress</span>
                              <span className="text-orange-500 font-semibold">{engagement.progress}%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all" 
                                style={{ width: `${engagement.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <button className="ml-4 p-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-all">
                          <Eye size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {!isLoading && activeTab === 'documents' && (
              <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6">
                <h3 className="text-white text-xl font-semibold mb-6">Project Documents</h3>
                {documents.length === 0 ? (
                  <p className="text-white/50 text-sm">
                    No documents are available for your account yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc._id} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                            <FileText className="text-orange-500" size={20} />
                          </div>
                          <div>
                            <p className="text-white font-medium">{doc.name}</p>
                            <p className="text-white/40 text-sm">
                              {(doc.sizeBytes ? `${(doc.sizeBytes / (1024 * 1024)).toFixed(1)} MB • ` : '')}
                              {new Date(doc.createdAt).toISOString().slice(0, 10)}
                            </p>
                          </div>
                        </div>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-all"
                        >
                          <Download size={18} />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {!isLoading && activeTab === 'messages' && (
              <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6">
                <h3 className="text-white text-xl font-semibold mb-6">Your Inquiries</h3>
                {inquiries.length === 0 ? (
                  <p className="text-white/50 text-sm">
                    You have not submitted any inquiries yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map((inq) => (
                      <div
                        key={inq._id}
                        className="p-4 border rounded-lg transition-all bg-white/5 border-white/10 hover:bg-white/10"
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                              <User size={16} className="text-orange-500" />
                            </div>
                            <div>
                              <p className="text-white font-medium">
                                {inq.subject || inq.type || 'Inquiry'}
                              </p>
                              <p className="text-white/40 text-xs">
                                {new Date(inq.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <span className="px-2 py-1 rounded-full text-[10px] uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/30">
                            {inq.status}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm mt-2">
                          {inq.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
