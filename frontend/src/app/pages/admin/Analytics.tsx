import { useState } from 'react';
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
  const [timeRange, setTimeRange] = useState('6months');

  const revenueData = [
    { month: 'Oct', revenue: 450000, expenses: 280000, id: 'rev-oct' },
    { month: 'Nov', revenue: 520000, expenses: 310000, id: 'rev-nov' },
    { month: 'Dec', revenue: 680000, expenses: 350000, id: 'rev-dec' },
    { month: 'Jan', revenue: 750000, expenses: 420000, id: 'rev-jan' },
    { month: 'Feb', revenue: 820000, expenses: 460000, id: 'rev-feb' },
    { month: 'Mar', revenue: 950000, expenses: 520000, id: 'rev-mar' }
  ];

  const projectTypeData = [
    { name: 'Residential', value: 45, color: '#3b82f6', id: 'type-residential' },
    { name: 'Commercial', value: 35, color: '#f97316', id: 'type-commercial' },
    { name: 'Medical', value: 12, color: '#10b981', id: 'type-medical' },
    { name: 'Industrial', value: 8, color: '#8b5cf6', id: 'type-industrial' }
  ];

  const clientGrowth = [
    { month: 'Oct', clients: 65, id: 'client-oct' },
    { month: 'Nov', clients: 72, id: 'client-nov' },
    { month: 'Dec', clients: 78, id: 'client-dec' },
    { month: 'Jan', clients: 85, id: 'client-jan' },
    { month: 'Feb', clients: 92, id: 'client-feb' },
    { month: 'Mar', clients: 98, id: 'client-mar' }
  ];

  const stats = [
    { label: 'Total Revenue', value: '₹4.17Cr', change: '+24%', trend: 'up', color: 'from-green-500 to-green-600', icon: DollarSign },
    { label: 'Active Projects', value: '23', change: '+12%', trend: 'up', color: 'from-blue-500 to-blue-600', icon: FolderKanban },
    { label: 'Total Clients', value: '98', change: '+18%', trend: 'up', color: 'from-purple-500 to-purple-600', icon: Users },
    { label: 'Profit Margin', value: '38%', change: '+5%', trend: 'up', color: 'from-orange-500 to-orange-600', icon: TrendingUp }
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
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                >
                  <option value="1month">Last Month</option>
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="1year">Last Year</option>
                </select>
                <button className="px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-all flex items-center gap-2">
                  <Download size={16} />
                  <span className="text-sm">Export Report</span>
                </button>
              </div>
            </motion.div>

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