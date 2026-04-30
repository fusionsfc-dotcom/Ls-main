import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { ArrowRight, Menu, X } from 'lucide-react';

const headerMenus = [
  { label: 'AI 솔루션', path: '/services' },
  { label: '의료분야', path: '/healthcare' },
  { label: '기업분야', path: '/business' },
  { label: '회사소개', path: '/about' },
] as const;

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname.startsWith(path);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-white border-b"
        style={{ borderColor: 'var(--navy-100)' }}
      >
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* 로고 */}
            <Link to="/" className="text-2xl font-bold tracking-tight" style={{ color: 'var(--navy-900)' }}>
              LS컨설팅
            </Link>

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden md:flex items-center gap-10">
              {headerMenus.map((menu) => (
                <Link
                  key={menu.path}
                  to={menu.path}
                  className="text-base transition-colors"
                  style={{
                    color: isActive(menu.path) ? 'var(--navy-900)' : 'var(--navy-700)',
                    fontWeight: isActive(menu.path) ? 700 : 500,
                    borderBottom: isActive(menu.path) ? '2px solid var(--navy-900)' : '2px solid transparent',
                    paddingBottom: '2px',
                  }}
                >
                  {menu.label}
                </Link>
              ))}
            </nav>

            {/* 데스크톱 CTA */}
            <div className="hidden md:flex items-center">
              <Link
                to="/consultation"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--navy-900)' }}
              >
                <span>상담/견적 신청</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 모바일 햄버거 */}
            <button
              className="md:hidden p-2"
              style={{ color: 'var(--navy-900)' }}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="메뉴 열기"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 풀스크린 메뉴 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white md:hidden flex flex-col">
          <div
            className="flex justify-between items-center px-8 py-5 border-b"
            style={{ borderColor: 'var(--navy-100)' }}
          >
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight"
              style={{ color: 'var(--navy-900)' }}
            >
              LS컨설팅
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: 'var(--navy-900)' }}
              aria-label="메뉴 닫기"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 px-8 py-10 flex flex-col justify-between">
            <div className="space-y-8">
              {headerMenus.map((menu) => (
                <Link
                  key={menu.path}
                  to={menu.path}
                  className="block text-3xl font-medium transition-colors"
                  style={{
                    color: isActive(menu.path) ? 'var(--navy-900)' : 'var(--navy-700)',
                    fontWeight: isActive(menu.path) ? 700 : 500,
                  }}
                >
                  {menu.label}
                </Link>
              ))}
            </div>
            <Link
              to="/consultation"
              className="inline-flex items-center justify-center gap-2 w-full py-4 text-base font-semibold text-white transition-all hover:opacity-90 mt-10"
              style={{ backgroundColor: 'var(--navy-900)' }}
            >
              <span>상담/견적 신청</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
