import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from '../types';
import { Button } from './ui/Button';
import { ApiUser } from '../src/lib/api';

const NAV_ITEMS: NavItem[] = [
  { label: 'How it works', href: '#', hasNotification: true },
  { label: 'Blog', href: '#' },
  { label: 'AI Coach', href: '/ai-coach' },
  { label: 'News', href: '/news' },
  { label: 'Store', href: '/store' },
];

interface NavbarProps {
  currentUser: ApiUser | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentUser, onLogout }) => {
  const displayName = currentUser?.name?.trim() || 'there';
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navSkin = scrolled
    ? 'bg-black/75 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]'
    : 'bg-transparent';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16 transition-colors duration-300 ${navSkin}`}
    >
      {/* Logo Area */}
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        {/* Simple SVG Logo Approximation */}
        <div className="text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 20V4L9 14L14 4V20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 10V20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-xl font-bold text-white tracking-tight">GymUnity</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="relative text-[15px] font-medium text-white/90 hover:text-white transition-colors"
          >
            {item.label}
            {item.hasNotification && (
              <span className="absolute -top-1 -right-2.5 w-1.5 h-1.5 bg-[#FF4D4D] rounded-full"></span>
            )}
          </Link>
        ))}
        {/* Services dropdown removed to place items directly in the nav as requested */}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        {currentUser ? (
          <>
            {currentUser.role === 'seller' && (
              <Link
                to="/seller"
                className="hidden sm:block text-[15px] font-medium text-white hover:text-white/80 transition-colors"
              >
                Seller dashboard
              </Link>
            )}
            <span className="hidden sm:block text-[15px] text-white/70">
              Hi, {displayName}
            </span>
            <Button variant="ghost" onClick={onLogout}>
              Log out
            </Button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hidden sm:block text-[15px] font-medium text-white hover:text-white/80 transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium transition-all duration-200 rounded-full bg-mindrift-green text-gray-900 hover:bg-mindrift-greenHover shadow-[0_0_15px_rgba(184,243,137,0.3)]"
            >
              Apply now
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
