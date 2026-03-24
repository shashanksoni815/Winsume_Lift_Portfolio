import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import React from 'react';
import { motion } from 'motion/react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Bell,
  Shield,
  CreditCard,
  Save,
  ArrowLeft,
  Camera,
  Building2
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Navigation } from '../components/Navigation';

export function UserSettings() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'profile' | 'security' | 'notifications'>('profile');
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    company: ''
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    projectUpdates: true,
    marketingEmails: false,
    securityAlerts: true
  });

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch('https://winsume-lift-backend01.onrender.com/api/users/me/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res.status === 401) {
          navigate('/login');
          return;
        }

        const data = await res.json().catch(() => null);
        if (data?.user) {
          const u = data.user;
          setProfileData({
            name: u.fullName || '',
            email: u.email || '',
            phone: u.phone || '',
            address: u.address || '',
            city: u.city || '',
            state: u.state || '',
            pincode: u.pincode || '',
            company: u.company || '',
          });
        }
      } catch (error) {
        console.error('Failed to load profile', error);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleSaveProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login');
      return;
    }

    try {
      setIsSavingProfile(true);
      const res = await fetch('https://winsume-lift-backend01.onrender.com/api/users/me/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          fullName: profileData.name,
          phone: profileData.phone,
          company: profileData.company,
          address: profileData.address,
          city: profileData.city,
          state: profileData.state,
          pincode: profileData.pincode,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        const message = errData?.message ?? 'Failed to update profile.';
        alert(message);
        return;
      }

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to save profile', error);
      alert('Something went wrong while saving your profile.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login');
      return;
    }

    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      setIsChangingPassword(true);
      const res = await fetch('https://winsume-lift-backend01.onrender.com/api/users/me/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          currentPassword: securityData.currentPassword,
          newPassword: securityData.newPassword,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        const message = errData?.message ?? 'Failed to change password.';
        alert(message);
        return;
      }

      alert('Password changed successfully!');
      setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Failed to change password', error);
      alert('Something went wrong while changing your password.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleSaveNotifications = async () => {
    try {
      setIsSavingNotifications(true);
      // This is local-only for now; wire to backend later if needed.
      alert('Notification preferences updated!');
    } finally {
      setIsSavingNotifications(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1514]">
      <Navigation />
      
      <div className="fixed inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600"
          alt="Settings Background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate('/user-portal')}
              className="flex items-center gap-2 text-white/60 hover:text-orange-500 transition-all mb-6"
            >
              <ArrowLeft size={20} />
              <span>Back to Portal</span>
            </button>
            
            <div className="text-center">
              <p className="text-orange-500 text-xs uppercase tracking-widest mb-3">ACCOUNT MANAGEMENT</p>
              <h1 className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-tight">
                Settings
              </h1>
              <div className="w-24 h-0.5 bg-orange-500 mx-auto mb-6"></div>
              <p className="text-white/60 max-w-2xl mx-auto">
                Manage your account settings and preferences
              </p>
            </div>
          </motion.div>

          {/* Settings Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-2 mb-8 flex gap-2 overflow-x-auto"
          >
            <button
              onClick={() => setActiveSection('profile')}
              className={`px-6 py-3 rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
                activeSection === 'profile' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <User size={18} />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setActiveSection('security')}
              className={`px-6 py-3 rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
                activeSection === 'security' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Shield size={18} />
              <span>Security</span>
            </button>
            <button
              onClick={() => setActiveSection('notifications')}
              className={`px-6 py-3 rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
                activeSection === 'notifications' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Bell size={18} />
              <span>Notifications</span>
            </button>
          </motion.div>

          {/* Settings Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Profile Section */}
            {activeSection === 'profile' && (
              <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-8">
                <h2 className="text-white text-2xl font-semibold mb-6">Profile Information</h2>
                
                {/* Profile Picture */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                      {profileData.name.charAt(0)}
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all">
                      <Camera size={16} className="text-white" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-semibold">{profileData.name}</h3>
                    <p className="text-white/60 text-sm">Upload a new profile picture</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Company</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                      <input
                        type="text"
                        value={profileData.company}
                        onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                        className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-white/80 text-sm font-medium mb-2">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 text-white/40" size={18} />
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      value={profileData.city}
                      onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                      className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">State</label>
                    <input
                      type="text"
                      value={profileData.state}
                      onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                      className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Pincode</label>
                    <input
                      type="text"
                      value={profileData.pincode}
                      onChange={(e) => setProfileData({ ...profileData, pincode: e.target.value })}
                      className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSavingProfile}
                    className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2 disabled:opacity-60"
                  >
                    <Save size={18} />
                    <span>{isSavingProfile ? 'Saving…' : 'Save Changes'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-8">
                <h2 className="text-white text-2xl font-semibold mb-6">Security Settings</h2>
                
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                      <input
                        type="password"
                        value={securityData.currentPassword}
                        onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                        className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                        placeholder="Enter current password"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                      <input
                        type="password"
                        value={securityData.newPassword}
                        onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                        className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                      <input
                        type="password"
                        value={securityData.confirmPassword}
                        onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                        className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                    <p className="text-orange-400 text-sm">
                      <strong>Password Requirements:</strong> At least 8 characters with uppercase, lowercase, numbers, and special characters.
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleChangePassword}
                      disabled={isChangingPassword}
                      className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2 disabled:opacity-60"
                    >
                      <Save size={18} />
                      <span>{isChangingPassword ? 'Updating…' : 'Change Password'}</span>
                    </button>
                  </div>
                </div>

                <div className="border-t border-white/10 mt-8 pt-8">
                  <h3 className="text-white text-xl font-semibold mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between bg-[#0a1514]/50 border border-orange-500/20 rounded-lg p-4">
                    <div>
                      <p className="text-white font-medium">Enable 2FA</p>
                      <p className="text-white/60 text-sm">Add an extra layer of security to your account</p>
                    </div>
                    <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-8">
                <h2 className="text-white text-2xl font-semibold mb-6">Notification Preferences</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-[#0a1514]/50 border border-orange-500/20 rounded-lg p-4">
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-white/60 text-sm">Receive updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.emailNotifications}
                        onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between bg-[#0a1514]/50 border border-orange-500/20 rounded-lg p-4">
                    <div>
                      <p className="text-white font-medium">SMS Notifications</p>
                      <p className="text-white/60 text-sm">Receive updates via SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.smsNotifications}
                        onChange={(e) => setNotifications({ ...notifications, smsNotifications: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between bg-[#0a1514]/50 border border-orange-500/20 rounded-lg p-4">
                    <div>
                      <p className="text-white font-medium">Project Updates</p>
                      <p className="text-white/60 text-sm">Get notified about project progress</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.projectUpdates}
                        onChange={(e) => setNotifications({ ...notifications, projectUpdates: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between bg-[#0a1514]/50 border border-orange-500/20 rounded-lg p-4">
                    <div>
                      <p className="text-white font-medium">Marketing Emails</p>
                      <p className="text-white/60 text-sm">Receive promotional content and offers</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.marketingEmails}
                        onChange={(e) => setNotifications({ ...notifications, marketingEmails: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between bg-[#0a1514]/50 border border-orange-500/20 rounded-lg p-4">
                    <div>
                      <p className="text-white font-medium">Security Alerts</p>
                      <p className="text-white/60 text-sm">Important security notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.securityAlerts}
                        onChange={(e) => setNotifications({ ...notifications, securityAlerts: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                    <button
                      onClick={handleSaveNotifications}
                      disabled={isSavingNotifications}
                      className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2 disabled:opacity-60"
                  >
                    <Save size={18} />
                      <span>{isSavingNotifications ? 'Saving…' : 'Save Preferences'}</span>
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </div>
  );
}
