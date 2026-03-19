import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Shield,
  Edit,
  Save,
  X,
  Camera,
  Check
} from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { AdminSidebar } from '../../components/AdminSidebar';

export function AdminProfile() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    location: '',
    joinedDate: '',
    bio: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const adminFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/admin-login');
      throw new Error('Not authenticated');
    }
    const res = await fetch(input, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      localStorage.removeItem('isLoggedIn');
      navigate('/admin-login');
      throw new Error('Unauthorized');
    }
    return res;
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        const res = await adminFetch('https://winsume-lift-backend01.onrender.com/api/users/me/profile');
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          setLoadError(data?.message || 'Failed to load admin profile.');
          return;
        }
        const data = await res.json().catch(() => null);
        const u = data?.user;
        if (!u) {
          setLoadError('Admin profile not found.');
          return;
        }
        setFormData({
          fullName: u.fullName ?? u.email ?? 'Admin',
          email: u.email ?? '',
          phone: u.phone ?? '',
          role: u.role === 'admin' ? 'Admin' : 'User',
          department: u.department ?? '',
          location: [u.city, u.state].filter(Boolean).join(', '),
          joinedDate: u.createdAt ? new Date(u.createdAt).toISOString().slice(0, 10) : '',
          bio:
            u.company ||
            'Administrator account. You can update your profile details here for internal reference.',
        });
      } catch {
        setLoadError('Unable to load admin profile. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleSave = async () => {
    try {
      const payload: Record<string, unknown> = {
        fullName: formData.fullName,
        phone: formData.phone,
        company: formData.bio,
        city: formData.location.split(',')[0]?.trim() || undefined,
        state:
          formData.location.split(',').length > 1
            ? formData.location.split(',').slice(1).join(',').trim()
            : undefined,
      };
      const res = await adminFetch('https://winsume-lift-backend01.onrender.com/api/users/me/profile', {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        alert(data?.message || 'Failed to update profile.');
        return;
      }
      setIsEditing(false);
      alert('Profile updated successfully.');
    } catch {
      alert('Unable to update profile right now.');
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
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600"
          alt="Admin Background"
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

            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-500 text-xs uppercase tracking-widest mb-2">ACCOUNT</p>
                <h1 className="text-white text-4xl font-bold">My Profile</h1>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2"
                >
                  <Edit size={18} />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all flex items-center gap-2"
                  >
                    <Save size={18} />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all flex items-center gap-2"
                  >
                    <X size={18} />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-5xl font-bold">
                    {(formData.fullName || formData.email || 'A').charAt(0)}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all">
                      <Camera size={18} />
                    </button>
                  )}
                </div>
                <div className="mt-4 text-center">
                    <div className="px-4 py-1 bg-red-500/20 border border-red-500/30 rounded-full inline-block">
                    <p className="text-red-400 text-xs font-semibold uppercase">{formData.role || 'ADMIN'}</p>
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-white text-lg">
                        <User size={18} className="text-orange-500" />
                        <span>{formData.fullName}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-white text-lg">
                        <Mail size={18} className="text-orange-500" />
                        <span>{formData.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-white text-lg">
                        <Phone size={18} className="text-orange-500" />
                        <span>{formData.phone}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Department</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-white text-lg">
                        <Building2 size={18} className="text-orange-500" />
                        <span>{formData.department}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-white text-lg">
                        <MapPin size={18} className="text-orange-500" />
                        <span>{formData.location}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Joined Date</label>
                    <div className="flex items-center gap-2 text-white text-lg">
                      <Calendar size={18} className="text-orange-500" />
                        <span>{formData.joinedDate || '—'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 text-sm mb-2">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                      className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 resize-none"
                    />
                  ) : (
                    <p className="text-white/80 leading-relaxed">
                      {formData.bio ||
                        'Administrator account. Update your profile information for internal reference.'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Admin Permissions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-orange-500" size={24} />
              <h2 className="text-white text-2xl font-semibold">Admin Permissions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'User Management', enabled: true },
                { label: 'Project Management', enabled: true },
                { label: 'System Settings', enabled: true },
                { label: 'Analytics Access', enabled: true },
                { label: 'Financial Reports', enabled: true },
                { label: 'Data Export', enabled: true },
              ].map((permission) => (
                <div
                  key={permission.label}
                  className="flex items-center justify-between p-4 bg-[#0a1514]/50 border border-orange-500/20 rounded-lg"
                >
                  <span className="text-white">{permission.label}</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    permission.enabled ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {permission.enabled && <Check size={16} className="text-green-400" />}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
