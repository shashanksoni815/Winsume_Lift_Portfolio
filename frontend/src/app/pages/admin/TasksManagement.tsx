import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  ChevronDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  User,
  FolderKanban,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { AdminSidebar } from '../../components/AdminSidebar';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'inprogress' | 'completed' | 'onhold';
  assignedTo: string;
  project: string;
  deadline: string;
  createdDate: string;
  tags: string[];
}

export function TasksManagement() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  // Form state for new task
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    status: 'pending' as 'pending' | 'inprogress' | 'completed' | 'onhold',
    assignedTo: '',
    project: '',
    deadline: '',
    tags: [] as string[],
    tagInput: ''
  });

  // Mock Tasks Data
  const [allTasks, setAllTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Review proposal for Prestige Tower project',
      description: 'Complete review of technical specifications and pricing proposal for the 25-floor residential building lift installation.',
      priority: 'high',
      status: 'pending',
      assignedTo: 'Rajesh Kumar',
      project: 'Prestige Tower - Mumbai',
      deadline: '2026-03-14',
      createdDate: '2026-03-10',
      tags: ['Proposal', 'Review', 'Mumbai']
    },
    {
      id: 2,
      title: 'Approve budget for INQ-045',
      description: 'Review and approve the budget allocation for the new inquiry from DLF Properties.',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'Priya Sharma',
      project: 'DLF Commercial Complex',
      deadline: '2026-03-15',
      createdDate: '2026-03-11',
      tags: ['Budget', 'Approval', 'Delhi']
    },
    {
      id: 3,
      title: 'Schedule site visit for DLF project',
      description: 'Coordinate with the client and technical team for an on-site assessment of installation requirements.',
      priority: 'high',
      status: 'inprogress',
      assignedTo: 'Amit Verma',
      project: 'DLF Commercial Complex',
      deadline: '2026-03-16',
      createdDate: '2026-03-09',
      tags: ['Site Visit', 'Coordination']
    },
    {
      id: 4,
      title: 'Update project timeline for ongoing installation',
      description: 'Revise the installation schedule based on recent material delivery delays.',
      priority: 'low',
      status: 'inprogress',
      assignedTo: 'Suresh Reddy',
      project: 'Skyline Apartments - Bangalore',
      deadline: '2026-03-17',
      createdDate: '2026-03-08',
      tags: ['Timeline', 'Update']
    },
    {
      id: 5,
      title: 'Complete safety inspection documentation',
      description: 'Finalize all safety compliance documents for the recently completed project.',
      priority: 'high',
      status: 'completed',
      assignedTo: 'Neha Patel',
      project: 'Mumbai Towers Phase 2',
      deadline: '2026-03-12',
      createdDate: '2026-03-05',
      tags: ['Safety', 'Documentation', 'Completed']
    },
    {
      id: 6,
      title: 'Client meeting for luxury villa project',
      description: 'Present customized lift design options for the high-end residential project.',
      priority: 'medium',
      status: 'completed',
      assignedTo: 'Vikram Singh',
      project: 'Luxury Villas - Gurgaon',
      deadline: '2026-03-11',
      createdDate: '2026-03-06',
      tags: ['Client Meeting', 'Design']
    },
    {
      id: 7,
      title: 'Material procurement for upcoming project',
      description: 'Order specialized lift components for the upcoming hotel installation.',
      priority: 'high',
      status: 'pending',
      assignedTo: 'Anjali Mehta',
      project: 'Grand Hotel - Hyderabad',
      deadline: '2026-03-18',
      createdDate: '2026-03-12',
      tags: ['Procurement', 'Materials']
    },
    {
      id: 8,
      title: 'Technical training session for new staff',
      description: 'Conduct comprehensive training on new lift technology and safety protocols.',
      priority: 'medium',
      status: 'inprogress',
      assignedTo: 'Rahul Joshi',
      project: 'Internal Training',
      deadline: '2026-03-20',
      createdDate: '2026-03-07',
      tags: ['Training', 'Internal']
    },
    {
      id: 9,
      title: 'Maintenance contract renewal',
      description: 'Negotiate and finalize maintenance contract renewal with existing clients.',
      priority: 'low',
      status: 'onhold',
      assignedTo: 'Kavita Rao',
      project: 'Multiple Properties',
      deadline: '2026-03-25',
      createdDate: '2026-03-03',
      tags: ['Maintenance', 'Contract']
    },
    {
      id: 10,
      title: 'Quality audit for recent installations',
      description: 'Perform quality checks on all installations completed in the last month.',
      priority: 'high',
      status: 'pending',
      assignedTo: 'Deepak Kumar',
      project: 'Multiple Projects',
      deadline: '2026-03-19',
      createdDate: '2026-03-11',
      tags: ['Quality', 'Audit']
    },
    {
      id: 11,
      title: 'Update CRM with new client inquiries',
      description: 'Input all new inquiry data from this week into the CRM system.',
      priority: 'low',
      status: 'completed',
      assignedTo: 'Pooja Gupta',
      project: 'CRM Management',
      deadline: '2026-03-13',
      createdDate: '2026-03-10',
      tags: ['CRM', 'Data Entry']
    },
    {
      id: 12,
      title: 'Prepare quarterly performance report',
      description: 'Compile all project data and create comprehensive quarterly report for management.',
      priority: 'medium',
      status: 'inprogress',
      assignedTo: 'Sanjay Mishra',
      project: 'Reporting',
      deadline: '2026-03-22',
      createdDate: '2026-03-01',
      tags: ['Reporting', 'Analytics']
    }
  ]);

  // Filter tasks based on search, priority, and status
  const filteredTasks = allTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = filteredTasks.slice(startIndex, endIndex);

  // Stats
  const stats = {
    total: allTasks.length,
    pending: allTasks.filter(t => t.status === 'pending').length,
    inProgress: allTasks.filter(t => t.status === 'inprogress').length,
    completed: allTasks.filter(t => t.status === 'completed').length,
    onHold: allTasks.filter(t => t.status === 'onhold').length,
    highPriority: allTasks.filter(t => t.priority === 'high').length,
    dueSoon: allTasks.filter(t => {
      const deadline = new Date(t.deadline);
      const today = new Date();
      const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 2 && diffDays >= 0;
    }).length
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'medium':
        return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'low':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'inprogress':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'pending':
        return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'onhold':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle2;
      case 'inprogress':
        return Clock;
      case 'pending':
        return AlertCircle;
      case 'onhold':
        return X;
      default:
        return Clock;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `${diffDays} days`;
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
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600"
            alt="Tasks Management Background"
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
              <div className="text-center mb-6">
                <button
                  onClick={() => navigate('/admin-dashboard')}
                  className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors mb-4"
                >
                  <ChevronLeft size={20} />
                  <span className="text-sm">Back to Dashboard</span>
                </button>
                <p className="text-orange-500 text-xs uppercase tracking-widest mb-3">
                  TASK MANAGEMENT SYSTEM
                </p>
                <h1 className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-tight">
                  All Tasks
                </h1>
                <div className="w-24 h-0.5 bg-orange-500 mx-auto mb-6"></div>
                <p className="text-white/60">
                  Manage, track, and organize all project tasks and assignments
                </p>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Total</p>
                  <p className="text-white text-2xl font-bold">{stats.total}</p>
                </div>
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-4">
                  <p className="text-orange-400 text-xs uppercase tracking-wider mb-1">Pending</p>
                  <p className="text-white text-2xl font-bold">{stats.pending}</p>
                </div>
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-blue-500/20 rounded-lg p-4">
                  <p className="text-blue-400 text-xs uppercase tracking-wider mb-1">In Progress</p>
                  <p className="text-white text-2xl font-bold">{stats.inProgress}</p>
                </div>
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-green-500/20 rounded-lg p-4">
                  <p className="text-green-400 text-xs uppercase tracking-wider mb-1">Completed</p>
                  <p className="text-white text-2xl font-bold">{stats.completed}</p>
                </div>
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-red-500/20 rounded-lg p-4">
                  <p className="text-red-400 text-xs uppercase tracking-wider mb-1">On Hold</p>
                  <p className="text-white text-2xl font-bold">{stats.onHold}</p>
                </div>
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-red-500/20 rounded-lg p-4">
                  <p className="text-red-400 text-xs uppercase tracking-wider mb-1">High Priority</p>
                  <p className="text-white text-2xl font-bold">{stats.highPriority}</p>
                </div>
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-yellow-400 text-xs uppercase tracking-wider mb-1">Due Soon</p>
                  <p className="text-white text-2xl font-bold">{stats.dueSoon}</p>
                </div>
              </div>

              {/* Search and Filter Bar */}
              <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Search Bar */}
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
                  <input
                    type="text"
                    placeholder="Search tasks by title, description, assignee, or project..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg pl-12 pr-6 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                  />
                </div>

                {/* Filter Dropdown */}
                <div className="relative">
                  <button
                    className="px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2 whitespace-nowrap"
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
                        className="absolute top-full mt-2 right-0 bg-[#1a3332]/95 backdrop-blur-md border border-orange-500/20 rounded-lg shadow-2xl overflow-hidden z-50 min-w-[400px]"
                      >
                        <div className="p-3 grid grid-cols-2 gap-3">
                          {/* Priority Filter */}
                          <div>
                            <p className="text-white/60 text-xs uppercase tracking-wider px-3 py-2 mb-1">Priority</p>
                            <div className="space-y-1">
                              <button
                                onClick={() => {
                                  setSelectedPriority('all');
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                  selectedPriority === 'all'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                                }`}
                              >
                                All Priorities
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedPriority('high');
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                  selectedPriority === 'high'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                                }`}
                              >
                                High Priority
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedPriority('medium');
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                  selectedPriority === 'medium'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                                }`}
                              >
                                Medium Priority
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedPriority('low');
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                  selectedPriority === 'low'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                                }`}
                              >
                                Low Priority
                              </button>
                            </div>
                          </div>

                          {/* Status Filter */}
                          <div>
                            <p className="text-white/60 text-xs uppercase tracking-wider px-3 py-2 mb-1">Status</p>
                            <div className="space-y-1">
                              <button
                                onClick={() => {
                                  setSelectedStatus('all');
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                  selectedStatus === 'all'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                                }`}
                              >
                                All Status
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedStatus('pending');
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                  selectedStatus === 'pending'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                                }`}
                              >
                                Pending
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedStatus('inprogress');
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                  selectedStatus === 'inprogress'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                                }`}
                              >
                                In Progress
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedStatus('completed');
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                  selectedStatus === 'completed'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-white/80 hover:bg-orange-500/10 hover:text-white'
                                }`}
                              >
                                Completed
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Add Task Button */}
                <button
                  className="px-4 py-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap"
                  onClick={() => setShowNewTaskModal(true)}
                >
                  <Plus size={16} />
                  <span className="text-sm">New Task</span>
                </button>
              </div>
            </motion.div>

            {/* Tasks List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg overflow-hidden"
            >
              {/* Table Header */}
              <div className="bg-[#0a1514] border-b border-orange-500/20 px-6 py-4">
                <div className="grid grid-cols-12 gap-4 text-white/60 text-xs uppercase tracking-wider">
                  <div className="col-span-4">Task Details</div>
                  <div className="col-span-2">Priority</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Assigned To</div>
                  <div className="col-span-2">Deadline</div>
                </div>
              </div>

              {/* Tasks */}
              <div className="divide-y divide-white/10">
                {currentTasks.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <AlertCircle className="mx-auto mb-4 text-white/40" size={48} />
                    <p className="text-white/60">No tasks found matching your filters.</p>
                  </div>
                ) : (
                  currentTasks.map((task, index) => {
                    const StatusIcon = getStatusIcon(task.status);
                    const daysText = getDaysUntilDeadline(task.deadline);
                    const isOverdue = daysText.includes('overdue');
                    
                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="px-6 py-4 hover:bg-orange-500/5 transition-all cursor-pointer group"
                        onClick={() => {
                          setSelectedTask(task);
                          setShowTaskModal(true);
                        }}
                      >
                        <div className="grid grid-cols-12 gap-4 items-center">
                          {/* Task Details */}
                          <div className="col-span-4">
                            <h3 className="text-white font-semibold mb-1 group-hover:text-orange-500 transition-colors">
                              {task.title}
                            </h3>
                            <p className="text-white/40 text-sm line-clamp-1">{task.description}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {task.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-orange-500/10 text-orange-500 text-xs rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Priority */}
                          <div className="col-span-2">
                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs uppercase font-semibold border ${getPriorityColor(
                                task.priority
                              )}`}
                            >
                              <AlertCircle size={14} />
                              {task.priority}
                            </span>
                          </div>

                          {/* Status */}
                          <div className="col-span-2">
                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs uppercase font-semibold border ${getStatusColor(
                                task.status
                              )}`}
                            >
                              <StatusIcon size={14} />
                              {task.status === 'inprogress' ? 'In Progress' : task.status}
                            </span>
                          </div>

                          {/* Assigned To */}
                          <div className="col-span-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                                <User size={14} className="text-orange-500" />
                              </div>
                              <span className="text-white/80 text-sm">{task.assignedTo}</span>
                            </div>
                          </div>

                          {/* Deadline */}
                          <div className="col-span-2">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className={isOverdue ? 'text-red-400' : 'text-white/60'} />
                              <div>
                                <p className={`text-sm ${isOverdue ? 'text-red-400' : 'text-white/80'}`}>
                                  {formatDate(task.deadline)}
                                </p>
                                <p className={`text-xs ${isOverdue ? 'text-red-400' : 'text-white/40'}`}>
                                  {daysText}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-[#0a1514] border-t border-orange-500/20 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <p className="text-white/60 text-sm">
                      Showing {startIndex + 1} to {Math.min(endIndex, filteredTasks.length)} of {filteredTasks.length} tasks
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-lg transition-all ${
                            currentPage === page
                              ? 'bg-orange-500 text-white'
                              : 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-500'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Task Detail Modal */}
      <AnimatePresence>
        {showTaskModal && selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTaskModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1a3332] border border-orange-500/20 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#0a1514] border-b border-orange-500/20 px-6 py-4 flex items-center justify-between">
                <h2 className="text-white text-xl font-semibold">Task Details</h2>
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Task Title</label>
                  <h3 className="text-white text-2xl font-semibold">{selectedTask.title}</h3>
                </div>

                {/* Description */}
                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Description</label>
                  <p className="text-white/80 leading-relaxed">{selectedTask.description}</p>
                </div>

                {/* Meta Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Priority */}
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Priority</label>
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold border ${getPriorityColor(
                        selectedTask.priority
                      )}`}
                    >
                      <AlertCircle size={16} />
                      {selectedTask.priority.toUpperCase()}
                    </span>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Status</label>
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(
                        selectedTask.status
                      )}`}
                    >
                      {(() => {
                        const StatusIcon = getStatusIcon(selectedTask.status);
                        return <StatusIcon size={16} />;
                      })()}
                      {selectedTask.status === 'inprogress' ? 'IN PROGRESS' : selectedTask.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Assigned To */}
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Assigned To</label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <User size={18} className="text-orange-500" />
                      </div>
                      <span className="text-white text-sm">{selectedTask.assignedTo}</span>
                    </div>
                  </div>

                  {/* Project */}
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Project</label>
                    <div className="flex items-center gap-3">
                      <FolderKanban size={18} className="text-orange-500" />
                      <span className="text-white text-sm">{selectedTask.project}</span>
                    </div>
                  </div>

                  {/* Created Date */}
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Created Date</label>
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-white/60" />
                      <span className="text-white text-sm">{formatDate(selectedTask.createdDate)}</span>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Deadline</label>
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-orange-500" />
                      <div>
                        <span className="text-white text-sm block">{formatDate(selectedTask.deadline)}</span>
                        <span className="text-orange-500 text-xs">{getDaysUntilDeadline(selectedTask.deadline)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button className="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center justify-center gap-2">
                    <Edit size={16} />
                    Edit Task
                  </button>
                  <button className="px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-all flex items-center justify-center gap-2">
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Task Modal */}
      <AnimatePresence>
        {showNewTaskModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewTaskModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1a3332] border border-orange-500/20 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#0a1514] border-b border-orange-500/20 px-6 py-4 flex items-center justify-between">
                <h2 className="text-white text-xl font-semibold">New Task</h2>
                <button
                  onClick={() => setShowNewTaskModal(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Task Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                    placeholder="Enter task title"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                    placeholder="Enter task description"
                    rows={4}
                  />
                </div>

                {/* Meta Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Priority */}
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'high' | 'medium' | 'low' })}
                      className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Status</label>
                    <select
                      value={newTask.status}
                      onChange={(e) => setNewTask({ ...newTask, status: e.target.value as 'pending' | 'inprogress' | 'completed' | 'onhold' })}
                      className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                    >
                      <option value="pending">Pending</option>
                      <option value="inprogress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="onhold">On Hold</option>
                    </select>
                  </div>

                  {/* Assigned To */}
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Assigned To</label>
                    <input
                      type="text"
                      value={newTask.assignedTo}
                      onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                      className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                      placeholder="Enter assignee name"
                    />
                  </div>

                  {/* Project */}
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Project</label>
                    <input
                      type="text"
                      value={newTask.project}
                      onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                      className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                      placeholder="Enter project name"
                    />
                  </div>

                  {/* Created Date */}
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Created Date</label>
                    <input
                      type="date"
                      value={newTask.createdDate}
                      onChange={(e) => setNewTask({ ...newTask, createdDate: e.target.value })}
                      className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                    />
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Deadline</label>
                    <input
                      type="date"
                      value={newTask.deadline}
                      onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                      className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {newTask.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                    <input
                      type="text"
                      value={newTask.tagInput}
                      onChange={(e) => setNewTask({ ...newTask, tagInput: e.target.value })}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && newTask.tagInput.trim()) {
                          setNewTask({ ...newTask, tags: [...newTask.tags, newTask.tagInput.trim()], tagInput: '' });
                        }
                      }}
                      className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                      placeholder="Add a tag"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button
                    className="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                    onClick={() => {
                      setAllTasks([...allTasks, { ...newTask, id: allTasks.length + 1 }]);
                      setShowNewTaskModal(false);
                      setNewTask({
                        title: '',
                        description: '',
                        priority: 'medium' as 'high' | 'medium' | 'low',
                        status: 'pending' as 'pending' | 'inprogress' | 'completed' | 'onhold',
                        assignedTo: '',
                        project: '',
                        deadline: '',
                        tags: [] as string[],
                        tagInput: ''
                      });
                    }}
                  >
                    <Plus size={16} />
                    Add Task
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}