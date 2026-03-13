import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
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
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('last30');

  // Mock Data for Charts
  const projectData = [
    { id: 'proj-jan', month: 'Jan', completed: 12, inProgress: 8, pending: 5 },
    { id: 'proj-feb', month: 'Feb', completed: 19, inProgress: 12, pending: 3 },
    { id: 'proj-mar', month: 'Mar', completed: 15, inProgress: 10, pending: 6 },
    { id: 'proj-apr', month: 'Apr', completed: 25, inProgress: 15, pending: 4 },
    { id: 'proj-may', month: 'May', completed: 22, inProgress: 18, pending: 7 },
    { id: 'proj-jun', month: 'Jun', completed: 30, inProgress: 20, pending: 5 }
  ];

  const statusData = [
    { id: 'status-completed', name: 'Completed', value: 45, color: '#10b981' },
    { id: 'status-inprogress', name: 'In Progress', value: 30, color: '#3b82f6' },
    { id: 'status-pending', name: 'Pending', value: 15, color: '#f59e0b' },
    { id: 'status-onhold', name: 'On Hold', value: 10, color: '#ef4444' }
  ];

  const revenueData = [
    { id: 'rev-jan', month: 'Jan', revenue: 450000, budget: 400000 },
    { id: 'rev-feb', month: 'Feb', revenue: 520000, budget: 450000 },
    { id: 'rev-mar', month: 'Mar', revenue: 480000, budget: 500000 },
    { id: 'rev-apr', month: 'Apr', revenue: 650000, budget: 550000 },
    { id: 'rev-may', month: 'May', revenue: 720000, budget: 600000 },
    { id: 'rev-jun', month: 'Jun', revenue: 800000, budget: 700000 }
  ];

  const clientEngagementData = [
    { id: 'client-jan', month: 'Jan', active: 65, new: 12 },
    { id: 'client-feb', month: 'Feb', active: 72, new: 18 },
    { id: 'client-mar', month: 'Mar', active: 68, new: 15 },
    { id: 'client-apr', month: 'Apr', active: 80, new: 22 },
    { id: 'client-may', month: 'May', active: 85, new: 25 },
    { id: 'client-jun', month: 'Jun', active: 92, new: 28 }
  ];

  // KPI Stats
  const stats = [
    {
      title: 'Total Projects',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: FolderKanban,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400'
    },
    {
      title: 'Active Clients',
      value: '89',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400'
    },
    {
      title: 'Pending Inquiries',
      value: '23',
      change: '-5%',
      trend: 'down',
      icon: MessageSquare,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-400'
    },
    {
      title: 'Revenue (MTD)',
      value: '₹8.2L',
      change: '+18%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400'
    },
    {
      title: 'Completion Rate',
      value: '94%',
      change: '+3%',
      trend: 'up',
      icon: Target,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-500/10',
      textColor: 'text-cyan-400'
    },
    {
      title: 'Avg Response Time',
      value: '2.4h',
      change: '-15%',
      trend: 'down',
      icon: Clock,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-500/10',
      textColor: 'text-pink-400'
    }
  ];

  // Recent Activities
  const recentActivities = [
    {
      id: 1,
      type: 'new_inquiry',
      message: 'New inquiry from Rajesh Kumar for residential lift',
      time: '5 min ago',
      icon: MessageSquare,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      id: 2,
      type: 'project_completed',
      message: 'Project #654340 - Mumbai Towers completed successfully',
      time: '2 hours ago',
      icon: CheckCircle2,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      id: 3,
      type: 'document_uploaded',
      message: 'Contract document uploaded for Project #654341',
      time: '3 hours ago',
      icon: Upload,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    },
    {
      id: 4,
      type: 'payment_pending',
      message: 'Payment pending for inquiry INQ-008',
      time: '4 hours ago',
      icon: Clock,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10'
    },
    {
      id: 5,
      type: 'site_visit',
      message: 'Site visit scheduled for Delhi project tomorrow at 10 AM',
      time: '1 day ago',
      icon: Calendar,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10'
    },
    {
      id: 6,
      type: 'alert',
      message: 'Maintenance due for 3 lifts in Bangalore',
      time: '1 day ago',
      icon: AlertCircle,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10'
    }
  ];

  // Quick Actions
  const quickActions = [
    {
      title: 'Project Management',
      description: 'Track and manage all projects',
      icon: FolderKanban,
      route: '/admin/projects',
      color: 'from-blue-500 to-blue-600',
      stats: '12 Active'
    },
    {
      title: 'View Inquiries',
      description: 'Manage customer inquiries',
      icon: MessageSquare,
      route: '/admin/inquiries',
      color: 'from-orange-500 to-orange-600',
      stats: '5 New'
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
      stats: '23 Users'
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
      stats: '8 New'
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

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 mb-6 relative">
                <button className="px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-all flex items-center gap-2">
                  <Download size={16} />
                  <span className="text-sm">Export Report</span>
                </button>
                <div className="relative">
                  <button
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2"
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  >
                    <Filter size={16} />
                    <span className="text-sm">Filters</span>
                    <ChevronDown size={16} className={`transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showFilterDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 right-0 bg-[#1a3332]/95 backdrop-blur-md border border-orange-500/20 rounded-lg shadow-2xl overflow-hidden z-50 min-w-[450px]"
                      >
                        <div className="p-3 grid grid-cols-2 gap-3">
                          {/* Filter By Status - Left Column */}
                          <div>
                            <p className="text-white/60 text-xs uppercase tracking-wider px-3 py-2 mb-1">Filter By Status</p>
                            <div className="space-y-1">
                              <button
                                onClick={() => {
                                  setSelectedFilter('all');
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                  selectedFilter === 'all'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                                }`}
                              >
                                All Projects
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedFilter('completed');
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                  selectedFilter === 'completed'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                                }`}
                              >
                                Completed
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedFilter('inprogress');
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                  selectedFilter === 'inprogress'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                                }`}
                              >
                                In Progress
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedFilter('pending');
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                  selectedFilter === 'pending'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                                }`}
                              >
                                Pending
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedFilter('onhold');
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                  selectedFilter === 'onhold'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                                }`}
                              >
                                On Hold
                              </button>
                            </div>
                          </div>

                          {/* Date Range - Right Column */}
                          <div>
                            <p className="text-white/60 text-xs uppercase tracking-wider px-3 py-2 mb-1">Date Range</p>
                            <div className="space-y-1">
                              <button
                                onClick={() => {
                                  setSelectedDateRange('last7');
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                  selectedDateRange === 'last7'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                                }`}
                              >
                                Last 7 Days
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedDateRange('last30');
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                  selectedDateRange === 'last30'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                                }`}
                              >
                                Last 30 Days
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedDateRange('last6months');
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                  selectedDateRange === 'last6months'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                                }`}
                              >
                                Last 6 Months
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedDateRange('thisyear');
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                  selectedDateRange === 'thisyear'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                                }`}
                              >
                                This Year
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedDateRange('custom');
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                  selectedDateRange === 'custom'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                                }`}
                              >
                                Custom Range
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

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

            {/* Quick Actions & Pending Tasks & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Quick Actions - 1 column */}
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

              {/* Pending Tasks - 1 column */}
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

              {/* Recent Activity - 1 column */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6"
              >
                <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
                  <Activity className="text-orange-500" size={20} />
                  Recent Activity
                </h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 pb-4 border-b border-white/10 last:border-0 last:pb-0"
                    >
                      <div className={`w-8 h-8 rounded-full ${activity.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <activity.icon size={14} className={activity.color} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm mb-1">{activity.message}</p>
                        <p className="text-white/40 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}