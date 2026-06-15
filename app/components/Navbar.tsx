'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, ChevronRight, User } from 'lucide-react';

const navLinks = [
  { href: '/shop', label: 'All Products' },
  { href: '/saffron', label: 'Pure Saffron' },
  { href: '/skincare', label: 'Ayurveda Skincare' },
  { href: '/gourmet', label: 'Gourmet Essentials' },
  { href: '/about', label: 'Our Story' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(3); // Mock cart item indicator

  // Monitor scroll behavior to switch background states seamlessly
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background body scrolling when mobile drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  return (
    <>
      {/* Main Navbar Header */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className={`font-serif text-xl md:text-2xl tracking-widest font-bold transition-colors duration-300 ${
              scrolled ? 'text-[#1E120C]' : 'text-white'
            }`}>
              KASHMIR<span className="text-[#8B0000]">CART</span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-300 hover:text-[#8B0000] ${
                  scrolled ? 'text-[#2C1E16]' : 'text-[#FAF8F5]/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* DESKTOP ACTIONS BLOCK */}
          <div className="hidden md:flex items-center space-x-6">
            <button className={`relative p-2 transition-colors duration-300 hover:text-[#8B0000] ${
              scrolled ? 'text-[#2C1E16]' : 'text-white'
            }`}>
              <ShoppingCart size={20} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8B0000] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
            <Link
              href="/shop"
              className="bg-[#1E120C] hover:bg-[#8B0000] text-white text-[11px] uppercase tracking-widest font-semibold px-5 py-2.5 rounded-xs transition-all duration-300 shadow-xs"
            >
            Shop Now
            </Link>
          </div>

          {/* MOBILE NAVIGATION INTERFACE */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Premium Mobile Cart Trigger */}
            <button 
              className={`relative p-2.5 rounded-full transition-all duration-300 active:scale-95 ${
                scrolled ? 'text-[#1E120C] bg-gray-50' : 'text-white bg-white/10 backdrop-blur-sm'
              }`}
              aria-label="Open Shopping Cart"
            >
              <ShoppingCart size={20} strokeWidth={2.2} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#8B0000] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Menu Trigger */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className={`p-2.5 rounded-full transition-all duration-300 active:scale-95 ${
                scrolled ? 'text-[#1E120C] bg-gray-50' : 'text-white bg-white/10 backdrop-blur-sm'
              }`}
              aria-label="Open Menu Drawer"
            >
              <Menu size={20} strokeWidth={2.2} />
            </button>
          </div>

        </div>
      </nav>

      {/* MOBILE LUXURY SLIDE DRAWER COMPONENT SYSTEM */}
      <div 
        className={`fixed inset-0 z-50 transition-all duration-500 ${
          isDrawerOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {/* Backdrop Tint Blur Overlay */}
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="absolute inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity duration-500 cursor-pointer"
        />

        {/* Drawer Sliding Vault Container */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-[340px] bg-[#FAF8F5] shadow-2xl flex flex-col justify-between p-6 transition-transform duration-500 ease-[0.16,1,0.3,1] ${
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Menu Links Area */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-gray-200/60">
              <span className="font-serif text-lg tracking-widest font-bold text-[#1E120C]">
                KashmirCart
              </span>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-[#1E120C] bg-gray-100 hover:bg-gray-200/60 rounded-full transition-all duration-300 active:scale-90"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Nav Links List */}
            <div className="mt-8 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between group py-3.5 px-3 rounded-sm text-sm font-medium tracking-wide text-[#1E120C] hover:bg-white border border-transparent hover:border-gray-200/50 transition-all duration-300"
                >
                  <span>{link.label}</span>
                  <ChevronRight size={14} className="text-gray-400 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          {/* Drawer Footer Panel Controls */}
          <div className="space-y-4 pt-6 border-t border-gray-200/60">
            <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-sm border border-gray-100">
              <div className="w-8 h-8 rounded-full bg-[#8B0000]/10 text-[#8B0000] flex items-center justify-center">
                <User size={15} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#1E120C]">My Account Profile</p>
                <p className="text-[10px] text-gray-400">Order tracking logs & details</p>
              </div>
            </div>

            <Link
              href="/shop"
              onClick={() => setIsDrawerOpen(false)}
              className="w-full bg-[#1E120C] text-white text-xs uppercase tracking-[0.18em] font-semibold py-4 rounded-xs shadow-md transition-all duration-300 hover:bg-[#8B0000] flex items-center justify-center gap-2"
            >
              Explore Complete Shop
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}