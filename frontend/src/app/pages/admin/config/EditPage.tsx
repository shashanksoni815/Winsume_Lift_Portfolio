import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import React from 'react';
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
  Trash2,
  BookOpen,
  Plus,
  Edit2,
  X,
  Check,
  BarChart2,
  Tag
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
  longDescription?: string;
  heroImage?: string;
  features: string[];
  specifications?: { label: string; value: string }[];
  fullSpecifications?: { label: string; value: string }[];
  highlightStats?: { icon: string; label: string; value: string; unit: string }[];
  detailedFeatures?: { title: string; description: string }[];
  badges?: { label: string; color: string }[];
}

// ── Blog types ────────────────────────────────────────────────────────────────
interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  heroImage: string;
  tags: string[];
  author: string;
  authorBio: string;
  authorImage: string;
  status: 'draft' | 'published';
  featured: boolean;
  readTime: string;
  views: number;
  publishedAt: string | null;
  createdAt: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

interface BlogStats {
  total: number;
  published: number;
  drafts: number;
  totalViews: number;
}

const EMPTY_BLOG_FORM = {
  title: '',
  slug: '',
  category: '',
  excerpt: '',
  content: '',
  heroImage: '',
  tags: '',
  author: 'Winsume Lift Team',
  authorBio: '',
  authorImage: '',
  status: 'draft' as 'draft' | 'published',
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
  featured: false,
};

const BLOG_CATEGORIES = [
  'Home Lifts', 'Commercial', 'Maintenance',
  'Technology', 'Design', 'Safety', 'Industry News',
];

async function adminFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const token = localStorage.getItem('accessToken');
  const headers: HeadersInit = { ...(init.headers || {}) };
  const isFormData = init.body instanceof FormData;
  if (!isFormData) (headers as any)['Content-Type'] = 'application/json';
  if (token)      (headers as any).Authorization = `Bearer ${token}`;

  const response = await fetch(input, { ...init, headers });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/admin-login';
    }
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }
  if (response.status === 204) return null;
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
  { name: 'Layout', icon: Layout },
  { name: 'BookOpen', icon: BookOpen },
];

const mockPageData = {
  home:       { id: 'home',       name: 'Home',       path: '/',           description: 'Main landing page with hero section and featured content',  selectedIcon: 'Home',        enabled: true, visible: true, requiredAuth: false, showInFooter: true, metaTitle: 'WINSUME LIFT INDIA - Luxury Vertical Lift Solutions', metaDescription: 'Premium bespoke lift solutions for residential and commercial properties', order: 1 },
  collection: { id: 'collection', name: 'Collection', path: '/collection', description: 'Browse all luxury lift collections and products',             selectedIcon: 'ShoppingBag', enabled: true, visible: true, requiredAuth: false, showInFooter: true, metaTitle: 'Luxury Lift Collection',    metaDescription: 'Explore our exclusive range of custom lifts',              order: 2 },
  'our-work': { id: 'our-work',   name: 'Our Work',   path: '/our-work',   description: 'Portfolio of completed projects and case studies',            selectedIcon: 'Briefcase',   enabled: true, visible: true, requiredAuth: false, showInFooter: true, metaTitle: 'Our Projects & Portfolio', metaDescription: 'View our completed luxury lift installations',             order: 3 },
  services:   { id: 'services',   name: 'Services',   path: '/services',   description: 'Comprehensive service offerings and capabilities',            selectedIcon: 'FileCheck',   enabled: true, visible: true, requiredAuth: false, showInFooter: true, metaTitle: 'Lift Services',            metaDescription: 'Installation, maintenance, and customization services',   order: 4 },
  about:      { id: 'about',      name: 'About',      path: '/about',      description: 'Company information, team, and values',                       selectedIcon: 'Users',       enabled: true, visible: true, requiredAuth: false, showInFooter: true, metaTitle: 'About WINSUME LIFT INDIA', metaDescription: 'Learn about our company and commitment to excellence',    order: 5 },
  contact:    { id: 'contact',    name: 'Contact',    path: '/contact',    description: 'Contact forms and office location information',               selectedIcon: 'Phone',       enabled: true, visible: true, requiredAuth: false, showInFooter: true, metaTitle: 'Contact Us',               metaDescription: 'Get in touch with our team',                              order: 6 },
  // ── Blog page entry ──
  blog:       { id: 'blog',       name: 'Blog',       path: '/blog',       description: 'Articles, insights and expert guides on elevator solutions',  selectedIcon: 'BookOpen',    enabled: true, visible: true, requiredAuth: false, showInFooter: true, metaTitle: 'The Lift Journal | Winsume Lift Blog', metaDescription: 'Expert insights on luxury elevator installation, home lift design and trends across India.', order: 7 },
};

export function EditPage() {
  const navigate = useNavigate();
  const { id }   = useParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm]   = useState(false);

  // Products state
  const [products, setProducts]       = useState<Product[]>([]);
  const [productForm, setProductForm] = useState<Product>({
    name: '', slug: '', category: '', price: 0,
    shortDescription: '', longDescription: '',
    heroImage: '', features: [],
    specifications: [], fullSpecifications: [],
    highlightStats: [], detailedFeatures: [], badges: [],
  });
  const [editingProductId, setEditingProductId]         = useState<string | null>(null);
  const [productLoading, setProductLoading]             = useState(false);
  const [productError, setProductError]                 = useState<string | null>(null);
  const [heroImageFile, setHeroImageFile]               = useState<File | null>(null);
  const [homeFeaturedProductIds, setHomeFeaturedProductIds]       = useState<string[]>([]);
  const [homeCollectionsProductIds, setHomeCollectionsProductIds] = useState<string[]>([]);
  const [ourWorkFeaturedProductIds, setOurWorkFeaturedProductIds] = useState<string[]>([]);

  // ── Blog state ────────────────────────────────────────────────────────────
  const [blogs, setBlogs]               = useState<Blog[]>([]);
  const [blogStats, setBlogStats]       = useState<BlogStats | null>(null);
  const [blogLoading, setBlogLoading]   = useState(false);
  const [blogError, setBlogError]       = useState<string | null>(null);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlogId, setEditingBlogId]   = useState<string | null>(null);
  const [blogForm, setBlogForm]         = useState({ ...EMPTY_BLOG_FORM });
  const [blogSaving, setBlogSaving]     = useState(false);
  const [blogFormError, setBlogFormError] = useState('');
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  const [deletingBlog, setDeletingBlog] = useState(false);
  const [blogFilterStatus, setBlogFilterStatus] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '', path: '', description: '', selectedIcon: 'Layout',
    enabled: true, visible: true, requiredAuth: false,
    showInFooter: false, metaTitle: '', metaDescription: '', order: 1,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load page data
  useEffect(() => {
    if (id) {
      const pageData = mockPageData[id as keyof typeof mockPageData];
      if (pageData) {
        setFormData(pageData);
      } else {
        navigate('/admin/portal-config');
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
        const data = await adminFetch('https://winsume-lift-backend01.onrender.com/api/products');
        setProducts(Array.isArray((data as any).items) ? (data as any).items : []);
      } catch (error: any) {
        setProductError(error.message || 'Failed to load products');
      } finally {
        setProductLoading(false);
      }
    };
    loadProducts();
  }, [id]);

  // Load featured products for Our Work
  useEffect(() => {
    if (id !== 'our-work') return;
    const loadConfig = async () => {
      try {
        const data = await adminFetch('https://winsume-lift-backend01.onrender.com/api/portal-config');
        const ids = data?.portalSettings?.ourWorkFeaturedProductIds;
        setOurWorkFeaturedProductIds(Array.isArray(ids) ? ids : []);
      } catch { /* ignore */ }
    };
    loadConfig();
  }, [id]);

  // Load featured products for Home
  useEffect(() => {
    if (id !== 'home') return;
    const loadConfig = async () => {
      try {
        const data = await adminFetch('https://winsume-lift-backend01.onrender.com/api/portal-config');
        setHomeFeaturedProductIds(Array.isArray(data?.portalSettings?.homePortfolioProjectIds) ? data.portalSettings.homePortfolioProjectIds : []);
        setHomeCollectionsProductIds(Array.isArray(data?.portalSettings?.homeCollectionsProductIds) ? data.portalSettings.homeCollectionsProductIds : []);
      } catch { /* ignore */ }
    };
    loadConfig();
  }, [id]);

  // ── Load blogs when editing Blog page ─────────────────────────────────────
  useEffect(() => {
    if (id !== 'blog') return;
    loadBlogs();
    loadBlogStats();
  }, [id]);

  const loadBlogs = async (status?: string) => {
    try {
      setBlogLoading(true);
      setBlogError(null);
      const params = new URLSearchParams({ limit: '50' });
      if (status) params.set('status', status);
      const data = await adminFetch(
        `https://winsume-lift-backend01.onrender.com/api/blogs?${params}`
      );
      setBlogs(Array.isArray((data as any).items) ? (data as any).items : []);
    } catch (error: any) {
      setBlogError(error.message || 'Failed to load blog posts');
    } finally {
      setBlogLoading(false);
    }
  };

  const loadBlogStats = async () => {
    try {
      const data = await adminFetch(
        'https://winsume-lift-backend01.onrender.com/api/blogs/stats'
      );
      if ((data as any).stats) setBlogStats((data as any).stats);
    } catch { /* ignore */ }
  };

  // Auto-generate slug from title
  const handleBlogTitleChange = (title: string) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
    setBlogForm((f) => ({ ...f, title, slug, seoTitle: f.seoTitle || title }));
  };

  const openBlogCreate = () => {
    setEditingBlogId(null);
    setBlogForm({ ...EMPTY_BLOG_FORM });
    setBlogFormError('');
    setShowBlogForm(true);
  };

  const openBlogEdit = async (blogId: string) => {
    setEditingBlogId(blogId);
    setBlogFormError('');
    try {
      const data = await adminFetch(
        `https://winsume-lift-backend01.onrender.com/api/blogs/${blogId}`
      );
      const b = (data as any).blog;
      setBlogForm({
        title:          b.title          || '',
        slug:           b.slug           || '',
        category:       b.category       || '',
        excerpt:        b.excerpt        || '',
        content:        b.content        || '',
        heroImage:      b.heroImage      || '',
        tags:           (b.tags || []).join(', '),
        author:         b.author         || 'Winsume Lift Team',
        authorBio:      b.authorBio      || '',
        authorImage:    b.authorImage    || '',
        status:         b.status         || 'draft',
        seoTitle:       b.seoTitle       || '',
        seoDescription: b.seoDescription || '',
        seoKeywords:    (b.seoKeywords || []).join(', '),
        featured:       b.featured       || false,
      });
      setShowBlogForm(true);
    } catch {
      alert('Failed to load blog post for editing.');
    }
  };

  const handleBlogSave = async () => {
    if (!blogForm.title || !blogForm.category || !blogForm.excerpt || !blogForm.content) {
      setBlogFormError('Title, Category, Excerpt and Content are required.');
      return;
    }
    setBlogSaving(true);
    setBlogFormError('');
    try {
      const payload = {
        ...blogForm,
        tags:        blogForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
        seoKeywords: blogForm.seoKeywords.split(',').map((k) => k.trim()).filter(Boolean),
      };
      const url    = editingBlogId
        ? `https://winsume-lift-backend01.onrender.com/api/blogs/${editingBlogId}`
        : 'https://winsume-lift-backend01.onrender.com/api/blogs';
      const method = editingBlogId ? 'PATCH' : 'POST';

      await adminFetch(url, { method, body: JSON.stringify(payload) });
      setShowBlogForm(false);
      loadBlogs(blogFilterStatus || undefined);
      loadBlogStats();
    } catch (error: any) {
      setBlogFormError(error.message || 'Save failed. Please try again.');
    } finally {
      setBlogSaving(false);
    }
  };

  const handleBlogStatusToggle = async (blogId: string, current: 'draft' | 'published') => {
    const next = current === 'published' ? 'draft' : 'published';
    try {
      await adminFetch(
        `https://winsume-lift-backend01.onrender.com/api/blogs/${blogId}/status`,
        { method: 'PATCH', body: JSON.stringify({ status: next }) }
      );
      loadBlogs(blogFilterStatus || undefined);
      loadBlogStats();
    } catch (error: any) {
      alert(error.message || 'Failed to update status');
    }
  };

  const handleBlogFeaturedToggle = async (blogId: string) => {
    try {
      await adminFetch(
        `https://winsume-lift-backend01.onrender.com/api/blogs/${blogId}/featured`,
        { method: 'PATCH' }
      );
      loadBlogs(blogFilterStatus || undefined);
    } catch (error: any) {
      alert(error.message || 'Failed to toggle featured');
    }
  };

  const handleBlogDelete = async () => {
    if (!deleteBlogId) return;
    setDeletingBlog(true);
    try {
      await adminFetch(
        `https://winsume-lift-backend01.onrender.com/api/blogs/${deleteBlogId}`,
        { method: 'DELETE' }
      );
      setDeleteBlogId(null);
      loadBlogs(blogFilterStatus || undefined);
      loadBlogStats();
    } catch (error: any) {
      alert(error.message || 'Failed to delete post');
    } finally {
      setDeletingBlog(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim())        newErrors.name        = 'Page name is required';
    if (!formData.path.trim())        newErrors.path        = 'Page path is required';
    else if (!formData.path.startsWith('/')) newErrors.path = 'Page path must start with /';
    if (!formData.description.trim()) newErrors.description = 'Page description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log('Saving page:', formData);
      setShowSaveConfirm(true);
      setTimeout(() => navigate('/admin/portal-config'), 1500);
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      navigate('/admin/portal-config');
    }
  };

  const SelectedIconComponent =
    availableIcons.find((i) => i.name === formData.selectedIcon)?.icon || Layout;

  const resetProductForm = () => {
    setProductForm({
      name: '', slug: '', category: '', price: 0,
      shortDescription: '', longDescription: '',
      heroImage: '', features: [],
      specifications: [], fullSpecifications: [],
      highlightStats: [], detailedFeatures: [], badges: [],
    });
    setEditingProductId(null);
    setHeroImageFile(null);
  };

  const handleProductChange = (field: keyof Product, value: any) => {
    setProductForm((prev) => ({
      ...prev,
      [field]: field === 'price' ? Number(value) || 0 : value,
    }));
  };

  // const handleProductSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   if (id !== 'collection') return;
  //   try {
  //     setProductLoading(true);
  //     setProductError(null);
  //     const fd = new FormData();
  //     fd.append('name', productForm.name.trim());
  //     fd.append('slug', productForm.slug.trim());
  //     fd.append('category', productForm.category.trim());
  //     fd.append('price', String(Number(productForm.price) || 0));
  //     fd.append('shortDescription', productForm.shortDescription.trim());
  //     const featuresArray =
  //       typeof productForm.features === 'string'
  //         ? (productForm.features as unknown as string).split(',').map((f) => f.trim()).filter(Boolean)
  //         : productForm.features;
  //     featuresArray.forEach((f) => fd.append('features', f));
  //     const specs = (productForm.specifications || []).filter((s) => s.label.trim() && s.value.trim());
  //     if (specs.length > 0) fd.append('specifications', JSON.stringify(specs));
  //     if (heroImageFile) fd.append('heroImage', heroImageFile);

  //     let updatedProducts: Product[];
  //     if (editingProductId) {
  //       const updated: any = await adminFetch(
  //         `https://winsume-lift-backend01.onrender.com/api/products/${editingProductId}`,
  //         { method: 'PATCH', body: fd }
  //       );
  //       updatedProducts = products.map((p) => (p._id === editingProductId ? updated.product : p));
  //     } else {
  //       const created: any = await adminFetch(
  //         'https://winsume-lift-backend01.onrender.com/api/products',
  //         { method: 'POST', body: fd }
  //       );
  //       updatedProducts = [created.product, ...products];
  //     }
  //     setProducts(updatedProducts);
  //     resetProductForm();
  //     alert('Product saved successfully.');
  //   } catch (error: any) {
  //     setProductError(error.message || 'Failed to save product');
  //   } finally {
  //     setProductLoading(false);
  //   }
  // };

  const handleProductSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (id !== 'collection') return;
    try {
      setProductLoading(true);
      setProductError(null);
      const fd = new FormData();
  
      // ── Basic fields ──────────────────────────────────────────
      fd.append('name',             productForm.name.trim());
      fd.append('slug',             productForm.slug.trim());
      fd.append('category',         productForm.category.trim());
      fd.append('price',            String(Number(productForm.price) || 0));
      fd.append('shortDescription', productForm.shortDescription.trim());
      if (productForm.longDescription?.trim()) {
        fd.append('longDescription', productForm.longDescription.trim());
      }
  
      // ── Hero image ────────────────────────────────────────────
      if (heroImageFile) fd.append('heroImage', heroImageFile);
  
      // ── Simple features (comma-separated) ────────────────────
      const featuresArray =
        typeof productForm.features === 'string'
          ? (productForm.features as unknown as string).split(',').map((f) => f.trim()).filter(Boolean)
          : productForm.features;
      featuresArray.forEach((f) => fd.append('features', f));
  
      // ── Key specifications (2x2 grid) ─────────────────────────
      const specs = (productForm.specifications || []).filter(
        (s) => s.label.trim() && s.value.trim()
      );
      if (specs.length > 0) fd.append('specifications', JSON.stringify(specs));
  
      // ── Full specifications (technical details table) ─────────
      const fullSpecs = (productForm.fullSpecifications || []).filter(
        (s) => s.label.trim() && s.value.trim()
      );
      if (fullSpecs.length > 0) fd.append('fullSpecifications', JSON.stringify(fullSpecs));
  
      // ── Highlight stats (4 big cards) ─────────────────────────
      const stats = (productForm.highlightStats || []).filter(
        (s) => s.label.trim() && s.value.trim()
      );
      if (stats.length > 0) fd.append('highlightStats', JSON.stringify(stats));
  
      // ── Detailed features (title + description) ───────────────
      const detailedFeats = (productForm.detailedFeatures || []).filter(
        (f) => f.title.trim()
      );
      if (detailedFeats.length > 0) fd.append('detailedFeatures', JSON.stringify(detailedFeats));
  
      // ── Badges ────────────────────────────────────────────────
      const badges = (productForm.badges || []).filter((b) => b.label.trim());
      if (badges.length > 0) fd.append('badges', JSON.stringify(badges));
  
      // ── API call ──────────────────────────────────────────────
      let updatedProducts: Product[];
      if (editingProductId) {
        const updated: any = await adminFetch(
          `https://winsume-lift-backend01.onrender.com/api/products/${editingProductId}`,
          { method: 'PATCH', body: fd }
        );
        updatedProducts = products.map((p) =>
          p._id === editingProductId ? updated.product : p
        );
      } else {
        const created: any = await adminFetch(
          'https://winsume-lift-backend01.onrender.com/api/products',
          { method: 'POST', body: fd }
        );
        updatedProducts = [created.product, ...products];
      }
  
      setProducts(updatedProducts);
      resetProductForm();
      alert('Product saved successfully.');
    } catch (error: any) {
      setProductError(error.message || 'Failed to save product');
    } finally {
      setProductLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProductId(product._id || null);
    setProductForm({ ...product, heroImage: product.heroImage || '', features: product.features || [] });
    setHeroImageFile(null);
  };

  const handleDeleteProduct = async (productId?: string) => {
    if (!productId || !confirm('Are you sure you want to delete this product?')) return;
    try {
      setProductLoading(true);
      setProductError(null);
      await adminFetch(`https://winsume-lift-backend01.onrender.com/api/products/${productId}`, { method: 'DELETE' });
      setProducts(products.filter((p) => p._id !== productId));
    } catch (error: any) {
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
      await adminFetch('https://winsume-lift-backend01.onrender.com/api/portal-config', {
        method: 'PATCH',
        body: JSON.stringify({ portalSettings: { homePortfolioProjectIds: homeFeaturedProductIds, homeCollectionsProductIds } }),
      });
      alert('Home page selections updated.');
    } catch (error: any) {
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
      await adminFetch('https://winsume-lift-backend01.onrender.com/api/portal-config', {
        method: 'PATCH',
        body: JSON.stringify({ portalSettings: { ourWorkFeaturedProductIds } }),
      });
      alert('Featured projects for Our Work page updated.');
    } catch (error: any) {
      setProductError(error.message || 'Failed to save featured products');
    } finally {
      setProductLoading(false);
    }
  };

  const formatDate = (d: string | null) =>
    d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

  return (
    <div className="min-h-screen bg-[#1a3332]">
      <AdminSidebar isCollapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      <div className="transition-all duration-300" style={{ marginLeft: sidebarCollapsed ? '80px' : '280px' }}>
        <div className="fixed inset-0 z-0" style={{ left: sidebarCollapsed ? '80px' : '280px' }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600"
            alt="Edit Page Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="relative z-10 pt-4 sm:pt-6 md:pt-8 pb-10 sm:pb-16 md:pb-20 px-3 sm:px-4 md:px-6">
          <div className="max-w-[1200px] mx-auto">

            {/* Page Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
              <button onClick={() => navigate('/admin/portal-config')} className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-all">
                <ArrowLeft size={20} />
                <span>Back to Portal Config</span>
              </button>

              <div className="text-center mb-6">
                <p className="text-orange-500 text-xs uppercase tracking-widest mb-3">PORTAL CONFIGURATION</p>
                <h1 className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-tight">Edit Page</h1>
                <div className="w-24 h-0.5 bg-orange-500 mx-auto mb-6"></div>
                <p className="text-white/60">Modify page settings and configuration</p>
              </div>

              <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
                <button onClick={handleSave} className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2 font-medium">
                  <Save size={18} /><span>Save Changes</span>
                </button>
                <button onClick={handleCancel} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all">Cancel</button>
              </div>

              {showSaveConfirm && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-2 z-50">
                  <Save size={18} /><span>Changes saved successfully!</span>
                </motion.div>
              )}
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-6">

              {/* Basic Information */}
              <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                  <Layout className="text-orange-500" size={24} />Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Page Name <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.name} onChange={(e) => updateFormData('name', e.target.value)} className={`w-full bg-[#1a3332] border rounded-lg px-4 py-3 text-white focus:outline-none ${errors.name ? 'border-red-500/50' : 'border-orange-500/20 focus:border-orange-500/40'}`} placeholder="e.g., About Us" />
                    {errors.name && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Page Path <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.path} onChange={(e) => updateFormData('path', e.target.value)} className={`w-full bg-[#1a3332] border rounded-lg px-4 py-3 text-white focus:outline-none font-mono ${errors.path ? 'border-red-500/50' : 'border-orange-500/20 focus:border-orange-500/40'}`} placeholder="/about-us" />
                    {errors.path && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.path}</p>}
                    <p className="text-white/40 text-xs mt-1">Must start with forward slash (/)</p>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Display Order</label>
                    <input type="number" value={formData.order} onChange={(e) => updateFormData('order', parseInt(e.target.value) || 1)} className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40" min="1" />
                    <p className="text-white/40 text-xs mt-1">Lower numbers appear first</p>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Page Icon</label>
                    <div className="relative">
                      <select value={formData.selectedIcon} onChange={(e) => updateFormData('selectedIcon', e.target.value)} className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 appearance-none">
                        {availableIcons.map((icon) => <option key={icon.name} value={icon.name}>{icon.name}</option>)}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        {SelectedIconComponent && <SelectedIconComponent size={20} className="text-orange-500" />}
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-white/80 text-sm font-medium mb-2">Description <span className="text-red-500">*</span></label>
                    <textarea value={formData.description} onChange={(e) => updateFormData('description', e.target.value)} className={`w-full bg-[#1a3332] border rounded-lg px-4 py-3 text-white focus:outline-none resize-none ${errors.description ? 'border-red-500/50' : 'border-orange-500/20 focus:border-orange-500/40'}`} rows={3} />
                    {errors.description && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.description}</p>}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2"><Eye className="text-orange-500" size={24} />Preview</h3>
                <div className="bg-[#1a3332]/50 border border-orange-500/10 rounded-lg p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-500 flex items-center justify-center font-mono text-sm font-bold">{formData.order}</div>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${formData.enabled ? 'bg-orange-500/20 text-orange-500' : 'bg-white/5 text-white/40'}`}>
                      {SelectedIconComponent && <SelectedIconComponent size={24} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h4 className="text-white font-semibold text-lg">{formData.name || 'Page Name'}</h4>
                        {formData.requiredAuth && <span className="px-2.5 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30 flex items-center gap-1"><Lock size={12} />Auth Required</span>}
                        {!formData.enabled  && <span className="px-2.5 py-1 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">Disabled</span>}
                        {!formData.visible  && <span className="px-2.5 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full border border-gray-500/30">Hidden from Menu</span>}
                      </div>
                      <p className="text-orange-500/80 text-sm mb-1 font-mono">{formData.path || '/page-path'}</p>
                      <p className="text-white/50 text-sm">{formData.description || 'Page description will appear here'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ══════════════════════════════════════════════════════════════
                  BLOG MANAGEMENT SECTION  (only rendered when id === 'blog')
              ══════════════════════════════════════════════════════════════ */}
              {id === 'blog' && (
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                    <h3 className="text-white text-xl font-semibold flex items-center gap-2">
                      <BookOpen className="text-orange-500" size={24} />Blog Posts
                    </h3>
                    <button
                      onClick={openBlogCreate}
                      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full transition-all text-sm font-semibold uppercase tracking-wider"
                    >
                      <Plus size={15} />New Post
                    </button>
                  </div>

                  {/* Stats row */}
                  {blogStats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                      {[
                        { label: 'Total Posts',  value: blogStats.total,       color: 'text-white' },
                        { label: 'Published',    value: blogStats.published,   color: 'text-green-400' },
                        { label: 'Drafts',       value: blogStats.drafts,      color: 'text-yellow-400' },
                        { label: 'Total Views',  value: blogStats.totalViews,  color: 'text-orange-400' },
                      ].map((s, i) => (
                        <div key={i} className="bg-[#1a3332]/60 border border-orange-500/10 rounded-xl p-4">
                          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{s.label}</p>
                          <p className={`text-2xl font-bold ${s.color}`}>{s.value.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Filter */}
                  <div className="flex gap-3 mb-5 flex-wrap">
                    {['', 'published', 'draft'].map((f) => (
                      <button
                        key={f}
                        onClick={() => { setBlogFilterStatus(f); loadBlogs(f || undefined); }}
                        className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                          blogFilterStatus === f
                            ? 'bg-orange-500 text-white'
                            : 'bg-white/10 text-white/60 hover:text-white border border-white/10'
                        }`}
                      >
                        {f === '' ? 'All' : f}
                      </button>
                    ))}
                  </div>

                  {blogError && (
                    <p className="text-red-400 text-sm flex items-center gap-1 mb-4">
                      <AlertCircle size={14} />{blogError}
                    </p>
                  )}

                  {/* Blog list */}
                  {blogLoading && blogs.length === 0 ? (
                    <div className="flex justify-center py-10">
                      <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
                    </div>
                  ) : blogs.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                      <BookOpen size={36} className="text-white/20 mx-auto mb-3" />
                      <p className="text-white/40 text-sm">No blog posts yet.</p>
                      <button onClick={openBlogCreate} className="mt-3 text-orange-500 text-sm hover:text-orange-400 underline">
                        Create your first post →
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {blogs.map((blog) => (
                        <div
                          key={blog._id}
                          className="flex flex-col md:flex-row md:items-center gap-3 p-4 bg-[#1a3332]/60 border border-orange-500/10 rounded-lg hover:border-orange-500/20 transition-all"
                        >
                          {/* Thumbnail */}
                          {blog.heroImage && (
                            <img
                              src={blog.heroImage}
                              alt={blog.title}
                              className="w-full md:w-16 h-16 object-cover rounded-lg flex-shrink-0 hidden md:block"
                            />
                          )}

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <p className="text-white font-semibold text-sm line-clamp-1">{blog.title}</p>
                              {blog.featured && (
                                <span className="text-orange-500 text-xs bg-orange-500/15 border border-orange-500/30 px-2 py-0.5 rounded-full">Featured</span>
                              )}
                            </div>
                            <p className="text-white/50 text-xs line-clamp-1 mb-1">{blog.excerpt}</p>
                            <div className="flex items-center gap-3 text-white/30 text-xs flex-wrap">
                              <span className="text-orange-500/70 bg-orange-500/10 px-2 py-0.5 rounded-full">{blog.category}</span>
                              <span>{blog.readTime}</span>
                              <span>{blog.views} views</span>
                              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                            {/* Status toggle */}
                            <button
                              onClick={() => handleBlogStatusToggle(blog._id, blog.status)}
                              className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                                blog.status === 'published'
                                  ? 'bg-green-500/15 text-green-400 border border-green-500/30 hover:bg-green-500/25'
                                  : 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/25'
                              }`}
                            >
                              {blog.status === 'published' ? <><Globe size={10} />Published</> : <><FileText size={10} />Draft</>}
                            </button>

                            {/* Featured toggle */}
                            <button
                              onClick={() => handleBlogFeaturedToggle(blog._id)}
                              title={blog.featured ? 'Unfeature' : 'Feature'}
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${blog.featured ? 'bg-orange-500/20 text-orange-500' : 'bg-white/5 text-white/30 hover:text-orange-500'}`}
                            >
                              <Star size={13} fill={blog.featured ? 'currentColor' : 'none'} />
                            </button>

                            {/* Preview */}
                            <button
                              onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                              title="Preview"
                              className="w-8 h-8 rounded-full bg-white/5 text-white/30 hover:text-white flex items-center justify-center transition-all"
                            >
                              <Eye size={13} />
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => openBlogEdit(blog._id)}
                              title="Edit"
                              className="w-8 h-8 rounded-full bg-white/5 text-white/30 hover:text-orange-500 flex items-center justify-center transition-all"
                            >
                              <Edit2 size={13} />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => setDeleteBlogId(blog._id)}
                              title="Delete"
                              className="w-8 h-8 rounded-full bg-white/5 text-white/30 hover:text-red-400 flex items-center justify-center transition-all"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── Collection products (unchanged) ───────────────────────── */}
              {id === 'collection' && (
  <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
    <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
      <Package className="text-orange-500" size={24} />Collection Products
    </h3>
    <p className="text-white/70 text-sm mb-6">
      Manage the lift products that appear on the Collection page.
    </p>

    <form onSubmit={handleProductSubmit} className="space-y-4 mb-10">

      {/* ── Basic Info ─────────────────────────────────────── */}
      <div className="border border-white/10 rounded-xl p-5 space-y-4">
        <h4 className="text-orange-400 text-xs uppercase tracking-widest font-semibold">Basic Info</h4>
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
              URL: <span className="font-mono">/product/your-slug</span>
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
              {['residential','commercial','hotel','villa','capsule','panoramic','custom'].map((c) => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
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
            rows={2}
            placeholder="Briefly describe the key highlights of this lift."
            required
          />
        </div>
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">Long Description</label>
          <textarea
            value={productForm.longDescription || ''}
            onChange={(e) => handleProductChange('longDescription', e.target.value)}
            className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 resize-none"
            rows={4}
            placeholder="Extended description shown on the product detail page (optional)."
          />
        </div>
      </div>

      {/* ── Hero Image ─────────────────────────────────────── */}
      <div className="border border-white/10 rounded-xl p-5 space-y-3">
        <h4 className="text-orange-400 text-xs uppercase tracking-widest font-semibold">Hero Image</h4>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setHeroImageFile(e.target.files?.[0] || null)}
          className="w-full text-sm text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-500/80 file:text-white hover:file:bg-orange-600/90"
        />
        {editingProductId && productForm.heroImage && (
          <div className="flex items-center gap-3 mt-2">
            <img
              src={
                productForm.heroImage.startsWith('/uploads')
                  ? `https://winsume-lift-backend01.onrender.com${productForm.heroImage}`
                  : productForm.heroImage
              }
              alt="Current hero"
              className="w-16 h-16 object-cover rounded-lg border border-white/10"
            />
            <p className="text-white/40 text-xs">Current image — upload a new file to replace it.</p>
          </div>
        )}
      </div>

      {/* ── Badges ─────────────────────────────────────────── */}
      <div className="border border-white/10 rounded-xl p-5 space-y-3">
        <h4 className="text-orange-400 text-xs uppercase tracking-widest font-semibold">
          Badges
          <span className="ml-2 text-white/30 normal-case font-normal">shown below the product title</span>
        </h4>
        <p className="text-white/40 text-xs">
          Color: <code className="text-orange-400">green · orange · blue</code>
        </p>
        <div className="space-y-2">
          {(productForm.badges || []).map((badge, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={badge.label}
                onChange={(e) => {
                  const next = [...(productForm.badges || [])];
                  next[index] = { ...next[index], label: e.target.value };
                  setProductForm((p) => ({ ...p, badges: next }));
                }}
                placeholder="e.g., ISO Certified"
                className="flex-1 bg-[#1a3332] border border-orange-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/40"
              />
              <select
                value={badge.color}
                onChange={(e) => {
                  const next = [...(productForm.badges || [])];
                  next[index] = { ...next[index], color: e.target.value };
                  setProductForm((p) => ({ ...p, badges: next }));
                }}
                className="bg-[#1a3332] border border-orange-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/40"
              >
                <option value="green">Green</option>
                <option value="orange">Orange</option>
                <option value="blue">Blue</option>
              </select>
              <button
                type="button"
                onClick={() => setProductForm((p) => ({ ...p, badges: (p.badges || []).filter((_, i) => i !== index) }))}
                className="px-3 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg text-xs transition-all"
              >✕</button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setProductForm((p) => ({ ...p, badges: [...(p.badges || []), { label: '', color: 'orange' }] }))}
          className="px-4 py-2 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
        >+ Add Badge</button>
      </div>

      {/* ── Key Features (comma-separated) ─────────────────── */}
      <div className="border border-white/10 rounded-xl p-5 space-y-3">
        <h4 className="text-orange-400 text-xs uppercase tracking-widest font-semibold">
          Key Features
          <span className="ml-2 text-white/30 normal-case font-normal">shown as tags on collection card</span>
        </h4>
        <textarea
          value={Array.isArray(productForm.features) ? productForm.features.join(', ') : (productForm.features as unknown as string) || ''}
          onChange={(e) => handleProductChange('features', e.target.value)}
          className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 resize-none"
          rows={2}
          placeholder="Panoramic glass cabin, Silent operation, Remote monitoring"
        />
        <p className="text-white/40 text-xs">Comma-separated. First 2–3 highlighted on Collection page.</p>
      </div>

      {/* ── Detailed Features (title + description) ─────────── */}
      <div className="border border-white/10 rounded-xl p-5 space-y-3">
        <h4 className="text-orange-400 text-xs uppercase tracking-widest font-semibold">
          Detailed Features
          <span className="ml-2 text-white/30 normal-case font-normal">"Crafted for Excellence" section</span>
        </h4>
        <p className="text-white/40 text-xs">Each entry shows a title + description on the product detail page.</p>
        <div className="space-y-2">
          {(productForm.detailedFeatures || []).map((feat, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-start">
              <input
                type="text"
                value={feat.title}
                onChange={(e) => {
                  const next = [...(productForm.detailedFeatures || [])];
                  next[index] = { ...next[index], title: e.target.value };
                  setProductForm((p) => ({ ...p, detailedFeatures: next }));
                }}
                placeholder="Feature title"
                className="bg-[#1a3332] border border-orange-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/40"
              />
              <div className="flex gap-2 md:col-span-2">
                <input
                  type="text"
                  value={feat.description}
                  onChange={(e) => {
                    const next = [...(productForm.detailedFeatures || [])];
                    next[index] = { ...next[index], description: e.target.value };
                    setProductForm((p) => ({ ...p, detailedFeatures: next }));
                  }}
                  placeholder="Short description"
                  className="flex-1 bg-[#1a3332] border border-orange-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/40"
                />
                <button
                  type="button"
                  onClick={() => setProductForm((p) => ({ ...p, detailedFeatures: (p.detailedFeatures || []).filter((_, i) => i !== index) }))}
                  className="px-3 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg text-xs transition-all"
                >✕</button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setProductForm((p) => ({ ...p, detailedFeatures: [...(p.detailedFeatures || []), { title: '', description: '' }] }))}
          className="px-4 py-2 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
        >+ Add Detailed Feature</button>
      </div>

      {/* ── Highlight Stats (4 big cards) ───────────────────── */}
      <div className="border border-white/10 rounded-xl p-5 space-y-3">
        <h4 className="text-orange-400 text-xs uppercase tracking-widest font-semibold">
          Highlight Stats
          <span className="ml-2 text-white/30 normal-case font-normal">"Unrivaled Specifications" 4 big cards</span>
        </h4>
        <p className="text-white/40 text-xs">
          Icons: <code className="text-orange-400">Package · Gauge · Zap · Shield · Award · CheckCircle</code>
        </p>
        <div className="space-y-2">
          {(productForm.highlightStats || []).map((stat, index) => (
            <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center">
              <input
                type="text"
                value={stat.icon}
                onChange={(e) => {
                  const next = [...(productForm.highlightStats || [])];
                  next[index] = { ...next[index], icon: e.target.value };
                  setProductForm((p) => ({ ...p, highlightStats: next }));
                }}
                placeholder="Icon (e.g., Gauge)"
                className="bg-[#1a3332] border border-orange-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/40"
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => {
                  const next = [...(productForm.highlightStats || [])];
                  next[index] = { ...next[index], label: e.target.value };
                  setProductForm((p) => ({ ...p, highlightStats: next }));
                }}
                placeholder="Label (e.g., Capacity)"
                className="bg-[#1a3332] border border-orange-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/40"
              />
              <input
                type="text"
                value={stat.value}
                onChange={(e) => {
                  const next = [...(productForm.highlightStats || [])];
                  next[index] = { ...next[index], value: e.target.value };
                  setProductForm((p) => ({ ...p, highlightStats: next }));
                }}
                placeholder="Value (e.g., 6 - 10)"
                className="bg-[#1a3332] border border-orange-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/40"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={stat.unit}
                  onChange={(e) => {
                    const next = [...(productForm.highlightStats || [])];
                    next[index] = { ...next[index], unit: e.target.value };
                    setProductForm((p) => ({ ...p, highlightStats: next }));
                  }}
                  placeholder="Unit (e.g., Persons)"
                  className="flex-1 bg-[#1a3332] border border-orange-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/40"
                />
                <button
                  type="button"
                  onClick={() => setProductForm((p) => ({ ...p, highlightStats: (p.highlightStats || []).filter((_, i) => i !== index) }))}
                  className="px-3 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg text-xs transition-all"
                >✕</button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setProductForm((p) => ({ ...p, highlightStats: [...(p.highlightStats || []), { icon: 'Package', label: '', value: '', unit: '' }] }))}
          className="px-4 py-2 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
        >+ Add Highlight Stat</button>
      </div>

      {/* ── Key Specifications (2×2 grid) ───────────────────── */}
      <div className="border border-white/10 rounded-xl p-5 space-y-3">
        <h4 className="text-orange-400 text-xs uppercase tracking-widest font-semibold">
          Key Specifications
          <span className="ml-2 text-white/30 normal-case font-normal">2×2 grid beside product image — max 4</span>
        </h4>
        <div className="space-y-2">
          {(productForm.specifications || []).map((spec, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
              <input
                type="text"
                value={spec.label}
                onChange={(e) => {
                  const next = [...(productForm.specifications || [])];
                  next[index] = { ...next[index], label: e.target.value };
                  setProductForm((p) => ({ ...p, specifications: next }));
                }}
                placeholder="Label (e.g., Drive System)"
                className="bg-[#1a3332] border border-orange-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/40"
              />
              <div className="flex gap-2 md:col-span-2">
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => {
                    const next = [...(productForm.specifications || [])];
                    next[index] = { ...next[index], value: e.target.value };
                    setProductForm((p) => ({ ...p, specifications: next }));
                  }}
                  placeholder="Value (e.g., Gearless Traction)"
                  className="flex-1 bg-[#1a3332] border border-orange-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/40"
                />
                <button
                  type="button"
                  onClick={() => setProductForm((p) => ({ ...p, specifications: (p.specifications || []).filter((_, i) => i !== index) }))}
                  className="px-3 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg text-xs transition-all"
                >✕</button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            if ((productForm.specifications || []).length >= 4) return;
            setProductForm((p) => ({ ...p, specifications: [...(p.specifications || []), { label: '', value: '' }] }));
          }}
          className="px-4 py-2 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
        >
          + Add Spec {(productForm.specifications || []).length >= 4 && '(max 4 reached)'}
        </button>
      </div>

      {/* ── Full Specifications (technical details table) ────── */}
      <div className="border border-white/10 rounded-xl p-5 space-y-3">
        <h4 className="text-orange-400 text-xs uppercase tracking-widest font-semibold">
          Full Specifications
          <span className="ml-2 text-white/30 normal-case font-normal">"Technical Details" table</span>
        </h4>
        <p className="text-white/40 text-xs">Complete spec table in the bottom section of the product detail page.</p>
        <div className="space-y-2">
          {(productForm.fullSpecifications || []).map((spec, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
              <input
                type="text"
                value={spec.label}
                onChange={(e) => {
                  const next = [...(productForm.fullSpecifications || [])];
                  next[index] = { ...next[index], label: e.target.value };
                  setProductForm((p) => ({ ...p, fullSpecifications: next }));
                }}
                placeholder="Label (e.g., Load Capacity)"
                className="bg-[#1a3332] border border-orange-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/40"
              />
              <div className="flex gap-2 md:col-span-2">
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => {
                    const next = [...(productForm.fullSpecifications || [])];
                    next[index] = { ...next[index], value: e.target.value };
                    setProductForm((p) => ({ ...p, fullSpecifications: next }));
                  }}
                  placeholder="Value (e.g., 544 - 680 kg)"
                  className="flex-1 bg-[#1a3332] border border-orange-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/40"
                />
                <button
                  type="button"
                  onClick={() => setProductForm((p) => ({ ...p, fullSpecifications: (p.fullSpecifications || []).filter((_, i) => i !== index) }))}
                  className="px-3 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg text-xs transition-all"
                >✕</button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setProductForm((p) => ({ ...p, fullSpecifications: [...(p.fullSpecifications || []), { label: '', value: '' }] }))}
          className="px-4 py-2 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
        >+ Add Full Spec Row</button>
      </div>

      {/* ── Error + Submit ──────────────────────────────────── */}
      {productError && (
        <p className="text-red-400 text-sm flex items-center gap-1">
          <AlertCircle size={14} />{productError}
        </p>
      )}
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={productLoading}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg transition-all flex items-center gap-2"
        >
          <Save size={18} />
          <span>{productLoading ? 'Saving...' : editingProductId ? 'Update Product' : 'Add Product'}</span>
        </button>
        {editingProductId && (
          <button
            type="button"
            onClick={resetProductForm}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
          >Cancel Edit</button>
        )}
      </div>
    </form>

    {/* ── Existing Products List ──────────────────────────── */}
    <div className="border-t border-white/10 pt-6">
      <h4 className="text-white text-lg font-semibold mb-4">Existing Products</h4>
      {productLoading && products.length === 0 && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        </div>
      )}
      {!productLoading && products.length === 0 && (
        <p className="text-white/40 text-sm text-center py-8">No products added yet.</p>
      )}
      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product._id || product.slug}
            className="flex flex-col md:flex-row md:items-center gap-3 p-4 bg-[#1a3332]/60 border border-orange-500/10 rounded-lg hover:border-orange-500/20 transition-all"
          >
            {/* Thumbnail */}
            {product.heroImage && (
              <img
                src={product.heroImage.startsWith('/uploads') ? `https://winsume-lift-backend01.onrender.com${product.heroImage}` : product.heroImage}
                alt={product.name}
                className="w-full md:w-16 h-16 object-cover rounded-lg flex-shrink-0 hidden md:block"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <p className="text-white font-semibold">{product.name}</p>
                <span className="text-orange-400 text-xs font-mono bg-orange-500/10 px-2 py-0.5 rounded-full">
                  /product/{product.slug}
                </span>
                <span className="text-white/40 text-xs bg-white/5 px-2 py-0.5 rounded-full capitalize">
                  {product.category}
                </span>
              </div>
              <p className="text-white/50 text-sm line-clamp-1 mb-1">{product.shortDescription}</p>
              <div className="flex items-center gap-3 text-white/30 text-xs flex-wrap">
                <span>₹{product.price.toLocaleString('en-IN')}</span>
                {(product.highlightStats || []).length > 0 && (
                  <span className="text-green-400/60">{product.highlightStats!.length} stats</span>
                )}
                {(product.detailedFeatures || []).length > 0 && (
                  <span className="text-blue-400/60">{product.detailedFeatures!.length} features</span>
                )}
                {(product.fullSpecifications || []).length > 0 && (
                  <span className="text-purple-400/60">{product.fullSpecifications!.length} full specs</span>
                )}
                {(product.badges || []).length > 0 && (
                  <span className="text-orange-400/60">{product.badges!.length} badges</span>
                )}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => handleEditProduct(product)}
                className="px-4 py-2 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
              >Edit</button>
              <button
                type="button"
                onClick={() => handleDeleteProduct(product._id)}
                className="px-4 py-2 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

              {/* Home page portfolio */}
              {id === 'home' && (
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                  <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2"><Star className="text-orange-500" size={24}/>Home Page Portfolio Products</h3>
                  <p className="text-white/70 text-sm mb-4">Choose which lift products appear in the <span className="font-semibold">Our Portfolio</span> section on the home page.</p>
                  <div className="space-y-4">
                    <select className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40" value="" onChange={(e) => { const pid=e.target.value; if(!pid)return; setHomeFeaturedProductIds(prev=>prev.includes(pid)?prev:[...prev,pid].slice(0,4)); }}>
                      <option value="">Select a product…</option>
                      {products.map((p) => <option key={p._id} value={p._id}>{p.name} ({p.slug})</option>)}
                    </select>
                    <p className="text-white/40 text-xs">Up to <span className="text-orange-400 font-semibold">4</span> products.</p>
                    <div className="space-y-2">
                      {homeFeaturedProductIds.map((pid, index) => {
                        const p = products.find((prod) => prod._id === pid);
                        if (!p) return null;
                        return (
                          <div key={pid} className="flex items-center justify-between bg-[#1a3332]/60 border border-orange-500/20 rounded-lg px-4 py-2">
                            <div><p className="text-white text-sm"><span className="text-white/40 mr-2">#{index + 1}</span>{p.name}</p><p className="text-white/50 text-xs font-mono">/product/{p.slug}</p></div>
                            <button type="button" onClick={() => setHomeFeaturedProductIds(prev=>prev.filter(idVal=>idVal!==pid))} className="text-white/60 hover:text-red-400 text-xs">Remove</button>
                          </div>
                        );
                      })}
                    </div>
                    {productError && <p className="text-red-400 text-sm flex items-center gap-1"><AlertCircle size={14}/>{productError}</p>}
                    <button type="button" onClick={handleSaveHomeFeatured} disabled={productLoading} className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-lg transition-all flex items-center gap-2">
                      <Save size={18}/><span>Save Home Portfolio</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Home collections */}
              {id === 'home' && (
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                  <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2"><ShoppingBag className="text-orange-500" size={24}/>Home Page Collections Products</h3>
                  <p className="text-white/70 text-sm mb-4">Choose which products appear in the <span className="font-semibold">Our Collections</span> section.</p>
                  <div className="space-y-4">
                    <select className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40" value="" onChange={(e) => { const pid=e.target.value; if(!pid)return; setHomeCollectionsProductIds(prev=>prev.includes(pid)?prev:[...prev,pid].slice(0,3)); }}>
                      <option value="">Select a product…</option>
                      {products.map((p) => <option key={p._id} value={p._id}>{p.name} ({p.slug})</option>)}
                    </select>
                    <p className="text-white/40 text-xs">Up to <span className="text-orange-400 font-semibold">3</span> products.</p>
                    <div className="space-y-2">
                      {homeCollectionsProductIds.map((pid, index) => {
                        const p = products.find((prod) => prod._id === pid);
                        if (!p) return null;
                        return (
                          <div key={pid} className="flex items-center justify-between bg-[#1a3332]/60 border border-orange-500/20 rounded-lg px-4 py-2">
                            <div><p className="text-white text-sm"><span className="text-white/40 mr-2">#{index + 1}</span>{p.name}</p><p className="text-white/50 text-xs font-mono">/product/{p.slug}</p></div>
                            <button type="button" onClick={() => setHomeCollectionsProductIds(prev=>prev.filter(idVal=>idVal!==pid))} className="text-white/60 hover:text-red-400 text-xs">Remove</button>
                          </div>
                        );
                      })}
                    </div>
                    {productError && <p className="text-red-400 text-sm flex items-center gap-1"><AlertCircle size={14}/>{productError}</p>}
                    <button type="button" onClick={handleSaveHomeFeatured} disabled={productLoading} className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-lg transition-all flex items-center gap-2">
                      <Save size={18}/><span>Save Home Collections</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Our Work featured */}
              {id === 'our-work' && (
                <div className="bg-[#0a1514]/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
                  <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2"><Briefcase className="text-orange-500" size={24}/>Featured Projects (Our Work page)</h3>
                  <p className="text-white/70 text-sm mb-4">Choose which products appear in the featured grid on the <span className="font-semibold">Our Work</span> page.</p>
                  <div className="space-y-4">
                    <select className="w-full bg-[#1a3332] border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40" value="" onChange={(e) => { const pid=e.target.value; if(!pid)return; setOurWorkFeaturedProductIds(prev=>prev.includes(pid)?prev:[...prev,pid].slice(0,3)); }}>
                      <option value="">Select a product…</option>
                      {products.map((p) => <option key={p._id} value={p._id}>{p.name} ({p.slug})</option>)}
                    </select>
                    <p className="text-white/40 text-xs">Up to <span className="text-orange-400 font-semibold">3</span> products.</p>
                    <div className="space-y-2">
                      {ourWorkFeaturedProductIds.map((pid, index) => {
                        const p = products.find((prod) => prod._id === pid);
                        if (!p) return null;
                        return (
                          <div key={pid} className="flex items-center justify-between bg-[#1a3332]/60 border border-orange-500/20 rounded-lg px-4 py-2">
                            <div><p className="text-white text-sm"><span className="text-white/40 mr-2">#{index + 1}</span>{p.name}</p><p className="text-white/50 text-xs font-mono">/product/{p.slug}</p></div>
                            <button type="button" onClick={() => setOurWorkFeaturedProductIds(prev=>prev.filter(idVal=>idVal!==pid))} className="text-white/60 hover:text-red-400 text-xs">Remove</button>
                          </div>
                        );
                      })}
                    </div>
                    {productError && <p className="text-red-400 text-sm flex items-center gap-1"><AlertCircle size={14}/>{productError}</p>}
                    <button type="button" onClick={handleSaveOurWorkFeatured} disabled={productLoading} className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-lg transition-all flex items-center gap-2">
                      <Save size={18}/><span>Save Featured Projects</span>
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          BLOG CREATE / EDIT MODAL
      ══════════════════════════════════════════════════════════════════════ */}
      {showBlogForm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4">
          <div className="w-full max-w-3xl bg-[#1a3332] border border-orange-500/20 rounded-2xl shadow-2xl">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="text-xl font-['Playfair_Display'] text-white">{editingBlogId ? 'Edit Blog Post' : 'New Blog Post'}</h2>
              <button onClick={() => setShowBlogForm(false)} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all">
                <X size={16} className="text-white/70" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {blogFormError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
                  <AlertCircle size={14}/>{blogFormError}
                </div>
              )}

              {/* Title + Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Title *</label>
                  <input type="text" value={blogForm.title} onChange={(e) => handleBlogTitleChange(e.target.value)} placeholder="Post title" className="w-full bg-[#2a4544] border border-orange-500/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 text-sm transition-colors" />
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Slug</label>
                  <input type="text" value={blogForm.slug} onChange={(e) => setBlogForm(f=>({...f,slug:e.target.value}))} placeholder="post-url-slug" className="w-full bg-[#2a4544] border border-orange-500/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 text-sm font-mono transition-colors" />
                </div>
              </div>

              {/* Category + Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Category *</label>
                  <select value={blogForm.category} onChange={(e) => setBlogForm(f=>({...f,category:e.target.value}))} className="w-full bg-[#2a4544] border border-orange-500/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/50 text-sm transition-colors">
                    <option value="">Select category</option>
                    {BLOG_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Status</label>
                  <select value={blogForm.status} onChange={(e) => setBlogForm(f=>({...f,status:e.target.value as any}))} className="w-full bg-[#2a4544] border border-orange-500/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/50 text-sm transition-colors">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              {/* Hero Image */}
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Hero Image URL</label>
                <input type="url" value={blogForm.heroImage} onChange={(e) => setBlogForm(f=>({...f,heroImage:e.target.value}))} placeholder="https://…" className="w-full bg-[#2a4544] border border-orange-500/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 text-sm transition-colors" />
                {blogForm.heroImage && <img src={blogForm.heroImage} alt="preview" className="mt-2 h-24 w-full object-cover rounded-lg opacity-80" />}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Excerpt * <span className="normal-case text-white/30">(max 300 chars)</span></label>
                <textarea value={blogForm.excerpt} onChange={(e) => setBlogForm(f=>({...f,excerpt:e.target.value}))} rows={3} maxLength={300} placeholder="Short description shown on blog listing…" className="w-full bg-[#2a4544] border border-orange-500/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 text-sm resize-none transition-colors" />
                <p className="text-right text-white/30 text-xs mt-1">{blogForm.excerpt.length}/300</p>
              </div>

              {/* Content */}
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Content * <span className="normal-case text-white/30">(HTML supported)</span></label>
                <textarea value={blogForm.content} onChange={(e) => setBlogForm(f=>({...f,content:e.target.value}))} rows={12} placeholder="<h2>Introduction</h2><p>Your content here…</p>" className="w-full bg-[#2a4544] border border-orange-500/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 text-sm font-mono resize-y transition-colors" />
              </div>

              {/* Author */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Author Name</label>
                  <input type="text" value={blogForm.author} onChange={(e) => setBlogForm(f=>({...f,author:e.target.value}))} className="w-full bg-[#2a4544] border border-orange-500/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/50 text-sm transition-colors" />
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Author Image URL</label>
                  <input type="url" value={blogForm.authorImage} onChange={(e) => setBlogForm(f=>({...f,authorImage:e.target.value}))} placeholder="https://…" className="w-full bg-[#2a4544] border border-orange-500/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 text-sm transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Author Bio</label>
                <textarea value={blogForm.authorBio} onChange={(e) => setBlogForm(f=>({...f,authorBio:e.target.value}))} rows={2} className="w-full bg-[#2a4544] border border-orange-500/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 text-sm resize-none transition-colors" />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Tags <span className="normal-case text-white/30">(comma separated)</span></label>
                <input type="text" value={blogForm.tags} onChange={(e) => setBlogForm(f=>({...f,tags:e.target.value}))} placeholder="Home Lift, Luxury, Indore" className="w-full bg-[#2a4544] border border-orange-500/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 text-sm transition-colors" />
              </div>

              {/* SEO */}
              <div className="bg-[#0a1514]/60 border border-orange-500/10 rounded-xl p-5">
                <p className="text-orange-500 text-xs uppercase tracking-widest mb-4">SEO Settings</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">SEO Title</label>
                    <input type="text" value={blogForm.seoTitle} onChange={(e) => setBlogForm(f=>({...f,seoTitle:e.target.value}))} placeholder="Page title for search engines" className="w-full bg-[#1a3332] border border-orange-500/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 text-sm transition-colors" />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">SEO Description <span className="normal-case text-white/30">(max 160 chars)</span></label>
                    <textarea value={blogForm.seoDescription} onChange={(e) => setBlogForm(f=>({...f,seoDescription:e.target.value}))} rows={2} maxLength={160} className="w-full bg-[#1a3332] border border-orange-500/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 text-sm resize-none transition-colors" />
                    <p className="text-right text-white/30 text-xs mt-1">{blogForm.seoDescription.length}/160</p>
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">SEO Keywords <span className="normal-case text-white/30">(comma separated)</span></label>
                    <input type="text" value={blogForm.seoKeywords} onChange={(e) => setBlogForm(f=>({...f,seoKeywords:e.target.value}))} placeholder="home lift Indore, elevator installation" className="w-full bg-[#1a3332] border border-orange-500/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 text-sm transition-colors" />
                  </div>
                </div>
              </div>

              {/* Featured toggle */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div onClick={() => setBlogForm(f=>({...f,featured:!f.featured}))} className={`w-12 h-6 rounded-full transition-colors flex items-center px-0.5 ${blogForm.featured?'bg-orange-500':'bg-white/10'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${blogForm.featured?'translate-x-6':'translate-x-0'}`} />
                </div>
                <span className="text-white/70 text-sm">Mark as Featured Post</span>
              </label>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-white/10">
              <button onClick={() => setShowBlogForm(false)} className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:text-white text-sm transition-all">Cancel</button>
              <button onClick={handleBlogSave} disabled={blogSaving} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all disabled:opacity-60">
                {blogSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check size={15} />}
                {blogSaving ? 'Saving…' : editingBlogId ? 'Update Post' : 'Create Post'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          BLOG DELETE CONFIRM MODAL
      ══════════════════════════════════════════════════════════════════════ */}
      {deleteBlogId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-[#1a3332] border border-red-500/30 rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center">
            <div className="w-14 h-14 bg-red-500/15 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={24} className="text-red-400" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Delete Post?</h3>
            <p className="text-white/50 text-sm mb-6">This action is permanent and cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteBlogId(null)} className="flex-1 py-2.5 rounded-full border border-white/20 text-white/60 hover:text-white text-sm transition-all">Cancel</button>
              <button onClick={handleBlogDelete} disabled={deletingBlog} className="flex-1 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-all disabled:opacity-60">
                {deletingBlog ? 'Deleting…' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}