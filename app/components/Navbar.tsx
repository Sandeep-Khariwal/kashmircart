'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Mountain, ArrowRight } from 'lucide-react';

const navLinks = [
  { href: '/places', label: 'Places' },
  { href: '/hotels', label: 'Hotels' },
  { href: '/restaurants', label: 'Food' },
  { href: '/rentals', label: 'Rentals' },
  { href: '/blogs', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    // Initial check in case of page refresh while scrolled
    handler(); 
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_4px_30px_rgb(0,0,0,0.05)] py-2 sm:py-3' 
          : 'bg-gradient-to-b from-slate-950/50 to-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 font-bold text-xl sm:text-2xl tracking-tight z-50">
            <div className={`p-2 rounded-xl transition-colors duration-300 ${
              scrolled ? 'bg-teal-50 text-teal-600' : 'bg-white/10 text-amber-400 backdrop-blur-md'
            }`}>
              <Mountain className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <span className={`transition-colors duration-300 ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              Kashmir<span className={scrolled ? 'text-teal-600' : 'text-amber-400'}>Cart</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map(l => (
              <Link 
                key={l.href} 
                href={l.href} 
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                  scrolled 
                    ? 'text-slate-600 hover:text-teal-700 hover:bg-teal-50' 
                    : 'text-slate-200 hover:text-white hover:bg-white/15'
                }`}
              >
                {l.label}
              </Link>
            ))}
            
            {/* Divider and CTA */}
            <div className={`ml-2 pl-4 border-l transition-colors duration-300 ${scrolled ? 'border-slate-200' : 'border-white/20'}`}>
              <Link 
                href="/contact" 
                className={`group flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                  scrolled
                    ? 'bg-slate-900 text-white hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-900/20'
                    : 'bg-white text-slate-900 hover:bg-teal-50 hover:shadow-lg hover:shadow-white/20'
                }`}
              >
                Plan Trip
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2.5 rounded-xl transition-colors z-50 ${
              scrolled || open ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/20'
            }`} 
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Floating Pill Design) */}
      <div 
        className={`absolute top-full left-4 right-4 mt-2 bg-white rounded-3xl shadow-[0_20px_40px_rgb(0,0,0,0.15)] border border-slate-100 overflow-hidden transition-all duration-300 origin-top md:hidden ${
          open ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="p-4 flex flex-col gap-1">
          {navLinks.map(l => (
            <Link 
              key={l.href} 
              href={l.href} 
              className="px-4 py-3 text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-2xl font-semibold text-base transition-colors" 
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="h-px w-full bg-slate-100 my-2" />
          <Link 
            href="/contact" 
            className="w-full flex justify-center items-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-2xl text-base font-semibold hover:bg-teal-700 transition-colors mt-1" 
            onClick={() => setOpen(false)}
          >
            Plan Your Trip <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {open && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm -z-10 md:hidden h-screen"
          onClick={() => setOpen(false)}
        />
      )}
    </nav>
  );
}