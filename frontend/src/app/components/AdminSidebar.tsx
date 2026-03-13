import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Users,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  Globe,
  Activity,
  Shield,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: (collapsed: boolean) => void;
}

export function AdminSidebar({ isCollapsed, onToggle }: AdminSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin-dashboard', badge: null },
    { icon: FolderKanban, label: 'Projects', path: '/admin/projects', badge: '12' },
    { icon: MessageSquare, label: 'Inquiries', path: '/admin/inquiries', badge: '5' },
    { icon: Users, label: 'User Management', path: '/admin/users', badge: null },
    { icon: Globe, label: 'Portal Config', path: '/admin/portal-config', badge: null },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics', badge: null },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications', badge: '8' },
    { icon: Settings, label: 'Settings', path: '/admin/settings', badge: null },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    // Add logout logic here
    navigate('/admin-login');
  };

  return (
    <motion.div
      animate={{ width: isCollapsed ? '80px' : '280px' }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen bg-[#0a1514] border-r border-orange-500/20 z-[100] flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-orange-500/20 flex-shrink-0">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-white text-xl font-bold">WINSUME LIFT</h2>
              <p className="text-orange-500 text-xs uppercase tracking-wider">Admin Portal</p>
            </motion.div>
          )}
          <button
            onClick={() => onToggle(!isCollapsed)}
            className="p-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 transition-all flex-shrink-0"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <style>{`
          nav::-webkit-scrollbar {
            width: 4px;
          }
          nav::-webkit-scrollbar-track {
            background: transparent;
          }
          nav::-webkit-scrollbar-thumb {
            background: rgba(251, 115, 22, 0.3);
            border-radius: 2px;
          }
          nav::-webkit-scrollbar-thumb:hover {
            background: rgba(251, 115, 22, 0.5);
          }
        `}</style>
        {menuItems.map((item) => (
          <motion.button
            key={item.path}
            onClick={() => navigate(item.path)}
            whileHover={{ x: isCollapsed ? 0 : 4 }}
            className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all ${
              isActive(item.path)
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full flex-shrink-0">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </motion.button>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-orange-500/20 flex-shrink-0">
        {!isCollapsed ? (
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="w-full flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">Admin User</p>
                <p className="text-white/40 text-xs truncate">admin@winsume.com</p>
              </div>
              {showUserDropdown ? (
                <ChevronUp size={16} className="text-white/60" />
              ) : (
                <ChevronDown size={16} className="text-white/60" />
              )}
            </button>

            <AnimatePresence>
              {showUserDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-0 right-0 mb-2 bg-[#1a3332]/95 backdrop-blur-md border border-orange-500/20 rounded-lg overflow-hidden shadow-2xl"
                >
                  <button
                    onClick={() => {
                      navigate('/admin/profile');
                      setShowUserDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-orange-500/10 hover:text-white transition-all"
                  >
                    <User size={16} className="text-orange-500" />
                    <span className="text-sm">My Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate('/admin/activity');
                      setShowUserDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-orange-500/10 hover:text-white transition-all"
                  >
                    <Activity size={16} className="text-orange-500" />
                    <span className="text-sm">Activity Log</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate('/admin/account-settings');
                      setShowUserDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-orange-500/10 hover:text-white transition-all"
                  >
                    <Shield size={16} className="text-orange-500" />
                    <span className="text-sm">Account Settings</span>
                  </button>
                  <div className="h-px bg-orange-500/20"></div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowUserDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <LogOut size={16} />
                    <span className="text-sm">Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <button
              onClick={handleLogout}
              className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-all"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}