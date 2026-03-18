import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  DollarSign,
  Users,
  FolderKanban,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { AdminSidebar } from '../../components/AdminSidebar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

export function Analytics() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const adminFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      window.location.href = '/admin-login';
      throw new Error('Not authenticated');
    }
    const res = await fetch(input, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/admin-login';
      throw new Error('Unauthorized');
    }
    return res;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        const [projectsRes, clientsRes] = await Promise.all([
          adminFetch('https://winsume-lift-portfolio-backend.onrender.com/api/projects'),
          adminFetch('https://winsume-lift-portfolio-backend.onrender.com/api/users?role=user&status=active&pageSize=500')
        ]);

        const projectsJson = projectsRes.ok ? await projectsRes.json().catch(() => null) : null;
        const clientsJson = clientsRes.ok ? await clientsRes.json().catch(() => null) : null;

        setProjects(Array.isArray(projectsJson?.items) ? projectsJson.items : []);
        setClients(Array.isArray(clientsJson?.items) ? clientsJson.items : []);
      } catch {
        setLoadError('Unable to load analytics data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const revenueData = useMemo(() => {
    const byMonth: Record<string, { month: string; id: string; revenue: number; expenses: number }> =
      {};
    for (const p of projects) {
      const createdAt = p.createdAt ? new Date(p.createdAt) : null;
      const monthKey = createdAt
        ? createdAt.toLocaleString('default', { month: 'short' })
        : 'N/A';
      if (!byMonth[monthKey]) {
        byMonth[monthKey] = { month: monthKey, id: `rev-${monthKey}`, revenue: 0, expenses: 0 };
      }
      const budget = typeof p.budget === 'number' ? p.budget : 0;
      const spent = typeof p.spent === 'number' ? p.spent : 0;
      byMonth[monthKey].revenue += Math.max(budget - spent, 0);
      byMonth[monthKey].expenses += spent;
    }
    return Object.values(byMonth).sort(
      (a, b) =>
        new Date(`1 ${a.month} 2000`).getMonth() - new Date(`1 ${b.month} 2000`).getMonth()
    );
  }, [projects]);

  const projectTypeData = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of projects) {
      const type = p.type || 'Other';
      counts[type] = (counts[type] || 0) + 1;
    }
    const palette = ['#3b82f6', '#f97316', '#10b981', '#8b5cf6', '#eab308', '#ec4899'];
    return Object.entries(counts).map(([name, value], idx) => ({
      id: `type-${name}`,
      name,
      value,
      color: palette[idx % palette.length]
    }));
  }, [projects]);

  const clientGrowth = useMemo(() => {
    if (!clients.length) return [];
    const byMonth: Record<string, number> = {};
    for (const c of clients) {
      const createdAt = c.createdAt ? new Date(c.createdAt) : null;
      const monthKey = createdAt
        ? createdAt.toLocaleString('default', { month: 'short' })
        : 'N/A';
      byMonth[monthKey] = (byMonth[monthKey] || 0) + 1;
    }
    const months = Object.keys(byMonth).sort(
      (a, b) =>
        new Date(`1 ${a} 2000`).getMonth() - new Date(`1 ${b} 2000`).getMonth()
    );
    let cumulative = 0;
    return months.map((m) => {
      cumulative += byMonth[m];
      return { id: `client-${m}`, month: m, clients: cumulative };
    });
  }, [clients]);

  const totalRevenue = useMemo(
    () => revenueData.reduce((sum, r) => sum + r.revenue, 0),
    [revenueData]
  );
  const totalExpenses = useMemo(
    () => revenueData.reduce((sum, r) => sum + r.expenses, 0),
    [revenueData]
  );
  const profitMargin =
    totalRevenue + totalExpenses > 0
      ? (totalRevenue / (totalRevenue + totalExpenses)) * 100
      : 0;
  const activeProjects = projects.filter((p) => p.status === 'in-progress').length;

  const stats = [
    {
      label: 'Total Revenue',
      value: `₹${(totalRevenue / 10000000).toFixed(2)}Cr`,
      change: '',
      trend: 'up',
      color: 'from-green-500 to-green-600',
      icon: DollarSign
    },
    {
      label: 'Active Projects',
      value: activeProjects.toString(),
      change: '',
      trend: 'up',
      color: 'from-blue-500 to-blue-600',
      icon: FolderKanban
    },
    {
      label: 'Total Clients',
      value: clients.length.toString(),
      change: '',
      trend: 'up',
      color: 'from-purple-500 to-purple-600',
      icon: Users
    },
    {
      label: 'Profit Margin',
      value: `${profitMargin.toFixed(1)}%`,
      change: '',
      trend: 'up',
      color: 'from-orange-500 to-orange-600',
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a3332]">
      <AdminSidebar isCollapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      <div className="transition-all duration-300" style={{ marginLeft: sidebarCollapsed ? '80px' : '280px' }}>
        <div className="fixed inset-0 z-0" style={{ left: sidebarCollapsed ? '80px' : '280px' }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600"
            alt="Analytics Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="relative z-10 pt-8 pb-20 px-6">
          <div className="max-w-[1600px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
              <div className="text-center mb-6">
                <p className="text-orange-500 text-xs uppercase tracking-widest mb-3">ADMIN PORTAL AREA</p>
                <h1 className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-tight">
                  Analytics & Reports
                </h1>
                <div className="w-24 h-0.5 bg-orange-500 mx-auto mb-6"></div>
                <p className="text-white/60">Comprehensive business insights and metrics</p>
              </div>

              <div className="flex items-center justify-center gap-3 mb-6">
                <button className="px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-all flex items-center gap-2">
                  <Download size={16} />
                  <span className="text-sm">Export Report</span>
                </button>
              </div>
            </motion.div>

            {loadError && (
              <div className="mb-4 text-center text-sm text-red-400">{loadError}</div>
            )}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon size={24} className="text-white" />
                    </div>
                    <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
                  </div>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">{stat.label}</h3>
                  <p className="text-white text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
                  <BarChart3 className="text-orange-500" size={20} />
                  Revenue vs Expenses
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
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
                    <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} key="analytics-bar-revenue" />
                    <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} key="analytics-bar-expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
                  <PieChartIcon className="text-orange-500" size={20} />
                  Project Type Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={projectTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {projectTypeData.map((entry) => (
                        <Cell key={entry.id} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
                <Activity className="text-orange-500" size={20} />
                Client Growth Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={clientGrowth}>
                  <defs>
                    <linearGradient id="analyticsClientGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
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
                  <Area type="monotone" dataKey="clients" stroke="#f97316" fill="url(#analyticsClientGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}