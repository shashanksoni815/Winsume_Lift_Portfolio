import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Lock,
  Globe,
  Mail,
  Shield,
  Eye,
  EyeOff,
  Save,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { AdminSidebar } from '../../components/AdminSidebar';

export function Settings() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'preferences'>('profile');
  const [showPassword, setShowPassword] = useState(false);

  const [profileSettings, setProfileSettings] = useState({
    name: 'Admin User',
    email: 'admin@winsume.com',
    phone: '+91 1800 123 4567',
    role: 'Super Admin',
    department: 'Management'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    projectUpdates: true,
    inquiryAlerts: true,
    paymentNotifications: true,
    systemAlerts: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: '30',
    passwordExpiry: '90'
  });

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon }
  ];

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#1a3332]">
      <AdminSidebar isCollapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      <div className="transition-all duration-300" style={{ marginLeft: sidebarCollapsed ? '80px' : '280px' }}>
        <div className="fixed inset-0 z-0" style={{ left: sidebarCollapsed ? '80px' : '280px' }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1600"
            alt="Settings Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="relative z-10 pt-8 pb-20 px-6">
          <div className="max-w-[1200px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
              <div className="text-center mb-6">
                <p className="text-orange-500 text-xs uppercase tracking-widest mb-3">ADMIN PORTAL AREA</p>
                <h1 className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-tight">
                  System Settings
                </h1>
                <div className="w-24 h-0.5 bg-orange-500 mx-auto mb-6"></div>
                <p className="text-white/60">Manage your account and system preferences</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-6">
              <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-2 flex items-center gap-2 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 min-w-[150px] px-4 py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <tab.icon size={18} />
                    <span className="text-sm font-medium whitespace-nowrap">{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                  <User className="text-orange-500" size={24} />
                  Profile Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileSettings.name}
                      onChange={(e) => setProfileSettings({ ...profileSettings, name: e.target.value })}
                      className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={profileSettings.email}
                      onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                      className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={profileSettings.phone}
                      onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
                      className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Role</label>
                      <input
                        type="text"
                        value={profileSettings.role}
                        disabled
                        className="w-full bg-[#1a3332]/50 border border-orange-500/10 rounded-lg px-4 py-3 text-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Department</label>
                      <input
                        type="text"
                        value={profileSettings.department}
                        onChange={(e) => setProfileSettings({ ...profileSettings, department: e.target.value })}
                        className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      />
                    </div>
                  </div>
                  <button className="w-full md:w-auto px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all font-medium flex items-center gap-2">
                    <Save size={18} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                  <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                    <Lock className="text-orange-500" size={24} />
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 pr-12"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">New Password</label>
                      <input
                        type="password"
                        className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      />
                    </div>
                    <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all font-medium">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                  <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                    <Shield className="text-orange-500" size={24} />
                    Security Preferences
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#1a3332]/50 border border-orange-500/10 rounded-lg">
                      <div>
                        <p className="text-white font-medium mb-1">Two-Factor Authentication</p>
                        <p className="text-white/60 text-sm">Add an extra layer of security</p>
                      </div>
                      <button className={`p-2 rounded-lg transition-all ${securitySettings.twoFactorAuth ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/40'}`}>
                        {securitySettings.twoFactorAuth ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                      </button>
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Session Timeout (minutes)</label>
                      <input
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                        className="w-full md:w-48 bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                  <Bell className="text-orange-500" size={24} />
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-[#1a3332]/50 border border-orange-500/10 rounded-lg hover:border-orange-500/20 transition-all">
                      <div>
                        <p className="text-white font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      </div>
                      <button
                        onClick={() => toggleNotification(key as any)}
                        className={`p-2 rounded-lg transition-all ${value ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/40'}`}
                      >
                        {value ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                      </button>
                    </div>
                  ))}
                  <button className="w-full md:w-auto px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all font-medium flex items-center gap-2">
                    <Save size={18} />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Preferences */}
            {activeTab === 'preferences' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                  <Globe className="text-orange-500" size={24} />
                  System Preferences
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Language</label>
                    <select className="w-full md:w-64 bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40">
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Marathi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Timezone</label>
                    <select className="w-full md:w-64 bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40">
                      <option>IST (UTC +5:30)</option>
                      <option>UTC</option>
                      <option>EST</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Date Format</label>
                    <select className="w-full md:w-64 bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  <button className="w-full md:w-auto px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all font-medium flex items-center gap-2">
                    <Save size={18} />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}