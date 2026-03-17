import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
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
  AlertCircle,
  Trash2
} from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { AdminSidebar } from '../../../components/AdminSidebar';

interface Product {
  _id?: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  shortDescription: string;
  heroImage?: string;
  features: string[];
  specifications?: { label: string; value: string }[];
}

async function adminFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const token = localStorage.getItem('accessToken');
  const headers: HeadersInit = {
    ...(init.headers || {})
  };
  const isFormData = init.body instanceof FormData;
  if (!isFormData) {
    (headers as any)['Content-Type'] = 'application/json';
  }
  if (token) {
    (headers as any).Authorization = `Bearer ${token}`;
  }

  const response = await fetch(input, {
    ...init,
    headers
  });

  if (!response.ok) {
    // If auth fails, force re-login for admin pages
    if (response.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('isLoggedIn');
      // Redirect to admin login so user can get a fresh token
      window.location.href = '/admin-login';
    }

    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

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

// Mock data - replace with actual API call
const mockPageData = {
  home: { id: 'home', name: 'Home', path: '/', description: 'Main landing page with hero section and featured content', selectedIcon: 'Home', enabled: true, visible: true, requiredAuth: false, showInFooter: true, metaTitle: 'WINSUME LIFT INDIA - Luxury Vertical Lift Solutions', metaDescription: 'Premium bespoke lift solutions for residential and commercial properties', order: 1 },
  collection: { id: 'collection', name: 'Collection', path: '/collection', description: 'Browse all luxury lift collections and products', selectedIcon: 'ShoppingBag', enabled: true, visible: true, requiredAuth: false, showInFooter: true, metaTitle: 'Luxury Lift Collection', metaDescription: 'Explore our exclusive range of custom lifts', order: 2 },
  'our-work': { id: 'our-work', name: 'Our Work', path: '/our-work', description: 'Portfolio of completed projects and case studies', selectedIcon: 'Briefcase', enabled: true, visible: true, requiredAuth: false, showInFooter: true, metaTitle: 'Our Projects & Portfolio', metaDescription: 'View our completed luxury lift installations', order: 3 },
  services: { id: 'services', name: 'Services', path: '/services', description: 'Comprehensive service offerings and capabilities', selectedIcon: 'FileCheck', enabled: true, visible: true, requiredAuth: false, showInFooter: true, metaTitle: 'Lift Services', metaDescription: 'Installation, maintenance, and customization services', order: 4 },
  about: { id: 'about', name: 'About', path: '/about', description: 'Company information, team, and values', selectedIcon: 'Users', enabled: true, visible: true, requiredAuth: false, showInFooter: true, metaTitle: 'About WINSUME LIFT INDIA', metaDescription: 'Learn about our company and commitment to excellence', order: 5 },
  contact: { id: 'contact', name: 'Contact', path: '/contact', description: 'Contact forms and office location information', selectedIcon: 'Phone', enabled: true, visible: true, requiredAuth: false, showInFooter: true, metaTitle: 'Contact Us', metaDescription: 'Get in touch with our team', order: 6 }
};

export function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Products state (for Collection page)
  const [products, setProducts] = useState<Product[]>([]);
  const [productForm, setProductForm] = useState<Product>({
    name: '',
    slug: '',
    category: '',
    price: 0,
    shortDescription: '',
    heroImage: '',
    features: [],
    specifications: []
  });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [homeFeaturedProductIds, setHomeFeaturedProductIds] = useState<string[]>([]);
  const [homeCollectionsProductIds, setHomeCollectionsProductIds] = useState<string[]>([]);
  const [ourWorkFeaturedProductIds, setOurWorkFeaturedProductIds] = useState<string[]>([]);

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

  // Load page data
  useEffect(() => {
    if (id) {
      const pageData = mockPageData[id as keyof typeof mockPageData];
      if (pageData) {
        setFormData(pageData);
      } else {
        // Page not found, redirect
        navigate('/admin/config/pages');
      }
    }
  }, [id, navigate]);

  // Load products when editing Collection, Our Work, or Home pages
  useEffect(() => {
    if (id !== 'collection' && id !== 'our-work' && id !== 'home') return;

    const loadProducts = async () => {
      try {
        setProductLoading(true);
        setProductError(null);
        const data = await adminFetch('http://localhost:8000/api/products', {
          method: 'GET'
        });
        setProducts(Array.isArray((data as any).items) ? (data as any).items : []);
      } catch (error: any) {
        console.error('Failed to load products', error);
        setProductError(error.message || 'Failed to load products');
      } finally {
        setProductLoading(false);
      }
    };

    loadProducts();
  }, [id]);

  // Load featured products selection for Our Work page
  useEffect(() => {
    if (id !== 'our-work') return;

    const loadConfig = async () => {
      try {
        const data = await adminFetch('http://localhost:8000/api/portal-config', {
          method: 'GET'
        });
        const ids = data?.portalSettings?.ourWorkFeaturedProductIds;
        setOurWorkFeaturedProductIds(Array.isArray(ids) ? ids : []);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load portal config for Our Work', error);
      }
    };
    loadConfig();
  }, [id]);

  // Load featured products selection for Home page (portfolio + collections)
  useEffect(() => {
    if (id !== 'home') return;

    const loadConfig = async () => {
      try {
        const data = await adminFetch('http://localhost:8000/api/portal-config', {
          method: 'GET'
        });
        const portfolioIds = data?.portalSettings?.homePortfolioProjectIds;
        const collectionIds = data?.portalSettings?.homeCollectionsProductIds;
        setHomeFeaturedProductIds(Array.isArray(portfolioIds) ? portfolioIds : []);
        setHomeCollectionsProductIds(Array.isArray(collectionIds) ? collectionIds : []);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load portal config for Home selections', error);
      }
    };
    loadConfig();
  }, [id]);

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
      console.log('Saving page:', formData);
      setShowSaveConfirm(true);
      setTimeout(() => {
        navigate('/admin/config/pages');
      }, 1500);
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    // Delete logic here
    console.log('Deleting page:', id);
    navigate('/admin/config/pages');
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      navigate('/admin/config/pages');
    }
  };

  const SelectedIconComponent =
    availableIcons.find(i => i.name === formData.selectedIcon)?.icon || Layout;

  const resetProductForm = () => {
    setProductForm({
      name: '',
      slug: '',
      category: '',
      price: 0,
      shortDescription: '',
      heroImage: '',
      features: [],
      specifications: []
    });
    setEditingProductId(null);
    setHeroImageFile(null);
  };

  const handleProductChange = (field: keyof Product, value: any) => {
    setProductForm(prev => ({
      ...prev,
      [field]: field === 'price' ? Number(value) || 0 : value
    }));
  };

  const handleProductSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (id !== 'collection') return;

    try {
      setProductLoading(true);
      setProductError(null);

      const formData = new FormData();
      formData.append('name', productForm.name.trim());
      formData.append('slug', productForm.slug.trim());
      formData.append('category', productForm.category.trim());
      formData.append('price', String(Number(productForm.price) || 0));
      formData.append('shortDescription', productForm.shortDescription.trim());

      const featuresArray =
        typeof productForm.features === 'string'
          ? (productForm.features as unknown as string)
              .split(',')
              .map(f => f.trim())
              .filter(Boolean)
          : productForm.features;
      featuresArray.forEach(feature => {
        formData.append('features', feature);
      });

      const specs = (productForm.specifications || []).filter(
        (s) => s.label.trim() && s.value.trim()
      );
      if (specs.length > 0) {
        formData.append('specifications', JSON.stringify(specs));
      }

      if (heroImageFile) {
        formData.append('heroImage', heroImageFile);
      }

      let updatedProducts: Product[];

      if (editingProductId) {
        const updated: any = await adminFetch(`http://localhost:8000/api/products/${editingProductId}`, {
          method: 'PATCH',
          body: formData
        });
        updatedProducts = products.map(p => (p._id === editingProductId ? updated.product : p));
      } else {
        const created: any = await adminFetch('http://localhost:8000/api/products', {
          method: 'POST',
          body: formData
        });
        updatedProducts = [created.product, ...products];
      }

      setProducts(updatedProducts);
      resetProductForm();
      alert('Product saved successfully.');
    } catch (error: any) {
      console.error('Failed to save product', error);
      setProductError(error.message || 'Failed to save product');
    } finally {
      setProductLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProductId(product._id || null);
    setProductForm({
      ...product,
      heroImage: product.heroImage || '',
      features: product.features || []
    });
    setHeroImageFile(null);
  };

  const handleDeleteProduct = async (productId?: string) => {
    if (!productId) return;
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      setProductLoading(true);
      setProductError(null);
      await adminFetch(`http://localhost:8000/api/products/${productId}`, {
        method: 'DELETE'
      });
      setProducts(products.filter(p => p._id !== productId));
    } catch (error: any) {
      console.error('Failed to delete product', error);
      setProductError(error.message || 'Failed to delete product');
    } finally {
      setProductLoading(false);
    }
  };

  const handleSaveHomeFeatured = async () => {
    if (id !== 'home') return;
    try {
      setProductLoading(true);
      setProductError(null);
      await adminFetch('http://localhost:8000/api/portal-config', {
        method: 'PATCH',
        body: JSON.stringify({
          portalSettings: {
            homePortfolioProjectIds: homeFeaturedProductIds,
            homeCollectionsProductIds
          }
        })
      });
      alert('Home page selections updated.');
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Failed to save Home portfolio products', error);
      setProductError(error.message || 'Failed to save Home portfolio products');
    } finally {
      setProductLoading(false);
    }
  };

  const handleSaveOurWorkFeatured = async () => {
    if (id !== 'our-work') return;
    try {
      setProductLoading(true);
      setProductError(null);
      await adminFetch('http://localhost:8000/api/portal-config', {
        method: 'PATCH',
        body: JSON.stringify({
          portalSettings: {
            ourWorkFeaturedProductIds
          }
        })
      });
      alert('Featured projects for Our Work page updated.');
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Failed to save Our Work featured products', error);
      setProductError(error.message || 'Failed to save featured products');
    } finally {
      setProductLoading(false);
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
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600"
            alt="Edit Page Background"
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
                  Edit Page
                </h1>
                <div className="w-24 h-0.5 bg-orange-500 mx-auto mb-6"></div>
                <p className="text-white/60">
                  Modify page settings and configuration
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2 font-medium"
                >
                  <Save size={18} />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-all flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  <span>Delete Page</span>
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
                  <span>Changes saved successfully!</span>
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
                        {SelectedIconComponent && (
                          <SelectedIconComponent size={20} className="text-orange-500" />
                        )}
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

                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        formData.enabled ? 'bg-orange-500/20 text-orange-500' : 'bg-white/5 text-white/40'
                      }`}
                    >
                      {SelectedIconComponent && <SelectedIconComponent size={24} />}
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

              {/* Collection Products Management - only for Collection page */}
              {id === 'collection' && (
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                  <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                    <Package className="text-orange-500" size={24} />
                    Collection Products
                  </h3>

                  <p className="text-white/70 text-sm mb-4">
                    Manage the lift products that appear on the Collection page. Add new products, edit existing ones,
                    or remove products from the collection.
                  </p>

                  {/* Product Form */}
                  <form onSubmit={handleProductSubmit} className="space-y-4 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Product Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={productForm.name}
                          onChange={(e) => handleProductChange('name', e.target.value)}
                          className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                          placeholder="e.g., Luxury Glass Capsule Lift"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Slug <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={productForm.slug}
                          onChange={(e) => handleProductChange('slug', e.target.value)}
                          className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 font-mono"
                          placeholder="luxury-glass-capsule-lift"
                          required
                        />
                        <p className="text-white/40 text-xs mt-1">
                          Used in the URL, e.g. <span className="font-mono">/product/your-slug</span>
                        </p>
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={productForm.category}
                          onChange={(e) => handleProductChange('category', e.target.value)}
                          className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                          required
                        >
                          <option value="">Select category</option>
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="hotel">Hotel</option>
                          <option value="villa">Villa</option>
                          <option value="capsule">Capsule</option>
                          <option value="panoramic">Panoramic</option>
                          <option value="custom">Custom</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Price (₹) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={productForm.price}
                          onChange={(e) => handleProductChange('price', e.target.value)}
                          className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                          min={0}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Short Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={productForm.shortDescription}
                        onChange={(e) => handleProductChange('shortDescription', e.target.value)}
                        className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 resize-none"
                        rows={3}
                        placeholder="Briefly describe the key highlights of this lift."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Hero Image (upload)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setHeroImageFile(file);
                        }}
                        className="w-full text-sm text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-500/80 file:text-white hover:file:bg-orange-600/90"
                      />
                      <p className="text-white/40 text-xs mt-1">
                        Upload the main image for this lift. If you leave this empty while editing, the existing image
                        will be kept.
                      </p>
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Key Features (comma separated)
                      </label>
                      <textarea
                        value={
                          Array.isArray(productForm.features)
                            ? productForm.features.join(', ')
                            : (productForm.features as unknown as string) || ''
                        }
                        onChange={(e) => handleProductChange('features', e.target.value)}
                        className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 resize-none"
                        rows={2}
                        placeholder="Panoramic glass cabin, Silent operation, Remote monitoring"
                      />
                      <p className="text-white/40 text-xs mt-1">
                        Separate each feature with a comma. The first 2–3 will be highlighted on the Collection page.
                      </p>
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Technical Specifications (optional)
                      </label>
                      <p className="text-white/50 text-xs mb-2">
                        Add detailed specs as label/value pairs (for example: Capacity, Speed, Door Type). These appear
                        on the product detail page.
                      </p>
                      <div className="space-y-3">
                        {(productForm.specifications || []).map((spec, index) => (
                          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <input
                              type="text"
                              value={spec.label}
                              onChange={(e) => {
                                const next = [...(productForm.specifications || [])];
                                next[index] = { ...next[index], label: e.target.value };
                                setProductForm((prev) => ({ ...prev, specifications: next }));
                              }}
                              placeholder="Label (e.g., Capacity)"
                              className="bg-[#1a3332] border border-orange-500/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500/40"
                            />
                            <input
                              type="text"
                              value={spec.value}
                              onChange={(e) => {
                                const next = [...(productForm.specifications || [])];
                                next[index] = { ...next[index], value: e.target.value };
                                setProductForm((prev) => ({ ...prev, specifications: next }));
                              }}
                              placeholder="Value (e.g., 6–10 persons)"
                              className="bg-[#1a3332] border border-orange-500/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500/40 md:col-span-2"
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const current = productForm.specifications || [];
                          setProductForm((prev) => ({
                            ...prev,
                            specifications: [...current, { label: '', value: '' }]
                          }));
                        }}
                        className="mt-3 px-4 py-2 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                      >
                        + Add Specification
                      </button>
                    </div>

                    {productError && (
                      <p className="text-red-400 text-sm flex items-center gap-1">
                        <AlertCircle size={14} />
                        {productError}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3 mt-4">
                      <button
                        type="submit"
                        disabled={productLoading}
                        className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg transition-all flex items-center gap-2"
                      >
                        <Save size={18} />
                        <span>{editingProductId ? 'Update Product' : 'Add Product'}</span>
                      </button>
                      {editingProductId && (
                        <button
                          type="button"
                          onClick={resetProductForm}
                          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>

                  {/* Products List */}
                  <div>
                    <h4 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
                      Existing Products
                    </h4>
                    {productLoading && products.length === 0 && (
                      <p className="text-white/60 text-sm">Loading products...</p>
                    )}
                    {!productLoading && products.length === 0 && (
                      <p className="text-white/60 text-sm">
                        No products have been added yet. Use the form above to create your first product.
                      </p>
                    )}
                    <div className="space-y-3 mt-2">
                      {products.map((product) => (
                        <div
                          key={product._id || product.slug}
                          className="flex flex-col md:flex-row md:items-center gap-3 p-4 bg-[#1a3332]/60 border border-orange-500/10 rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <p className="text-white font-semibold">{product.name}</p>
                              <span className="text-orange-400 text-xs font-mono bg-orange-500/10 px-2 py-0.5 rounded-full">
                                /product/{product.slug}
                              </span>
                            </div>
                            <p className="text-white/60 text-sm line-clamp-2 mb-1">
                              {product.shortDescription}
                            </p>
                            <p className="text-white/70 text-sm">
                              <span className="text-white/40">Category:</span> {product.category} ·{' '}
                              <span className="text-white/40">Price:</span> ₹{product.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditProduct(product)}
                              className="px-4 py-2 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(product._id)}
                              className="px-4 py-2 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Home page portfolio products - select from products */}
              {id === 'home' && (
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                  <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                    <Star className="text-orange-500" size={24} />
                    Home Page Portfolio Products
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Choose which lift products should appear in the <span className="font-semibold">Our Portfolio</span>{' '}
                    section on the home page. These are the same products used in the Collection page and public
                    product listing.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Add product to Home portfolio
                      </label>
                      <select
                        className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                        value=""
                        onChange={(e) => {
                          const productId = e.target.value;
                          if (!productId) return;
                          setHomeFeaturedProductIds((prev) => {
                            if (prev.includes(productId)) return prev;
                            const next = [...prev, productId];
                            return next.slice(0, 4);
                          });
                        }}
                      >
                        <option value="">Select a product…</option>
                        {products.map((p) => (
                          <option key={p._id} value={p._id}>
                            {p.name} ({p.slug})
                          </option>
                        ))}
                      </select>
                      <p className="text-white/40 text-xs mt-1">
                        You can feature up to <span className="text-orange-400 font-semibold">4</span> products.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-white text-sm font-semibold mb-2">Selected home portfolio products</h4>
                      {homeFeaturedProductIds.length === 0 && (
                        <p className="text-white/50 text-xs">No products selected yet.</p>
                      )}
                      <div className="space-y-2">
                        {homeFeaturedProductIds.map((pid, index) => {
                          const p = products.find((prod) => prod._id === pid);
                          if (!p) return null;
                          return (
                            <div
                              key={pid}
                              className="flex items-center justify-between bg-[#1a3332]/60 border border-orange-500/20 rounded-lg px-4 py-2"
                            >
                              <div>
                                <p className="text-white text-sm">
                                  <span className="text-white/40 mr-2">#{index + 1}</span>
                                  {p.name}
                                </p>
                                <p className="text-white/50 text-xs font-mono">/product/{p.slug}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  setHomeFeaturedProductIds((prev) => prev.filter((idVal) => idVal !== pid))
                                }
                                className="text-white/60 hover:text-red-400 text-xs"
                              >
                                Remove
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {productError && (
                      <p className="text-red-400 text-sm flex items-center gap-1">
                        <AlertCircle size={14} />
                        {productError}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3 mt-2">
                      <button
                        type="button"
                        onClick={handleSaveHomeFeatured}
                        disabled={productLoading}
                        className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg transition-all flex items-center gap-2"
                      >
                        <Save size={18} />
                        <span>Save Home Portfolio</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Home page collections products - select from products */}
              {id === 'home' && (
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                  <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                    <ShoppingBag className="text-orange-500" size={24} />
                    Home Page Collections Products
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Choose which lift products should appear in the <span className="font-semibold">Our Collections</span>{' '}
                    section on the home page. These items will replace the demo collections and link to the selected
                    product detail pages.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Add product to Home collections
                      </label>
                      <select
                        className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                        value=""
                        onChange={(e) => {
                          const productId = e.target.value;
                          if (!productId) return;
                          setHomeCollectionsProductIds((prev) => {
                            if (prev.includes(productId)) return prev;
                            const next = [...prev, productId];
                            return next.slice(0, 3);
                          });
                        }}
                      >
                        <option value="">Select a product…</option>
                        {products.map((p) => (
                          <option key={p._id} value={p._id}>
                            {p.name} ({p.slug})
                          </option>
                        ))}
                      </select>
                      <p className="text-white/40 text-xs mt-1">
                        You can feature up to <span className="text-orange-400 font-semibold">3</span> products.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-white text-sm font-semibold mb-2">Selected collections products</h4>
                      {homeCollectionsProductIds.length === 0 && (
                        <p className="text-white/50 text-xs">No products selected yet.</p>
                      )}
                      <div className="space-y-2">
                        {homeCollectionsProductIds.map((pid, index) => {
                          const p = products.find((prod) => prod._id === pid);
                          if (!p) return null;
                          return (
                            <div
                              key={pid}
                              className="flex items-center justify-between bg-[#1a3332]/60 border border-orange-500/20 rounded-lg px-4 py-2"
                            >
                              <div>
                                <p className="text-white text-sm">
                                  <span className="text-white/40 mr-2">#{index + 1}</span>
                                  {p.name}
                                </p>
                                <p className="text-white/50 text-xs font-mono">/product/{p.slug}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  setHomeCollectionsProductIds((prev) => prev.filter((idVal) => idVal !== pid))
                                }
                                className="text-white/60 hover:text-red-400 text-xs"
                              >
                                Remove
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {productError && (
                      <p className="text-red-400 text-sm flex items-center gap-1">
                        <AlertCircle size={14} />
                        {productError}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3 mt-2">
                      <button
                        type="button"
                        onClick={handleSaveHomeFeatured}
                        disabled={productLoading}
                        className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg transition-all flex items-center gap-2"
                      >
                        <Save size={18} />
                        <span>Save Home Collections</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Our Work featured projects - select from products */}
              {id === 'our-work' && (
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                  <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                    <Briefcase className="text-orange-500" size={24} />
                    Featured Projects (Our Work page)
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Choose which lift products should appear in the featured grid on the public{' '}
                    <span className="font-semibold">Our Work</span> page. These are the same products used on the
                    Collection page.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Add product to featured list
                      </label>
                      <select
                        className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40"
                        value=""
                        onChange={(e) => {
                          const productId = e.target.value;
                          if (!productId) return;
                          setOurWorkFeaturedProductIds((prev) =>
                            prev.includes(productId) ? prev : [...prev, productId].slice(0, 3)
                          );
                        }}
                      >
                        <option value="">Select a product…</option>
                        {products.map((p) => (
                          <option key={p._id} value={p._id}>
                            {p.name} ({p.slug})
                          </option>
                        ))}
                      </select>
                      <p className="text-white/40 text-xs mt-1">
                        You can feature up to <span className="text-orange-400 font-semibold">3</span> products.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-white text-sm font-semibold mb-2">Selected featured products</h4>
                      {ourWorkFeaturedProductIds.length === 0 && (
                        <p className="text-white/50 text-xs">No products selected yet.</p>
                      )}
                      <div className="space-y-2">
                        {ourWorkFeaturedProductIds.map((pid, index) => {
                          const p = products.find((prod) => prod._id === pid);
                          if (!p) return null;
                          return (
                            <div
                              key={pid}
                              className="flex items-center justify-between bg-[#1a3332]/60 border border-orange-500/20 rounded-lg px-4 py-2"
                            >
                              <div>
                                <p className="text-white text-sm">
                                  <span className="text-white/40 mr-2">#{index + 1}</span>
                                  {p.name}
                                </p>
                                <p className="text-white/50 text-xs font-mono">/product/{p.slug}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  setOurWorkFeaturedProductIds((prev) => prev.filter((idVal) => idVal !== pid))
                                }
                                className="text-white/60 hover:text-red-400 text-xs"
                              >
                                Remove
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {productError && (
                      <p className="text-red-400 text-sm flex items-center gap-1">
                        <AlertCircle size={14} />
                        {productError}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3 mt-2">
                      <button
                        type="button"
                        onClick={handleSaveOurWorkFeatured}
                        disabled={productLoading}
                        className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg transition-all flex items-center gap-2"
                      >
                        <Save size={18} />
                        <span>Save Featured Projects</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0a1514] border border-red-500/30 rounded-lg p-8 max-w-md w-full"
          >
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="text-red-500" size={32} />
            </div>
            
            <h3 className="text-white text-2xl font-semibold text-center mb-3">
              Delete Page?
            </h3>
            
            <p className="text-white/60 text-center mb-6">
              Are you sure you want to delete <strong className="text-white">"{formData.name}"</strong>? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}