import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Save,
  Layout,
  Eye,
  EyeOff,
  Lock,
  Globe,
  Home,
  ShoppingBag,
  Briefcase,
  Phone,
  Users,
  FileCheck,
  MessageSquare,
  User,
  Settings,
  FileText,
  Mail,
  Calendar,
  Package,
  Heart,
  Star,
  TrendingUp,
  Zap,
  Shield,
  AlertCircle
} from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { AdminSidebar } from '../../../components/AdminSidebar';

const availableIcons = [
  { name: 'Home', icon: Home },
  { name: 'ShoppingBag', icon: ShoppingBag },
  { name: 'Briefcase', icon: Briefcase },
  { name: 'Phone', icon: Phone },
  { name: 'Users', icon: Users },
  { name: 'FileCheck', icon: FileCheck },
  { name: 'MessageSquare', icon: MessageSquare },
  { name: 'User', icon: User },
  { name: 'Settings', icon: Settings },
  { name: 'FileText', icon: FileText },
  { name: 'Mail', icon: Mail },
  { name: 'Calendar', icon: Calendar },
  { name: 'Package', icon: Package },
  { name: 'Heart', icon: Heart },
  { name: 'Star', icon: Star },
  { name: 'TrendingUp', icon: TrendingUp },
  { name: 'Zap', icon: Zap },
  { name: 'Shield', icon: Shield },
  { name: 'Layout', icon: Layout }
];

export function AddNewPage() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    path: '',
    description: '',
    selectedIcon: 'Layout',
    enabled: true,
    visible: true,
    requiredAuth: false,
    showInFooter: false,
    metaTitle: '',
    metaDescription: '',
    order: 1
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Page name is required';
    }

    if (!formData.path.trim()) {
      newErrors.path = 'Page path is required';
    } else if (!formData.path.startsWith('/')) {
      newErrors.path = 'Page path must start with /';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Page description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Save logic here
      console.log('Saving new page:', formData);
      setShowSaveConfirm(true);
      setTimeout(() => {
        navigate('/admin/config/pages');
      }, 1500);
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      navigate('/admin/config/pages');
    }
  };

  const selectedIconComponent = availableIcons.find(i => i.name === formData.selectedIcon)?.icon || Layout;

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
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600"
            alt="Add New Page Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        {/* Page Content */}
        <div className="relative z-10 pt-4 sm:pt-6 md:pt-8 pb-10 sm:pb-16 md:pb-20 px-3 sm:px-4 md:px-6">
          <div className="max-w-[1200px] mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              {/* Back Button */}
              <button
                onClick={() => navigate('/admin/config/pages')}
                className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-all"
              >
                <ArrowLeft size={20} />
                <span>Back to Pages Management</span>
              </button>

              <div className="text-center mb-6">
                <p className="text-orange-500 text-xs uppercase tracking-widest mb-3">
                  PORTAL CONFIGURATION
                </p>
                <h1 className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-tight">
                  Add New Page
                </h1>
                <div className="w-24 h-0.5 bg-orange-500 mx-auto mb-6"></div>
                <p className="text-white/60">
                  Create a new page for the user portal
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2 font-medium"
                >
                  <Save size={18} />
                  <span>Save Page</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                >
                  Cancel
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
                  <span>Page created successfully!</span>
                </motion.div>
              )}
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Basic Information */}
              <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                  <Layout className="text-orange-500" size={24} />
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Page Name */}
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Page Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      className={`w-full bg-[#1a3332] border rounded-lg px-4 py-3 text-white focus:outline-none ${
                        errors.name
                          ? 'border-red-500/50 focus:border-red-500'
                          : 'border-orange-500/20 focus:border-orange-500/40'
                      }`}
                      placeholder="e.g., About Us"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Page Path */}
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Page Path <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.path}
                      onChange={(e) => updateFormData('path', e.target.value)}
                      className={`w-full bg-[#1a3332] border rounded-lg px-4 py-3 text-white focus:outline-none font-mono ${
                        errors.path
                          ? 'border-red-500/50 focus:border-red-500'
                          : 'border-orange-500/20 focus:border-orange-500/40'
                      }`}
                      placeholder="/about-us"
                    />
                    {errors.path && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.path}
                      </p>
                    )}
                    <p className="text-white/40 text-xs mt-1">Must start with forward slash (/)</p>
                  </div>

                  {/* Order */}
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => updateFormData('order', parseInt(e.target.value) || 1)}
                      className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      min="1"
                    />
                    <p className="text-white/40 text-xs mt-1">Lower numbers appear first</p>
                  </div>

                  {/* Icon Selection */}
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Page Icon
                    </label>
                    <div className="relative">
                      <select
                        value={formData.selectedIcon}
                        onChange={(e) => updateFormData('selectedIcon', e.target.value)}
                        className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 appearance-none"
                      >
                        {availableIcons.map((icon) => (
                          <option key={icon.name} value={icon.name}>
                            {icon.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        {selectedIconComponent && <selectedIconComponent size={20} className="text-orange-500" />}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      className={`w-full bg-[#1a3332] border rounded-lg px-4 py-3 text-white focus:outline-none resize-none ${
                        errors.description
                          ? 'border-red-500/50 focus:border-red-500'
                          : 'border-orange-500/20 focus:border-orange-500/40'
                      }`}
                      rows={3}
                      placeholder="Brief description of what this page contains"
                    />
                    {errors.description && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Page Settings */}
              <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                  <Settings className="text-orange-500" size={24} />
                  Page Settings
                </h3>

                <div className="space-y-4">
                  {/* Enabled */}
                  <div className="flex items-center justify-between p-4 bg-[#1a3332]/50 border border-orange-500/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        formData.enabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {formData.enabled ? <Eye size={20} /> : <EyeOff size={20} />}
                      </div>
                      <div>
                        <p className="text-white font-medium">Enable Page</p>
                        <p className="text-white/60 text-sm">Make this page accessible to users</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateFormData('enabled', !formData.enabled)}
                      className={`px-6 py-2 rounded-lg transition-all font-medium ${
                        formData.enabled
                          ? 'bg-green-500 text-white'
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {formData.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>

                  {/* Visible in Menu */}
                  <div className="flex items-center justify-between p-4 bg-[#1a3332]/50 border border-orange-500/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        formData.visible ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        <Layout size={20} />
                      </div>
                      <div>
                        <p className="text-white font-medium">Show in Navigation Menu</p>
                        <p className="text-white/60 text-sm">Display this page in the main navigation</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateFormData('visible', !formData.visible)}
                      className={`px-6 py-2 rounded-lg transition-all font-medium ${
                        formData.visible
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {formData.visible ? 'Visible' : 'Hidden'}
                    </button>
                  </div>

                  {/* Authentication Required */}
                  <div className="flex items-center justify-between p-4 bg-[#1a3332]/50 border border-orange-500/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        formData.requiredAuth ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        <Lock size={20} />
                      </div>
                      <div>
                        <p className="text-white font-medium">Require Authentication</p>
                        <p className="text-white/60 text-sm">Only logged-in users can access this page</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateFormData('requiredAuth', !formData.requiredAuth)}
                      className={`px-6 py-2 rounded-lg transition-all font-medium ${
                        formData.requiredAuth
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {formData.requiredAuth ? 'Required' : 'Public'}
                    </button>
                  </div>

                  {/* Show in Footer */}
                  <div className="flex items-center justify-between p-4 bg-[#1a3332]/50 border border-orange-500/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        formData.showInFooter ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        <Globe size={20} />
                      </div>
                      <div>
                        <p className="text-white font-medium">Show in Footer Links</p>
                        <p className="text-white/60 text-sm">Display this page link in the footer section</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateFormData('showInFooter', !formData.showInFooter)}
                      className={`px-6 py-2 rounded-lg transition-all font-medium ${
                        formData.showInFooter
                          ? 'bg-orange-500 text-white'
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {formData.showInFooter ? 'Yes' : 'No'}
                    </button>
                  </div>
                </div>
              </div>

              {/* SEO Settings */}
              <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                  <TrendingUp className="text-orange-500" size={24} />
                  SEO Settings (Optional)
                </h3>

                <div className="space-y-4">
                  {/* Meta Title */}
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => updateFormData('metaTitle', e.target.value)}
                      className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      placeholder="SEO title for search engines"
                    />
                    <p className="text-white/40 text-xs mt-1">Recommended: 50-60 characters</p>
                  </div>

                  {/* Meta Description */}
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={formData.metaDescription}
                      onChange={(e) => updateFormData('metaDescription', e.target.value)}
                      className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 resize-none"
                      rows={3}
                      placeholder="Brief description for search engine results"
                    />
                    <p className="text-white/40 text-xs mt-1">Recommended: 150-160 characters</p>
                  </div>
                </div>
              </div>

              {/* Preview Card */}
              <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                  <Eye className="text-orange-500" size={24} />
                  Preview
                </h3>

                <div className="bg-[#1a3332]/50 border border-orange-500/10 rounded-lg p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-500 flex items-center justify-center font-mono text-sm font-bold">
                      {formData.order}
                    </div>

                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      formData.enabled ? 'bg-orange-500/20 text-orange-500' : 'bg-white/5 text-white/40'
                    }`}>
                      {selectedIconComponent && <selectedIconComponent size={24} />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h4 className="text-white font-semibold text-lg">
                          {formData.name || 'Page Name'}
                        </h4>
                        {formData.requiredAuth && (
                          <span className="px-2.5 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30 flex items-center gap-1">
                            <Lock size={12} />
                            Auth Required
                          </span>
                        )}
                        {!formData.enabled && (
                          <span className="px-2.5 py-1 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">
                            Disabled
                          </span>
                        )}
                        {!formData.visible && (
                          <span className="px-2.5 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full border border-gray-500/30">
                            Hidden from Menu
                          </span>
                        )}
                      </div>
                      <p className="text-orange-500/80 text-sm mb-1 font-mono">
                        {formData.path || '/page-path'}
                      </p>
                      <p className="text-white/50 text-sm">
                        {formData.description || 'Page description will appear here'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}