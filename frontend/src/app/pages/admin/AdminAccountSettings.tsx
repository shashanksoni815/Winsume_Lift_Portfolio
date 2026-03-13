import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Shield,
  Lock,
  Bell,
  Mail,
  Smartphone,
  Globe,
  Eye,
  EyeOff,
  Save,
  Key,
  AlertCircle,
  Check
} from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { AdminSidebar } from '../../components/AdminSidebar';

export function AdminAccountSettings() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'security' | 'notifications' | 'preferences'>('security');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    loginAlerts: true,
    sessionTimeout: '30',
    passwordExpiry: '90'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsAlerts: false,
    weeklyReport: true,
    systemUpdates: true,
    securityAlerts: true
  });

  const [preferenceSettings, setPreferenceSettings] = useState({
    language: 'en',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    currency: 'INR'
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-[#0a1514]">
      <AdminSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      <div className="fixed inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600"
          alt="Settings Background"
          className="w-full h-full object-cover opacity-5"
        />
      </div>

      <div
        className="relative z-10 transition-all duration-300 pt-8 pb-20 px-6"
        style={{ marginLeft: sidebarCollapsed ? '80px' : '280px' }}
      >
        <div className="max-w-5xl mx-auto">
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

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Shield size={32} className="text-white" />
              </div>
              <div>
                <p className="text-orange-500 text-xs uppercase tracking-widest mb-1">ADMIN ACCOUNT</p>
                <h1 className="text-white text-4xl font-bold">Account Settings</h1>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-2 mb-8 flex gap-2 overflow-x-auto"
          >
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'security' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'notifications' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'preferences' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Preferences
            </button>
          </motion.div>

          {/* Security Tab */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Change Password */}
              <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Key className="text-orange-500" size={24} />
                  <h2 className="text-white text-2xl font-semibold">Change Password</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 pr-12"
                      />
                      <button
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white"
                      >
                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 pr-12"
                      />
                      <button
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                    />
                  </div>

                  <button
                    onClick={handlePasswordChange}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2"
                  >
                    <Save size={18} />
                    <span>Update Password</span>
                  </button>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="text-orange-500" size={24} />
                  <h2 className="text-white text-2xl font-semibold">Security Settings</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#0a1514]/50 border border-orange-500/20 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Two-Factor Authentication</p>
                      <p className="text-white/60 text-sm">Add an extra layer of security</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={securitySettings.twoFactorAuth}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#0a1514]/50 border border-orange-500/20 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Login Alerts</p>
                      <p className="text-white/60 text-sm">Receive alerts for new login attempts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={securitySettings.loginAlerts}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, loginAlerts: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>

                  <div className="p-4 bg-[#0a1514]/50 border border-orange-500/20 rounded-lg">
                    <label className="block text-white font-medium mb-2">Session Timeout (minutes)</label>
                    <select
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                      className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Bell className="text-orange-500" size={24} />
                <h2 className="text-white text-2xl font-semibold">Notification Preferences</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#0a1514]/50 border border-orange-500/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="text-orange-500" size={20} />
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-white/60 text-sm">Receive updates via email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0a1514]/50 border border-orange-500/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="text-orange-500" size={20} />
                    <div>
                      <p className="text-white font-medium">Push Notifications</p>
                      <p className="text-white/60 text-sm">Browser notifications</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.pushNotifications}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, pushNotifications: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0a1514]/50 border border-orange-500/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone className="text-orange-500" size={20} />
                    <div>
                      <p className="text-white font-medium">SMS Alerts</p>
                      <p className="text-white/60 text-sm">Critical alerts via SMS</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.smsAlerts}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, smsAlerts: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0a1514]/50 border border-orange-500/20 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Weekly Reports</p>
                    <p className="text-white/60 text-sm">Receive weekly analytics reports</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.weeklyReport}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, weeklyReport: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0a1514]/50 border border-orange-500/20 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Security Alerts</p>
                    <p className="text-white/60 text-sm">Important security notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.securityAlerts}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, securityAlerts: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Globe className="text-orange-500" size={24} />
                <h2 className="text-white text-2xl font-semibold">General Preferences</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Language</label>
                  <select
                    value={preferenceSettings.language}
                    onChange={(e) => setPreferenceSettings({ ...preferenceSettings, language: e.target.value })}
                    className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="mr">Marathi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Timezone</label>
                  <select
                    value={preferenceSettings.timezone}
                    onChange={(e) => setPreferenceSettings({ ...preferenceSettings, timezone: e.target.value })}
                    className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Date Format</label>
                  <select
                    value={preferenceSettings.dateFormat}
                    onChange={(e) => setPreferenceSettings({ ...preferenceSettings, dateFormat: e.target.value })}
                    className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Currency</label>
                  <select
                    value={preferenceSettings.currency}
                    onChange={(e) => setPreferenceSettings({ ...preferenceSettings, currency: e.target.value })}
                    className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>

                <button
                  onClick={() => alert('Preferences saved!')}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2"
                >
                  <Save size={18} />
                  <span>Save Preferences</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
