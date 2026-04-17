import React, { useState, useEffect, useCallback } from 'react';
import { apiUrl, assetUrl } from "../api";
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { ChevronRight, Clock, Tag, ArrowRight, Star, Shield, Wrench, Award, Building2, Home, Zap, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Services } from '../components/Services';

const API = apiUrl('/blogs');

const resolveMediaUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('/uploads')) return assetUrl(url);
  return url;
};

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  heroImage: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  views: number;
  featured: boolean;
  author: string;
}

const whyUs = [
  { icon: Award,    stat: 'ISO Certified', label: 'Quality Operations' },
  { icon: Shield,   stat: 'Lifetime',      label: 'Warranty Assurance' },
  { icon: Star,     stat: '14+ Projects',  label: 'Completed Installations' },
  { icon: Wrench,   stat: 'Specialized',   label: 'Trained Technicians' },
];

const services = [
  { icon: Home,      title: 'Residential Lifts',     description: 'Bespoke home elevators for villas, bungalows and duplexes — engineered for smooth, silent operation.',              keywords: ['home lift', 'residential elevator', 'villa lift'] },
  { icon: Building2, title: 'Commercial Elevators',  description: 'High-traffic passenger and goods elevators for offices, malls, hospitals and mixed-use developments.',             keywords: ['commercial elevator', 'passenger lift', 'goods lift'] },
  { icon: Wrench,    title: 'AMC & Maintenance',     description: 'Comprehensive Annual Maintenance Contracts backed by specialized, certified technicians.',                         keywords: ['elevator maintenance', 'AMC', 'lift service'] },
  { icon: Zap,       title: 'Modernization',         description: 'Upgrade ageing lifts with modern control systems, energy-efficient drives and contemporary cabins.',              keywords: ['elevator modernization', 'lift upgrade', 'retrofitting'] },
];

export function BlogPage() {
  const navigate = useNavigate();

  const [posts, setPosts]             = useState<BlogPost[]>([]);
  const [categories, setCategories]   = useState<string[]>(['All']);
  const [activeCategory, setCategory] = useState('All');
  const [search, setSearch]           = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading]         = useState(true);
  const [loadError, setLoadError]     = useState<string | null>(null);
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(1);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError(null);

      const params = new URLSearchParams({ page: String(page), limit: '9' });
      if (activeCategory !== 'All') params.set('category', activeCategory);
      if (search) params.set('search', search);

      const [postsRes, catsRes] = await Promise.all([
        fetch(`${API}/public?${params}`),
        fetch(`${API}/public/categories`),
      ]);

      const postsData = await postsRes.json().catch(() => null);
      const catsData  = await catsRes.json().catch(() => null);

      if (postsData?.items) {
        setPosts(postsData.items);
        setTotalPages(postsData.pagination?.totalPages || 1);
      }
      if (catsData?.categories) {
        const names = ['All', ...catsData.categories.map((c: any) => c._id)];
        setCategories(names);
      }
    } catch {
      setLoadError('Unable to load articles. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, activeCategory, search]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const gridPosts    = posts.filter((p) => p._id !== featuredPost?._id);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="bg-[#1a3332] min-h-screen">
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative py-20 md:py-32 pt-32 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGV2YXRvciUyMGNhYmluJTIwaW50ZXJpb3IlMjBnb2xkfGVufDF8fHx8MTc3MzIzNjYyOXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Luxury Elevator Interior — Winsume Lift Blog"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/80 via-[#1a3332]/70 to-[#1a3332]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-orange-500 text-sm uppercase tracking-widest mb-4">
            Insights &amp; Expertise
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6">
            The Lift Journal
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-white/80 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            Expert insights on luxury elevator installation, home lift design, maintenance best practices and vertical transportation trends across India.
          </motion.p>

          {/* Search bar
          <motion.form
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSearch}
            className="flex max-w-lg mx-auto gap-3"
          >
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search articles…"
                className="w-full bg-[#2a4544] border border-orange-500/20 rounded-full pl-10 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors text-sm"
              />
            </div>
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition-all text-sm font-semibold uppercase tracking-wider">
              Search
            </button>
          </motion.form>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="w-24 h-1 bg-orange-500 mx-auto mt-8" /> */}
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="bg-[#2a4544] border-y border-orange-500/20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon size={22} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-white font-semibold text-base leading-tight">{item.stat}</p>
                  <p className="text-white/50 text-xs uppercase tracking-wider">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <section className="py-10 bg-[#1a3332]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-[#2a4544] text-white/60 border border-orange-500/20 hover:border-orange-500/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Loading / Error ── */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        </div>
      )}
      {loadError && !loading && (
        <div className="text-center py-16">
          <p className="text-red-400 text-sm mb-4">{loadError}</p>
          <button onClick={fetchPosts} className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm hover:bg-orange-600 transition-all">
            Retry
          </button>
        </div>
      )}

      {/* ── Featured Post ── */}
      {!loading && featuredPost && (
        <section className="py-6 bg-[#1a3332]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              onClick={() => navigate(`/blog/${featuredPost.slug}`)}
              className="relative group overflow-hidden rounded-3xl shadow-2xl cursor-pointer"
            >
              <div className="relative h-[400px] md:h-[520px]">
                <ImageWithFallback
                  src={resolveMediaUrl(featuredPost.heroImage) || 'https://images.unsplash.com/photo-1621293954908-907159247fc8?w=1080'}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-[#1a3332]/50 to-transparent" />
                <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/8 transition-all duration-300" />
                <div className="absolute top-6 left-6">
                  <span className="bg-orange-500 text-white text-xs uppercase tracking-widest px-4 py-1.5 rounded-full font-semibold">
                    {featuredPost.featured ? 'Featured' : 'Latest'}
                  </span>
                </div>
                <div className="absolute bottom-8 left-8 right-8 md:right-1/3">
                  <span className="text-orange-400 text-xs uppercase tracking-widest mb-3 block">{featuredPost.category}</span>
                  <h2 className="text-2xl md:text-4xl text-white font-['Playfair_Display'] mb-4 leading-tight group-hover:text-orange-400 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-white/70 text-sm md:text-base mb-5 leading-relaxed line-clamp-2">{featuredPost.excerpt}</p>
                  <div className="flex items-center space-x-4 text-white/50 text-xs mb-5">
                    <span className="flex items-center space-x-1"><Clock size={12} /><span>{featuredPost.readTime}</span></span>
                    <span>{formatDate(featuredPost.publishedAt)}</span>
                  </div>
                  <div className="inline-flex items-center text-orange-500 text-sm font-semibold border border-orange-500/40 px-5 py-2.5 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    Read Article <ArrowRight size={14} className="ml-2" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Blog Grid ── */}
      {!loading && gridPosts.length > 0 && (
        <section className="py-12 md:py-20 bg-[#1a3332]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {gridPosts.map((post, index) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="group bg-[#2a4544] rounded-2xl overflow-hidden border border-orange-500/10 hover:border-orange-500/40 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1"
                >
                  <div className="relative h-52 overflow-hidden">
                    <ImageWithFallback src={resolveMediaUrl(post.heroImage) || ''} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2a4544]/80 to-transparent" />
                    <span className="absolute top-4 left-4 bg-[#1a3332]/80 backdrop-blur-sm text-orange-500 text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-orange-500/30">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-3 text-white/40 text-xs mb-3">
                      <span className="flex items-center space-x-1"><Clock size={11} /><span>{post.readTime}</span></span>
                      <span>·</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <h3 className="text-white text-lg font-['Playfair_Display'] mb-3 leading-snug group-hover:text-orange-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="flex items-center space-x-1 text-orange-500/70 text-xs bg-orange-500/10 px-2.5 py-1 rounded-full">
                          <Tag size={9} /><span>{tag}</span>
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-orange-500 text-sm font-semibold group-hover:text-orange-400">
                      Read More <ChevronRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-3 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-5 py-2.5 rounded-full border border-orange-500/30 text-white/60 text-sm hover:border-orange-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-full text-sm font-semibold transition-all ${
                      page === p ? 'bg-orange-500 text-white' : 'border border-orange-500/30 text-white/60 hover:border-orange-500 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-5 py-2.5 rounded-full border border-orange-500/30 text-white/60 text-sm hover:border-orange-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next →
                </button>
              </div>
            )}

          </div>
        </section>
      )}

      {/* Empty state */}
      {!loading && posts.length === 0 && !loadError && (
        <section className="py-12 md:py-20 bg-[#1a3332]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20 border border-orange-500/10 rounded-2xl bg-[#2a4544]/30">
              <p className="font-['Great_Vibes'] text-5xl text-orange-500/40 mb-4">No Articles Yet</p>
              <p className="text-white/40 text-sm mb-5">No published blog posts are available right now.</p>
              <p className="text-white/30 text-xs">If you are admin, create or publish posts from Portal Config → Blog.</p>
            </div>
          </div>
        </section>
      )}

      {/* ── Services ── */}
      {/* <section className="py-16 md:py-24 bg-[#2a4544]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-14">
            <p className="text-orange-500 text-xs uppercase tracking-widest mb-3">What We Do</p>
            <h2 className="text-4xl sm:text-5xl mb-4">
              <span className="text-white">Our </span>
              <span className="font-['Great_Vibes'] text-orange-500 text-5xl sm:text-6xl">Services</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-base leading-relaxed">
              From luxury home lifts in Indore to large-scale commercial elevators across Punjab — Winsume Lift delivers precision-engineered vertical mobility solutions.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-[#1a3332] border border-orange-500/20 rounded-2xl p-7 hover:border-orange-500/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-orange-500/15 rounded-xl flex items-center justify-center mb-5 group-hover:bg-orange-500/25 transition-colors">
                  <s.icon size={24} className="text-orange-500" />
                </div>
                <h3 className="text-white font-['Playfair_Display'] text-xl mb-3">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{s.description}</p>
                <div className="flex flex-wrap gap-1">
                  {s.keywords.map((kw) => (
                    <span key={kw} className="text-orange-500/50 text-xs">#{kw.replace(/ /g, '')}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
      <Services />

      <Footer />
    </div>
  );
}