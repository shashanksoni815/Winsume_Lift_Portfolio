import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import React from 'react';
import {
  Layout,
  Eye,
  EyeOff,
  Save,
  ArrowLeft,
  ToggleLeft,
  ToggleRight,
  Home,
  ShoppingBag,
  Briefcase,
  Phone,
  Users,
  FileCheck,
  MessageSquare,
  User,
  Edit3,
  Plus,
  Trash2,
  GripVertical,
  Shield,
  Globe,
  Lock
} from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { AdminSidebar } from '../../../components/AdminSidebar';

interface PageConfig {
  id: string;
  name: string;
  path: string;
  icon: any;
  enabled: boolean;
  visible: boolean;
  order: number;
  requiredAuth: boolean;
  description: string;
}

export function PagesManagement() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);

  // Pages Configuration
  const [pagesConfig, setPagesConfig] = useState<PageConfig[]>([
    { 
      id: 'home', 
      name: 'Home', 
      path: '/', 
      icon: Home, 
      enabled: true, 
      visible: true, 
      order: 1, 
      requiredAuth: false,
      description: 'Main landing page with hero section and featured content'
    },
    { 
      id: 'collection', 
      name: 'Collection', 
      path: '/collection', 
      icon: ShoppingBag, 
      enabled: true, 
      visible: true, 
      order: 2, 
      requiredAuth: false,
      description: 'Browse all luxury lift collections and products'
    },
    { 
      id: 'our-work', 
      name: 'Our Work', 
      path: '/our-work', 
      icon: Briefcase, 
      enabled: true, 
      visible: true, 
      order: 3, 
      requiredAuth: false,
      description: 'Portfolio of completed projects and case studies'
    },
    { 
      id: 'services', 
      name: 'Services', 
      path: '/services', 
      icon: FileCheck, 
      enabled: true, 
      visible: true, 
      order: 4, 
      requiredAuth: false,
      description: 'Comprehensive service offerings and capabilities'
    },
    { 
      id: 'about', 
      name: 'About', 
      path: '/about', 
      icon: Users, 
      enabled: true, 
      visible: true, 
      order: 5, 
      requiredAuth: false,
      description: 'Company information, team, and values'
    },
    { 
      id: 'contact', 
      name: 'Contact', 
      path: '/contact', 
      icon: Phone, 
      enabled: true, 
      visible: true, 
      order: 6, 
      requiredAuth: false,
      description: 'Contact forms and office location information'
    },
    { 
      id: 'inquiry', 
      name: 'Inquiry Form', 
      path: '/inquiry', 
      icon: MessageSquare, 
      enabled: true, 
      visible: false, 
      order: 7, 
      requiredAuth: false,
      description: 'Custom inquiry form for project requests'
    },
    { 
      id: 'my-engagements', 
      name: 'My Engagements', 
      path: '/my-engagements', 
      icon: User, 
      enabled: true, 
      visible: false, 
      order: 8, 
      requiredAuth: true,
      description: 'User dashboard showing active projects and inquiries'
    }
  ]);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const updatePageConfig = (pageId: string, key: keyof PageConfig, value: any) => {
    setPagesConfig(prev =>
      prev.map(page => page.id === pageId ? { ...page, [key]: value } : page)
    );
  };

  const handleSaveChanges = () => {
    // Save logic here
    setShowSaveConfirm(true);
    setTimeout(() => setShowSaveConfirm(false), 3000);
  };

  const handleDragStart = (pageId: string) => {
    setDraggedItem(pageId);
  };

  const handleDragOver = (e: React.DragEvent, targetPageId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetPageId) return;

    const draggedPage = pagesConfig.find(p => p.id === draggedItem);
    const targetPage = pagesConfig.find(p => p.id === targetPageId);

    if (draggedPage && targetPage) {
      const newConfig = [...pagesConfig];
      const draggedIndex = newConfig.findIndex(p => p.id === draggedItem);
      const targetIndex = newConfig.findIndex(p => p.id === targetPageId);

      // Swap orders
      const draggedOrder = newConfig[draggedIndex].order;
      newConfig[draggedIndex].order = newConfig[targetIndex].order;
      newConfig[targetIndex].order = draggedOrder;

      setPagesConfig(newConfig);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const moveUp = (pageId: string) => {
    const currentPage = pagesConfig.find(p => p.id === pageId);
    if (!currentPage || currentPage.order === 1) return;

    const prevPage = pagesConfig.find(p => p.order === currentPage.order - 1);
    if (prevPage) {
      setPagesConfig(prev =>
        prev.map(page => {
          if (page.id === pageId) return { ...page, order: page.order - 1 };
          if (page.id === prevPage.id) return { ...page, order: page.order + 1 };
          return page;
        })
      );
    }
  };

  const moveDown = (pageId: string) => {
    const currentPage = pagesConfig.find(p => p.id === pageId);
    const maxOrder = Math.max(...pagesConfig.map(p => p.order));
    if (!currentPage || currentPage.order === maxOrder) return;

    const nextPage = pagesConfig.find(p => p.order === currentPage.order + 1);
    if (nextPage) {
      setPagesConfig(prev =>
        prev.map(page => {
          if (page.id === pageId) return { ...page, order: page.order + 1 };
          if (page.id === nextPage.id) return { ...page, order: page.order - 1 };
          return page;
        })
      );
    }
  };

  const handleDeletePage = (pageId: string) => {
    setPageToDelete(pageId);
    setShowDeleteConfirm(true);
  };

  const confirmDeletePage = () => {
    if (pageToDelete) {
      setPagesConfig(prev => prev.filter(page => page.id !== pageToDelete));
      setShowDeleteConfirm(false);
      setPageToDelete(null);
    }
  };

  const cancelDeletePage = () => {
    setShowDeleteConfirm(false);
    setPageToDelete(null);
  };

  return (
    <div className="min-h-screen bg-[#1a3332]">
      {/* Admin Sidebar */}
      <AdminSidebar isCollapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      {/* Main Content */}
      <div
        className="transition-all duration-300 lg:ml-[280px] md:ml-[80px] ml-0"
        style={{ 
          marginLeft: typeof window !== 'undefined' && window.innerWidth >= 1024 
            ? (sidebarCollapsed ? '80px' : '280px') 
            : '0' 
        }}
      >
        {/* Background Image */}
        <div 
          className="fixed inset-0 z-0 lg:left-[280px] md:left-[80px] left-0" 
          style={{ 
            left: typeof window !== 'undefined' && window.innerWidth >= 1024 
              ? (sidebarCollapsed ? '80px' : '280px') 
              : '0' 
          }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600"
            alt="Pages Management Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        {/* Page Content */}
        <div className="relative z-10 pt-4 sm:pt-6 md:pt-8 pb-10 sm:pb-16 md:pb-20 px-3 sm:px-4 md:px-6">
          <div className="max-w-[1400px] mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              {/* Back Button */}
              <button
                onClick={() => navigate('/admin/portal-config')}
                className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-all"
              >
                <ArrowLeft size={20} />
                <span>Back to Portal Configuration</span>
              </button>

              <div className="text-center mb-6">
                <p className="text-orange-500 text-xs uppercase tracking-widest mb-3">
                  PORTAL CONFIGURATION
                </p>
                <h1 className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-tight">
                  Manage Portal Pages
                </h1>
                <div className="w-24 h-0.5 bg-orange-500 mx-auto mb-6"></div>
                <p className="text-white/60">
                  Control visibility, order, access permissions, and settings for all portal pages
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
                <button
                  onClick={handleSaveChanges}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2 font-medium"
                >
                  <Save size={18} />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={() => navigate('/admin/config/pages/add')}
                  className="px-6 py-3 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg transition-all flex items-center gap-2"
                >
                  <Plus size={18} />
                  <span>Add New Page</span>
                </button>
              </div>

              {/* Save Confirmation */}
              {showSaveConfirm && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-2 z-50"
                >
                  <Save size={18} />
                  <span>Changes saved successfully!</span>
                </motion.div>
              )}
            </motion.div>

            {/* Stats Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-5">
                <div className="flex items-center justify-between mb-2">
                  <Layout className="text-orange-500" size={24} />
                  <span className="text-2xl font-bold text-white">{pagesConfig.length}</span>
                </div>
                <p className="text-white/60 text-sm">Total Pages</p>
              </div>

              <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-green-500/20 rounded-lg p-5">
                <div className="flex items-center justify-between mb-2">
                  <Eye className="text-green-500" size={24} />
                  <span className="text-2xl font-bold text-white">
                    {pagesConfig.filter(p => p.visible).length}
                  </span>
                </div>
                <p className="text-white/60 text-sm">Visible in Menu</p>
              </div>

              <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-blue-500/20 rounded-lg p-5">
                <div className="flex items-center justify-between mb-2">
                  <Shield className="text-blue-500" size={24} />
                  <span className="text-2xl font-bold text-white">
                    {pagesConfig.filter(p => p.requiredAuth).length}
                  </span>
                </div>
                <p className="text-white/60 text-sm">Protected Pages</p>
              </div>

              <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-purple-500/20 rounded-lg p-5">
                <div className="flex items-center justify-between mb-2">
                  <Globe className="text-purple-500" size={24} />
                  <span className="text-2xl font-bold text-white">
                    {pagesConfig.filter(p => !p.requiredAuth).length}
                  </span>
                </div>
                <p className="text-white/60 text-sm">Public Pages</p>
              </div>
            </motion.div>

            {/* Pages List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-xl font-semibold flex items-center gap-2">
                  <Layout className="text-orange-500" size={24} />
                  Portal Pages Configuration
                </h3>
                <p className="text-white/40 text-sm">Drag to reorder</p>
              </div>

              <div className="space-y-3">
                {pagesConfig
                  .sort((a, b) => a.order - b.order)
                  .map((page, index) => (
                    <motion.div
                      key={page.id}
                      draggable
                      onDragStart={() => handleDragStart(page.id)}
                      onDragOver={(e) => handleDragOver(e, page.id)}
                      onDragEnd={handleDragEnd}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`bg-[#1a3332]/50 border rounded-lg p-3 sm:p-4 md:p-5 transition-all cursor-move hover:shadow-lg ${
                        draggedItem === page.id
                          ? 'border-orange-500/40 shadow-lg shadow-orange-500/20'
                          : 'border-orange-500/10 hover:border-orange-500/30'
                      }`}
                    >
                      {/* Mobile Layout */}
                      <div className="block md:hidden space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="text-white/40 hover:text-orange-500 transition-colors cursor-grab active:cursor-grabbing">
                            <GripVertical size={18} />
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-500 flex items-center justify-center font-mono text-xs font-bold">
                            {page.order}
                          </div>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            page.enabled ? 'bg-orange-500/20 text-orange-500' : 'bg-white/5 text-white/40'
                          }`}>
                            <page.icon size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-semibold text-sm">{page.name}</h4>
                            <p className="text-orange-500/80 text-xs font-mono truncate">{page.path}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-wrap ml-9">
                          {page.requiredAuth && (
                            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-[10px] rounded-full border border-purple-500/30 flex items-center gap-1">
                              <Lock size={10} />
                              Auth
                            </span>
                          )}
                          {!page.enabled && (
                            <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[10px] rounded-full border border-red-500/30">
                              Disabled
                            </span>
                          )}
                        </div>
                        
                        <p className="text-white/50 text-xs ml-9">{page.description}</p>

                        <div className="flex items-center gap-2 flex-wrap ml-9">
                          <button
                            onClick={() => updatePageConfig(page.id, 'visible', !page.visible)}
                            className={`px-3 py-1.5 rounded-md transition-all text-xs flex items-center gap-1 ${
                              page.visible
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {page.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                            <span>{page.visible ? 'Visible' : 'Hidden'}</span>
                          </button>

                          <button
                            onClick={() => updatePageConfig(page.id, 'enabled', !page.enabled)}
                            className={`px-3 py-1.5 rounded-md transition-all text-xs flex items-center gap-1 ${
                              page.enabled
                                ? 'bg-orange-500 text-white'
                                : 'bg-white/10 text-white/60'
                            }`}
                          >
                            {page.enabled ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                            <span>{page.enabled ? 'On' : 'Off'}</span>
                          </button>

                          <button
                            onClick={() => navigate(`/admin/config/pages/edit/${page.id}`)}
                            className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-md transition-all text-xs flex items-center gap-1"
                          >
                            <Edit3 size={14} />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => handleDeletePage(page.id)}
                            className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-md transition-all text-xs flex items-center gap-1"
                          >
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => moveUp(page.id)}
                              disabled={index === 0}
                              className={`px-2 py-1.5 rounded transition-all text-xs ${
                                index === 0
                                  ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                  : 'bg-white/10 hover:bg-white/20 text-white'
                              }`}
                            >
                              ↑
                            </button>
                            <button
                              onClick={() => moveDown(page.id)}
                              disabled={index === pagesConfig.length - 1}
                              className={`px-2 py-1.5 rounded transition-all text-xs ${
                                index === pagesConfig.length - 1
                                  ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                  : 'bg-white/10 hover:bg-white/20 text-white'
                              }`}
                            >
                              ↓
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:flex items-center gap-4">
                        {/* Drag Handle */}
                        <div className="text-white/40 hover:text-orange-500 transition-colors cursor-grab active:cursor-grabbing">
                          <GripVertical size={20} />
                        </div>

                        {/* Order Badge */}
                        <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-500 flex items-center justify-center font-mono text-sm font-bold">
                          {page.order}
                        </div>

                        {/* Page Icon */}
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            page.enabled ? 'bg-orange-500/20 text-orange-500' : 'bg-white/5 text-white/40'
                          }`}
                        >
                          <page.icon size={24} />
                        </div>

                        {/* Page Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <h4 className="text-white font-semibold text-lg">{page.name}</h4>
                            {page.requiredAuth && (
                              <span className="px-2.5 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30 flex items-center gap-1">
                                <Lock size={12} />
                                Auth Required
                              </span>
                            )}
                            {!page.enabled && (
                              <span className="px-2.5 py-1 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">
                                Disabled
                              </span>
                            )}
                          </div>
                          <p className="text-orange-500/80 text-sm mb-1 font-mono">{page.path}</p>
                          <p className="text-white/50 text-sm">{page.description}</p>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-3 flex-wrap">
                          {/* Visibility Toggle */}
                          <div className="flex flex-col items-center gap-1">
                            <button
                              onClick={() => updatePageConfig(page.id, 'visible', !page.visible)}
                              className={`p-2.5 rounded-lg transition-all ${
                                page.visible
                                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                  : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                              }`}
                              title={page.visible ? 'Hide from menu' : 'Show in menu'}
                            >
                              {page.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                            <span className="text-white/40 text-[10px]">Menu</span>
                          </div>

                          {/* Enabled Toggle */}
                          <div className="flex flex-col items-center gap-1">
                            <button
                              onClick={() => updatePageConfig(page.id, 'enabled', !page.enabled)}
                              className={`p-2.5 rounded-lg transition-all ${
                                page.enabled
                                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                                  : 'bg-white/10 text-white/40 hover:bg-white/20'
                              }`}
                              title={page.enabled ? 'Disable page' : 'Enable page'}
                            >
                              {page.enabled ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                            </button>
                            <span className="text-white/40 text-[10px]">Status</span>
                          </div>

                          {/* Order Controls */}
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => moveUp(page.id)}
                              disabled={index === 0}
                              className={`p-1.5 rounded transition-all ${
                                index === 0
                                  ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                  : 'bg-white/10 hover:bg-white/20 text-white'
                              }`}
                            >
                              ↑
                            </button>
                            <button
                              onClick={() => moveDown(page.id)}
                              disabled={index === pagesConfig.length - 1}
                              className={`p-1.5 rounded transition-all ${
                                index === pagesConfig.length - 1
                                  ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                  : 'bg-white/10 hover:bg-white/20 text-white'
                              }`}
                            >
                              ↓
                            </button>
                          </div>

                          {/* Edit Button */}
                          <div className="flex flex-col items-center gap-1">
                            <button 
                              onClick={() => navigate(`/admin/config/pages/edit/${page.id}`)}
                              className="p-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all"
                            >
                              <Edit3 size={18} />
                            </button>
                            <span className="text-white/40 text-[10px]">Edit</span>
                          </div>

                          {/* Delete Button */}
                          <div className="flex flex-col items-center gap-1">
                            <button
                              onClick={() => handleDeletePage(page.id)}
                              className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                            <span className="text-white/40 text-[10px]">Delete</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-5"
            >
              <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                <Layout size={18} />
                Quick Guide
              </h4>
              <ul className="text-white/60 text-sm space-y-2">
                <li>• <strong className="text-white/80">Drag & Drop:</strong> Reorder pages by dragging them up or down</li>
                <li>• <strong className="text-white/80">Menu Visibility:</strong> Toggle eye icon to show/hide page in navigation menu</li>
                <li>• <strong className="text-white/80">Enable/Disable:</strong> Control whether a page is accessible to users</li>
                <li>• <strong className="text-white/80">Auth Required:</strong> Pages marked with lock icon require user authentication</li>
                <li>• <strong className="text-white/80">Order Numbers:</strong> Lower numbers appear first in the navigation</li>
              </ul>
            </motion.div>

            {/* Delete Confirmation */}
            {showDeleteConfirm && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="fixed top-6 right-6 bg-red-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-2 z-50"
              >
                <Trash2 size={18} />
                <span>Are you sure you want to delete this page?</span>
                <button
                  onClick={confirmDeletePage}
                  className="ml-4 px-3 py-1 bg-white text-red-500 rounded-lg transition-all"
                >
                  Delete
                </button>
                <button
                  onClick={cancelDeletePage}
                  className="ml-2 px-3 py-1 bg-white text-red-500 rounded-lg transition-all"
                >
                  Cancel
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}