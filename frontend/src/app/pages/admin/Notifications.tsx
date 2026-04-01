import { useEffect, useMemo, useState } from 'react';
import { apiUrl, assetUrl } from "../../api";
import { motion } from 'motion/react';
import React from 'react';
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  Clock,
  Trash2,
  CheckCheck,
  Search
} from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { AdminSidebar } from '../../components/AdminSidebar';

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  read: boolean;
  category: string;
  createdAt: string;
}

export function Notifications() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const adminFetch = async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) throw new Error('Authentication required');
    const res = await fetch(input, {
      ...init,
      headers: {
        ...(init.headers || {}),
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/admin-login';
      throw new Error('Unauthorized');
    }
    return res;
  };

  const load = async () => {
    try {
      setIsLoading(true);
      setLoadError(null);
      const endpoint = apiUrl('/notifications');
      const params = new URLSearchParams();
      params.set('filter', filter);
      if (searchQuery.trim()) params.set('search', searchQuery.trim());
      params.set('limit', '200');
      params.set('offset', '0');
      const requestUrl = `${endpoint}${endpoint.includes('?') ? '&' : '?'}${params.toString()}`;

      const res = await adminFetch(requestUrl);
      const data = await res.json().catch(() => null);
      const items = Array.isArray(data?.items) ? data.items : [];
      setNotifications(items);
      setUnreadCount(typeof data?.unreadCount === 'number' ? data.unreadCount : 0);
    } catch (e: any) {
      setLoadError(e?.message || 'Failed to load notifications');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const filteredNotifications = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return notifications;
    return notifications.filter((n) => {
      return (
        n.title.toLowerCase().includes(q) ||
        n.message.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q)
      );
    });
  }, [notifications, searchQuery]);

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

  const markAsRead = async (id: string) => {
    try {
      await adminFetch(apiUrl(`/notifications/${id}/read`), { method: 'PATCH' });
      await load();
    } catch (e) {
      // ignore
    }
  };

  const markAllAsRead = async () => {
    try {
      await adminFetch(apiUrl('/notifications/mark-all-read'), { method: 'POST' });
      await load();
    } catch (e) {
      // ignore
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await adminFetch(apiUrl(`/notifications/${id}`), { method: 'DELETE' });
      await load();
    } catch (e) {
      // ignore
    }
  };

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

            {loadError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg p-4 mb-4">
                {loadError}
              </div>
            )}

            {isLoading && notifications.length === 0 && (
              <div className="text-white/60 text-sm">Loading notifications…</div>
            )}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-3">
              {filteredNotifications.map((notification, index) => {
                const Icon = getNotificationIcon(notification.type);
                const timeLabel = notification.createdAt
                  ? new Date(notification.createdAt).toLocaleString()
                  : '';
                return (
                  <motion.div
                    key={notification._id}
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
                            <span>{timeLabel}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification._id)}
                                className="px-3 py-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded text-xs transition-all"
                              >
                                Mark as Read
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification._id)}
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

            {!isLoading && filteredNotifications.length === 0 && (
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