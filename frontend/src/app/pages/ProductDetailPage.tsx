import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { CheckCircle, Award, Package, Gauge, Zap, Shield } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useCart } from '../context/CartContext';

interface ProductSpec {
  label: string;
  value: string;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  category?: string;
  price?: number;
  shortDescription?: string;
  heroImage?: string;
  images: string[];
  features: string[];
  specifications: ProductSpec[];
}

export function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    projectType: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Consultation request:', formData);
    alert('Thank you! We will contact you soon for a consultation.');
  };

  useEffect(() => {
    const loadProduct = async () => {
      if (!slug) return;
      try {
        setIsLoading(true);
        setLoadError(null);
        const res = await fetch(`https://winsume-lift-portfolio-backend.onrender.com/api/products/slug/${slug}`);
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          setLoadError(data?.message || 'Failed to load product.');
          return;
        }
        const data = await res.json().catch(() => null);
        const p = data?.product;
        if (!p) {
          setLoadError('Product not found.');
          return;
        }

        const rawHero = p.heroImage || (Array.isArray(p.images) ? p.images[0] : undefined);
        const heroImage =
          typeof rawHero === 'string' && rawHero.startsWith('/uploads')
            ? `https://winsume-lift-portfolio-backend.onrender.com${rawHero}`
            : rawHero;

        const galleryImages: string[] = [];
        if (heroImage) galleryImages.push(heroImage);
        if (Array.isArray(p.images)) {
          p.images.forEach((img: string) => {
            if (img && !galleryImages.includes(img)) {
              const normalized =
                typeof img === 'string' && img.startsWith('/uploads')
                  ? `https://winsume-lift-portfolio-backend.onrender.com${img}`
                  : img;
              galleryImages.push(normalized);
            }
          });
        }

        const mapped: Product = {
          id: p._id,
          slug: p.slug,
          name: p.name,
          category: p.category,
          price: typeof p.price === 'number' ? p.price : undefined,
          shortDescription: p.shortDescription,
          heroImage: heroImage,
          images: galleryImages,
          features: Array.isArray(p.features) ? p.features : [],
          specifications: Array.isArray(p.specifications) ? p.specifications : []
        };

        setProduct(mapped);
        setSelectedImage(0);
      } catch {
        setLoadError('Unable to load product. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  const productImages = product?.images?.length ? product.images : [
    'https://images.unsplash.com/photo-1663186867803-bd547d4bd5ba?w=800'
  ];

  return (
    <div className="min-h-screen bg-[#1a3332]">
      <Navigation />
      
      {/* Hero Section with Background */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1772721559246-286e6d986d73?w=1600"
            alt="Product Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/95 via-[#1a3332]/90 to-[#1a3332]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loadError && (
            <p className="text-red-400 text-center text-sm mb-6">{loadError}</p>
          )}
          {isLoading && !product && (
            <p className="text-white/70 text-center text-sm mb-6">Loading product details...</p>
          )}
          {product && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-orange-500 text-xs uppercase tracking-widest mb-4">
              {product?.category ? product.category.toUpperCase() : 'LIFT COLLECTION'}
            </p>
            <h1 className="font-['Great_Vibes'] text-6xl md:text-7xl lg:text-8xl text-white mb-6">
              {product?.name || 'Lift'}
            </h1>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-full">
                <Award size={16} className="text-green-500" />
                <span className="text-green-500 text-xs uppercase tracking-wider">ISO Certified</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-4 py-2 rounded-full">
                <CheckCircle size={16} className="text-orange-500" />
                <span className="text-orange-500 text-xs uppercase tracking-wider">Power Class A3</span>
              </div>
            </div>
          </motion.div>
          )}
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="py-16 bg-[#2a4544]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="bg-[#1a3332] border border-orange-500/20 rounded-2xl overflow-hidden p-4">
                <ImageWithFallback 
                  src={productImages[selectedImage]} 
                  alt="Sovereign MRL Elevator" 
                  className="w-full h-[500px] object-cover rounded-xl"
                />
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-[#1a3332] border border-white/10 rounded-lg overflow-hidden p-2 cursor-pointer hover:border-orange-500/50 transition-all"
                    onClick={() => setSelectedImage(index)}
                  >
                    <ImageWithFallback 
                      src={img} 
                      alt={`View ${index + 1}`} 
                      className={`w-full h-20 object-cover rounded transition-all ${
                        selectedImage === index 
                          ? 'ring-2 ring-orange-500' 
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Investment Quote */}
              <div className="bg-[#1a3332] border-2 border-orange-500/30 rounded-2xl p-8">
                <p className="text-orange-500/80 text-xs uppercase tracking-widest mb-3">Investment Quote</p>
                <div className="flex items-baseline gap-4 mb-6">
                  <p className="font-['Great_Vibes'] text-5xl md:text-6xl text-orange-500">
                    {product?.price
                      ? `₹${product.price.toLocaleString('en-IN')}`
                      : 'Price on request'}
                  </p>
                </div>
                <p className="text-white/70 text-sm leading-relaxed italic border-l-2 border-orange-500/30 pl-4">
                  {product?.shortDescription ||
                    'Premium bespoke lift solution tailored for your residence or commercial space.'}
                </p>
              </div>

              {/* Key Specifications */}
              <div className="bg-[#1a3332] border border-white/10 rounded-2xl p-8">
                <h3 className="text-white text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center">
                    <Package size={16} className="text-orange-500" />
                  </div>
                  Key Specifications
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {(product?.specifications && product.specifications.length > 0
                    ? product.specifications.slice(0, 4)
                    : [
                        { label: 'Drive System', value: 'Electronic' },
                        { label: 'Technology', value: 'Premium' },
                        { label: 'Speed', value: '1.0 m/s' },
                        { label: 'Warranty', value: '24 Months' }
                      ]
                  ).map((spec, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2">
                        {index === 0 && <Zap size={14} className="text-orange-500" />}
                        {index === 1 && <Shield size={14} className="text-orange-500" />}
                        {index === 2 && <Gauge size={14} className="text-orange-500" />}
                        {index === 3 && <Award size={14} className="text-orange-500" />}
                        <p className="text-white/40 text-xs uppercase">{spec.label}</p>
                      </div>
                      <p className="text-white pl-6">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <button
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-orange-500/30 uppercase tracking-wider text-sm font-semibold"
                  onClick={async () => {
                    if (!product) return;
                    await addToCart({
                      id: product.id,
                      name: product.name,
                      category: product.category || 'Lift',
                      price: product.price || 0,
                      image: productImages[0],
                      specifications: product.shortDescription || ''
                    });
                    navigate('/cart');
                  }}
                >
                  ADD TO CONSULTATION →
                </button>
                <button className="w-full bg-transparent border-2 border-white/20 text-white py-4 rounded-full hover:border-orange-500/50 hover:bg-orange-500/5 transition-all uppercase tracking-wider text-sm font-semibold">
                  GET A CUSTOM QUOTE
                </button>
              </div>

              <p className="text-white/30 text-xs text-center leading-relaxed pt-4">
                * Price based on standard configuration. Subject to site assessment, customizations and final consultation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Unrivaled Specifications Section */}
      <section className="py-20 bg-[#1a3332]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-orange-500/80 text-xs uppercase tracking-widest mb-4">EXCELLENCE IN EVERY DETAIL</p>
            <h2 className="font-['Great_Vibes'] text-5xl md:text-6xl text-white mb-4">
              Unrivaled Specifications
            </h2>
            <p className="text-white/60 text-sm max-w-2xl mx-auto leading-relaxed">
              Engineered for those who desire the zenith of performance. Every specification is a testament to our unrelenting pursuit of perfection.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#2a4544] border border-orange-500/20 rounded-2xl p-8 text-center hover:border-orange-500/50 transition-all"
            >
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package size={28} className="text-orange-500" />
              </div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Capacity</p>
              <p className="font-['Great_Vibes'] text-4xl text-orange-500 mb-2">6 - 10</p>
              <p className="text-white/60 text-sm">Persons</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#2a4544] border border-orange-500/20 rounded-2xl p-8 text-center hover:border-orange-500/50 transition-all"
            >
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gauge size={28} className="text-orange-500" />
              </div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Speed Range</p>
              <p className="font-['Great_Vibes'] text-4xl text-orange-500 mb-2">1.0 - 1.75</p>
              <p className="text-white/60 text-sm">m/s</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#2a4544] border border-orange-500/20 rounded-2xl p-8 text-center hover:border-orange-500/50 transition-all"
            >
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap size={28} className="text-orange-500" />
              </div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Drive System</p>
              <p className="text-orange-500 text-xl mb-2">Gearless</p>
              <p className="text-white/60 text-sm">Traction</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#2a4544] border border-orange-500/20 rounded-2xl p-8 text-center hover:border-orange-500/50 transition-all"
            >
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield size={28} className="text-orange-500" />
              </div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Design</p>
              <p className="text-orange-500 text-xl mb-2">Artisan</p>
              <p className="text-white/60 text-sm">Wood/Gold</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#2a4544]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-orange-500/80 text-xs uppercase tracking-widest mb-4">PREMIUM FEATURES</p>
              <h3 className="font-['Great_Vibes'] text-4xl md:text-5xl text-white mb-8">
                Crafted for Excellence
              </h3>
              <div className="space-y-6">
                {[
                  { icon: CheckCircle, title: 'Machine Room-Less Design', desc: 'Space-saving technology with zero machine room requirement' },
                  { icon: CheckCircle, title: 'VVVF Drive System', desc: 'Variable voltage variable frequency for smooth operation' },
                  { icon: CheckCircle, title: 'Premium Aesthetics', desc: 'Artisan wood finishes with gold accents' },
                  { icon: CheckCircle, title: 'Silent Operation', desc: 'Near-silent performance for residential comfort' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 bg-[#1a3332] border border-white/10 rounded-xl p-6 hover:border-orange-500/30 transition-all">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <feature.icon size={20} className="text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">{feature.title}</h4>
                      <p className="text-white/60 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#1a3332] border border-orange-500/20 rounded-2xl p-8"
            >
              <p className="text-orange-500/80 text-xs uppercase tracking-widest mb-4">TECHNICAL DETAILS</p>
              <h3 className="font-['Great_Vibes'] text-4xl text-white mb-8">Full Specifications</h3>
              <div className="space-y-6">
                {[
                  { label: 'Load Capacity', value: '544 - 680 kg' },
                  { label: 'Persons', value: '6 - 10 Persons' },
                  { label: 'Speed', value: '1.0 - 1.75 m/s' },
                  { label: 'Door Type', value: 'Automatic Center Opening' },
                  { label: 'Car Size', value: '1100 x 1400 mm' },
                  { label: 'Door Width', value: '800 - 900 mm' },
                  { label: 'Power Supply', value: '380V, 50Hz, 3-Phase' },
                  { label: 'Control System', value: 'Microprocessor VVVF' }
                ].map((spec, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-white/5 last:border-b-0">
                    <p className="text-white/50 text-sm">{spec.label}</p>
                    <p className="text-white font-medium">{spec.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section className="py-20 bg-[#1a3332]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#2a4544] border border-orange-500/20 rounded-3xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left - Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-orange-500/80 text-xs uppercase tracking-widest mb-4">GET IN TOUCH</p>
                <h2 className="font-['Great_Vibes'] text-4xl md:text-5xl text-white mb-6">
                  Let's Discuss Your Vertical Vision.
                </h2>
                <p className="text-white/70 mb-8 leading-relaxed">
                  Whether it's a private residence or a commercial landmark, we provide bespoke architectural solutions tailored to your needs.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-white font-medium">+91 79428 29113</p>
                      <p className="text-white/50 text-sm">Call directly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-white font-medium">concierge@winsumelift.com</p>
                      <p className="text-white/50 text-sm">Email us</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-white font-medium">Winsume Tower, Landmark Area, M.P.</p>
                      <p className="text-white/50 text-sm">Visit our studio</p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/917942829113"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 transition-all mt-8 shadow-lg hover:shadow-orange-500/30 uppercase tracking-wider text-sm font-semibold"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </motion.div>

              {/* Right - Form */}
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full bg-[#1a3332] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full bg-[#1a3332] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0000000000"
                      required
                      className="w-full bg-[#1a3332] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Indore"
                      required
                      className="w-full bg-[#1a3332] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Project Type</label>
                  <input
                    type="text"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    placeholder="Residential Villa"
                    required
                    className="w-full bg-[#1a3332] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={4}
                    required
                    className="w-full bg-[#1a3332] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-4 rounded-full hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30 uppercase tracking-wider font-semibold"
                >
                  SEND INQUIRY →
                </button>
              </motion.form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}