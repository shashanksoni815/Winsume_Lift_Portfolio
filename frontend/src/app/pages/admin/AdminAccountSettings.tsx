import React, { useState } from 'react';
import { apiUrl, assetUrl } from "../../api";
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, Lock, Eye, EyeOff, Save, Key } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { AdminSidebar } from '../../components/AdminSidebar';

export function AdminAccountSettings() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    loginAlerts: true,
    sessionTimeout: '30',
    passwordExpiry: '90',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      alert('Please enter current and new password.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        navigate('/admin-login');
        return;
      }

      const res = await fetch(apiUrl('/users/me/password'), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      if (res.status === 401 || res.status === 403) {
        alert('Your session has expired. Please log in again.');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        localStorage.removeItem('isLoggedIn');
        navigate('/admin-login');
        return;
      }

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        alert(
          data?.message ||
            'Failed to update password. Please check your current password and try again.'
        );
        return;
      }

      alert(data?.message || 'Password updated successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch {
      alert('Unable to update password right now. Please try again later.');
    }
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
                <p className="text-orange-500 text-xs uppercase tracking-widest mb-1">
                  ADMIN ACCOUNT
                </p>
                <h1 className="text-white text-4xl font-bold">Account Settings</h1>
              </div>
            </div>
          </motion.div>

          {/* Security */}
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
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                      }
                      className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 pr-12"
                    />
                    <button
                      type="button"
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
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                      }
                      className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 pr-12"
                    />
                    <button
                      type="button"
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
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                    }
                    className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                  />
                </div>

                <button
                  type="button"
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
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          twoFactorAuth: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500" />
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
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          loginAlerts: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500" />
                  </label>
                </div>

                <div className="p-4 bg-[#0a1514]/50 border border-orange-500/20 rounded-lg">
                  <label className="block text-white font-medium mb-2">Session Timeout (minutes)</label>
                  <select
                    value={securitySettings.sessionTimeout}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        sessionTimeout: e.target.value,
                      })
                    }
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
        </div>
      </div>
    </div>
  );
}