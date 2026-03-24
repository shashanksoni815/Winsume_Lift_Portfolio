import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import React from 'react';
import {
  Search,
  TrendingUp,
  Users,
  FolderKanban,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Download,
  Upload,
  Filter,
  Activity,
  DollarSign,
  Target,
  BarChart3,
  Globe,
  Bell,
  ChevronDown
} from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { AdminSidebar } from '../../components/AdminSidebar';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter] = useState('all');
  const [selectedDateRange] = useState('last30');
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);

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
    const loadData = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);

        const [projectsRes, inquiriesRes, clientsRes] = await Promise.all([
          adminFetch('https://winsume-lift-backend01.onrender.com/api/projects'),
          adminFetch('https://winsume-lift-backend01.onrender.com/api/inquiries'),
          adminFetch('https://winsume-lift-backend01.onrender.com/api/users?role=user&status=active&pageSize=100'),
        ]);

        const projectsJson = projectsRes.ok ? await projectsRes.json().catch(() => null) : null;
        const inquiriesJson = inquiriesRes.ok ? await inquiriesRes.json().catch(() => null) : null;
        const clientsJson = clientsRes.ok ? await clientsRes.json().catch(() => null) : null;

        setProjects(Array.isArray(projectsJson?.items) ? projectsJson.items : []);
        setInquiries(Array.isArray(inquiriesJson?.items) ? inquiriesJson.items : []);
        setClients(Array.isArray(clientsJson?.items) ? clientsJson.items : []);
      } catch {
        setLoadError('Unable to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const projectData = useMemo(() => {
    if (!projects.length) return [];
    const byMonth: Record<string, { id: string; month: string; completed: number; inProgress: number; pending: number }> =
      {};
    const statusMap: Record<string, 'completed' | 'in-progress' | 'pending' | 'on-hold'> = {
      completed: 'completed',
      'in-progress': 'in-progress',
      pending: 'pending',
      'on-hold': 'on-hold',
    };

    for (const p of projects) {
      const createdAt = p.createdAt ? new Date(p.createdAt) : null;
      const monthKey = createdAt ? createdAt.toLocaleString('default', { month: 'short' }) : 'N/A';
      if (!byMonth[monthKey]) {
        byMonth[monthKey] = { id: `proj-${monthKey}`, month: monthKey, completed: 0, inProgress: 0, pending: 0 };
      }
      const status: string = p.status || 'pending';
      if (statusMap[status] === 'completed') byMonth[monthKey].completed += 1;
      else if (statusMap[status] === 'in-progress') byMonth[monthKey].inProgress += 1;
      else byMonth[monthKey].pending += 1;
    }
    return Object.values(byMonth);
  }, [projects]);

  const statusData = useMemo(() => {
    const counts = { completed: 0, 'in-progress': 0, pending: 0, 'on-hold': 0 };
    for (const p of projects) {
      const status: 'completed' | 'in-progress' | 'pending' | 'on-hold' = p.status || 'pending';
      counts[status] += 1;
    }
    const total = projects.length || 1;
    return [
      { id: 'status-completed', name: 'Completed', value: (counts.completed / total) * 100, color: '#10b981' },
      { id: 'status-inprogress', name: 'In Progress', value: (counts['in-progress'] / total) * 100, color: '#3b82f6' },
      { id: 'status-pending', name: 'Pending', value: (counts.pending / total) * 100, color: '#f59e0b' },
      { id: 'status-onhold', name: 'On Hold', value: (counts['on-hold'] / total) * 100, color: '#ef4444' },
    ];
  }, [projects]);

  const revenueData = useMemo(() => {
    if (!projects.length) return [];
    const byMonth: Record<string, { id: string; month: string; revenue: number; budget: number }> = {};
    for (const p of projects) {
      const createdAt = p.createdAt ? new Date(p.createdAt) : null;
      const monthKey = createdAt ? createdAt.toLocaleString('default', { month: 'short' }) : 'N/A';
      if (!byMonth[monthKey]) {
        byMonth[monthKey] = { id: `rev-${monthKey}`, month: monthKey, revenue: 0, budget: 0 };
      }
      const budget = typeof p.budget === 'number' ? p.budget : 0;
      const spent = typeof p.spent === 'number' ? p.spent : 0;
      byMonth[monthKey].budget += budget;
      byMonth[monthKey].revenue += budget - spent;
    }
    return Object.values(byMonth);
  }, [projects]);

  const clientEngagementData = useMemo(() => {
    if (!clients.length) return [];
    // Simple placeholder derived metric: treat each client as active, no "new" distinction from DB
    const byMonth: Record<string, { id: string; month: string; active: number; new: number }> = {};
    for (const c of clients) {
      const createdAt = c.createdAt ? new Date(c.createdAt) : null;
      const monthKey = createdAt ? createdAt.toLocaleString('default', { month: 'short' }) : 'N/A';
      if (!byMonth[monthKey]) {
        byMonth[monthKey] = { id: `client-${monthKey}`, month: monthKey, active: 0, new: 0 };
      }
      byMonth[monthKey].active += 1;
      byMonth[monthKey].new += 1;
    }
    return Object.values(byMonth);
  }, [clients]);

  const pendingInquiriesCount = useMemo(
    () => inquiries.filter((inq) => inq.status === 'open' || inq.status === 'pending').length,
    [inquiries]
  );

  const completionRate = useMemo(() => {
    if (!projects.length) return 0;
    const completed = projects.filter((p) => p.status === 'completed').length;
    return (completed / projects.length) * 100;
  }, [projects]);

  const mtdRevenue = useMemo(() => {
    if (!projects.length) return 0;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    let total = 0;
    for (const p of projects) {
      const createdAt = p.createdAt ? new Date(p.createdAt) : null;
      if (!createdAt || createdAt < startOfMonth) continue;
      const budget = typeof p.budget === 'number' ? p.budget : 0;
      const spent = typeof p.spent === 'number' ? p.spent : 0;
      total += Math.max(budget - spent, 0);
    }
    return total;
  }, [projects]);

  const stats = [
    {
      title: 'Total Projects',
      value: projects.length.toString(),
      change: '',
      trend: 'up',
      icon: FolderKanban,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400'
    },
    {
      title: 'Active Clients',
      value: clients.length.toString(),
      change: '',
      trend: 'up',
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400'
    },
    {
      title: 'Pending Inquiries',
      value: pendingInquiriesCount.toString(),
      change: '',
      trend: 'down',
      icon: MessageSquare,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-400'
    },
    {
      title: 'Revenue (MTD)',
      value: `₹${(mtdRevenue / 100000).toFixed(2)}L`,
      change: '',
      trend: 'up',
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400'
    },
    {
      title: 'Completion Rate',
      value: `${completionRate.toFixed(1)}%`,
      change: '',
      trend: 'up',
      icon: Target,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-500/10',
      textColor: 'text-cyan-400'
    },
    {
      title: 'Total Inquiries',
      value: inquiries.length.toString(),
      change: '',
      trend: 'up',
      icon: Clock,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-500/10',
      textColor: 'text-pink-400'
    }
  ];

  const recentActivities = useMemo(() => {
    const activities: {
      id: string;
      type: string;
      message: string;
      time: string;
      icon: any;
      color: string;
      bgColor: string;
    }[] = [];

    for (const inq of inquiries.slice(0, 10)) {
      activities.push({
        id: `inq-${inq._id}`,
        type: 'inquiry',
        message: `Inquiry from ${inq.name || inq.email || 'Client'} - ${inq.subject || inq.type || 'Inquiry'}`,
        time: new Date(inq.createdAt || Date.now()).toLocaleString(),
        icon: MessageSquare,
        color: 'text-blue-400',
        bgColor: 'bg-blue-400/10'
      });
    }

    for (const proj of projects.slice(0, 10)) {
      activities.push({
        id: `proj-${proj._id}`,
        type: 'project',
        message: `Project ${proj.name || proj.externalId || proj._id} - ${proj.status || 'pending'}`,
        time: new Date(proj.createdAt || Date.now()).toLocaleString(),
        icon: FolderKanban,
        color: 'text-green-400',
        bgColor: 'bg-green-400/10'
      });
    }

    return activities.slice(0, 12);
  }, [inquiries, projects]);

  const quickActions = [
    {
      title: 'Project Management',
      description: 'Track and manage all projects',
      icon: FolderKanban,
      route: '/admin/projects',
      color: 'from-blue-500 to-blue-600',
      stats: `${projects.length} Active`
    },
    {
      title: 'View Inquiries',
      description: 'Manage customer inquiries',
      icon: MessageSquare,
      route: '/admin/inquiries',
      color: 'from-orange-500 to-orange-600',
      stats: `${pendingInquiriesCount} Pending`
    },
    {
      title: 'Analytics & Reports',
      description: 'View detailed analytics',
      icon: BarChart3,
      route: '/admin/analytics',
      color: 'from-purple-500 to-purple-600',
      stats: 'Updated'
    },
    {
      title: 'User Management',
      description: 'Manage roles and permissions',
      icon: Users,
      route: '/admin/users',
      color: 'from-cyan-500 to-cyan-600',
      stats: `${clients.length} Users`
    },
    {
      title: 'Portal Config',
      description: 'Configure user portal settings',
      icon: Globe,
      route: '/admin/portal-config',
      color: 'from-teal-500 to-teal-600',
      stats: 'Customize'
    },
    {
      title: 'Notifications',
      description: 'View all notifications',
      icon: Bell,
      route: '/admin/notifications',
      color: 'from-yellow-500 to-yellow-600',
      stats: ''
    }
  ];

  // Pending Tasks
  const pendingTasks = [
    { id: 1, task: 'Review proposal for Prestige Tower project', priority: 'high', deadline: 'Today' },
    { id: 2, task: 'Approve budget for INQ-045', priority: 'medium', deadline: 'Tomorrow' },
    { id: 3, task: 'Schedule site visit for DLF project', priority: 'high', deadline: '2 days' },
    { id: 4, task: 'Update project timeline for ongoing installation', priority: 'low', deadline: '3 days' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-400/10';
      case 'medium':
        return 'text-orange-400 bg-orange-400/10';
      case 'low':
        return 'text-green-400 bg-green-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#1a3332]">
      {/* Admin Sidebar */}
      <AdminSidebar isCollapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      {/* Main Content */}
      <div
        className="transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? '80px' : '280px' }}
      >
        {/* Background Image */}
        <div className="fixed inset-0 z-0" style={{ left: sidebarCollapsed ? '80px' : '280px' }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600"
            alt="Admin Dashboard Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        {/* Page Content */}
        <div className="relative z-10 pt-8 pb-20 px-6">
          <div className="max-w-[1600px] mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="text-center flex-1">
                  <p className="text-orange-500 text-xs uppercase tracking-widest mb-3">
                    ADMIN PORTAL AREA
                  </p>
                  <h1 className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-tight">
                    Admin Dashboard
                  </h1>
                  <div className="w-24 h-0.5 bg-orange-500 mx-auto mb-6"></div>
                  <p className="text-white/60">Welcome back! Here's what's happening today.</p>
                </div>
              </div>

              {/* Action Button */}
              {/* <div className="flex items-center justify-center gap-3 mb-6">
                <button className="px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-all flex items-center gap-2">
                  <Download size={16} />
                  <span className="text-sm">Export Report</span>
                </button>
              </div> */}

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="text"
                  placeholder="Search projects, clients, inquiries, documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg pl-12 pr-6 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                />
              </div>
            </motion.div>

            {/* KPI Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-4 hover:border-orange-500/40 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon size={20} className="text-white" />
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.bgColor} ${stat.textColor}`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-white/60 text-xs uppercase tracking-wider mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-white text-2xl font-bold">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Monthly Projects Chart */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                    <Activity className="text-orange-500" size={20} />
                    Monthly Project Status
                  </h3>
                  <select className="bg-[#0a1514] border border-orange-500/20 text-white text-sm rounded px-3 py-1 focus:outline-none focus:border-orange-500/40">
                    <option>Last 6 Months</option>
                    <option>Last 12 Months</option>
                    <option>This Year</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={projectData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="month" stroke="#ffffff60" />
                    <YAxis stroke="#ffffff60" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0a1514',
                        border: '1px solid rgba(249, 115, 22, 0.2)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                    <Bar dataKey="inProgress" fill="#3b82f6" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                    <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Project Status Distribution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6"
              >
                <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
                  <BarChart3 className="text-orange-500" size={20} />
                  Project Status Distribution
                </h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      isAnimationActive={false}
                    >
                      {statusData.map((entry) => (
                        <Cell key={entry.id} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Revenue & Client Engagement Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue vs Budget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6"
              >
                <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
                  <TrendingUp className="text-orange-500" size={20} />
                  Revenue vs Budget Tracking
                </h3>
                <ResponsiveContainer width="100%" height={280} key="revenue-chart-container">
                  <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <defs>
                      <linearGradient id="adminDashGradBudget" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6b7280" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6b7280" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="adminDashGradRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="month" stroke="#ffffff60" />
                    <YAxis stroke="#ffffff60" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0a1514',
                        border: '1px solid rgba(249, 115, 22, 0.2)',
                        borderRadius: '8px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="budget"
                      stroke="#6b7280"
                      fill="url(#adminDashGradBudget)"
                      isAnimationActive={false}
                      key="area-budget"
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#f97316"
                      fill="url(#adminDashGradRevenue)"
                      isAnimationActive={false}
                      key="area-revenue"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Client Engagement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6"
              >
                <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
                  <Users className="text-orange-500" size={20} />
                  Client Engagement
                </h3>
                <ResponsiveContainer width="100%" height={280} key="line-chart-container">
                  <LineChart data={clientEngagementData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="month" stroke="#ffffff60" />
                    <YAxis stroke="#ffffff60" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0a1514',
                        border: '1px solid rgba(249, 115, 22, 0.2)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="active"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: '#10b981', r: 4 }}
                      isAnimationActive={false}
                      key="line-active"
                    />
                    <Line
                      type="monotone"
                      dataKey="new"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', r: 4 }}
                      isAnimationActive={false}
                      key="line-new"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Quick Actions & Pending Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6"
              >
                <h3 className="text-white text-lg font-semibold mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={action.title}
                      onClick={() => navigate(action.route)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="w-full bg-gradient-to-r from-[#0a1514] to-[#0a1514] hover:from-orange-500/10 hover:to-orange-500/5 border border-orange-500/20 hover:border-orange-500/40 rounded-lg p-4 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <action.icon size={20} className="text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-white text-sm font-semibold">{action.title}</p>
                          <p className="text-white/40 text-xs">{action.description}</p>
                        </div>
                        <span className="text-orange-500 text-xs font-semibold">{action.stats}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Pending Tasks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6"
              >
                <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-orange-500" size={20} />
                  Pending Tasks
                </h3>
                <div className="space-y-4">
                  {pendingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="border-l-4 border-orange-500 bg-[#0a1514] rounded-r-lg p-4 hover:bg-[#0a1514]/80 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-white text-sm flex-1 pr-2">{task.task}</p>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded uppercase ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-white/40 text-xs">
                        <Clock size={12} />
                        <span>Due: {task.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => navigate('/admin/tasks')}
                  className="w-full mt-4 px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-all text-sm font-semibold"
                >
                  View All Tasks
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}