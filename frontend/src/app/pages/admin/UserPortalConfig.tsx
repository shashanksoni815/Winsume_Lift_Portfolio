import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Settings,
  Layout,
  Palette,
  Menu,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Upload,
  Image as ImageIcon,
  FileText,
  Link2,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
  ChevronRight,
  Home,
  ShoppingBag,
  Briefcase,
  Phone,
  Users,
  FileCheck,
  MessageSquare,
  User,
  X,
  Plus,
  Edit3,
  Trash2
} from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { AdminSidebar } from '../../components/AdminSidebar';

interface PageConfig {
  id: string;
  name: string;
  path: string;
  icon: any;
  enabled: boolean;
  visible: boolean;
  order: number;
  requiredAuth: boolean;
}

interface PortalSettings {
  siteName: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  enableSocialLogin: boolean;
  maintenanceMode: boolean;
  allowGuestCheckout: boolean;
  enableChat: boolean;
  enableNotifications: boolean;
  maxFileUploadSize: number;
}

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  logoUrl: string;
  faviconUrl: string;
}

export function UserPortalConfig() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'pages' | 'theme' | 'navigation' | 'features'>('general');
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['portal-settings']);

  // Portal Settings
  const [portalSettings, setPortalSettings] = useState<PortalSettings>({
    siteName: 'WINSUME LIFT INDIA',
    tagline: 'Luxury Vertical Lift Solutions',
    supportEmail: 'support@winsumelift.com',
    supportPhone: '+91 1800 123 4567',
    allowRegistration: true,
    requireEmailVerification: true,
    enableSocialLogin: false,
    maintenanceMode: false,
    allowGuestCheckout: true,
    enableChat: false,
    enableNotifications: true,
    maxFileUploadSize: 10
  });

  // Theme Settings
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    primaryColor: '#1a3332',
    secondaryColor: '#2a4544',
    accentColor: '#f97316',
    backgroundColor: '#ffffff',
    textColor: '#1a1a1a',
    fontFamily: 'Inter',
    logoUrl: '',
    faviconUrl: ''
  });

  // Pages Configuration
  const [pagesConfig, setPagesConfig] = useState<PageConfig[]>([
    { id: 'home', name: 'Home', path: '/', icon: Home, enabled: true, visible: true, order: 1, requiredAuth: false },
    { id: 'collection', name: 'Collection', path: '/collection', icon: ShoppingBag, enabled: true, visible: true, order: 2, requiredAuth: false },
    { id: 'our-work', name: 'Our Work', path: '/our-work', icon: Briefcase, enabled: true, visible: true, order: 3, requiredAuth: false },
    { id: 'services', name: 'Services', path: '/services', icon: FileCheck, enabled: true, visible: true, order: 4, requiredAuth: false },
    { id: 'about', name: 'About', path: '/about', icon: Users, enabled: true, visible: true, order: 5, requiredAuth: false },
    { id: 'contact', name: 'Contact', path: '/contact', icon: Phone, enabled: true, visible: true, order: 6, requiredAuth: false },
    { id: 'inquiry', name: 'Inquiry Form', path: '/inquiry', icon: MessageSquare, enabled: true, visible: false, order: 7, requiredAuth: false },
    { id: 'my-engagements', name: 'My Engagements', path: '/my-engagements', icon: User, enabled: true, visible: false, order: 8, requiredAuth: true }
  ]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const updatePortalSetting = (key: keyof PortalSettings, value: any) => {
    setPortalSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateThemeSetting = (key: keyof ThemeSettings, value: any) => {
    setThemeSettings(prev => ({ ...prev, [key]: value }));
  };

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

  const handleResetToDefaults = () => {
    // Reset logic here
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      // Reset to defaults
    }
  };

  const tabs = [
    { id: 'general', label: 'General Settings', icon: Settings },
    { id: 'pages', label: 'Pages Management', icon: Layout },
    { id: 'navigation', label: 'Navigation Menu', icon: Menu },
    { id: 'theme', label: 'Theme & Branding', icon: Palette },
    { id: 'features', label: 'Features Control', icon: ToggleRight }
  ];

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
            alt="User Portal Config Background"
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
                <p className="text-orange-500 text-xs uppercase tracking-widest mb-3">
                  ADMIN PORTAL AREA
                </p>
                <h1 className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-tight">
                  User Portal Configuration
                </h1>
                <div className="w-24 h-0.5 bg-orange-500 mx-auto mb-6"></div>
                <p className="text-white/60">Manage and customize the User Portal experience</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
                <button
                  onClick={handleSaveChanges}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2 font-medium"
                >
                  <Save size={18} />
                  <span>Save All Changes</span>
                </button>
                <button
                  onClick={handleResetToDefaults}
                  className="px-6 py-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-all flex items-center gap-2"
                >
                  <RotateCcw size={18} />
                  <span>Reset to Defaults</span>
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all flex items-center gap-2"
                >
                  <Eye size={18} />
                  <span>Preview Portal</span>
                </button>
              </div>
            </motion.div>

            {/* Tabs Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-2 flex items-center gap-2 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 min-w-[180px] px-4 py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <tab.icon size={18} />
                    <span className="text-sm font-medium whitespace-nowrap">{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* General Settings Tab */}
            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Portal Information */}
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                  <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                    <Globe className="text-orange-500" size={24} />
                    Portal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Site Name</label>
                      <input
                        type="text"
                        value={portalSettings.siteName}
                        onChange={(e) => updatePortalSetting('siteName', e.target.value)}
                        className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Tagline</label>
                      <input
                        type="text"
                        value={portalSettings.tagline}
                        onChange={(e) => updatePortalSetting('tagline', e.target.value)}
                        className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Support Email</label>
                      <input
                        type="email"
                        value={portalSettings.supportEmail}
                        onChange={(e) => updatePortalSetting('supportEmail', e.target.value)}
                        className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Support Phone</label>
                      <input
                        type="tel"
                        value={portalSettings.supportPhone}
                        onChange={(e) => updatePortalSetting('supportPhone', e.target.value)}
                        className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      />
                    </div>
                  </div>
                </div>

                {/* Access & Security */}
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                  <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                    <Settings className="text-orange-500" size={24} />
                    Access & Security Settings
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: 'allowRegistration', label: 'Allow User Registration', description: 'Enable new users to create accounts' },
                      { key: 'requireEmailVerification', label: 'Require Email Verification', description: 'Users must verify email before accessing portal' },
                      { key: 'enableSocialLogin', label: 'Enable Social Login', description: 'Allow login via Google, Facebook, etc.' },
                      { key: 'allowGuestCheckout', label: 'Allow Guest Checkout', description: 'Users can checkout without creating account' },
                      { key: 'maintenanceMode', label: 'Maintenance Mode', description: 'Temporarily disable portal for maintenance' }
                    ].map((setting) => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between p-4 bg-[#1a3332]/50 border border-orange-500/10 rounded-lg hover:border-orange-500/20 transition-all"
                      >
                        <div className="flex-1">
                          <p className="text-white font-medium mb-1">{setting.label}</p>
                          <p className="text-white/60 text-sm">{setting.description}</p>
                        </div>
                        <button
                          onClick={() => updatePortalSetting(setting.key as keyof PortalSettings, !portalSettings[setting.key as keyof PortalSettings])}
                          className={`ml-4 p-2 rounded-lg transition-all ${
                            portalSettings[setting.key as keyof PortalSettings]
                              ? 'bg-orange-500 text-white'
                              : 'bg-white/10 text-white/40'
                          }`}
                        >
                          {portalSettings[setting.key as keyof PortalSettings] ? (
                            <ToggleRight size={24} />
                          ) : (
                            <ToggleLeft size={24} />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* File Upload Settings */}
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                  <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                    <Upload className="text-orange-500" size={24} />
                    File Upload Settings
                  </h3>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Maximum File Upload Size (MB)
                    </label>
                    <input
                      type="number"
                      value={portalSettings.maxFileUploadSize}
                      onChange={(e) => updatePortalSetting('maxFileUploadSize', parseInt(e.target.value))}
                      className="w-full md:w-64 bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                      min="1"
                      max="100"
                    />
                    <p className="text-white/40 text-xs mt-2">Recommended: 10MB for optimal performance</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Pages Management Tab */}
            {activeTab === 'pages' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6"
              >
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                  <Layout className="text-orange-500" size={24} />
                  Manage Portal Pages
                </h3>
                <p className="text-white/60 mb-6">Control visibility, order, and access permissions for all portal pages</p>

                <div className="space-y-3">
                  {pagesConfig
                    .sort((a, b) => a.order - b.order)
                    .map((page) => (
                      <div
                        key={page.id}
                        className="bg-[#1a3332]/50 border border-orange-500/10 rounded-lg p-5 hover:border-orange-500/20 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            page.enabled ? 'bg-orange-500/20 text-orange-500' : 'bg-white/5 text-white/40'
                          }`}>
                            <page.icon size={20} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="text-white font-medium">{page.name}</h4>
                              {page.requiredAuth && (
                                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded border border-purple-500/30">
                                  Auth Required
                                </span>
                              )}
                            </div>
                            <p className="text-white/60 text-sm">{page.path}</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-white/60 text-sm">Visible in Menu:</span>
                              <button
                                onClick={() => updatePageConfig(page.id, 'visible', !page.visible)}
                                className={`p-2 rounded-lg transition-all ${
                                  page.visible
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-red-500/20 text-red-400'
                                }`}
                                title={page.visible ? 'Hide from menu' : 'Show in menu'}
                              >
                                {page.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-white/60 text-sm">Enabled:</span>
                              <button
                                onClick={() => updatePageConfig(page.id, 'enabled', !page.enabled)}
                                className={`p-2 rounded-lg transition-all ${
                                  page.enabled
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-white/10 text-white/40'
                                }`}
                              >
                                {page.enabled ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                              </button>
                            </div>

                            <button 
                              onClick={() => navigate('/admin/config/pages')}
                              className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all"
                              title="Manage page settings"
                            >
                              <Edit3 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Navigation Menu Tab */}
            {activeTab === 'navigation' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6"
              >
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                  <Menu className="text-orange-500" size={24} />
                  Navigation Menu Configuration
                </h3>
                <p className="text-white/60 mb-6">Customize the main navigation menu structure and order</p>

                <div className="space-y-4">
                  {pagesConfig
                    .filter(page => page.visible)
                    .sort((a, b) => a.order - b.order)
                    .map((page, index) => (
                      <div
                        key={page.id}
                        className="flex items-center gap-4 p-4 bg-[#1a3332]/50 border border-orange-500/10 rounded-lg"
                      >
                        <div className="flex items-center gap-2 text-white/40">
                          <span className="text-sm font-mono">#{page.order}</span>
                        </div>
                        
                        <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-500 flex items-center justify-center">
                          <page.icon size={18} />
                        </div>

                        <div className="flex-1">
                          <p className="text-white font-medium">{page.name}</p>
                          <p className="text-white/60 text-sm">{page.path}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const newOrder = Math.max(1, page.order - 1);
                              updatePageConfig(page.id, 'order', newOrder);
                            }}
                            className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all"
                            disabled={index === 0}
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => {
                              const newOrder = page.order + 1;
                              updatePageConfig(page.id, 'order', newOrder);
                            }}
                            className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all"
                            disabled={index === pagesConfig.filter(p => p.visible).length - 1}
                          >
                            ↓
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Theme & Branding Tab */}
            {activeTab === 'theme' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Color Scheme */}
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                  <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                    <Palette className="text-orange-500" size={24} />
                    Color Scheme
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { key: 'primaryColor', label: 'Primary Color', default: '#1a3332' },
                      { key: 'secondaryColor', label: 'Secondary Color', default: '#2a4544' },
                      { key: 'accentColor', label: 'Accent Color', default: '#f97316' },
                      { key: 'backgroundColor', label: 'Background Color', default: '#ffffff' },
                      { key: 'textColor', label: 'Text Color', default: '#1a1a1a' }
                    ].map((color) => (
                      <div key={color.key}>
                        <label className="block text-white/80 text-sm font-medium mb-2">{color.label}</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={themeSettings[color.key as keyof ThemeSettings] as string}
                            onChange={(e) => updateThemeSetting(color.key as keyof ThemeSettings, e.target.value)}
                            className="w-16 h-12 rounded-lg border-2 border-orange-500/20 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={themeSettings[color.key as keyof ThemeSettings] as string}
                            onChange={(e) => updateThemeSetting(color.key as keyof ThemeSettings, e.target.value)}
                            className="flex-1 bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 font-mono text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typography */}
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                  <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                    <FileText className="text-orange-500" size={24} />
                    Typography
                  </h3>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Primary Font Family</label>
                    <select
                      value={themeSettings.fontFamily}
                      onChange={(e) => updateThemeSetting('fontFamily', e.target.value)}
                      className="w-full md:w-96 bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Playfair Display">Playfair Display</option>
                      <option value="Great Vibes">Great Vibes</option>
                      <option value="Arial">Arial</option>
                      <option value="Helvetica">Helvetica</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Times New Roman">Times New Roman</option>
                    </select>
                  </div>
                </div>

                {/* Branding Assets */}
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                  <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                    <ImageIcon className="text-orange-500" size={24} />
                    Branding Assets
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Logo URL</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={themeSettings.logoUrl}
                          onChange={(e) => updateThemeSetting('logoUrl', e.target.value)}
                          className="flex-1 bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                          placeholder="https://example.com/logo.png"
                        />
                        <button className="px-4 py-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-all flex items-center gap-2">
                          <Upload size={18} />
                          <span>Upload</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Favicon URL</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={themeSettings.faviconUrl}
                          onChange={(e) => updateThemeSetting('faviconUrl', e.target.value)}
                          className="flex-1 bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                          placeholder="https://example.com/favicon.ico"
                        />
                        <button className="px-4 py-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-all flex items-center gap-2">
                          <Upload size={18} />
                          <span>Upload</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Features Control Tab */}
            {activeTab === 'features' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6"
              >
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                  <ToggleRight className="text-orange-500" size={24} />
                  Portal Features Control
                </h3>
                <p className="text-white/60 mb-6">Enable or disable specific features for the user portal</p>

                <div className="space-y-4">
                  {[
                    { key: 'enableChat', label: 'Live Chat Support', description: 'Enable real-time chat widget for customer support', icon: MessageSquare },
                    { key: 'enableNotifications', label: 'Push Notifications', description: 'Allow browser notifications for updates and alerts', icon: AlertCircle },
                    { key: 'allowGuestCheckout', label: 'Guest Checkout', description: 'Let users complete purchases without registration', icon: ShoppingBag },
                    { key: 'enableSocialLogin', label: 'Social Media Login', description: 'Enable login via social platforms', icon: Users }
                  ].map((feature) => (
                    <div
                      key={feature.key}
                      className="flex items-start gap-4 p-5 bg-[#1a3332]/50 border border-orange-500/10 rounded-lg hover:border-orange-500/20 transition-all"
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        portalSettings[feature.key as keyof PortalSettings]
                          ? 'bg-orange-500/20 text-orange-500'
                          : 'bg-white/5 text-white/40'
                      }`}>
                        <feature.icon size={24} />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-1">{feature.label}</h4>
                        <p className="text-white/60 text-sm">{feature.description}</p>
                      </div>

                      <button
                        onClick={() => updatePortalSetting(feature.key as keyof PortalSettings, !portalSettings[feature.key as keyof PortalSettings])}
                        className={`ml-4 px-6 py-2 rounded-lg transition-all font-medium ${
                          portalSettings[feature.key as keyof PortalSettings]
                            ? 'bg-orange-500 text-white'
                            : 'bg-white/10 text-white/60'
                        }`}
                      >
                        {portalSettings[feature.key as keyof PortalSettings] ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Save Confirmation Toast */}
      {showSaveConfirm && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 z-50"
        >
          <CheckCircle2 size={24} />
          <div>
            <p className="font-semibold">Changes Saved Successfully!</p>
            <p className="text-sm text-white/90">User Portal configuration has been updated</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}