import React, { useState, useEffect } from 'react';
import { apiUrl } from "../api";
import { Menu, X, Phone, User, ShoppingCart, FolderKanban, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { useCart } from '../context/CartContext';
// import logo from '../../../public/logo.png';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);
  const [siteName, setSiteName] = useState('WINSUME');
  const [siteSubtitle, setSiteSubtitle] = useState('Lift India');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, logout } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await fetch(apiUrl('/portal-config'));
        if (!res.ok) return;
        const data = await res.json().catch(() => null);
        if (data?.portalSettings?.siteName) {
          const name = data.portalSettings.siteName as string;
          const parts = name.split(' ');
          setSiteName(parts.slice(0, -1).join(' ') || name);
          setSiteSubtitle(parts.slice(-1).join(' ') || 'Lift India');
        }
      } catch {
        // ignore errors, keep defaults
      }
    };
    loadConfig();
  }, []);

  useEffect(() => {
    const hasToken = !!localStorage.getItem('accessToken');
    const legacyFlag = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(hasToken || legacyFlag);
    const storedRole = localStorage.getItem('userRole');
    if (storedRole === 'admin' || storedRole === 'user') {
      setUserRole(storedRole);
    } else {
      setUserRole(null);
    }
  }, [location]);

  // const handleLogout = () => {
  //   localStorage.removeItem('isLoggedIn');
  //   localStorage.removeItem('userEmail');
  //   localStorage.removeItem('accessToken');
  //   localStorage.removeItem('refreshToken');
  //   localStorage.removeItem('userRole');
  //   setIsLoggedIn(false);
  //   setUserRole(null);
  //   setIsProfileMenuOpen(false);
  //   navigate('/');
  // };

// const { logout } = useCart();

const handleLogout = async () => {
  // Clear auth state (your existing logic)
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userRole');
  setIsLoggedIn(false);
  setUserRole(null);
  setIsProfileMenuOpen(false);

  // Zero out the cart in context
  await logout();

  navigate('/');
};

  const handleCartClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      setIsMobileMenuOpen(false);
    } else {
      navigate('/cart');
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handlePortfolioClick  = () => { navigate('/our-work');   setIsMobileMenuOpen(false); };
  const handleCollectionClick = () => { navigate('/collection'); setIsMobileMenuOpen(false); };
  const handleServicesClick   = () => { navigate('/services');   setIsMobileMenuOpen(false); };
  const handleAboutClick      = () => { navigate('/about');      setIsMobileMenuOpen(false); };
  const handleBlogClick       = () => { navigate('/blog');       setIsMobileMenuOpen(false); };

  return (
    <>
      {/* ── LOGIN REQUIRED MODAL ── */}
      {showLoginModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="relative bg-[#1a3332] border border-orange-500/30 rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 flex items-center justify-center transition-all"
              aria-label="Close"
            >
              <X size={16} className="text-white/70" />
            </button>

            <div className="w-16 h-16 bg-orange-500/20 border border-orange-500/40 rounded-full flex items-center justify-center mx-auto mb-5">
              <ShoppingCart size={28} className="text-orange-500" />
            </div>

            <h2 className="text-white text-xl font-semibold mb-2">Login Required</h2>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              Please log in to view your cart and manage your selected items.
            </p>

            <button
              onClick={() => { setShowLoginModal(false); navigate('/login'); }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-full transition-all hover:scale-105 shadow-lg text-sm uppercase tracking-wider mb-3"
            >
              Login to Continue
            </button>

            <button
              onClick={() => setShowLoginModal(false)}
              className="w-full text-white/40 hover:text-white/70 text-sm py-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#1a3332]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 md:h-24 lg:h-28">

          
            <button
              onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex-shrink-0">
                <img
                  src={"/logo.png"}
                  alt="Winsume Lift Logo"
                  // className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  className="w-full h-full object-contain scale-110 sm:scale-100 md:scale-110"
                />
              </div>

              <div className="text-white min-w-0">
                <div className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-tight tracking-wide">{siteName}</div>
                <div className="hidden sm:block text-orange-500 text-xs md:text-sm uppercase tracking-wider">{siteSubtitle}</div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-6 2xl:space-x-8">
            <button
              onClick={handlePortfolioClick}
              className={`text-sm uppercase tracking-wider transition-colors ${
                location.pathname === '/our-work' ? 'text-orange-500' : 'text-white/80 hover:text-orange-500'
              }`}
            >
              Portfolio
            </button>

            <button
              onClick={handleCollectionClick}
              className={`text-sm uppercase tracking-wider transition-colors ${
                location.pathname === '/collection' ? 'text-orange-500' : 'text-white/80 hover:text-orange-500'
              }`}
            >
              Collection
            </button>

            <button
              onClick={handleServicesClick}
              className={`text-sm uppercase tracking-wider transition-colors ${
                location.pathname === '/services' ? 'text-orange-500' : 'text-white/80 hover:text-orange-500'
              }`}
            >
              Services
            </button>

            <button
              onClick={handleAboutClick}
              className={`text-sm uppercase tracking-wider transition-colors ${
                location.pathname === '/about' ? 'text-orange-500' : 'text-white/80 hover:text-orange-500'
              }`}
            >
              About
            </button>
              {/* ── BLOG LINK ── */}
              <button
                onClick={handleBlogClick}
                className={`text-sm uppercase tracking-wider transition-colors ${
                  location.pathname === '/blog'
                    ? 'text-orange-500'
                    : 'text-white/80 hover:text-orange-500'
                }`}
              >
                Blog
              </button>

              <button
                onClick={() => { navigate('/contact'); setIsMobileMenuOpen(false); }}
                className={`text-sm uppercase tracking-wider transition-colors ${
                  location.pathname === '/contact' ? 'text-orange-500' : 'text-white/80 hover:text-orange-500'
                }`}
              >
                Contact
              </button>

              {/* Cart Icon */}
              <button
                onClick={handleCartClick}
                className="w-10 h-10 bg-white/10 hover:bg-orange-500/20 border border-white/20 hover:border-orange-500/50 rounded-full flex items-center justify-center transition-all relative"
              >
                <ShoppingCart size={18} className="text-white" />
                {cartCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-semibold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-[#1a3332] font-['Inter']">
                    {cartCount}
                  </div>
                )}
              </button>

              {/* Profile Icon */}
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-10 h-10 bg-white/10 hover:bg-orange-500/20 border border-white/20 hover:border-orange-500/50 rounded-full flex items-center justify-center transition-all"
              >
                <User size={18} className="text-white" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="xl:hidden text-white p-2 -mr-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="xl:hidden bg-[#1a3332]/95 backdrop-blur-md rounded-lg mb-4 p-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
              <div className="flex flex-col space-y-3">
                <button onClick={handlePortfolioClick}  className="text-white/80 hover:text-orange-500 transition-colors text-left py-2 text-sm uppercase tracking-wider">Portfolio</button>
                <button onClick={handleCollectionClick} className="text-white/80 hover:text-orange-500 transition-colors text-left py-2 text-sm uppercase tracking-wider">Collection</button>
                <button onClick={handleServicesClick}   className="text-white/80 hover:text-orange-500 transition-colors text-left py-2 text-sm uppercase tracking-wider">Services</button>
                <button onClick={handleAboutClick}      className="text-white/80 hover:text-orange-500 transition-colors text-left py-2 text-sm uppercase tracking-wider">About</button>

                {/* ── BLOG LINK (mobile) ── */}
                <button
                  onClick={handleBlogClick}
                  className={`text-left py-2 text-sm uppercase tracking-wider transition-colors ${
                    location.pathname === '/blog' ? 'text-orange-500' : 'text-white/80 hover:text-orange-500'
                  }`}
                >
                  Blog
                </button>

                <button
                  onClick={() => { navigate('/contact'); setIsMobileMenuOpen(false); }}
                  className="text-white/80 hover:text-orange-500 transition-colors text-left py-2 text-sm uppercase tracking-wider"
                >
                  Contact
                </button>

                {/* Cart in Mobile */}
                <button
                  onClick={handleCartClick}
                  className="flex items-center space-x-2 text-white/80 hover:text-orange-500 transition-colors text-left py-2"
                >
                  <ShoppingCart size={16} />
                  <span className="text-sm font-['Inter']">Cart</span>
                  {cartCount > 0 && (
                    <div className="bg-orange-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full font-['Inter']">
                      {cartCount}
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 text-white/80 hover:text-orange-500 transition-colors text-left py-2"
                >
                  <User size={16} />
                  <span className="text-sm">Profile</span>
                </button>
              </div>
            </div>
          )}

          {/* Profile Menu */}
          {isProfileMenuOpen && (
            <div className="absolute right-3 sm:right-6 top-16 sm:top-20 bg-[#1a3332]/95 backdrop-blur-md border border-orange-500/20 rounded-lg shadow-2xl p-2 w-[calc(100vw-1.5rem)] max-w-64">
              <div className="relative text-center py-3 border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="absolute right-2 top-2 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 flex items-center justify-center transition-all"
                  aria-label="Close"
                >
                  <X size={16} className="text-white/70" />
                </button>
                <p className="text-orange-500/80 text-xs uppercase tracking-widest">
                  {isLoggedIn ? (userRole === 'admin' ? 'Admin Portal' : 'User Portal') : 'Security Portal'}
                </p>
                <h3 className="font-['Great_Vibes'] text-2xl text-white mt-1">
                  {isLoggedIn ? (userRole === 'admin' ? 'Welcome, Admin' : 'Welcome') : 'Login'}
                </h3>
              </div>

              {isLoggedIn ? (
                <div className="flex flex-col space-y-2 py-2">
                  {userRole === 'admin' ? (
                    <>
                      <button onClick={() => { navigate('/admin-dashboard'); setIsProfileMenuOpen(false); }} className="flex items-center space-x-3 text-white/80 hover:text-orange-500 hover:bg-orange-500/10 transition-all px-4 py-3 rounded-lg group">
                        <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/40 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-all"><User size={16} className="text-orange-500" /></div>
                        <div className="text-left flex-1"><div className="text-sm font-medium">Admin Dashboard</div><div className="text-xs text-white/40">Management Portal</div></div>
                      </button>
                      <button onClick={() => { navigate('/admin/projects'); setIsProfileMenuOpen(false); }} className="flex items-center space-x-3 text-white/80 hover:text-orange-500 hover:bg-orange-500/10 transition-all px-4 py-3 rounded-lg group">
                        <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/40 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-all"><FolderKanban size={16} className="text-orange-500" /></div>
                        <div className="text-left flex-1"><div className="text-sm font-medium">Projects</div><div className="text-xs text-white/40">Manage All Projects</div></div>
                      </button>
                      <button onClick={() => { navigate('/admin/inquiries'); setIsProfileMenuOpen(false); }} className="flex items-center space-x-3 text-white/80 hover:text-orange-500 hover:bg-orange-500/10 transition-all px-4 py-3 rounded-lg group">
                        <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/40 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-all"><Phone size={16} className="text-orange-500" /></div>
                        <div className="text-left flex-1"><div className="text-sm font-medium">Inquiries</div><div className="text-xs text-white/40">View All Inquiries</div></div>
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { navigate('/user-portal'); setIsMobileMenuOpen(false); setIsProfileMenuOpen(false); }} className="flex items-center space-x-3 text-white/80 hover:text-orange-500 hover:bg-orange-500/10 transition-all px-4 py-3 rounded-lg group">
                        <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/40 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-all"><User size={16} className="text-orange-500" /></div>
                        <div className="text-left flex-1"><div className="text-sm font-medium">User Portal</div><div className="text-xs text-white/40">Dashboard Access</div></div>
                      </button>
                      <button onClick={() => { navigate('/my-engagements'); setIsProfileMenuOpen(false); }} className="flex items-center space-x-3 text-white/80 hover:text-orange-500 hover:bg-orange-500/10 transition-all px-4 py-3 rounded-lg group">
                        <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/40 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-all"><FolderKanban size={16} className="text-orange-500" /></div>
                        <div className="text-left flex-1"><div className="text-sm font-medium">Projects</div><div className="text-xs text-white/40">View All Projects</div></div>
                      </button>
                    </>
                  )}
                  <button onClick={handleLogout} className="flex items-center space-x-3 text-white/80 hover:text-orange-500 hover:bg-orange-500/10 transition-all px-4 py-3 rounded-lg group">
                    <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/40 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-all"><LogOut size={16} className="text-orange-500" /></div>
                    <div className="text-left flex-1"><div className="text-sm font-medium">Logout</div><div className="text-xs text-white/40">Sign Out</div></div>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 py-2">
                  <button onClick={() => { navigate('/login'); setIsProfileMenuOpen(false); }} className="flex items-center space-x-3 text-white/80 hover:text-orange-500 hover:bg-orange-500/10 transition-all px-4 py-3 rounded-lg group">
                    <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/40 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-all"><User size={16} className="text-orange-500" /></div>
                    <div className="text-left flex-1"><div className="text-sm font-medium">Login</div><div className="text-xs text-white/40">User access</div></div>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}