import { useEffect, useState } from 'react';
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
  heroHeading?: string;
  supportEmail: string;
  supportPhone: string;
  projectsCompleted: number;
  citiesServed: number;
  yearsExperience: number;
  satisfactionRate: number;
  homePortfolioProjectIds?: string[];
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
  const [activeTab, setActiveTab] = useState<'general' | 'pages' | 'theme'>('general');
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['portal-settings']);
  const [isEditingGeneral, setIsEditingGeneral] = useState(false);

  // Portal Settings
  const [portalSettings, setPortalSettings] = useState<PortalSettings>({
    siteName: 'WINSUME LIFT INDIA',
    tagline: 'Luxury Vertical Lift Solutions',
    heroHeading: 'The Art of Vertical Mastery',
    supportEmail: 'support@winsumelift.com',
    supportPhone: '+91 1800 123 4567',
    projectsCompleted: 200,
    citiesServed: 15,
    yearsExperience: 6,
    satisfactionRate: 98,
    homePortfolioProjectIds: ['manhattan-penthouse', 'corporate-tower-mumbai', 'luxury-villa-delhi', 'heritage-hotel-jaipur'],
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
  const ALLOWED_PAGE_IDS = ['home', 'collection', 'our-work'] as const;
  const [pagesConfig, setPagesConfig] = useState<PageConfig[]>([
    { id: 'home', name: 'Home', path: '/', icon: Home, enabled: true, visible: true, order: 1, requiredAuth: false },
    { id: 'collection', name: 'Collection', path: '/collection', icon: ShoppingBag, enabled: true, visible: true, order: 2, requiredAuth: false },
    { id: 'our-work', name: 'Our Work', path: '/our-work', icon: Briefcase, enabled: true, visible: true, order: 3, requiredAuth: false }
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
    const loadConfig = async () => {
      try {
        const res = await fetch('https://winsume-lift-portfolio-backend.onrender.com/api/portal-config');
        if (!res.ok) return;
        const data = await res.json().catch(() => null);
        if (!data) return;
        if (data.portalSettings) setPortalSettings((prev) => ({ ...prev, ...data.portalSettings }));
        if (data.themeSettings) setThemeSettings((prev) => ({ ...prev, ...data.themeSettings }));
        if (Array.isArray(data.pagesConfig)) {
          setPagesConfig((prev) =>
            data.pagesConfig
              .filter((p: any) => ALLOWED_PAGE_IDS.includes(p?.id))
              .map((p: any) => {
                const local = prev.find((lp) => lp.id === p.id);
                const icon =
                  local?.icon ??
                  ({
                    home: Home,
                    collection: ShoppingBag,
                    'our-work': Briefcase
                  } as Record<string, any>)[p.id] ??
                  Home;
                return {
                  ...local,
                  ...p,
                  icon
                };
              })
          );
        }
      } catch {
        // ignore load errors, keep defaults
      }
    };
    loadConfig();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const body = {
        portalSettings,
        themeSettings,
        pagesConfig: pagesConfig
          .filter((p) => ALLOWED_PAGE_IDS.includes(p.id))
          .map((p) => ({
          id: p.id,
          name: p.name,
          path: p.path,
          enabled: p.enabled,
          visible: p.visible,
          order: p.order,
          requiredAuth: p.requiredAuth
        }))
      };
      const res = await adminFetch('https://winsume-lift-portfolio-backend.onrender.com/api/portal-config', {
        method: 'PATCH',
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        alert(data?.message || 'Failed to save configuration.');
        return;
      }
      setShowSaveConfirm(true);
      setTimeout(() => setShowSaveConfirm(false), 3000);
    } catch {
      alert('Unable to save configuration right now.');
    }
  };

  const handleResetToDefaults = async () => {
    if (!confirm('Are you sure you want to reset all settings to defaults?')) {
      return;
    }
    try {
      const res = await adminFetch('https://winsume-lift-portfolio-backend.onrender.com/api/portal-config/reset', {
        method: 'POST'
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        alert(data?.message || 'Failed to reset configuration.');
        return;
      }
      const data = await res.json().catch(() => null);
      if (data?.portalSettings) setPortalSettings(data.portalSettings);
      if (data?.themeSettings) setThemeSettings(data.themeSettings);
      if (Array.isArray(data?.pagesConfig)) {
        setPagesConfig((prev) =>
          data.pagesConfig
            .filter((p: any) => ALLOWED_PAGE_IDS.includes(p?.id))
            .map((p: any) => {
              const local = prev.find((lp) => lp.id === p.id);
              const icon =
                local?.icon ??
                ({
                  home: Home,
                  collection: ShoppingBag,
                  'our-work': Briefcase
                } as Record<string, any>)[p.id] ??
                Home;
              return {
                ...local,
                ...p,
                icon
              };
            })
        );
      }
      setShowSaveConfirm(true);
      setTimeout(() => setShowSaveConfirm(false), 3000);
    } catch {
      alert('Unable to reset configuration right now.');
    }
  };

  const tabs = [
    { id: 'general', label: 'General Settings', icon: Settings },
    { id: 'pages', label: 'Pages Management', icon: Layout },
    { id: 'theme', label: 'Theme & Branding', icon: Palette }
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
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white text-xl font-semibold flex items-center gap-2">
                      <Globe className="text-orange-500" size={24} />
                      Portal Information
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsEditingGeneral((prev) => !prev)}
                        className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs sm:text-sm flex items-center gap-1 transition-all"
                      >
                        <Edit3 size={14} />
                        <span>{isEditingGeneral ? 'Cancel' : 'Edit'}</span>
                      </button>
                      <button
                        onClick={handleSaveChanges}
                        disabled={!isEditingGeneral}
                        className={`px-3 py-2 rounded-lg text-xs sm:text-sm flex items-center gap-1 transition-all ${
                          isEditingGeneral
                            ? 'bg-orange-500 hover:bg-orange-600 text-white'
                            : 'bg-orange-500/20 text-white/50 cursor-not-allowed'
                        }`}
                      >
                        <Save size={14} />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Site Name</label>
                      <input
                        type="text"
                        value={portalSettings.siteName}
                        onChange={(e) => updatePortalSetting('siteName', e.target.value)}
                        disabled={!isEditingGeneral}
                        className={`w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 ${
                          !isEditingGeneral ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Hero Heading</label>
                      <input
                        type="text"
                        value={portalSettings.heroHeading || ''}
                        onChange={(e) => updatePortalSetting('heroHeading', e.target.value)}
                        disabled={!isEditingGeneral}
                        className={`w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 ${
                          !isEditingGeneral ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Support Email</label>
                      <input
                        type="email"
                        value={portalSettings.supportEmail}
                        onChange={(e) => updatePortalSetting('supportEmail', e.target.value)}
                        disabled={!isEditingGeneral}
                        className={`w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 ${
                          !isEditingGeneral ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Support Phone</label>
                      <input
                        type="tel"
                        value={portalSettings.supportPhone}
                        onChange={(e) => updatePortalSetting('supportPhone', e.target.value)}
                        disabled={!isEditingGeneral}
                        className={`w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 ${
                          !isEditingGeneral ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Projects Completed</label>
                      <input
                        type="number"
                        value={portalSettings.projectsCompleted}
                        onChange={(e) => updatePortalSetting('projectsCompleted', Number(e.target.value) || 0)}
                        disabled={!isEditingGeneral}
                        className={`w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 ${
                          !isEditingGeneral ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Cities Served</label>
                      <input
                        type="number"
                        value={portalSettings.citiesServed}
                        onChange={(e) => updatePortalSetting('citiesServed', Number(e.target.value) || 0)}
                        disabled={!isEditingGeneral}
                        className={`w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 ${
                          !isEditingGeneral ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Years Experience</label>
                      <input
                        type="number"
                        value={portalSettings.yearsExperience}
                        onChange={(e) => updatePortalSetting('yearsExperience', Number(e.target.value) || 0)}
                        disabled={!isEditingGeneral}
                        className={`w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 ${
                          !isEditingGeneral ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Satisfaction Rate (%)</label>
                      <input
                        type="number"
                        value={portalSettings.satisfactionRate}
                        onChange={(e) => updatePortalSetting('satisfactionRate', Number(e.target.value) || 0)}
                        disabled={!isEditingGeneral}
                        className={`w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 ${
                          !isEditingGeneral ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Tagline</label>
                      <input
                        type="text"
                        value={portalSettings.tagline}
                        onChange={(e) => updatePortalSetting('tagline', e.target.value)}
                        disabled={!isEditingGeneral}
                        className={`w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 ${
                          !isEditingGeneral ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
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
                              onClick={() => navigate(`/admin/config/pages/edit/${page.id}`)}
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

                {/* Featured Portfolio Configuration */}
                <div className="mt-10 border-t border-white/10 pt-6">
                  <h4 className="text-white text-lg font-semibold mb-2">
                    Home Portfolio Featured Projects
                  </h4>
                  <p className="text-white/60 text-sm mb-4">
                    Choose up to 4 projects to highlight in the "Our Portfolio" section on the home page.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { id: 'manhattan-penthouse', label: 'Manhattan Penthouse' },
                      { id: 'corporate-tower-mumbai', label: 'Corporate Tower' },
                      { id: 'luxury-villa-delhi', label: 'Modern Villa' },
                      { id: 'heritage-hotel-jaipur', label: 'Heritage Building' },
                    ].map((item) => {
                      const selectedIds = portalSettings.homePortfolioProjectIds || [];
                      const isSelected = selectedIds.includes(item.id);
                      const selectedCount = selectedIds.length;
                      const disabled = !isSelected && selectedCount >= 4;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            const current = portalSettings.homePortfolioProjectIds || [];
                            const next = isSelected
                              ? current.filter((pid) => pid !== item.id)
                              : [...current, item.id];
                            updatePortalSetting('homePortfolioProjectIds', next);
                          }}
                          disabled={disabled}
                          className={`flex items-center justify-between px-4 py-3 rounded-lg border text-sm transition-all ${
                            isSelected
                              ? 'border-orange-500 bg-orange-500/20 text-white'
                              : 'border-white/10 bg-white/5 text-white/70 hover:border-orange-500/40'
                          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <span>{item.label}</span>
                          <span
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-orange-400 bg-orange-500' : 'border-white/30'
                            }`}
                          >
                            {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-white/40 text-xs mt-2">
                    Selected: {portalSettings.homePortfolioProjectIds?.length ?? 0} / 4
                  </p>
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