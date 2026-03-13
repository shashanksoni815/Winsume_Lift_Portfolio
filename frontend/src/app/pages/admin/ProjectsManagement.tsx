import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPin,
  DollarSign,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  FolderKanban,
  Building2,
  Phone,
  Mail,
  X,
  User,
  Calendar,
  Image as ImageIcon
} from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { AdminSidebar } from '../../components/AdminSidebar';

interface Project {
  id: string;
  name: string;
  client: string;
  clientEmail: string;
  clientPhone: string;
  location: string;
  status: 'completed' | 'in-progress' | 'pending' | 'on-hold';
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  progress: number;
  team: number;
  type: string;
  image?: string;
}

export function ProjectsManagement() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    clientEmail: '',
    clientPhone: '',
    location: '',
    type: 'Residential',
    budget: '',
    startDate: '',
    endDate: '',
    team: '',
    status: 'pending' as Project['status'],
    image: ''
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'PRJ001',
      name: 'Luxury Villa Lift Installation',
      client: 'Rajesh Kumar',
      clientEmail: 'rajesh@example.com',
      clientPhone: '+91 98765 43210',
      location: 'Mumbai, Maharashtra',
      status: 'in-progress',
      budget: 2500000,
      spent: 1850000,
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      progress: 74,
      team: 8,
      type: 'Residential'
    },
    {
      id: 'PRJ002',
      name: 'Commercial Tower - 10 Units',
      client: 'Prestige Builders Pvt Ltd',
      clientEmail: 'contact@prestige.com',
      clientPhone: '+91 98765 43211',
      location: 'Bangalore, Karnataka',
      status: 'in-progress',
      budget: 15000000,
      spent: 8500000,
      startDate: '2024-02-01',
      endDate: '2024-12-31',
      progress: 57,
      team: 25,
      type: 'Commercial'
    },
    {
      id: 'PRJ003',
      name: 'Hotel Panoramic Elevator',
      client: 'Grand Hyatt Delhi',
      clientEmail: 'operations@grandhyatt.com',
      clientPhone: '+91 98765 43212',
      location: 'New Delhi, Delhi',
      status: 'completed',
      budget: 8500000,
      spent: 8200000,
      startDate: '2023-10-01',
      endDate: '2024-03-15',
      progress: 100,
      team: 15,
      type: 'Commercial'
    },
    {
      id: 'PRJ004',
      name: 'Residential Complex - 5 Lifts',
      client: 'DLF Properties',
      clientEmail: 'projects@dlf.com',
      clientPhone: '+91 98765 43213',
      location: 'Gurgaon, Haryana',
      status: 'pending',
      budget: 6000000,
      spent: 0,
      startDate: '2024-04-01',
      endDate: '2024-10-31',
      progress: 0,
      team: 0,
      type: 'Residential'
    },
    {
      id: 'PRJ005',
      name: 'Hospital Medical Lift System',
      client: 'Apollo Hospitals',
      clientEmail: 'procurement@apollo.com',
      clientPhone: '+91 98765 43214',
      location: 'Chennai, Tamil Nadu',
      status: 'in-progress',
      budget: 12000000,
      spent: 3600000,
      startDate: '2024-02-15',
      endDate: '2024-09-30',
      progress: 30,
      team: 18,
      type: 'Medical'
    },
    {
      id: 'PRJ006',
      name: 'Mall Escalator Installation',
      client: 'Phoenix Mall',
      clientEmail: 'maintenance@phoenix.com',
      clientPhone: '+91 98765 43215',
      location: 'Pune, Maharashtra',
      status: 'on-hold',
      budget: 4500000,
      spent: 1350000,
      startDate: '2024-01-10',
      endDate: '2024-05-31',
      progress: 30,
      team: 10,
      type: 'Commercial'
    }
  ]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'on-hold':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const stats = [
    { label: 'Total Projects', value: projects.length, color: 'from-blue-500 to-blue-600', icon: FolderKanban },
    { label: 'In Progress', value: projects.filter(p => p.status === 'in-progress').length, color: 'from-orange-500 to-orange-600', icon: Clock },
    { label: 'Completed', value: projects.filter(p => p.status === 'completed').length, color: 'from-green-500 to-green-600', icon: CheckCircle2 },
    { label: 'Total Budget', value: `₹${(projects.reduce((sum, p) => sum + p.budget, 0) / 10000000).toFixed(1)}Cr`, color: 'from-purple-500 to-purple-600', icon: DollarSign }
  ];

  const handleAddProject = () => {
    const newProject: Project = {
      id: `PRJ${String(projects.length + 1).padStart(3, '0')}`,
      name: formData.name,
      client: formData.client,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      location: formData.location,
      type: formData.type,
      budget: parseInt(formData.budget),
      spent: 0,
      startDate: formData.startDate,
      endDate: formData.endDate,
      progress: 0,
      team: parseInt(formData.team) || 0,
      status: formData.status,
      image: formData.image
    };
    
    setProjects([...projects, newProject]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditProject = () => {
    if (!selectedProject) return;
    
    setProjects(projects.map(p => 
      p.id === selectedProject.id 
        ? {
            ...p,
            name: formData.name,
            client: formData.client,
            clientEmail: formData.clientEmail,
            clientPhone: formData.clientPhone,
            location: formData.location,
            type: formData.type,
            budget: parseInt(formData.budget),
            startDate: formData.startDate,
            endDate: formData.endDate,
            team: parseInt(formData.team),
            status: formData.status,
            image: formData.image
          }
        : p
    ));
    
    setShowEditModal(false);
    setSelectedProject(null);
    resetForm();
  };

  const handleDeleteProject = () => {
    if (!selectedProject) return;
    
    setProjects(projects.filter(p => p.id !== selectedProject.id));
    setShowDeleteConfirm(false);
    setSelectedProject(null);
  };

  const openEditModal = (project: Project) => {
    setSelectedProject(project);
    setFormData({
      name: project.name,
      client: project.client,
      clientEmail: project.clientEmail,
      clientPhone: project.clientPhone,
      location: project.location,
      type: project.type,
      budget: project.budget.toString(),
      startDate: project.startDate,
      endDate: project.endDate,
      team: project.team.toString(),
      status: project.status,
      image: project.image || ''
    });
    setImagePreview(project.image || '');
    setShowEditModal(true);
  };

  const openViewModal = (project: Project) => {
    setSelectedProject(project);
    setShowViewModal(true);
  };

  const openDeleteConfirm = (project: Project) => {
    setSelectedProject(project);
    setShowDeleteConfirm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      client: '',
      clientEmail: '',
      clientPhone: '',
      location: '',
      type: 'Residential',
      budget: '',
      startDate: '',
      endDate: '',
      team: '',
      status: 'pending',
      image: ''
    });
    setImagePreview('');
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Name', 'Client', 'Location', 'Status', 'Budget', 'Progress', 'Type'].join(','),
      ...projects.map(p => 
        [p.id, p.name, p.client, p.location, p.status, p.budget, p.progress + '%', p.type].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects-report.csv';
    a.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a3332]">
      <AdminSidebar isCollapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      <div className="transition-all duration-300" style={{ marginLeft: sidebarCollapsed ? '80px' : '280px' }}>
        <div className="fixed inset-0 z-0" style={{ left: sidebarCollapsed ? '80px' : '280px' }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600"
            alt="Projects Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="relative z-10 pt-8 pb-20 px-6">
          <div className="max-w-[1600px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
              <div className="text-center mb-6">
                <p className="text-orange-500 text-xs uppercase tracking-widest mb-3">ADMIN PORTAL AREA</p>
                <h1 className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-tight">
                  Project Management
                </h1>
                <div className="w-24 h-0.5 bg-orange-500 mx-auto mb-6"></div>
                <p className="text-white/60">Track and manage all lift installation projects</p>
              </div>

              <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
                <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2">
                  <Plus size={16} />
                  <span className="text-sm">New Project</span>
                </button>
                <button onClick={handleExport} className="px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-all flex items-center gap-2">
                  <Download size={16} />
                  <span className="text-sm">Export Report</span>
                </button>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[300px]">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
                  <input
                    type="text"
                    placeholder="Search projects, clients, locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg pl-12 pr-6 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                  />
                </div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 transition-all"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="pending">Pending</option>
                  <option value="on-hold">On Hold</option>
                </select>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6 hover:border-orange-500/40 transition-all">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">{stat.label}</h3>
                  <p className="text-white text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-4">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6 hover:border-orange-500/40 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white text-xl font-semibold">{project.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border uppercase ${getStatusBadge(project.status)}`}>
                          {project.status.replace('-', ' ')}
                        </span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-semibold">
                          {project.type}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm mb-3">{project.id}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <Building2 size={16} className="text-orange-500" />
                          <span>{project.client}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <MapPin size={16} className="text-orange-500" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <Users size={16} className="text-orange-500" />
                          <span>{project.team} Team Members</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-white/40 text-xs mb-1">Budget</p>
                          <p className="text-white font-semibold">₹{(project.budget / 100000).toFixed(2)}L</p>
                        </div>
                        <div>
                          <p className="text-white/40 text-xs mb-1">Spent</p>
                          <p className="text-white font-semibold">₹{(project.spent / 100000).toFixed(2)}L</p>
                        </div>
                        <div>
                          <p className="text-white/40 text-xs mb-1">Duration</p>
                          <p className="text-white font-semibold">{project.startDate} to {project.endDate}</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/60 text-sm">Progress</span>
                          <span className="text-orange-500 font-semibold">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all" style={{ width: `${project.progress}%` }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button onClick={() => openViewModal(project)} className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => openEditModal(project)} className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-all" title="Edit Project">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => openDeleteConfirm(project)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all" title="Delete Project">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/40">No projects found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {showViewModal && selectedProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0a1514] border border-orange-500/20 rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-2xl font-semibold">Project Details</h2>
              <button onClick={() => { setShowViewModal(false); setSelectedProject(null); }} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                <X className="text-white/60" size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-white text-xl font-semibold">{selectedProject.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border uppercase ${getStatusBadge(selectedProject.status)}`}>
                    {selectedProject.status.replace('-', ' ')}
                  </span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-semibold">
                    {selectedProject.type}
                  </span>
                </div>
                <p className="text-white/60 text-sm mb-4">Project ID: {selectedProject.id}</p>
              </div>

              <div className="bg-[#1a3332]/50 border border-orange-500/10 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Client Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/70">
                    <Building2 size={16} className="text-orange-500" />
                    <span>{selectedProject.client}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Mail size={16} className="text-orange-500" />
                    <span>{selectedProject.clientEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Phone size={16} className="text-orange-500" />
                    <span>{selectedProject.clientPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <MapPin size={16} className="text-orange-500" />
                    <span>{selectedProject.location}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a3332]/50 border border-orange-500/10 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Project Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/40 text-xs mb-1">Budget</p>
                    <p className="text-white font-semibold">₹{(selectedProject.budget / 100000).toFixed(2)} Lakhs</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-1">Spent</p>
                    <p className="text-white font-semibold">₹{(selectedProject.spent / 100000).toFixed(2)} Lakhs</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-1">Start Date</p>
                    <p className="text-white font-semibold">{selectedProject.startDate}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-1">End Date</p>
                    <p className="text-white font-semibold">{selectedProject.endDate}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-1">Team Size</p>
                    <p className="text-white font-semibold">{selectedProject.team} Members</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-1">Progress</p>
                    <p className="text-white font-semibold">{selectedProject.progress}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a3332]/50 border border-orange-500/10 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Progress Tracker</h4>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all flex items-center justify-end pr-2" 
                    style={{ width: `${selectedProject.progress}%` }}
                  >
                    <span className="text-xs text-white font-semibold">{selectedProject.progress}%</span>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-white/40 text-xs">Started</span>
                  <span className="text-white/40 text-xs">{selectedProject.status === 'completed' ? 'Completed' : 'In Progress'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => { setShowViewModal(false); openEditModal(selectedProject); }}
                className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all font-medium"
              >
                Edit Project
              </button>
              <button
                onClick={() => { setShowViewModal(false); setSelectedProject(null); }}
                className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all font-medium"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0a1514] border border-red-500/20 rounded-xl p-6 max-w-md w-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertCircle className="text-red-500" size={24} />
              </div>
              <h2 className="text-white text-xl font-semibold">Delete Project</h2>
            </div>

            <p className="text-white/70 mb-6">
              Are you sure you want to delete "<span className="text-white font-semibold">{selectedProject.name}</span>"? This action cannot be undone.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDeleteProject}
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => { setShowDeleteConfirm(false); setSelectedProject(null); }}
                className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all font-medium"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Project Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => { setShowAddModal(false); resetForm(); }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1a3332] border border-orange-500/20 rounded-lg max-w-4xl w-full max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#0a1514] border-b border-orange-500/20 px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-white text-2xl font-semibold">Add New Project</h2>
                  <p className="text-white/60 text-sm mt-1">Fill in the project details below</p>
                </div>
                <button
                  onClick={() => { setShowAddModal(false); resetForm(); }}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                <div className="space-y-6">
                  {/* Project Basic Info */}
                  <div>
                    <h3 className="text-orange-500 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                      <FolderKanban size={16} />
                      Project Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Project Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                          placeholder="Luxury Villa Lift Installation"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Project Type <span className="text-red-400">*</span>
                        </label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 transition-all"
                        >
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Medical">Medical</option>
                          <option value="Industrial">Industrial</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Location <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                          placeholder="Mumbai, Maharashtra"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Status <span className="text-red-400">*</span>
                        </label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value as Project['status'] })}
                          className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 transition-all"
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="on-hold">On Hold</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Client Information */}
                  <div className="border-t border-white/10 pt-6">
                    <h3 className="text-orange-500 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                      <User size={16} />
                      Client Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Client Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.client}
                          onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                          className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                          placeholder="Rajesh Kumar"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Client Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.clientEmail}
                          onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                          className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                          placeholder="client@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Client Phone <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.clientPhone}
                          onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                          className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Timeline & Budget */}
                  <div className="border-t border-white/10 pt-6">
                    <h3 className="text-orange-500 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Calendar size={16} />
                      Timeline & Budget
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Budget (₹) <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="number"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                          placeholder="2500000"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Start Date <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          End Date <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Team Size <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="number"
                          value={formData.team}
                          onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                          className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/40 transition-all"
                          placeholder="8"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Image */}
                  <div className="border-t border-white/10 pt-6">
                    <h3 className="text-orange-500 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                      <ImageIcon size={16} />
                      Project Image
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Upload Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-orange-500 file:text-white hover:file:bg-orange-600 file:cursor-pointer focus:outline-none focus:border-orange-500/40 transition-all"
                        />
                      </div>
                      {imagePreview && (
                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">
                            Image Preview
                          </label>
                          <div className="relative inline-block">
                            <img
                              src={imagePreview}
                              alt="Project Preview"
                              className="w-full h-32 object-cover rounded-lg border border-orange-500/20"
                            />
                            <button
                              onClick={() => setImagePreview('')}
                              className="absolute -top-2 -right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-[#0a1514] border-t border-orange-500/20 px-6 py-4 flex items-center gap-3">
                <button
                  onClick={handleAddProject}
                  className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all font-semibold flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  Add Project
                </button>
                <button
                  onClick={() => { setShowAddModal(false); resetForm(); }}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Project Modal */}
      {showEditModal && selectedProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0a1514] border border-orange-500/20 rounded-xl p-6 max-w-3xl w-full my-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-2xl font-semibold">Edit Project: {selectedProject.name}</h2>
              <button onClick={() => { setShowEditModal(false); setSelectedProject(null); resetForm(); }} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                <X className="text-white/60" size={20} />
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Project Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Project Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Medical">Medical</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Client Name</label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Client Email</label>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Client Phone</label>
                  <input
                    type="tel"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Budget (₹)</label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Team Size</label>
                  <input
                    type="number"
                    value={formData.team}
                    onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                    className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Project['status'] })}
                    className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="on-hold">On Hold</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Project Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                  />
                </div>
                {imagePreview && (
                  <div className="flex items-center gap-2">
                    <img
                      src={imagePreview}
                      alt="Project"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setImagePreview('')}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleEditProject}
                className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all font-medium"
              >
                Update Project
              </button>
              <button
                onClick={() => { setShowEditModal(false); setSelectedProject(null); resetForm(); }}
                className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all font-medium"
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