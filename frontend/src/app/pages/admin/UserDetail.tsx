import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Shield,
  Edit,
  Trash2,
  Check,
  X,
  User,
  MapPin,
  Building2,
  Clock,
  Activity,
  FileText,
  Package,
  MessageSquare,
  Bell,
  Lock,
  Ban,
  CheckCircle2,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { AdminSidebar } from '../../components/AdminSidebar';

interface UserDetailData {
  id: string; // backend _id
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive' | 'suspended';
  registeredDate?: string;
  lastActive?: string;
  projects: number;
  address?: string;
  city?: string;
  state?: string;
  company?: string;
  totalSpent?: number;
  activeProjects?: number;
  completedProjects?: number;
}

export function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'activity' | 'settings'>('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userData, setUserData] = useState<UserDetailData | null>(null);
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
    const loadUser = async () => {
      if (!id) {
        navigate('/admin/users');
        return;
      }
      try {
        setIsLoading(true);
        setLoadError(null);
        const res = await adminFetch(`http://localhost:8000/api/users/${id}`);
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          setLoadError(data?.message || 'Failed to load user.');
          return;
        }
        const data = await res.json().catch(() => null);
        const u = data?.user;
        if (!u) {
          setLoadError('User not found.');
          return;
        }
        const detail: UserDetailData = {
          id: u._id,
          name: u.fullName ?? u.email ?? 'User',
          email: u.email ?? '',
          phone: u.phone,
          role: (u.role as UserDetailData['role']) ?? 'user',
          status: (u.status as UserDetailData['status']) ?? 'active',
          registeredDate: u.createdAt ? new Date(u.createdAt).toISOString().slice(0, 10) : undefined,
          lastActive: u.lastActive
            ? new Date(u.lastActive).toLocaleString()
            : u.updatedAt
            ? new Date(u.updatedAt).toLocaleString()
            : undefined,
          projects: typeof u.totalProjects === 'number' ? u.totalProjects : 0,
          address: u.address,
          city: u.city,
          state: u.state,
          company: u.company,
          totalSpent: u.totalSpent,
          activeProjects: u.activeProjects,
          completedProjects: u.completedProjects,
        };
        setUserData(detail);
      } catch {
        setLoadError('Unable to load user. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [id, navigate]);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'user':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'inactive':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'suspended':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <CheckCircle2 className="text-green-400" size={16} />;
      case 'update':
        return <Edit className="text-blue-400" size={16} />;
      case 'download':
        return <FileText className="text-orange-400" size={16} />;
      case 'message':
        return <MessageSquare className="text-purple-400" size={16} />;
      case 'create':
        return <Package className="text-green-400" size={16} />;
      default:
        return <Activity className="text-white/40" size={16} />;
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
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600"
          alt="Admin Background"
          className="w-full h-full object-cover opacity-5"
        />
      </div>

      <div
        className="relative z-10 transition-all duration-300 pt-8 pb-20 px-6"
        style={{ marginLeft: sidebarCollapsed ? '80px' : '280px' }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate('/admin/users')}
              className="flex items-center gap-2 text-white/60 hover:text-orange-500 transition-all mb-6"
            >
              <ArrowLeft size={20} />
              <span>Back to User Management</span>
            </button>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-500 text-xs uppercase tracking-widest mb-2">USER DETAILS</p>
                <h1 className="text-white text-4xl font-bold">
                  {userData ? userData.name : isLoading ? 'Loading…' : 'User'}
                </h1>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => userData && setShowEditModal(true)}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2"
                  disabled={!userData}
                >
                  <Edit size={18} />
                  <span>Edit User</span>
                </button>
                <button
                  onClick={() => userData && setShowDeleteConfirm(true)}
                  className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg transition-all flex items-center gap-2"
                  disabled={!userData}
                >
                  <Trash2 size={18} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </motion.div>

          {loadError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl p-4 mb-6 text-sm">
              {loadError}
            </div>
          )}

          {/* User Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-5xl font-bold">
                  {(userData?.name || userData?.email || 'U').charAt(0)}
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">User ID</p>
                  <p className="text-white font-semibold">{userData?.id || id}</p>
                </div>

                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Role</p>
                  {userData && (
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border uppercase ${getRoleBadge(userData.role)}`}>
                      {userData.role}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Status</p>
                  {userData && (
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border uppercase ${getStatusBadge(userData.status)}`}>
                      {userData.status}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Email</p>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-orange-500" />
                    <p className="text-white">{userData?.email || '—'}</p>
                  </div>
                </div>

                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Phone</p>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-orange-500" />
                    <p className="text-white">{userData?.phone || '—'}</p>
                  </div>
                </div>

                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Company</p>
                  <div className="flex items-center gap-2">
                    <Building2 size={16} className="text-orange-500" />
                    <p className="text-white">{userData?.company || '—'}</p>
                  </div>
                </div>

                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Location</p>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-orange-500" />
                    <p className="text-white">
                      {userData?.city || userData?.state
                        ? `${userData?.city || ''}${userData?.city && userData?.state ? ', ' : ''}${userData?.state || ''}`
                        : '—'}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Last Active</p>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-orange-500" />
                    <p className="text-white">{userData?.lastActive || '—'}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Package size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Total Projects</p>
                  <p className="text-white text-2xl font-bold">{userData?.projects ?? 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Activity size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Active Projects</p>
                  <p className="text-white text-2xl font-bold">{userData?.activeProjects ?? 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircle2 size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Completed</p>
                  <p className="text-white text-2xl font-bold">{userData?.completedProjects ?? 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <TrendingUp size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Total Spent</p>
                  <p className="text-white text-2xl font-bold">
                    ₹{userData?.totalSpent ? (userData.totalSpent / 100000).toFixed(1) + 'L' : '0'}
                  </p>
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
              Projects
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'activity' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Activity Log
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'settings' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Settings
            </button>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {activeTab === 'overview' && (
              <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-8">
                <h3 className="text-white text-xl font-semibold mb-6">User Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-white/40 text-sm mb-1">Full Name</p>
                      <p className="text-white text-lg">{userData?.name || '—'}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm mb-1">Email Address</p>
                      <p className="text-white text-lg">{userData?.email || '—'}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm mb-1">Phone Number</p>
                      <p className="text-white text-lg">{userData?.phone || '—'}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm mb-1">Company</p>
                      <p className="text-white text-lg">{userData?.company || '—'}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-white/40 text-sm mb-1">Address</p>
                      <p className="text-white text-lg">{userData?.address || '—'}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm mb-1">City</p>
                      <p className="text-white text-lg">{userData?.city || '—'}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm mb-1">State</p>
                      <p className="text-white text-lg">{userData?.state || '—'}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm mb-1">Registered Date</p>
                      <p className="text-white text-lg">{userData?.registeredDate || '—'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-8">
                <h3 className="text-white text-xl font-semibold mb-6">User Projects</h3>
                <p className="text-white/60 text-sm">
                  Project breakdown per user is not configured yet. Total projects for this user:{" "}
                  <span className="font-semibold text-white">{userData?.projects ?? 0}</span>.
                </p>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-8">
                <h3 className="text-white text-xl font-semibold mb-6">Activity Log</h3>
                <p className="text-white/60 text-sm">
                  Detailed activity logs are not tracked yet. This section will show real user actions in a future
                  update.
                </p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-[#1a3332]/80 backdrop-blur-md border border-orange-500/20 rounded-xl p-8">
                <h3 className="text-white text-xl font-semibold mb-6">User Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#0a1514]/50 border border-orange-500/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="text-orange-500" size={20} />
                      <div>
                        <p className="text-white font-medium">Email Notifications</p>
                        <p className="text-white/40 text-sm">Receive email updates</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#0a1514]/50 border border-orange-500/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Lock className="text-orange-500" size={20} />
                      <div>
                        <p className="text-white font-medium">Two-Factor Authentication</p>
                        <p className="text-white/40 text-sm">Extra security layer</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>

                  <div className="p-4 bg-[#0a1514]/50 border border-orange-500/20 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="text-orange-500" size={20} />
                      <p className="text-white font-medium">Account Actions</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg transition-all flex items-center gap-2">
                        <Ban size={16} />
                        <span>Suspend Account</span>
                      </button>
                      <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg transition-all flex items-center gap-2">
                        <Trash2 size={16} />
                        <span>Delete Account</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Edit User Modal */}
      {showEditModal && userData && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1a3332]/95 backdrop-blur-md border border-orange-500/20 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-2xl font-semibold">Edit User</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-white/60 hover:text-white transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Full Name</label>
                <input
                  id="edit-full-name"
                  type="text"
                  defaultValue={userData.name}
                  className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={userData.email}
                  className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Role</label>
                <select
                  id="edit-role"
                  defaultValue={userData.role}
                  className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Status</label>
                <select
                  id="edit-status"
                  defaultValue={userData.status}
                  className="w-full bg-[#0a1514]/80 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={async () => {
                    try {
                      const fullNameInput = (document.getElementById('edit-full-name') as HTMLInputElement | null)?.value;
                      const roleSelect = (document.getElementById('edit-role') as HTMLSelectElement | null)?.value;
                      const statusSelect = (document.getElementById('edit-status') as HTMLSelectElement | null)?.value;

                      const payload: Record<string, unknown> = {};
                      if (fullNameInput && fullNameInput !== userData.name) {
                        payload.fullName = fullNameInput;
                      }
                      if (roleSelect && roleSelect !== userData.role) {
                        payload.role = roleSelect;
                      }
                      if (statusSelect && statusSelect !== userData.status) {
                        payload.status = statusSelect;
                      }

                      if (Object.keys(payload).length === 0) {
                        setShowEditModal(false);
                        return;
                      }

                      const res = await adminFetch(`http://localhost:8000/api/users/${userData.id}`, {
                        method: 'PATCH',
                        body: JSON.stringify(payload),
                      });
                      if (!res.ok) {
                        const data = await res.json().catch(() => null);
                        alert(data?.message || 'Failed to update user.');
                        return;
                      }
                      const data = await res.json().catch(() => null);
                      const u = data?.user;
                      if (u) {
                        setUserData((prev) =>
                          prev
                            ? {
                                ...prev,
                                name: u.fullName ?? prev.name,
                                role: (u.role as UserDetailData['role']) ?? prev.role,
                                status: (u.status as UserDetailData['status']) ?? prev.status,
                              }
                            : prev
                        );
                      }
                      setShowEditModal(false);
                    } catch {
                      alert('Unable to update user right now.');
                    }
                  }}
                  className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Check size={18} />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && userData && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1a3332]/95 backdrop-blur-md border border-red-500/20 rounded-xl p-8 max-w-md w-full"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertCircle className="text-red-400" size={24} />
              </div>
              <div>
                <h3 className="text-white text-xl font-semibold">Delete User</h3>
                <p className="text-white/60 text-sm">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-white/80 mb-6">
              Are you sure you want to delete user <strong>{userData.name}</strong>? All associated data will be permanently removed.
            </p>

            <div className="flex gap-3">
              <button
                onClick={async () => {
                  try {
                    const res = await adminFetch(`http://localhost:8000/api/users/${userData.id}`, {
                      method: 'PATCH',
                      body: JSON.stringify({ status: 'suspended' }),
                    });
                    if (!res.ok) {
                      const data = await res.json().catch(() => null);
                      alert(data?.message || 'Failed to disable user.');
                      return;
                    }
                    setUserData((prev) =>
                      prev
                        ? {
                            ...prev,
                            status: 'suspended',
                          }
                        : prev
                    );
                    setShowDeleteConfirm(false);
                    alert('User has been suspended (disabled) and not deleted.');
                  } catch {
                    alert('Unable to disable user right now.');
                  }
                }}
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
              >
                Suspend User
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
