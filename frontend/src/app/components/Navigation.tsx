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
          <div className="flex items-center justify-between h-16 sm:h-20 mt-2 md:h-24 lg:h-20">

          
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

// import React, { useState, useEffect, useRef } from 'react';
// import { apiUrl } from "../api";
// import { Menu, X, Phone, User, ShoppingCart, FolderKanban, LogOut } from 'lucide-react';
// import { useNavigate, useLocation } from 'react-router';
// import { useCart } from '../context/CartContext';

// // ─── Height token — import this in hero sections to match ─────────────────────
// export const NAV_HEIGHT = 96; // px

// type UserRole = 'admin' | 'user' | null;

// // ─────────────────────────────────────────────────────────────────────────────
// // LoginRequiredModal
// // ─────────────────────────────────────────────────────────────────────────────
// function LoginRequiredModal({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) {
//   return (
//     <div
//       className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
//       onClick={onClose}
//     >
//       <div
//         className="relative bg-[#0f2625] border border-orange-500/30 rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center"
//         onClick={e => e.stopPropagation()}
//       >
//         <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all" aria-label="Close">
//           <X size={15} className="text-white/60" />
//         </button>
//         <div className="w-16 h-16 bg-orange-500/15 border border-orange-500/35 rounded-full flex items-center justify-center mx-auto mb-5">
//           <ShoppingCart size={26} className="text-orange-400" />
//         </div>
//         <h2 className="text-white text-xl font-semibold mb-2 tracking-tight">Login Required</h2>
//         <p className="text-white/45 text-sm mb-7 leading-relaxed">
//           Please log in to view your cart and manage your selected items.
//         </p>
//         <button onClick={onLogin} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition-all hover:scale-[1.02] shadow-lg text-sm uppercase tracking-widest mb-3">
//           Login to Continue
//         </button>
//         <button onClick={onClose} className="w-full text-white/35 hover:text-white/60 text-sm py-2 transition-colors">Cancel</button>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // ProfileMenu
// // ─────────────────────────────────────────────────────────────────────────────
// function ProfileMenu({ isLoggedIn, userRole, onClose, onNavigate, onLogout }: {
//   isLoggedIn: boolean; userRole: UserRole;
//   onClose: () => void; onNavigate: (p: string) => void; onLogout: () => void;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
//     document.addEventListener('mousedown', h);
//     return () => document.removeEventListener('mousedown', h);
//   }, [onClose]);

//   const Item = ({ icon, label, sub, onClick }: { icon: React.ReactNode; label: string; sub: string; onClick: () => void }) => (
//     <button onClick={onClick} className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl text-white/75 hover:text-orange-400 hover:bg-orange-500/10 transition-all group">
//       <span className="w-8 h-8 bg-orange-500/15 border border-orange-500/30 rounded-full flex items-center justify-center group-hover:bg-orange-500/25 shrink-0 transition-all">{icon}</span>
//       <span className="flex-1 min-w-0">
//         <span className="block text-sm font-medium leading-tight">{label}</span>
//         <span className="block text-[11px] text-white/35 truncate mt-0.5">{sub}</span>
//       </span>
//     </button>
//   );

//   return (
//     <div ref={ref} className="absolute right-0 w-64 bg-[#0f2625]/98 backdrop-blur-xl border border-orange-500/20 rounded-2xl shadow-2xl overflow-hidden z-[150]"
//       style={{ top: 'calc(100% + 10px)', boxShadow: '0 24px 60px rgba(0,0,0,0.5),0 0 0 1px rgba(249,115,22,0.1)' }}>
//       <div className="px-4 py-4 border-b border-white/8 text-center relative">
//         <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all" aria-label="Close">
//           <X size={13} className="text-white/50" />
//         </button>
//         <p className="text-orange-500/70 text-[10px] uppercase tracking-[0.2em] mb-1">
//           {isLoggedIn ? (userRole === 'admin' ? 'Admin Portal' : 'User Portal') : 'Account'}
//         </p>
//         <p className="text-white text-lg font-semibold tracking-tight">
//           {isLoggedIn ? (userRole === 'admin' ? 'Welcome, Admin' : 'Welcome Back') : 'Sign In'}
//         </p>
//       </div>
//       <div className="p-2">
//         {isLoggedIn ? (
//           <>
//             {userRole === 'admin' ? (
//               <>
//                 <Item icon={<User size={14} className="text-orange-400" />} label="Admin Dashboard" sub="Management Portal" onClick={() => onNavigate('/admin-dashboard')} />
//                 <Item icon={<FolderKanban size={14} className="text-orange-400" />} label="Projects" sub="Manage All Projects" onClick={() => onNavigate('/admin/projects')} />
//                 <Item icon={<Phone size={14} className="text-orange-400" />} label="Inquiries" sub="View All Inquiries" onClick={() => onNavigate('/admin/inquiries')} />
//               </>
//             ) : (
//               <>
//                 <Item icon={<User size={14} className="text-orange-400" />} label="User Portal" sub="Dashboard Access" onClick={() => onNavigate('/user-portal')} />
//                 <Item icon={<FolderKanban size={14} className="text-orange-400" />} label="My Projects" sub="View All Projects" onClick={() => onNavigate('/my-engagements')} />
//               </>
//             )}
//             <div className="my-1.5 border-t border-white/8" />
//             <Item icon={<LogOut size={14} className="text-orange-400" />} label="Logout" sub="Sign out of your account" onClick={onLogout} />
//           </>
//         ) : (
//           <Item icon={<User size={14} className="text-orange-400" />} label="Login" sub="Access your account" onClick={() => onNavigate('/login')} />
//         )}
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Navigation
// // ─────────────────────────────────────────────────────────────────────────────
// export function Navigation() {
//   const [isScrolled,        setIsScrolled]        = useState(false);
//   const [isMobileMenuOpen,  setIsMobileMenuOpen]  = useState(false);
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const [isLoggedIn,        setIsLoggedIn]        = useState(false);
//   const [userRole,          setUserRole]          = useState<UserRole>(null);
//   const [siteName,          setSiteName]          = useState('WINSUME LIFT');
//   const [siteSubtitle,      setSiteSubtitle]      = useState('INDIA');
//   const [showLoginModal,    setShowLoginModal]    = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { cartCount, logout } = useCart();

//   useEffect(() => {
//     const fn = () => setIsScrolled(window.scrollY > 40);
//     window.addEventListener('scroll', fn, { passive: true });
//     return () => window.removeEventListener('scroll', fn);
//   }, []);

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//     setIsProfileMenuOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch(apiUrl('/portal-config'));
//         if (!res.ok) return;
//         const data = await res.json().catch(() => null);
//         if (data?.portalSettings?.siteName) {
//           const raw = (data.portalSettings.siteName as string).trim();
//           const parts = raw.split(/\s+/);
//           setSiteName(parts.length >= 2 ? parts.slice(0, -1).join(' ') : raw);
//           setSiteSubtitle(parts.length >= 2 ? parts[parts.length - 1] : '');
//         }
//       } catch { /* keep defaults */ }
//     })();
//   }, []);

//   useEffect(() => {
//     const hasToken = !!localStorage.getItem('accessToken');
//     const legacy   = localStorage.getItem('isLoggedIn') === 'true';
//     setIsLoggedIn(hasToken || legacy);
//     const role = localStorage.getItem('userRole');
//     setUserRole(role === 'admin' || role === 'user' ? role : null);
//   }, [location]);

//   const handleLogout = async () => {
//     ['isLoggedIn','userEmail','accessToken','refreshToken','userRole'].forEach(k => localStorage.removeItem(k));
//     setIsLoggedIn(false); setUserRole(null); setIsProfileMenuOpen(false);
//     await logout(); navigate('/');
//   };

//   const handleCartClick = () => {
//     if (!isLoggedIn) { setShowLoginModal(true); setIsMobileMenuOpen(false); }
//     else             { navigate('/cart');        setIsMobileMenuOpen(false); }
//   };

//   const go = (path: string) => { navigate(path); setIsMobileMenuOpen(false); setIsProfileMenuOpen(false); };
//   const isActive = (path: string) => location.pathname === path;

//   const navLinks = [
//     { label: 'Portfolio',  path: '/our-work'   },
//     { label: 'Collection', path: '/collection' },
//     { label: 'Services',   path: '/services'   },
//     { label: 'About',      path: '/about'      },
//     { label: 'Blog',       path: '/blog'       },
//     { label: 'Contact',    path: '/contact'    },
//   ];

//   return (
//     <>
//       {showLoginModal && (
//         <LoginRequiredModal onClose={() => setShowLoginModal(false)} onLogin={() => { setShowLoginModal(false); navigate('/login'); }} />
//       )}

//       {/* ── Fixed bar ──────────────────────────────────────────────────────── */}
//       <nav
//         aria-label="Main navigation"
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
//           ${isScrolled
//             ? 'bg-[#0f2625]/96 backdrop-blur-xl shadow-[0_4px_32px_rgba(0,0,0,0.45)] border-b border-white/6'
//             : 'bg-[#1a3332]/75 backdrop-blur-md'}`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//           {/* ── Row — height: 96px on all breakpoints ──────────────────── */}
//           <div className="flex items-center justify-between" style={{ height: `${NAV_HEIGHT}px` }}>

//             {/* Logo */}
//             <button
//               onClick={() => go('/')}
//               className="flex items-center gap-3 sm:gap-4 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-xl"
//               aria-label="Home"
//             >
//               {/* Logo: 80px desktop / 68px tablet / 60px mobile */}
//               <span className="flex-shrink-0 w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] lg:w-20 lg:h-20">
//                 <img
//                   src="/logo.png"
//                   alt="Winsume Lift"
//                   className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
//                   loading="eager"
//                 />
//               </span>
//               <span className="flex flex-col leading-none">
//                 <span className="text-white font-bold tracking-wide text-lg sm:text-xl lg:text-[22px] whitespace-nowrap">
//                   {siteName}
//                 </span>
//                 {siteSubtitle && (
//                   <span className="text-orange-500 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] mt-[5px] font-semibold whitespace-nowrap">
//                     {siteSubtitle}
//                   </span>
//                 )}
//               </span>
//             </button>

//             {/* Desktop links */}
//             <div className="hidden xl:flex items-center">
//               {navLinks.map(({ label, path }) => (
//                 <button
//                   key={path}
//                   onClick={() => go(path)}
//                   className={`relative px-3.5 py-2 text-[13px] uppercase tracking-wider font-medium rounded-lg transition-colors duration-200
//                     ${isActive(path) ? 'text-orange-500' : 'text-white/70 hover:text-white'}
//                     after:absolute after:bottom-1 after:left-3.5 after:right-3.5 after:h-[2px]
//                     after:rounded-full after:bg-orange-500 after:transition-transform after:duration-200
//                     ${isActive(path) ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}
//                 >
//                   {label}
//                 </button>
//               ))}
//             </div>

//             {/* Desktop actions */}
//             <div className="hidden xl:flex items-center gap-2.5 shrink-0">
//               <button
//                 onClick={handleCartClick}
//                 aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
//                 className="relative w-10 h-10 bg-white/10 hover:bg-orange-500/20 border border-white/20 hover:border-orange-500/50 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
//               >
//                 <ShoppingCart size={17} className="text-white" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-[#0f2625] px-0.5">
//                     {cartCount > 99 ? '99+' : cartCount}
//                   </span>
//                 )}
//               </button>
//               <div className="relative">
//                 <button
//                   onClick={() => setIsProfileMenuOpen(p => !p)}
//                   aria-label="Profile menu"
//                   aria-expanded={isProfileMenuOpen}
//                   className={`w-10 h-10 border rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105
//                     ${isProfileMenuOpen
//                       ? 'bg-orange-500/25 border-orange-500/60 text-orange-400'
//                       : 'bg-white/10 border-white/20 hover:bg-orange-500/20 hover:border-orange-500/50 text-white'}`}
//                 >
//                   <User size={17} />
//                 </button>
//                 {isProfileMenuOpen && (
//                   <ProfileMenu isLoggedIn={isLoggedIn} userRole={userRole}
//                     onClose={() => setIsProfileMenuOpen(false)} onNavigate={go} onLogout={handleLogout} />
//                 )}
//               </div>
//             </div>

//             {/* Mobile right cluster */}
//             <div className="xl:hidden flex items-center gap-2 shrink-0">
//               <button onClick={handleCartClick} aria-label="Cart"
//                 className="relative w-9 h-9 bg-white/10 hover:bg-orange-500/20 border border-white/20 rounded-full flex items-center justify-center transition-all">
//                 <ShoppingCart size={16} className="text-white" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold min-w-[16px] h-[16px] flex items-center justify-center rounded-full border-2 border-[#0f2625]">
//                     {cartCount > 9 ? '9+' : cartCount}
//                   </span>
//                 )}
//               </button>
//               <button
//                 onClick={() => setIsMobileMenuOpen(p => !p)}
//                 aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
//                 aria-expanded={isMobileMenuOpen}
//                 className="w-9 h-9 bg-white/10 hover:bg-orange-500/20 border border-white/20 rounded-full flex items-center justify-center transition-all text-white"
//               >
//                 {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
//               </button>
//             </div>

//           </div>{/* end row */}
//         </div>

//         {/* Mobile drawer */}
//         <div className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out
//           ${isMobileMenuOpen ? 'max-h-[calc(100dvh-96px)] opacity-100' : 'max-h-0 opacity-0'}`}>
//           <div className="bg-[#0f2625]/98 backdrop-blur-xl border-t border-white/8">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-0.5 overflow-y-auto max-h-[calc(100dvh-96px)]">
//               {navLinks.map(({ label, path }) => (
//                 <button key={path} onClick={() => go(path)}
//                   className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm uppercase tracking-wider font-medium transition-all
//                     ${isActive(path) ? 'text-orange-500 bg-orange-500/10' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
//                   {label}
//                   {isActive(path) && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />}
//                 </button>
//               ))}
//               <div className="my-1.5 border-t border-white/8" />
//               {isLoggedIn ? (
//                 <>
//                   {userRole === 'admin' ? (
//                     <>
//                       <button onClick={() => go('/admin-dashboard')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-orange-400 hover:bg-orange-500/10 transition-all text-sm"><User size={16} className="text-orange-400 shrink-0" /><span>Admin Dashboard</span></button>
//                       <button onClick={() => go('/admin/projects')}  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-orange-400 hover:bg-orange-500/10 transition-all text-sm"><FolderKanban size={16} className="text-orange-400 shrink-0" /><span>Projects</span></button>
//                       <button onClick={() => go('/admin/inquiries')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-orange-400 hover:bg-orange-500/10 transition-all text-sm"><Phone size={16} className="text-orange-400 shrink-0" /><span>Inquiries</span></button>
//                     </>
//                   ) : (
//                     <>
//                       <button onClick={() => go('/user-portal')}     className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-orange-400 hover:bg-orange-500/10 transition-all text-sm"><User size={16} className="text-orange-400 shrink-0" /><span>User Portal</span></button>
//                       <button onClick={() => go('/my-engagements')}  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-orange-400 hover:bg-orange-500/10 transition-all text-sm"><FolderKanban size={16} className="text-orange-400 shrink-0" /><span>My Projects</span></button>
//                     </>
//                   )}
//                   <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm mt-1"><LogOut size={16} className="text-orange-400 shrink-0" /><span>Logout</span></button>
//                 </>
//               ) : (
//                 <button onClick={() => go('/login')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-orange-400 hover:bg-orange-500/10 transition-all text-sm"><User size={16} className="text-orange-400 shrink-0" /><span>Login</span></button>
//               )}
//               <div className="h-3" />
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/*
//         ── Spacer ─────────────────────────────────────────────────────────────
//         USE THIS for NON-hero pages (login, about, blog, etc.)
//         For FULL-SCREEN HERO pages (home, our-work, collection…) remove this
//         spacer from those pages and instead add:
//           style={{ paddingTop: NAV_HEIGHT }}   ← to the hero section
//         so the hero image fills correctly behind the transparent navbar.
//       */}
//       <div aria-hidden="true" style={{ height: `${NAV_HEIGHT}px` }} />
//     </>
//   );
// }