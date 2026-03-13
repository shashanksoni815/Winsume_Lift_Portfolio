import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  Clock,
  Trash2,
  CheckCheck,
  Filter,
  Search
} from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { AdminSidebar } from '../../components/AdminSidebar';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  time: string;
  read: boolean;
  category: string;
}

export function Notifications() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'NOT001',
      title: 'New Project Assigned',
      message: 'You have been assigned to the Mumbai Villa project. Review the details and requirements.',
      type: 'info',
      time: '5 minutes ago',
      read: false,
      category: 'Projects'
    },
    {
      id: 'NOT002',
      title: 'Payment Received',
      message: 'Payment of ₹25,00,000 received from Prestige Builders for Project PRJ002.',
      type: 'success',
      time: '1 hour ago',
      read: false,
      category: 'Payments'
    },
    {
      id: 'NOT003',
      title: 'Deadline Approaching',
      message: 'Project PRJ005 deadline is in 3 days. Ensure all tasks are on track.',
      type: 'warning',
      time: '2 hours ago',
      read: false,
      category: 'Deadlines'
    },
    {
      id: 'NOT004',
      title: 'New Inquiry Received',
      message: 'New inquiry from Kavita Singh regarding hospital lift system installation.',
      type: 'info',
      time: '3 hours ago',
      read: true,
      category: 'Inquiries'
    },
    {
      id: 'NOT005',
      title: 'System Maintenance',
      message: 'Scheduled system maintenance will occur tonight at 11 PM IST.',
      type: 'warning',
      time: '5 hours ago',
      read: true,
      category: 'System'
    },
    {
      id: 'NOT006',
      title: 'Document Uploaded',
      message: 'Safety compliance certificate has been uploaded for Project PRJ003.',
      type: 'success',
      time: '1 day ago',
      read: true,
      category: 'Documents'
    },
    {
      id: 'NOT007',
      title: 'Payment Overdue',
      message: 'Payment for Invoice INV-045 is overdue. Please follow up with the client.',
      type: 'error',
      time: '1 day ago',
      read: false,
      category: 'Payments'
    },
    {
      id: 'NOT008',
      title: 'Team Member Added',
      message: 'John Doe has been added to your team for Project PRJ001.',
      type: 'info',
      time: '2 days ago',
      read: true,
      category: 'Team'
    }
  ]);

  const filteredNotifications = notifications.filter((notif) => {
    const matchesFilter = filter === 'all' || (filter === 'read' ? notif.read : !notif.read);
    const matchesSearch = 
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle2;
      case 'warning':
        return AlertCircle;
      case 'error':
        return AlertCircle;
      default:
        return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-400 bg-green-400/10';
      case 'warning':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'error':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-blue-400 bg-blue-400/10';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#1a3332]">
      <AdminSidebar isCollapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      <div className="transition-all duration-300" style={{ marginLeft: sidebarCollapsed ? '80px' : '280px' }}>
        <div className="fixed inset-0 z-0" style={{ left: sidebarCollapsed ? '80px' : '280px' }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600"
            alt="Notifications Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="relative z-10 pt-8 pb-20 px-6">
          <div className="max-w-[1200px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
              <div className="text-center mb-6">
                <p className="text-orange-500 text-xs uppercase tracking-widest mb-3">ADMIN PORTAL AREA</p>
                <h1 className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-tight">
                  Notifications Center
                </h1>
                <div className="w-24 h-0.5 bg-orange-500 mx-auto mb-6"></div>
                <p className="text-white/60">{unreadCount} unread notifications</p>
              </div>

              <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2"
                >
                  <CheckCheck size={16} />
                  <span className="text-sm">Mark All as Read</span>
                </button>
                <div className="flex items-center gap-2 bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-1">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded text-sm transition-all ${filter === 'all' ? 'bg-orange-500 text-white' : 'text-white/60 hover:text-white'}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('unread')}
                    className={`px-4 py-2 rounded text-sm transition-all ${filter === 'unread' ? 'bg-orange-500 text-white' : 'text-white/60 hover:text-white'}`}
                  >
                    Unread ({unreadCount})
                  </button>
                  <button
                    onClick={() => setFilter('read')}
                    className={`px-4 py-2 rounded text-sm transition-all ${filter === 'read' ? 'bg-orange-500 text-white' : 'text-white/60 hover:text-white'}`}
                  >
                    Read
                  </button>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg pl-12 pr-6 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-3">
              {filteredNotifications.map((notification, index) => {
                const Icon = getNotificationIcon(notification.type);
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`bg-[#0a1514]/80 backdrop-blur-sm border rounded-lg p-5 transition-all ${
                      notification.read
                        ? 'border-orange-500/10 opacity-60'
                        : 'border-orange-500/30 hover:border-orange-500/40'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full ${getNotificationColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={20} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-white font-semibold mb-1">{notification.title}</h3>
                            <span className="text-xs text-orange-500 font-medium">{notification.category}</span>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          )}
                        </div>
                        
                        <p className="text-white/70 text-sm mb-3">{notification.message}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-white/40 text-xs">
                            <Clock size={12} />
                            <span>{notification.time}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="px-3 py-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded text-xs transition-all"
                              >
                                Mark as Read
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {filteredNotifications.length === 0 && (
              <div className="text-center py-12">
                <Bell className="mx-auto mb-4 text-white/20" size={48} />
                <p className="text-white/40">No notifications found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}