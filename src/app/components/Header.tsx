import { Link, useLocation } from 'react-router';
import { ArrowRight, Menu, X, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: '소개', path: '/experience' },
    { name: '노하우', path: '/strategy' },
    { name: '서비스', path: '/execution' },
    { name: '리포트', path: '/insights' },
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl tracking-tight" style={{ color: 'var(--navy-900)' }}>
              LS Consulting
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm tracking-wide transition-colors ${
                  location.pathname === item.path
                    ? 'opacity-100'
                    : 'opacity-60 hover:opacity-100'
                }`}
                style={{ color: 'var(--navy-900)' }}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-ai-consult'))}
              className="flex items-center space-x-2 px-5 py-2.5 text-sm transition-all hover:opacity-80 rounded-full"
              style={{ backgroundColor: 'var(--navy-100)', color: 'var(--navy-900)' }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>AI 암상담</span>
            </button>
            <Link
              to="/consultation"
              className="flex items-center space-x-2 px-6 py-2.5 text-sm text-white transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--navy-900)' }}
            >
              <span>의뢰하기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            style={{ color: 'var(--navy-900)' }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="px-8 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-lg transition-colors ${
                  location.pathname === item.path
                    ? 'opacity-100 font-medium'
                    : 'opacity-60'
                }`}
                style={{ color: 'var(--navy-900)' }}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); window.dispatchEvent(new CustomEvent('toggle-ai-consult')); }}
              className="flex items-center justify-center space-x-2 px-6 py-3 text-sm transition-all hover:opacity-80 w-full rounded-lg"
              style={{ backgroundColor: 'var(--navy-100)', color: 'var(--navy-900)' }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>AI 암상담</span>
            </button>
            <Link
              to="/consultation"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 px-6 py-3 text-sm text-white transition-all hover:opacity-90 w-full"
              style={{ backgroundColor: 'var(--navy-900)' }}
            >
              <span>의뢰하기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}