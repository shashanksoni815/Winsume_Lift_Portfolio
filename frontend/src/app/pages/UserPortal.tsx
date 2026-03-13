import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
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

export function UserPortal() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'documents' | 'messages'>('overview');

  // Mock user data
  const userData = {
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 98765 43210',
    joinDate: '2023-10-15',
    totalProjects: 3,
    activeProjects: 1,
    completedProjects: 2
  };

  const [engagements] = useState<Engagement[]>([
    {
      id: 'ENG001',
      projectName: 'Luxury Villa Lift Installation',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      location: 'Mumbai, Maharashtra',
      progress: 74,
      type: 'Residential'
    },
    {
      id: 'ENG002',
      projectName: 'Panoramic Glass Elevator',
      status: 'completed',
      startDate: '2023-08-01',
      endDate: '2024-01-15',
      location: 'Delhi, Delhi',
      progress: 100,
      type: 'Commercial'
    },
    {
      id: 'ENG003',
      projectName: 'Smart Home Lift System',
      status: 'pending',
      startDate: '2024-04-01',
      endDate: '2024-08-31',
      location: 'Bangalore, Karnataka',
      progress: 0,
      type: 'Residential'
    }
  ]);

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
                {userData.name.charAt(0)}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-white text-2xl font-semibold mb-2">{userData.name}</h2>
                <div className="flex flex-col sm:flex-row gap-4 text-white/60 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-orange-500" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-orange-500" />
                    <span>{userData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-orange-500" />
                    <span>Joined {userData.joinDate}</span>
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
                  <p className="text-white text-3xl font-bold">{userData.totalProjects}</p>
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
                  <p className="text-white text-3xl font-bold">{userData.activeProjects}</p>
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
                  <p className="text-white text-3xl font-bold">{userData.completedProjects}</p>
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
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'overview' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Overview
            </button>
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
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'documents' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Documents
            </button>
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
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6">
                  <h3 className="text-white text-xl font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Bell size={18} className="text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">Project update: Luxury Villa Lift Installation</p>
                        <p className="text-white/40 text-xs mt-1">Progress updated to 74% - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                        <CheckCircle2 size={18} className="text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">Panoramic Glass Elevator completed</p>
                        <p className="text-white/40 text-xs mt-1">Project marked as completed - 1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                        <FileText size={18} className="text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">New document uploaded: Installation Manual.pdf</p>
                        <p className="text-white/40 text-xs mt-1">Added to your documents - 3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6">
                  <h3 className="text-white text-xl font-semibold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group">
                      <div className="flex items-center gap-3">
                        <FileText className="text-orange-500" size={20} />
                        <span className="text-white">View Documents</span>
                      </div>
                      <ChevronRight className="text-white/40 group-hover:text-orange-500" size={20} />
                    </button>
                    <button className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="text-orange-500" size={20} />
                        <span className="text-white">Send Message</span>
                      </div>
                      <ChevronRight className="text-white/40 group-hover:text-orange-500" size={20} />
                    </button>
                    <button className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group">
                      <div className="flex items-center gap-3">
                        <Download className="text-orange-500" size={20} />
                        <span className="text-white">Download Reports</span>
                      </div>
                      <ChevronRight className="text-white/40 group-hover:text-orange-500" size={20} />
                    </button>
                    <button className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group">
                      <div className="flex items-center gap-3">
                        <Settings className="text-orange-500" size={20} />
                        <span className="text-white">Account Settings</span>
                      </div>
                      <ChevronRight className="text-white/40 group-hover:text-orange-500" size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-4">
                {engagements.map((engagement) => (
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
                ))}
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6">
                <h3 className="text-white text-xl font-semibold mb-6">Project Documents</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Installation Manual.pdf', size: '2.4 MB', date: '2024-03-10' },
                    { name: 'Safety Guidelines.pdf', size: '1.8 MB', date: '2024-03-08' },
                    { name: 'Warranty Certificate.pdf', size: '856 KB', date: '2024-03-05' },
                    { name: 'Maintenance Schedule.pdf', size: '1.2 MB', date: '2024-03-01' }
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                          <FileText className="text-orange-500" size={20} />
                        </div>
                        <div>
                          <p className="text-white font-medium">{doc.name}</p>
                          <p className="text-white/40 text-sm">{doc.size} • {doc.date}</p>
                        </div>
                      </div>
                      <button className="p-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-all">
                        <Download size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6">
                <h3 className="text-white text-xl font-semibold mb-6">Messages</h3>
                <div className="space-y-4">
                  {[
                    { from: 'Project Manager', subject: 'Project Update', time: '2 hours ago', unread: true },
                    { from: 'Support Team', subject: 'Welcome to Winsume Lift', time: '1 day ago', unread: false },
                    { from: 'Admin', subject: 'Invoice Generated', time: '3 days ago', unread: false }
                  ].map((message, index) => (
                    <div key={index} className={`p-4 border rounded-lg transition-all cursor-pointer ${message.unread ? 'bg-orange-500/5 border-orange-500/20 hover:bg-orange-500/10' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                            <User size={16} className="text-orange-500" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{message.from}</p>
                            <p className="text-white/40 text-xs">{message.time}</p>
                          </div>
                        </div>
                        {message.unread && (
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-white/70 text-sm ml-10">{message.subject}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
