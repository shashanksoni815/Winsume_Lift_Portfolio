import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import React from 'react';
import {
  ArrowLeft,
  Activity,
  LogIn,
  LogOut,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  Eye,
  Settings,
  Users,
  FileText,
  Calendar,
  Clock,
  Filter,
  Search
} from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { AdminSidebar } from '../../components/AdminSidebar';

interface ActivityLog {
  id: string;
  action: string;
  type: 'login' | 'logout' | 'create' | 'edit' | 'delete' | 'download' | 'upload' | 'view' | 'settings';
  details: string;
  timestamp: string;
  ipAddress: string;
}

export function AdminActivity() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const activityLogs: ActivityLog[] = [
    {
      id: 'ACT001',
      action: 'Logged in to admin portal',
      type: 'login',
      details: 'Successful login from Mumbai, Maharashtra',
      timestamp: '2 hours ago',
      ipAddress: '192.168.1.1'
    },
    {
      id: 'ACT002',
      action: 'Updated user permissions',
      type: 'edit',
      details: 'Modified permissions for user USR003',
      timestamp: '3 hours ago',
      ipAddress: '192.168.1.1'
    },
    {
      id: 'ACT003',
      action: 'Created new project',
      type: 'create',
      details: 'Added project "Luxury Villa Lift Installation"',
      timestamp: '5 hours ago',
      ipAddress: '192.168.1.1'
    },
    {
      id: 'ACT004',
      action: 'Downloaded analytics report',
      type: 'download',
      details: 'Monthly analytics report for February 2026',
      timestamp: '1 day ago',
      ipAddress: '192.168.1.1'
    },
    {
      id: 'ACT005',
      action: 'Deleted inquiry',
      type: 'delete',
      details: 'Removed spam inquiry INQ045',
      timestamp: '1 day ago',
      ipAddress: '192.168.1.1'
    },
    {
      id: 'ACT006',
      action: 'Uploaded project images',
      type: 'upload',
      details: 'Added 5 images to project PRJ012',
      timestamp: '2 days ago',
      ipAddress: '192.168.1.1'
    },
    {
      id: 'ACT007',
      action: 'Viewed user details',
      type: 'view',
      details: 'Accessed profile of user USR008',
      timestamp: '2 days ago',
      ipAddress: '192.168.1.1'
    },
    {
      id: 'ACT008',
      action: 'Updated system settings',
      type: 'settings',
      details: 'Modified email notification preferences',
      timestamp: '3 days ago',
      ipAddress: '192.168.1.1'
    },
    {
      id: 'ACT009',
      action: 'Logged out',
      type: 'logout',
      details: 'Session ended normally',
      timestamp: '3 days ago',
      ipAddress: '192.168.1.1'
    },
    {
      id: 'ACT010',
      action: 'Logged in to admin portal',
      type: 'login',
      details: 'Successful login from Mumbai, Maharashtra',
      timestamp: '3 days ago',
      ipAddress: '192.168.1.1'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <LogIn className="text-green-400" size={20} />;
      case 'logout':
        return <LogOut className="text-red-400" size={20} />;
      case 'create':
        return <Plus className="text-blue-400" size={20} />;
      case 'edit':
        return <Edit className="text-yellow-400" size={20} />;
      case 'delete':
        return <Trash2 className="text-red-400" size={20} />;
      case 'download':
        return <Download className="text-purple-400" size={20} />;
      case 'upload':
        return <Upload className="text-orange-400" size={20} />;
      case 'view':
        return <Eye className="text-cyan-400" size={20} />;
      case 'settings':
        return <Settings className="text-pink-400" size={20} />;
      default:
        return <Activity className="text-white/40" size={20} />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'login':
        return 'bg-green-500/20 border-green-500/30';
      case 'logout':
        return 'bg-red-500/20 border-red-500/30';
      case 'create':
        return 'bg-blue-500/20 border-blue-500/30';
      case 'edit':
        return 'bg-yellow-500/20 border-yellow-500/30';
      case 'delete':
        return 'bg-red-500/20 border-red-500/30';
      case 'download':
        return 'bg-purple-500/20 border-purple-500/30';
      case 'upload':
        return 'bg-orange-500/20 border-orange-500/30';
      case 'view':
        return 'bg-cyan-500/20 border-cyan-500/30';
      case 'settings':
        return 'bg-pink-500/20 border-pink-500/30';
      default:
        return 'bg-white/10 border-white/20';
    }
  };

  const filteredLogs = activityLogs.filter((log) => {
    const matchesFilter = selectedFilter === 'all' || log.type === selectedFilter;
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a1514]">
      <AdminSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      <div className="fixed inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600"
          alt="Activity Background"
          className="w-full h-full object-cover opacity-5"
        />
      </div>

      <div
        className="relative z-10 transition-all duration-300 pt-8 pb-20 px-6"
        style={{ marginLeft: sidebarCollapsed ? '80px' : '280px' }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="flex items-center gap-2 text-white/60 hover:text-orange-500 transition-all mb-6"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Activity size={32} className="text-white" />
              </div>
              <div>
                <p className="text-orange-500 text-xs uppercase tracking-widest mb-1">ADMIN ACCOUNT</p>
                <h1 className="text-white text-4xl font-bold">Activity Log</h1>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-lg pl-12 pr-6 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40"
                />
              </div>

              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
              >
                <option value="all">All Activities</option>
                <option value="login">Login</option>
                <option value="logout">Logout</option>
                <option value="create">Create</option>
                <option value="edit">Edit</option>
                <option value="delete">Delete</option>
                <option value="download">Download</option>
                <option value="upload">Upload</option>
                <option value="view">View</option>
                <option value="settings">Settings</option>
              </select>
            </div>
          </motion.div>

          {/* Activity Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6">
              <p className="text-white/60 text-sm mb-1">Today</p>
              <p className="text-white text-3xl font-bold">12</p>
            </div>
            <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6">
              <p className="text-white/60 text-sm mb-1">This Week</p>
              <p className="text-white text-3xl font-bold">47</p>
            </div>
            <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6">
              <p className="text-white/60 text-sm mb-1">This Month</p>
              <p className="text-white text-3xl font-bold">186</p>
            </div>
            <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6">
              <p className="text-white/60 text-sm mb-1">All Time</p>
              <p className="text-white text-3xl font-bold">1,247</p>
            </div>
          </motion.div>

          {/* Activity Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-8"
          >
            <h2 className="text-white text-2xl font-semibold mb-6">Recent Activities</h2>

            <div className="space-y-4">
              {filteredLogs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex items-start gap-4 p-4 border rounded-lg ${getActivityColor(log.type)}`}
                >
                  <div className="w-10 h-10 bg-[#0a1514]/50 rounded-full flex items-center justify-center flex-shrink-0">
                    {getActivityIcon(log.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className="text-white font-semibold">{log.action}</h3>
                      <div className="flex items-center gap-2 text-white/60 text-sm flex-shrink-0">
                        <Clock size={14} />
                        <span>{log.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm mb-2">{log.details}</p>
                    <div className="flex items-center gap-4 text-white/40 text-xs">
                      <span>ID: {log.id}</span>
                      <span>•</span>
                      <span>IP: {log.ipAddress}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredLogs.length === 0 && (
              <div className="text-center py-12">
                <Activity className="mx-auto text-white/20 mb-4" size={48} />
                <p className="text-white/40">No activities found matching your criteria</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
