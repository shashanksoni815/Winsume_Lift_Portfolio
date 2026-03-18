import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, User, ShoppingCart, FolderKanban, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { useCart } from '../context/CartContext';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);
  const [siteName, setSiteName] = useState('WINSUME');
  const [siteSubtitle, setSiteSubtitle] = useState('Lift India');
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();

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
        const res = await fetch('https://winsume-lift-portfolio-backend.onrender.com/api/portal-config');
        if (!res.ok) return;
        const data = await res.json().catch(() => null);
        if (data?.portalSettings?.siteName) {
          const name = data.portalSettings.siteName as string;
          // Simple split: main name + subtitle
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
    // Check login status based on stored auth tokens (new flow)
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

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole(null);
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  const scrollToSection = (id: string) => {
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handlePortfolioClick = () => {
    navigate('/our-work');
    setIsMobileMenuOpen(false);
  };

  const handleCollectionClick = () => {
    navigate('/collection');
    setIsMobileMenuOpen(false);
  };

  const handleServicesClick = () => {
    navigate('/services');
    setIsMobileMenuOpen(false);
  };

  const handleAboutClick = () => {
    navigate('/about');
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleInquiryClick = () => {
    navigate('/bespoke-proposal');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#1a3332]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex items-center space-x-3 cursor-pointer group">
            {/* Simple Logo Icon */}
            <div className="relative w-10 h-10 bg-orange-500 rounded-md flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
              <div className="text-white font-bold text-xl">W</div>
            </div>
            
            {/* Logo Text */}
            <div className="text-white">
              <div className="font-bold text-xl">{siteName}</div>
              <div className="text-orange-500 text-xs uppercase">{siteSubtitle}</div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={handlePortfolioClick}
              className="text-white/80 hover:text-orange-500 transition-colors text-sm uppercase tracking-wider"
            >
              Portfolio
            </button>
            <button
              onClick={handleCollectionClick}
              className="text-white/80 hover:text-orange-500 transition-colors text-sm uppercase tracking-wider"
            >
              Collection
            </button>
            <button
              onClick={handleServicesClick}
              className="text-white/80 hover:text-orange-500 transition-colors text-sm uppercase tracking-wider"
            >
              Services
            </button>
            <button
              onClick={handleAboutClick}
              className="text-white/80 hover:text-orange-500 transition-colors text-sm uppercase tracking-wider"
            >
              About
            </button>
            
            {/* Contact Info */}
            <button
              onClick={() => {
                navigate('/contact');
                setIsMobileMenuOpen(false);
              }}
              className="text-white/80 hover:text-orange-500 transition-colors text-sm uppercase tracking-wider"
            >
              Contact
            </button>

            {/* Cart Icon */}
            <button 
              onClick={() => navigate('/cart')}
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

            <button
              onClick={handleInquiryClick}
              className="bg-orange-500 text-white px-6 py-2.5 rounded-full hover:bg-orange-600 hover:scale-105 transition-all text-sm uppercase tracking-wider shadow-lg"
            >
              Inquire
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1a3332]/95 backdrop-blur-md rounded-lg mb-4 p-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={handlePortfolioClick}
                className="text-white/80 hover:text-orange-500 transition-colors text-left py-2 text-sm uppercase tracking-wider"
              >
                Portfolio
              </button>
              <button
                onClick={handleCollectionClick}
                className="text-white/80 hover:text-orange-500 transition-colors text-left py-2 text-sm uppercase tracking-wider"
              >
                Collection
              </button>
              <button
                onClick={handleServicesClick}
                className="text-white/80 hover:text-orange-500 transition-colors text-left py-2 text-sm uppercase tracking-wider"
              >
                Services
              </button>
              <button
                onClick={handleAboutClick}
                className="text-white/80 hover:text-orange-500 transition-colors text-left py-2 text-sm uppercase tracking-wider"
              >
                About
              </button>
              
              {/* Contact in Mobile Menu */}
              <button
                onClick={() => {
                  navigate('/contact');
                  setIsMobileMenuOpen(false);
                }}
                className="text-white/80 hover:text-orange-500 transition-colors text-left py-2 text-sm uppercase tracking-wider"
              >
                Contact
              </button>

              {/* Cart in Mobile Menu */}
              <button 
                onClick={() => {
                  navigate('/cart');
                  setIsMobileMenuOpen(false);
                }}
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

              {/* Profile in Mobile Menu */}
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 text-white/80 hover:text-orange-500 transition-colors text-left py-2"
              >
                <User size={16} />
                <span className="text-sm">Profile</span>
              </button>

              <button
                onClick={handleInquiryClick}
                className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-all text-left text-sm uppercase tracking-wider"
              >
                Inquire
              </button>
            </div>
          </div>
        )}

        {/* Profile Menu */}
        {isProfileMenuOpen && (
          <div className="absolute right-6 top-20 bg-[#1a3332]/95 backdrop-blur-md border border-orange-500/20 rounded-lg shadow-2xl p-2 w-64">
            <div className="relative text-center py-3 border-b border-white/10">
              <button
                type="button"
                onClick={() => setIsProfileMenuOpen(false)}
                className="absolute right-2 top-2 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 flex items-center justify-center transition-all"
                aria-label="Close"
                title="Close"
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
              // Logged In Menu (admin vs user)
              <div className="flex flex-col space-y-2 py-2">
                {userRole === 'admin' ? (
                  <>
                    <button
                      onClick={() => {
                        navigate('/admin');
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 text-white/80 hover:text-orange-500 hover:bg-orange-500/10 transition-all px-4 py-3 rounded-lg group"
                    >
                      <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/40 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-all">
                        <User size={16} className="text-orange-500" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="text-sm font-medium">Admin Dashboard</div>
                        <div className="text-xs text-white/40">Management Portal</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        navigate('/admin/projects');
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 text-white/80 hover:text-orange-500 hover:bg-orange-500/10 transition-all px-4 py-3 rounded-lg group"
                    >
                      <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/40 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-all">
                        <FolderKanban size={16} className="text-orange-500" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="text-sm font-medium">Projects</div>
                        <div className="text-xs text-white/40">Manage All Projects</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        navigate('/admin/inquiries');
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 text-white/80 hover:text-orange-500 hover:bg-orange-500/10 transition-all px-4 py-3 rounded-lg group"
                    >
                      <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/40 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-all">
                        <Phone size={16} className="text-orange-500" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="text-sm font-medium">Inquiries</div>
                        <div className="text-xs text-white/40">View All Inquiries</div>
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate('/user-portal');
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 text-white/80 hover:text-orange-500 hover:bg-orange-500/10 transition-all px-4 py-3 rounded-lg group"
                    >
                      <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/40 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-all">
                        <User size={16} className="text-orange-500" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="text-sm font-medium">User Portal</div>
                        <div className="text-xs text-white/40">Dashboard Access</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        navigate('/my-engagements');
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 text-white/80 hover:text-orange-500 hover:bg-orange-500/10 transition-all px-4 py-3 rounded-lg group"
                    >
                      <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/40 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-all">
                        <FolderKanban size={16} className="text-orange-500" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="text-sm font-medium">Projects</div>
                        <div className="text-xs text-white/40">View All Projects</div>
                      </div>
                    </button>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 text-white/80 hover:text-orange-500 hover:bg-orange-500/10 transition-all px-4 py-3 rounded-lg group"
                >
                  <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/40 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-all">
                    <LogOut size={16} className="text-orange-500" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-medium">Logout</div>
                    <div className="text-xs text-white/40">Sign Out</div>
                  </div>
                </button>
              </div>
            ) : (
              // Not Logged In Menu
              <div className="flex flex-col space-y-2 py-2">
                <button 
                  onClick={() => {
                    navigate('/login');
                    setIsProfileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 text-white/80 hover:text-orange-500 hover:bg-orange-500/10 transition-all px-4 py-3 rounded-lg group"
                >
                  <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/40 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-all">
                    <User size={16} className="text-orange-500" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-medium">Login</div>
                    <div className="text-xs text-white/40">User access</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}