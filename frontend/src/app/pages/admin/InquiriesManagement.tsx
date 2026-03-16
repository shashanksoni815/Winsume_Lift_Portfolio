import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Search,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  User,
  MapPin,
  FileText,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  Download,
  TrendingUp,
  AlertCircle,
  X
} from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { AdminSidebar } from '../../components/AdminSidebar';

interface Inquiry {
  id: string; // backend _id
  externalId?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  type?: string;
  status: 'new' | 'in-review' | 'responded' | 'closed';
  priority?: 'low' | 'medium' | 'high';
  date: string; // ISO string
  assignedTo?: string;
}

export function InquiriesManagement() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showRespondModal, setShowRespondModal] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const loadInquiries = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        navigate('/admin-login');
        return;
      }
      try {
        setIsLoading(true);
        setLoadError(null);
        const res = await fetch('http://localhost:8000/api/inquiries', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.status === 401 || res.status === 403) {
          navigate('/admin-login');
          return;
        }
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          setLoadError(data?.message || 'Failed to load inquiries.');
          return;
        }
        const data = await res.json().catch(() => null);
        const items = Array.isArray(data?.items) ? data.items : [];
        const mapped: Inquiry[] = items.map((item: any) => ({
          id: item._id,
          externalId: item.externalId,
          name: item.name ?? '',
          email: item.email ?? '',
          phone: item.phone ?? '',
          subject: item.subject ?? '',
          message: item.message ?? '',
          type: item.type ?? '',
          status: (item.status as Inquiry['status']) ?? 'new',
          priority: (item.priority as Inquiry['priority']) ?? 'medium',
          date: item.createdAt ?? '',
          assignedTo: item.assignedToUserId ? 'Team Member' : undefined,
        }));
        setInquiries(mapped);
      } catch (err) {
        setLoadError('Unable to load inquiries. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadInquiries();
  }, [navigate]);

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch = 
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || inquiry.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || inquiry.priority === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in-review':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'responded':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'closed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const stats = [
    { label: 'Total Inquiries', value: inquiries.length, color: 'from-blue-500 to-blue-600', icon: MessageSquare },
    { label: 'New', value: inquiries.filter(i => i.status === 'new').length, color: 'from-orange-500 to-orange-600', icon: AlertCircle },
    { label: 'In Review', value: inquiries.filter(i => i.status === 'in-review').length, color: 'from-yellow-500 to-yellow-600', icon: Clock },
    {
      label: 'Response Rate',
      value: inquiries.length
        ? `${Math.round((inquiries.filter(i => i.status === 'responded' || i.status === 'closed').length / inquiries.length) * 100)}%`
        : '0%',
      color: 'from-green-500 to-green-600',
      icon: TrendingUp
    }
  ];

  const handleViewDetails = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setShowViewModal(true);
  };

  const updateInquiryStatus = async (inquiry: Inquiry, status: Inquiry['status']) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/admin-login');
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/inquiries/${inquiry.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status }),
      });

      if (res.status === 401 || res.status === 403) {
        navigate('/admin-login');
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setToastMessage(data?.message || 'Failed to update inquiry.');
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
        return;
      }

      const data = await res.json().catch(() => null);
      const updated = data?.inquiry;
      setInquiries(prev =>
        prev.map(inq =>
          inq.id === inquiry.id
            ? {
                ...inq,
                status: (updated?.status as Inquiry['status']) ?? status,
              }
            : inq
        )
      );

      setToastMessage(status === 'responded' ? 'Inquiry marked as responded' : 'Inquiry closed successfully');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    } catch {
      setToastMessage('Unable to update inquiry right now.');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  };

  const handleMarkAsResponded = (inquiry: Inquiry) => {
    updateInquiryStatus(inquiry, 'responded');
  };

  const handleCloseInquiry = (inquiry: Inquiry) => {
    updateInquiryStatus(inquiry, 'closed');
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Name', 'Email', 'Phone', 'Subject', 'Type', 'Status', 'Priority', 'Date'].join(','),
      ...inquiries.map(inq => 
        [inq.id, inq.name, inq.email, inq.phone, inq.subject, inq.type, inq.status, inq.priority, inq.date].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inquiries-report.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#1a3332]">
      <AdminSidebar isCollapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      <div className="transition-all duration-300" style={{ marginLeft: sidebarCollapsed ? '80px' : '280px' }}>
        <div className="fixed inset-0 z-0" style={{ left: sidebarCollapsed ? '80px' : '280px' }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=1600"
            alt="Inquiries Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="relative z-10 pt-8 pb-20 px-6">
          <div className="max-w-[1600px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
              <div className="text-center mb-6">
                <p className="text-orange-500 text-xs uppercase tracking-widest mb-3">ADMIN PORTAL AREA</p>
                <h1 className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-tight">
                  Inquiries Management
                </h1>
                <div className="w-24 h-0.5 bg-orange-500 mx-auto mb-6"></div>
                <p className="text-white/60">Manage and respond to customer inquiries</p>
              </div>

              <div className="flex items-center justify-center gap-3 mb-6">
                <button className="px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-all flex items-center gap-2" onClick={handleExport}>
                  <Download size={16} />
                  <span className="text-sm">Export Report</span>
                </button>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[300px]">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
                  <input
                    type="text"
                    placeholder="Search inquiries by name, email, subject..."
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
                  <option value="new">New</option>
                  <option value="in-review">In Review</option>
                  <option value="responded">Responded</option>
                  <option value="closed">Closed</option>
                </select>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 transition-all"
                >
                  <option value="all">All Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
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
              {isLoading && (
                <div className="text-center py-12">
                  <p className="text-white/60">Loading inquiries...</p>
                </div>
              )}
              {loadError && !isLoading && (
                <div className="text-center py-4">
                  <p className="text-red-400 text-sm">{loadError}</p>
                </div>
              )}
              {!isLoading && filteredInquiries.map((inquiry, index) => (
                <motion.div
                  key={inquiry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6 hover:border-orange-500/40 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white text-lg font-semibold">{inquiry.subject}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border uppercase ${getStatusBadge(inquiry.status)}`}>
                          {inquiry.status.replace('-', ' ')}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border uppercase ${getPriorityBadge(inquiry.priority)}`}>
                          {inquiry.priority}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm mb-3">{inquiry.id} • {inquiry.type}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <User size={16} className="text-orange-500" />
                          <span>{inquiry.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <Mail size={16} className="text-orange-500" />
                          <span>{inquiry.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <Phone size={16} className="text-orange-500" />
                          <span>{inquiry.phone}</span>
                        </div>
                      </div>

                      <div className="bg-[#1a3332]/50 border border-orange-500/10 rounded-lg p-4 mb-4">
                        <p className="text-white/80 text-sm">{inquiry.message}</p>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-white/60">
                          <Calendar size={14} className="text-orange-500" />
                          <span>{inquiry.date ? new Date(inquiry.date).toLocaleDateString() : '-'}</span>
                        </div>
                        {inquiry.assignedTo && (
                          <div className="flex items-center gap-2 text-white/60">
                            <User size={14} className="text-orange-500" />
                            <span>Assigned to: {inquiry.assignedTo}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all" title="View Details" onClick={() => handleViewDetails(inquiry)}>
                        <Eye size={18} />
                      </button>
                      <button className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-all" title="Mark as Responded" onClick={() => handleMarkAsResponded(inquiry)}>
                        <CheckCircle2 size={18} />
                      </button>
                      <button className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all" title="Close Inquiry" onClick={() => handleCloseInquiry(inquiry)}>
                        <XCircle size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredInquiries.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/40">No inquiries found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {showViewModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0a1514] border border-orange-500/20 rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-2xl font-semibold">Inquiry Details</h2>
              <button onClick={() => { setShowViewModal(false); setSelectedInquiry(null); }} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                <X className="text-white/60" size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-white text-xl font-semibold">{selectedInquiry.subject}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border uppercase ${getStatusBadge(selectedInquiry.status)}`}>
                    {selectedInquiry.status.replace('-', ' ')}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border uppercase ${getPriorityBadge(selectedInquiry.priority)}`}>
                    {selectedInquiry.priority}
                  </span>
                </div>
                <p className="text-white/60 text-sm mb-2">{selectedInquiry.id} • {selectedInquiry.type}</p>
                <p className="text-white/60 text-sm">Date: {selectedInquiry.date}</p>
              </div>

              <div className="bg-[#1a3332]/50 border border-orange-500/10 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Customer Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/70">
                    <User size={16} className="text-orange-500" />
                    <span>{selectedInquiry.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Mail size={16} className="text-orange-500" />
                    <span>{selectedInquiry.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Phone size={16} className="text-orange-500" />
                    <span>{selectedInquiry.phone}</span>
                  </div>
                  {selectedInquiry.assignedTo && (
                    <div className="flex items-center gap-2 text-white/70">
                      <User size={16} className="text-orange-500" />
                      <span>Assigned to: {selectedInquiry.assignedTo}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-[#1a3332]/50 border border-orange-500/10 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Message</h4>
                <p className="text-white/80">{selectedInquiry.message}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => { handleMarkAsResponded(selectedInquiry); setShowViewModal(false); setSelectedInquiry(null); }}
                className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all font-medium"
              >
                Mark as Responded
              </button>
              <button
                onClick={() => { handleCloseInquiry(selectedInquiry); setShowViewModal(false); setSelectedInquiry(null); }}
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all font-medium"
              >
                Close Inquiry
              </button>
              <button
                onClick={() => { setShowViewModal(false); setSelectedInquiry(null); }}
                className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all font-medium"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3"
        >
          <CheckCircle2 size={20} />
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </div>
  );
}