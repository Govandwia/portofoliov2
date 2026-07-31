"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollY } = useScroll();

  // Scroll-linked transformations (0px to 100px scroll)
  const navWidth = useTransform(scrollY, (y) => {
    const p = Math.min(Math.max(y / 100, 0), 1);
    const isMobileView = typeof window !== 'undefined' ? window.innerWidth < 768 : true;
    return `${100 - ((100 - (isMobileView ? 95 : 60)) * p)}%`;
  });

  const navMarginTop = useTransform(scrollY, (y) => {
    const p = Math.min(Math.max(y / 100, 0), 1);
    const isMobileView = typeof window !== 'undefined' ? window.innerWidth < 768 : true;
    return `${(isMobileView ? 16 : 24) * p}px`;
  });

  const navMaxWidth = useTransform(scrollY, (y) => {
    const p = Math.min(Math.max(y / 100, 0), 1);
    return p === 0 ? "none" : "896px";
  });
  
  const navPaddingY = useTransform(scrollY, (y) => {
    const p = Math.min(Math.max(y / 100, 0), 1);
    return `${24 - (12 * p)}px`;
  });

  const navPaddingX = useTransform(scrollY, (y) => {
    const p = Math.min(Math.max(y / 100, 0), 1);
    const isMobileView = typeof window !== 'undefined' ? window.innerWidth < 768 : true;
    return `${24 - ((24 - (isMobileView ? 16 : 24)) * p)}px`;
  });

  const navBorderRadius = useTransform(scrollY, (y) => {
    const p = Math.min(Math.max(y / 100, 0), 1);
    return `${9999 * p}px`;
  });

  const navBackgroundColor = useTransform(scrollY, (y) => {
    const p = Math.min(Math.max(y / 100, 0), 1);
    return `rgba(255, 255, 255, ${0.8 * p})`;
  });

  const navBorderColor = useTransform(scrollY, (y) => {
    const p = Math.min(Math.max(y / 100, 0), 1);
    return `rgba(228, 228, 231, ${1 * p})`;
  });

  const navBoxShadow = useTransform(scrollY, (y) => {
    const p = Math.min(Math.max(y / 100, 0), 1);
    return `0px ${8 * p}px ${30 * p}px rgba(0,0,0,${0.12 * p})`;
  });

  const logoRadius = useTransform(scrollY, (y) => {
    const p = Math.min(Math.max(y / 100, 0), 1);
    return `${6 + (9993 * p)}px`;
  });

  const navLinksColor = useTransform(scrollY, [0, 100], ["#52525b", "#a1a1aa"]);

  const navItems = [
    { label: 'about', href: '/#about' },
    { label: 'work', href: '/project' },
    { label: 'experience', href: '/experience' },
    { label: 'skills', href: '/#skills' }
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none flex justify-center">
        <motion.header 
          style={{
            width: navWidth,
            maxWidth: navMaxWidth,
            marginTop: navMarginTop,
            paddingTop: navPaddingY,
            paddingBottom: navPaddingY,
            paddingLeft: navPaddingX,
            paddingRight: navPaddingX,
            borderRadius: navBorderRadius,
            backgroundColor: navBackgroundColor,
            borderColor: navBorderColor,
            boxShadow: navBoxShadow,
          }}
          className="pointer-events-auto flex justify-between items-center border backdrop-blur-md"
        >
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <motion.div 
                style={{ borderRadius: logoRadius }}
                className="w-10 h-10 bg-black flex items-center justify-center text-white font-bold text-xs"
              >
                GDA
              </motion.div>
              <span className="font-bold text-sm tracking-widest uppercase text-zinc-800 hidden md:block">
                GOVAN
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <motion.nav 
            style={{ color: navLinksColor }}
            className="hidden lg:flex gap-6 text-xs font-bold uppercase tracking-widest"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href || (pathname === '/' && item.href.startsWith('/#'));
              return (
                <Link 
                  key={item.label} 
                  href={item.href} 
                  className={`transition-colors hover:text-black ${isActive ? 'text-black' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.nav>

          <div className="flex items-center gap-4">
            <a href="/contact" className={`border-2 border-black rounded-full px-4 py-2 md:px-6 text-xs md:text-sm font-bold uppercase hover:bg-black hover:text-white transition-colors`}>
              CONTACT
            </a>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden flex flex-col gap-1.5 p-2 z-[110]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className={`w-6 h-0.5 bg-black transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-6 h-0.5 bg-black transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-black transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </motion.header>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md lg:hidden flex flex-col items-center justify-center gap-8"
          >
            <nav className="flex flex-col items-center gap-6 text-2xl font-black font-heading tracking-widest uppercase">
              {navItems.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-zinc-500 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
