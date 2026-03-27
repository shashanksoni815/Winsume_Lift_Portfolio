import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Clock, Tag, ArrowLeft, ChevronRight, Eye, Share2, Calendar } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { InquiryForm } from '../components/InquiryForm';

const API = 'https://winsume-lift-backend01.onrender.com/api/blogs';
const BACKEND_BASE_URL = 'https://winsume-lift-backend01.onrender.com';
const resolveMediaUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('/uploads')) return `${BACKEND_BASE_URL}${url}`;
  return url;
};

interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  heroImage: string;
  tags: string[];
  author: string;
  authorBio: string;
  authorImage: string;
  readTime: string;
  views: number;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  featured: boolean;
}

interface RelatedPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  heroImage: string;
  category: string;
  readTime: string;
  publishedAt: string;
}

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [blog, setBlog]       = useState<Blog | null>(null);
  const [related, setRelated] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res  = await fetch(`${API}/public/${slug}`);
        if (res.status === 404) { setError('not_found'); return; }
        if (!res.ok)            { setError('server');    return; }
        const data = await res.json();
        setBlog(data.blog);
        setRelated(data.related || []);

        // ── Inject SEO meta tags dynamically ──
        if (data.blog) {
          document.title = data.blog.seoTitle || data.blog.title;
          upsertMeta('description', data.blog.seoDescription || data.blog.excerpt);
          upsertMeta('keywords',    (data.blog.seoKeywords || []).join(', '));
          upsertMeta('og:title',    data.blog.seoTitle || data.blog.title,    'property');
          upsertMeta('og:description', data.blog.seoDescription || data.blog.excerpt, 'property');
          if (data.blog.heroImage) upsertMeta('og:image', data.blog.heroImage, 'property');

          // JSON-LD BlogPosting schema
          injectSchema({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline:      data.blog.title,
            description:   data.blog.seoDescription || data.blog.excerpt,
            image:         data.blog.heroImage,
            author: {
              '@type': 'Person',
              name:    data.blog.author || 'Winsume Lift Team',
            },
            publisher: {
              '@type': 'Organization',
              name:    'Winsume Lift',
              logo: {
                '@type': 'ImageObject',
                url:   'https://winsumelift.com/logo.png',
              },
            },
            datePublished: data.blog.publishedAt,
            dateModified:  data.blog.updatedAt,
            keywords:      (data.blog.seoKeywords || []).join(', '),
            mainEntityOfPage: {
              '@type': '@id',
              '@id':   `https://winsumelift.com/blog/${data.blog.slug}`,
            },
          });
        }
      } catch {
        setError('server');
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => {
      // cleanup injected schema on unmount
      document.getElementById('blog-ld-json')?.remove();
    };
  }, [slug]);

  const upsertMeta = (name: string, content: string, attr = 'name') => {
    let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.content = content;
  };

  const injectSchema = (data: object) => {
    document.getElementById('blog-ld-json')?.remove();
    const script = document.createElement('script');
    script.id   = 'blog-ld-json';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: blog?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  // ── Loading ──
  if (loading) return (
    <div className="bg-[#1a3332] min-h-screen">
      <Navigation />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50 text-sm">Loading article…</p>
        </div>
      </div>
      <Footer />
    </div>
  );

  // ── Not found ──
  if (error === 'not_found') return (
    <div className="bg-[#1a3332] min-h-screen">
      <Navigation />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <p className="font-['Great_Vibes'] text-6xl text-orange-500 mb-4">404</p>
        <h1 className="text-white text-2xl mb-2">Article Not Found</h1>
        <p className="text-white/50 mb-8">This post may have been moved or unpublished.</p>
        <button onClick={() => navigate('/blog')} className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all uppercase tracking-wider text-sm">
          Back to Blog
        </button>
      </div>
      <Footer />
    </div>
  );

  if (!blog) return null;

  return (
    <div className="bg-[#1a3332] min-h-screen">
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative pt-20 overflow-hidden">
        <div className="relative h-[50vh] md:h-[65vh]">
          <ImageWithFallback
            src={resolveMediaUrl(blog.heroImage) || 'https://images.unsplash.com/photo-1772721559246-286e6d986d73?q=80&w=1080'}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332] via-[#1a3332]/60 to-[#1a3332]/30" />

          {/* Back button */}
          <button
            onClick={() => navigate('/blog')}
            className="absolute top-8 left-6 md:left-12 flex items-center space-x-2 text-white/70 hover:text-orange-500 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm uppercase tracking-wider">Blog</span>
          </button>
        </div>
      </section>

      {/* ── Article ── */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">

        {/* Category + Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block bg-orange-500/20 border border-orange-500/40 text-orange-500 text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            {blog.category}
          </span>

          <h1 className="text-white text-3xl md:text-5xl font-['Playfair_Display'] leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm mb-8 pb-8 border-b border-white/10">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(blog.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {blog.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye size={14} />
              {blog.views} views
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 ml-auto text-white/50 hover:text-orange-500 transition-colors"
            >
              <Share2 size={14} />
              Share
            </button>
          </div>
        </motion.div>

        {/* Excerpt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-white/70 text-lg leading-relaxed mb-10 italic border-l-2 border-orange-500 pl-6"
        >
          {blog.excerpt}
        </motion.p>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-white/75 text-[1.0625rem] leading-[1.85] whitespace-pre-line"
        >
          {blog.content}
        </motion.div>

        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/10">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 text-orange-500/80 text-xs px-3 py-1.5 rounded-full"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Card */}
        <div className="mt-12 bg-[#2a4544] border border-orange-500/20 rounded-2xl p-6 flex items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-orange-500/20 border border-orange-500/30 overflow-hidden flex-shrink-0">
            {blog.authorImage ? (
              <ImageWithFallback src={resolveMediaUrl(blog.authorImage)} alt={blog.author} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-orange-500 font-bold text-xl">
                {blog.author?.[0] || 'W'}
              </div>
            )}
          </div>
          <div>
            <p className="text-orange-500 text-xs uppercase tracking-widest mb-1">Written by</p>
            <p className="text-white font-semibold text-base mb-1">{blog.author || 'Winsume Lift Team'}</p>
            <p className="text-white/50 text-sm leading-relaxed">
              {blog.authorBio || 'Expert in luxury elevator solutions and vertical transportation design across India.'}
            </p>
          </div>
        </div>
      </article>

      {/* ── Related Posts ── */}
      {related.length > 0 && (
        <section className="py-16 md:py-24 mt-16 bg-[#2a4544]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-orange-500 text-xs uppercase tracking-widest mb-3">Keep Reading</p>
              <h2 className="text-3xl md:text-4xl text-white font-['Playfair_Display']">Related Articles</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((post, i) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="group bg-[#1a3332] rounded-2xl overflow-hidden border border-orange-500/10 hover:border-orange-500/40 transition-all duration-300 cursor-pointer hover:-translate-y-1"
                >
                  <div className="relative h-44 overflow-hidden">
                    <ImageWithFallback
                      src={resolveMediaUrl(post.heroImage) || ''}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a3332]/80 to-transparent" />
                    <span className="absolute top-3 left-3 bg-[#1a3332]/80 text-orange-500 text-xs px-3 py-1 rounded-full border border-orange-500/30">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-white text-base font-['Playfair_Display'] mb-2 leading-snug group-hover:text-orange-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-white/50 text-xs mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-white/40">
                      <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
                      <span className="flex items-center text-orange-500 group-hover:text-orange-400">
                        Read <ChevronRight size={12} className="ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Inquiry CTA ── */}
      <InquiryForm />
      <Footer />

      {/* ── Blog content prose styles ── */}
      <style>{`
        .prose-blog { color: rgba(255,255,255,0.75); font-size: 1.0625rem; line-height: 1.85; }
        .prose-blog h2 { color: #fff; font-family: 'Playfair Display', serif; font-size: 1.75rem; margin: 2.5rem 0 1rem; }
        .prose-blog h3 { color: #fff; font-family: 'Playfair Display', serif; font-size: 1.35rem; margin: 2rem 0 0.75rem; }
        .prose-blog p  { margin-bottom: 1.5rem; }
        .prose-blog ul, .prose-blog ol { margin: 1.5rem 0 1.5rem 1.5rem; }
        .prose-blog li { margin-bottom: 0.5rem; }
        .prose-blog strong { color: #fff; font-weight: 600; }
        .prose-blog a  { color: #f97316; text-decoration: underline; }
        .prose-blog a:hover { color: #fb923c; }
        .prose-blog blockquote { border-left: 3px solid #f97316; padding-left: 1.25rem; color: rgba(255,255,255,0.6); font-style: italic; margin: 2rem 0; }
        .prose-blog img { border-radius: 1rem; width: 100%; margin: 2rem 0; }
        .prose-blog hr  { border-color: rgba(255,255,255,0.1); margin: 2.5rem 0; }
        .prose-blog code { background: rgba(249,115,22,0.15); color: #fb923c; padding: 0.15rem 0.4rem; border-radius: 0.25rem; font-size: 0.875rem; }
        .prose-blog pre  { background: #0f2221; padding: 1.25rem; border-radius: 0.75rem; overflow-x: auto; margin: 2rem 0; }
        .prose-blog table { width: 100%; border-collapse: collapse; margin: 2rem 0; }
        .prose-blog th, .prose-blog td { border: 1px solid rgba(255,255,255,0.1); padding: 0.75rem 1rem; text-align: left; }
        .prose-blog th { background: rgba(249,115,22,0.15); color: #fb923c; }
      `}</style>
    </div>
  );
}