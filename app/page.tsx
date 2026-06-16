"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Script from "next/script";

// ─── Design Tokens ────────────────────────────────────────────────────────────
// Deep Walnut Brown #4B2E1E | Heritage Maroon #6B1F1F | Saffron Gold #D89B2B
// Cream Ivory #F8F4ED       | Pashmina Beige #E7D9C3  | Forest Pine #29432A
// ─────────────────────────────────────────────────────────────────────────────

// ── SVG Motifs ──────────────────────────────────────────────────────────────
const ChinarLeaf = ({ className = "", style = {} }) => (
  <svg viewBox="0 0 60 70" className={className} style={style} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 2C30 2 18 18 10 30C4 39 8 52 18 56C22 58 26 57 30 54C34 57 38 58 42 56C52 52 56 39 50 30C42 18 30 2 30 2Z" opacity="0.85"/>
    <path d="M30 54L30 68" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round"/>
    <path d="M18 30C22 26 28 24 30 22" strokeWidth="1.2" stroke="currentColor" fill="none" opacity="0.5"/>
    <path d="M42 30C38 26 32 24 30 22" strokeWidth="1.2" stroke="currentColor" fill="none" opacity="0.5"/>
    <path d="M14 42C20 40 26 36 30 32" strokeWidth="1.2" stroke="currentColor" fill="none" opacity="0.5"/>
    <path d="M46 42C40 40 34 36 30 32" strokeWidth="1.2" stroke="currentColor" fill="none" opacity="0.5"/>
  </svg>
);

const KashmiriMandala = ({ size = 80, className = "" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
    <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5"/>
    <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.6"/>
    {[0,45,90,135,180,225,270,315].map((angle,i) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 50 + 12 * Math.cos(rad), y1 = 50 + 12 * Math.sin(rad);
      const x2 = 50 + 34 * Math.cos(rad), y2 = 50 + 34 * Math.sin(rad);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>;
    })}
    {[0,45,90,135,180,225,270,315].map((angle,i) => {
      const rad = (angle * Math.PI) / 180;
      const cx = 50 + 24 * Math.cos(rad), cy = 50 + 24 * Math.sin(rad);
      return <circle key={i} cx={cx} cy={cy} r="4" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.6"/>;
    })}
    {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map((angle,i) => {
      const rad = (angle * Math.PI) / 180;
      const cx = 50 + 38 * Math.cos(rad), cy = 50 + 38 * Math.sin(rad);
      return <path key={i} d={`M ${cx} ${cy} C ${cx-3} ${cy-5} ${50+44*Math.cos(rad+0.15)} ${50+44*Math.sin(rad+0.15)} ${50+46*Math.cos(rad)} ${50+46*Math.sin(rad)} C ${50+44*Math.cos(rad-0.15)} ${50+44*Math.sin(rad-0.15)} ${cx+3} ${cy-5} ${cx} ${cy}`} fill="currentColor" opacity="0.5"/>;
    })}
  </svg>
);

const FleuronDivider = () => (
  <div className="flex items-center gap-4 justify-center my-2">
    <div style={{height:"1px", width:"60px", background:"linear-gradient(to right, transparent, #D89B2B)"}}/>
    <svg viewBox="0 0 32 16" width="32" height="16" fill="#D89B2B" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2C16 2 10 6 8 8C10 10 16 14 16 14C16 14 22 10 24 8C22 6 16 2 16 2Z" opacity="0.8"/>
      <circle cx="4" cy="8" r="2.5" opacity="0.6"/>
      <circle cx="28" cy="8" r="2.5" opacity="0.6"/>
    </svg>
    <div style={{height:"1px", width:"60px", background:"linear-gradient(to left, transparent, #D89B2B)"}}/>
  </div>
);

const BorderPattern = () => (
  <svg viewBox="0 0 400 12" width="100%" height="12" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    {Array.from({length:20}).map((_,i)=>(
      <g key={i} transform={`translate(${i*20}, 0)`}>
        <path d="M0 6 L5 1 L10 6 L15 11 L20 6" fill="none" stroke="#D89B2B" strokeWidth="0.8" opacity="0.6"/>
      </g>
    ))}
  </svg>
);

const StarOfKashmir = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="#D89B2B" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1L14.5 9H22L16 14L18.5 22L12 17L5.5 22L8 14L2 9H9.5L12 1Z"/>
  </svg>
);

const PinjrakariBorder = () => (
  <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.25, margin: "24px 0", userSelect: "none"}} aria-hidden="true">
    <div style={{height: "1px", backgroundColor: "#6B1F1F", flex: 1}}></div>
    <div style={{margin: "0 12px", display: "flex", gap: "6px"}}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{width: "8px", height: "8px", transform: "rotate(45deg)", border: "1px solid #6B1F1F", backgroundColor: "transparent"}}></div>
      ))}
    </div>
    <div style={{height: "1px", backgroundColor: "#6B1F1F", flex: 1}}></div>
  </div>
);

// ── Inline Styles Token Object ────────────────────────────────────────────────
const STYLES = {
  maroon: "#6B1F1F",
  walnut: "#4B2E1E",
  gold: "#D89B2B",
  cream: "#F8F4ED",
  beige: "#E7D9C3",
  pine: "#29432A",
  lightGold: "#EBC56A",
};

// ── Interfaces ────────────────────────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  brand: string;
  rating?: number;
  originalPrice?: string;
  price: string;
  priceNumber: number;
  image: string;
  hot?: boolean;
  saleTag?: string;
  originDetail: string;
}

// ── Navbar ───────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Saffron", href: "#" },
  { label: "Dry Fruits", href: "#" },
  { label: "Pashmina", href: "#" },
  { label: "Handicrafts", href: "#" },
  { label: "Kahwa & Spices", href: "#" },
  { label: "Our Story", href: "#" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div style={{background: STYLES.maroon, color: STYLES.lightGold}} className="text-center text-xs tracking-widest py-2 px-4 font-medium">
        ✦ Free Worldwide Shipping on Orders Above ₹2,999 &nbsp;|&nbsp; Authentic Certificates Included ✦
      </div>

      <nav
        style={{
          background: scrolled ? "rgba(248,244,237,0.97)" : "transparent",
          boxShadow: scrolled ? "0 2px 30px rgba(75,46,30,0.12)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "all 0.4s ease",
          position: "sticky",
          top: 0,
          zIndex: 100,
          borderBottom: scrolled ? `1px solid ${STYLES.beige}` : "none",
        }}
      >
        {scrolled && (
          <div style={{position:"absolute", top:0, left:0, right:0}}>
            <BorderPattern/>
          </div>
        )}

        <div className="max-w-screen-xl mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between py-4 gap-6">

            {/* Logo */}
            <a href="#" className="flex items-center gap-3 shrink-0" style={{textDecoration:"none"}}>
              <div style={{position:"relative", width:48, height:48}}>
                <div style={{
                  width:48, height:48, borderRadius:"50%",
                  background: `linear-gradient(135deg, ${STYLES.maroon}, ${STYLES.walnut})`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  border: `2px solid ${STYLES.gold}`,
                }}>
                  <ChinarLeaf style={{width:26, height:26, color: STYLES.gold}}/>
                </div>
              </div>
              <div>
                <div style={{
                  fontFamily:"'Playfair Display', Georgia, serif",
                  fontSize:"1.25rem",
                  fontWeight:700,
                  color: scrolled ? STYLES.walnut : STYLES.cream,
                  letterSpacing:"0.04em",
                  lineHeight:1.1,
                }}>
                  Kashmir Veda
                </div>
                <div style={{
                  fontSize:"0.6rem",
                  letterSpacing:"0.2em",
                  color: STYLES.gold,
                  textTransform:"uppercase",
                  fontWeight:500,
                }}>
                  Heritage · Authenticity · Craft
                </div>
              </div>
            </a>

            {/* Desktop Nav Links */}
            <ul className="hidden lg:flex items-center gap-7 list-none m-0 p-0">
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily:"Georgia, serif",
                      fontSize:"0.82rem",
                      fontWeight:500,
                      color: scrolled ? STYLES.walnut : STYLES.cream,
                      textDecoration:"none",
                      letterSpacing:"0.06em",
                      textTransform:"uppercase",
                      transition:"color 0.2s",
                      position:"relative",
                      paddingBottom: 2,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = STYLES.gold;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = scrolled ? STYLES.walnut : STYLES.cream;
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Right Actions Block */}
            <div className="flex items-center gap-4">
              <button style={{background:"transparent", border:"none", cursor:"pointer", color: scrolled ? STYLES.walnut : STYLES.cream, padding:6}} aria-label="Search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>

              <button style={{background:"transparent", border:"none", cursor:"pointer", color: scrolled ? STYLES.walnut : STYLES.cream, padding:6, position:"relative"}} aria-label="Cart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <span style={{
                  position:"absolute", top:-2, right:-2,
                  background: STYLES.gold, color: STYLES.walnut,
                  width:16, height:16, borderRadius:"50%",
                  fontSize:"0.6rem", fontWeight:700,
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  {cartCount}
                </span>
              </button>

              {/* Hamburger Mobile Menu Trigger */}
              <button className="lg:hidden" onClick={() => setMenuOpen(o => !o)} style={{background:"transparent", border:"none", cursor:"pointer", color: scrolled ? STYLES.walnut : STYLES.cream, padding:6}} aria-label="Menu">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  {menuOpen ? <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></> : <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Rebuilt Smooth Sliding Mobile Drawer System */}
        <div 
          className={`fixed inset-0 z-50 transition-all duration-500 lg:hidden ${
            menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div onClick={() => setMenuOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer" />
          <div className={`absolute right-0 top-0 bottom-0 w-full max-w-[320px] bg-[#FAF6EE] shadow-2xl flex flex-col justify-between p-6 transition-transform duration-500 ease-[0.16,1,0.3,1] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}>
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                <span className="font-serif text-base tracking-widest font-bold text-[#1A0F0A]">NAVIGATION</span>
                <button onClick={() => setMenuOpen(false)} className="p-2 text-white bg-[#6B1F1F] rounded-full transition-transform active:scale-90">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <div className="mt-8 flex flex-col gap-1">
                {NAV_LINKS.map(link => (
                  <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="py-3.5 px-2 text-xs uppercase tracking-widest font-serif font-bold text-[#4B2E1E] border-b border-gray-100 hover:text-[#6B1F1F] transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-none">
                <div className="w-8 h-8 rounded-full bg-[#6B1F1F]/10 text-[#6B1F1F] flex items-center justify-center text-xs">👤</div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-[#1A0F0A] uppercase tracking-wider">My Vault Profile</p>
                  <p className="text-[10px] text-gray-400 font-sans">Trace historical logistics logs</p>
                </div>
              </div>
              <a href="#vault" onClick={() => setMenuOpen(false)} style={{background: `linear-gradient(135deg, ${STYLES.gold}, #C8862A)`}} className="block w-full text-center py-4 text-xs font-bold uppercase tracking-widest text-[#4B2E1E] transition-opacity hover:opacity-90">
                Explore Complete Vault
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

// ── Hero Section (UNTOUCHED PRESERVED LAYOUT) ─────────────────────────────────
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section style={{
      minHeight: "100vh",
      position:"relative",
      display:"flex",
      alignItems:"center",
      overflow:"hidden",
      background: `linear-gradient(160deg, ${STYLES.walnut} 0%, ${STYLES.maroon} 45%, #1a0a0a 100%)`,
    }}>
      {/* Background texture overlay */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D89B2B' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}/>

      {/* Floating Chinar leaves */}
      {[
        {top:"8%",left:"4%",size:60,opacity:0.08,rotate:-20},
        {top:"18%",right:"6%",size:80,opacity:0.1,rotate:30},
        {bottom:"20%",left:"2%",size:50,opacity:0.07,rotate:15},
        {bottom:"8%",right:"3%",size:70,opacity:0.09,rotate:-35},
        {top:"50%",left:"48%",size:45,opacity:0.05,rotate:60},
      ].map((leaf,i) => (
        <div key={i} style={{
          position:"absolute", ...leaf,
          color: STYLES.gold,
          transform:`rotate(${leaf.rotate}deg)`,
          pointerEvents:"none",
        }}>
          <ChinarLeaf style={{width:leaf.size, height:leaf.size}}/>
        </div>
      ))}

      {/* Mandala ornament */}
      <div style={{
        position:"absolute", right:"5%", top:"50%", transform:"translateY(-50%)",
        color: STYLES.gold, opacity:0.08,
      }}>
        <KashmiriMandala size={400}/>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-14 w-full" style={{position:"relative", zIndex:2}}>
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease",
            display:"flex", alignItems:"center", gap:12, marginBottom:20,
          }}>
            <div style={{width:40, height:1, background:STYLES.gold}}/>
            <span style={{
              color: STYLES.gold,
              fontSize:"0.68rem",
              letterSpacing:"0.28em",
              textTransform:"uppercase",
              fontFamily:"Georgia, serif",
              fontWeight:600,
            }}>
              Est. in the Valley of Dal
            </span>
          </div>

          {/* Main headline */}
          <h1 style={{
            fontFamily:"'Playfair Display', Georgia, 'Times New Roman', serif",
            fontSize:"clamp(2.6rem, 6vw, 5.2rem)",
            fontWeight:700,
            color: STYLES.cream,
            lineHeight:1.08,
            letterSpacing:"-0.01em",
            marginBottom:24,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s ease 0.15s",
          }}>
            Authentic Treasures<br/>
            <em style={{color: STYLES.gold, fontStyle:"italic"}}>From The Heart</em><br/>
            of Kashmir
          </h1>

          {/* Divider */}
          <div style={{
            opacity: loaded ? 1 : 0,
            transition: "all 0.8s ease 0.3s",
          }}>
            <FleuronDivider/>
          </div>

          {/* Subheadline */}
          <p style={{
            fontFamily:"Georgia, serif",
            fontSize:"clamp(0.95rem, 1.8vw, 1.15rem)",
            color: STYLES.beige,
            lineHeight:1.8,
            marginTop:20,
            marginBottom:36,
            maxWidth:480,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.9s ease 0.4s",
          }}>
            Handcrafted Heritage, Timeless Traditions, Delivered Worldwide.
            Each piece carries the soul of an artisan and the story of a valley unchanged for centuries.
          </p>

          {/* CTAs */}
          <div style={{
            display:"flex", gap:16, flexWrap:"wrap",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.9s ease 0.55s",
          }}>
            <a href="#vault" style={{
              display:"inline-flex", alignItems:"center", gap:10,
              background: `linear-gradient(135deg, ${STYLES.gold} 0%, #C8862A 100%)`,
              color: STYLES.walnut,
              padding:"16px 34px",
              fontFamily:"Georgia, serif",
              fontWeight:700,
              fontSize:"0.82rem",
              letterSpacing:"0.14em",
              textTransform:"uppercase",
              textDecoration:"none",
              borderRadius:2,
              boxShadow:"0 8px 30px rgba(216,155,43,0.4)",
              transition:"all 0.3s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 12px 40px rgba(216,155,43,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 30px rgba(216,155,43,0.4)"; }}
            >
              Explore Collection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#" style={{
              display:"inline-flex", alignItems:"center", gap:10,
              background:"transparent",
              color: STYLES.cream,
              padding:"16px 34px",
              fontFamily:"Georgia, serif",
              fontWeight:600,
              fontSize:"0.82rem",
              letterSpacing:"0.14em",
              textTransform:"uppercase",
              textDecoration:"none",
              border: `1.5px solid rgba(248,244,237,0.4)`,
              borderRadius:2,
              transition:"all 0.3s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=STYLES.gold; e.currentTarget.style.color=STYLES.gold; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(248,244,237,0.4)"; e.currentTarget.style.color=STYLES.cream; }}
            >
              Our Heritage Story
            </a>
          </div>

          {/* Trust micro-badges */}
          <div style={{
            display:"flex", gap:24, marginTop:48, flexWrap:"wrap",
            opacity: loaded ? 1 : 0,
            transition: "all 0.9s ease 0.7s",
          }}>
            {["GI Certified", "Artisan Direct", "Est. 2016"].map(badge => (
              <div key={badge} style={{display:"flex", alignItems:"center", gap:7}}>
                <div style={{
                  width:6, height:6, borderRadius:"50%",
                  background: STYLES.gold,
                }}/>
                <span style={{
                  color: STYLES.beige,
                  fontSize:"0.72rem",
                  letterSpacing:"0.12em",
                  textTransform:"uppercase",
                  fontFamily:"Georgia, serif",
                }}>
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product float card */}
      <div style={{
        position:"absolute", right:"8%", bottom:"12%",
        background:"rgba(248,244,237,0.07)",
        backdropFilter:"blur(12px)",
        border:"1px solid rgba(216,155,43,0.25)",
        borderRadius:4,
        padding:"18px 22px",
        display:"flex", alignItems:"center", gap:14,
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 1s ease 0.85s",
        zIndex:3,
        maxWidth:260,
      }}
        className="hidden lg:flex"
      >
        <div style={{
          width:54, height:54, borderRadius:3,
          background:`linear-gradient(135deg, ${STYLES.gold}22, ${STYLES.gold}44)`,
          display:"flex", alignItems:"center", justifyContent:"center",
          flexShrink:0, border:`1px solid ${STYLES.gold}44`,
        }}>
          <svg viewBox="0 0 40 40" width="32" height="32" fill={STYLES.gold}>
            <path d="M20 3C12 3 6 9 6 17C6 25 12 37 20 37C28 37 34 25 34 17C34 9 28 3 20 3ZM20 6C25 6 28 10 28 15C28 20 25 23 20 23C15 23 12 20 12 15C12 10 15 6 20 6Z" opacity="0.7"/>
            <circle cx="20" cy="14" r="4"/>
          </svg>
        </div>
        <div>
          <div style={{color: STYLES.gold, fontSize:"0.62rem", letterSpacing:"0.16em", textTransform:"uppercase", marginBottom:2}}>Best Seller</div>
          <div style={{color: STYLES.cream, fontFamily:"Georgia,serif", fontSize:"0.88rem", fontWeight:600, lineHeight:1.3}}>Kashmiri Grade-A Saffron</div>
          <div style={{color: STYLES.beige, fontSize:"0.7rem", marginTop:2}}>★★★★★ &nbsp;1,240+ reviews</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)",
        display:"flex", flexDirection:"column", alignItems:"center", gap:8,
        opacity: loaded ? 0.6 : 0,
        transition:"opacity 1s ease 1s",
        animation: loaded ? "bounce 2s ease-in-out infinite" : "none",
      }}>
        <span style={{color:STYLES.beige, fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase"}}>Discover</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={STYLES.beige} strokeWidth="1.8"><path d="M12 5v14M5 12l7 7-7 7"/></svg>
      </div>

      <style>{`@keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }`}</style>
    </section>
  );
}

// ── Heritage Story Section ───────────────────────────────────────────────────
function HeritageSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, {threshold:0.2});
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{background: STYLES.cream, padding:"100px 0", overflow:"hidden"}}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-14">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Visual side */}
          <div style={{
            position:"relative",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-40px)",
            transition:"all 0.9s ease",
          }}>
            {/* Main image box */}
            <div style={{
              background:`linear-gradient(135deg, ${STYLES.walnut}, ${STYLES.maroon})`,
              borderRadius:4,
              aspectRatio:"4/5",
              position:"relative",
              overflow:"hidden",
              boxShadow:`0 24px 80px rgba(75,46,30,0.25)`,
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              {/* Decorative landscape placeholder */}
              <div style={{position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"flex-end"}}>
                {/* Mountains */}
                <svg viewBox="0 0 400 300" width="100%" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1a0a14" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#4B2E1E" stopOpacity="0.3"/>
                    </linearGradient>
                    <linearGradient id="snowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F8F4ED" stopOpacity="0.9"/>
                      <stop offset="100%" stopColor="#E7D9C3" stopOpacity="0.4"/>
                    </linearGradient>
                  </defs>
                  <rect width="400" height="300" fill="url(#skyGrad)"/>
                  {[[20,30],[80,60],[140,20],[200,45],[280,30],[340,55],[380,25],[60,80],[160,70]].map(([x,y],i) => (
                    <circle key={i} cx={x} cy={y} r="1.2" fill="#F8F4ED" opacity="0.7"/>
                  ))}
                  <path d="M-10 200 L60 100 L120 150 L180 80 L240 130 L300 70 L360 120 L410 90 L410 300 L-10 300Z" fill="#29432A" opacity="0.6"/>
                  <path d="M60 100 L80 80 L100 100Z" fill="url(#snowGrad)"/>
                  <path d="M180 80 L200 55 L225 80Z" fill="url(#snowGrad)"/>
                  <path d="M300 70 L320 42 L345 70Z" fill="url(#snowGrad)"/>
                  <path d="M-10 260 L80 190 L160 230 L240 180 L320 220 L410 195 L410 300 L-10 300Z" fill={STYLES.walnut} opacity="0.9"/>
                  {[30,70,110,310,350,390].map((x,i) => (
                    <path key={i} d={`M${x} 270 L${x-8} 295 L${x+8} 295Z`} fill={STYLES.pine} opacity="0.8"/>
                  ))}
                  <ellipse cx="200" cy="290" rx="120" ry="18" fill="#29432A" opacity="0.2"/>
                  <path d="M155 284 Q200 276 245 284 L248 288 Q200 292 152 288Z" fill="#4B2E1E" opacity="0.7"/>
                  <path d="M190 274 L200 265 L210 274Z" fill="#4B2E1E" opacity="0.6"/>
                </svg>
              </div>
              {/* Overlay text */}
              <div style={{
                position:"absolute", bottom:28, left:28, right:28,
                background:"rgba(75,46,30,0.6)", backdropFilter:"blur(8px)",
                padding:"16px 20px", borderRadius:3,
                borderLeft:`3px solid ${STYLES.gold}`,
              }}>
                <div style={{color:STYLES.gold, fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:4}}>The Dal Lake, Kashmir</div>
                <div style={{color:STYLES.cream, fontFamily:"Georgia,serif", fontSize:"0.9rem", lineHeight:1.5}}>Where every sunrise paints a masterpiece on still waters</div>
              </div>
            </div>

            {/* Floating badge */}
            <div style={{
              position:"absolute", top:-20, right:-20,
              background: STYLES.walnut,
              border:`2px solid ${STYLES.gold}`,
              borderRadius:"50%",
              width:110, height:110,
              display:"flex", flexDirection:"column",
              alignItems:"center", justifyContent:"center",
              boxShadow:`0 8px 30px rgba(75,46,30,0.3)`,
              padding:10,
              textAlign:"center",
            }}>
              <div style={{color:STYLES.gold, fontSize:"1.6rem", fontFamily:"Georgia,serif", fontWeight:700, lineHeight:1}}>100%</div>
              <div style={{color:STYLES.beige, fontSize:"0.52rem", letterSpacing:"0.12em", textTransform:"uppercase", marginTop:3, lineHeight:1.4}}>Lab Certified<br/>Purity</div>
            </div>

            <div style={{position:"absolute", bottom:-20, left:-20, color:STYLES.gold, opacity:0.15}}>
              <KashmiriMandala size={120}/>
            </div>
          </div>

          {/* Text side */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(40px)",
            transition:"all 0.9s ease 0.2s",
          }}>
            <div style={{color:STYLES.gold, fontSize:"0.65rem", letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:14, fontFamily:"Georgia,serif"}}>
              ✦ &nbsp; Our Story & Mission
            </div>
            <h2 style={{
              fontFamily:"'Playfair Display', Georgia, serif",
              fontSize:"clamp(2rem, 4vw, 3rem)",
              fontWeight:700,
              color: STYLES.walnut,
              lineHeight:1.15,
              marginBottom:20,
            }}>
              Direct From Valleys<br/>
              <em style={{color:STYLES.maroon, fontStyle:"italic"}}>Trusted Since 2016</em>
            </h2>
            <FleuronDivider/>
            <div style={{marginTop:20}} className="space-y-4">
              <p style={{fontFamily:"Georgia, serif", color:"#5a4030", lineHeight:1.9, fontSize:"0.95rem"}}>
                KashmirCart was founded with a simple mission — to bring genuine Kashmiri products directly from the valleys of Kashmir to homes across India. What began with our family's connection to the saffron fields of Pampore has grown into one of India's trusted destinations for authentic Himalayan wellness, nutrition, and traditional products.
              </p>
              <p style={{fontFamily:"Georgia, serif", color:"#5a4030", lineHeight:1.9, fontSize:"0.95rem"}}>
                Every product is carefully sourced from local farmers, growers, beekeepers, and artisans across Kashmir. From GI-tagged Kashmiri Saffron and Himalayan Markhor Shilajit to forest honey, premium dry fruits, Kehwa, lavender oil, natural skincare, and wellness essentials, each item reflects the heritage, purity, and traditions of the Himalayan region.
              </p>
            </div>

            {/* Stats row */}
            <div style={{
              display:"flex", gap:0,
              borderTop:`1px solid ${STYLES.beige}`,
              marginTop:30,
              paddingTop:28,
            }}>
              {[["2016","Sourced Online"],["ISO","Certified Org"],["Lab","Tested Purity"],["India","Pan Shipping"]].map(([num, label], i) => (
                <div key={i} style={{
                  flex:1,
                  paddingRight: i < 3 ? 10 : 0,
                  borderRight: i < 3 ? `1px solid ${STYLES.beige}` : "none",
                  paddingLeft: i > 0 ? 10 : 0,
                }}>
                  <div style={{
                    fontFamily:"'Playfair Display', Georgia, serif",
                    fontSize:"1.4rem",
                    fontWeight:700,
                    color: STYLES.maroon,
                    lineHeight:1,
                  }}>{num}</div>
                  <div style={{
                    color:"#7a5a40",
                    fontSize:"0.6rem",
                    letterSpacing:"0.05em",
                    marginTop:5,
                    textTransform:"uppercase",
                    fontFamily:"Georgia, serif",
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Categories ────────────────────────────────────────────────────────────────
function CategoriesSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVisible(true); }, {threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{background: STYLES.walnut, padding:"100px 0"}}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-14">
        <div style={{textAlign:"center", marginBottom:60}}>
          <div style={{color:STYLES.gold, fontSize:"0.65rem", letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:12, fontFamily:"Georgia,serif"}}>
            ✦ &nbsp; Complete Catalog Matrix &nbsp; ✦
          </div>
          <h2 style={{
            fontFamily:"'Playfair Display', Georgia, serif",
            fontSize:"clamp(2rem, 4vw, 3rem)",
            fontWeight:700,
            color:STYLES.cream,
            lineHeight:1.2,
            marginBottom:16,
          }}>
            Explore Our Collection of<br/><em style={{color:STYLES.gold}}>Authentic Kashmiri Products</em>
          </h2>
          <FleuronDivider/>
          <p style={{color:STYLES.beige, fontFamily:"Georgia,serif", fontSize:"0.95rem", maxW:480, margin:"16px auto 0", lineHeight:1.8}}>
            Discover premium Kashmiri saffron, Himalayan Shilajit, forest honey, dry fruits, herbal skincare, Kehwa tea, lavender oil, and traditional items sourced directly from source.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <a
              key={cat.name}
              href="#"
              style={{
                textDecoration:"none",
                display:"block",
                background:`linear-gradient(145deg, ${cat.color} 0%, ${cat.color}cc 100%)`,
                borderRadius:4,
                overflow:"hidden",
                border:`1px solid rgba(216,155,43,0.15)`,
                transition:"all 0.35s ease",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${i * 0.05}s`,
                position:"relative",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.3)";
                e.currentTarget.style.borderColor = STYLES.gold;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(216,155,43,0.15)";
              }}
            >
              <div style={{
                position:"absolute", inset:0,
                backgroundImage:`url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5L25 15H35L27 21L30 32L20 26L10 32L13 21L5 15H15L20 5Z' fill='%23D89B2B' fill-opacity='0.04'/%3E%3C/svg%3E")`,
              }}/>

              <div style={{padding:"32px 24px", position:"relative", zIndex:1}}>
                <div style={{width:32, height:2, background:cat.accent, marginBottom:20, borderRadius:1}}/>
                <div style={{
                  color:cat.accent, fontSize:"0.58rem",
                  letterSpacing:"0.22em", textTransform:"uppercase",
                  fontFamily:"Georgia,serif", marginBottom:8, fontWeight:600,
                }}>
                  {cat.tag}
                </div>
                <h3 style={{
                  fontFamily:"'Playfair Display', Georgia, serif",
                  color:STYLES.cream, fontSize:"1.15rem",
                  fontWeight:700, lineHeight:1.2,
                  marginBottom:8,
                }}>
                  {cat.name}
                </h3>
                <p style={{
                  color:"rgba(248,244,237,0.6)",
                  fontFamily:"Georgia,serif",
                  fontSize:"0.8rem", lineHeight:1.6,
                  marginBottom:20,
                }}>
                  {cat.desc}
                </p>
                <div style={{
                  display:"flex", alignItems:"center", gap:6,
                  color:cat.accent, fontSize:"0.72rem",
                  letterSpacing:"0.1em", textTransform:"uppercase",
                  fontFamily:"Georgia,serif", fontWeight:600,
                }}>
                  Shop Now →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const CATEGORIES = [
  { name:"Pure Kashmiri Saffron", tag:"Authentic", desc:"Authentic Pampore Mongra saffron renowned for aroma, color and purity.", color:"#5C1F1F", accent:"#D89B2B" },
  { name:"Markhor Shilajit", tag:"Lab-Tested", desc:"Lab-tested Himalayan Shilajit resin sourced from high-altitude mountains.", color:"#222", accent:"#E7D9C3" },
  { name:"Raw Himalayan Honey", tag:"Unprocessed", desc:"Natural forest honey collected from pristine Himalayan landscapes.", color:"#4B2E1E", accent:"#D89B2B" },
  { name:"Premium Kashmiri Nuts", tag:"Fresh", desc:"Fresh almonds, walnuts and nutrient-rich dry fruits from Kashmir.", color:"#29432A", accent:"#8BC34A" },
  { name:"Kashmiri Kehwa & Tea", tag:"Traditional", desc:"Traditional saffron-infused tea blends inspired by Kashmiri heritage.", color:"#6E4A25", accent:"#E8A030" },
  { name:"RAYA Ayurveda Skincare", tag:"Natural", desc:"Ayurvedic skincare crafted with saffron, herbs and natural botanicals.", color:"#1F2E3A", accent:"#90CAF9" },
];

// ── Why Choose Us ────────────────────────────────────────────────────────────
const WHY_ITEMS = [
  { icon:"✦", title:"Farmers from Pampore", desc:"Direct lineage connection to saffron farms, eliminating multi-tier middlemen layers entirely." },
  { icon:"◈", title:"ISO Certified Company", desc:"Operations and testing metrics running completely inside certified frameworks." },
  { icon:"❖", title:"Lab Tested Batches", desc:"Heavy metal checks and high crocin density levels structurally verified for consumer safety." },
  { icon:"⟡", title:"Serving Since 2016", desc:"A decade of providing genuine, untampered agricultural goods straight from the valley." },
  { icon:"◉", title:"Nationwide Shipping", desc:"Traceable logistics ecosystems ensuring fresh layout packages reach your door securely." },
  { icon:"✿", title:"Direct From Kashmir", desc:"Every element reflects the heritage, purity, and pristine quality of the target valleys." },
];

function WhyUsSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVisible(true); }, {threshold:0.15});
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{background:STYLES.cream, padding:"100px 0"}}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-14">
        <div style={{textAlign:"center", marginBottom:60}}>
          <div style={{color:STYLES.maroon, fontSize:"0.65rem", letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:12, fontFamily:"Georgia,serif"}}>
            ✦ &nbsp; Our Promise To You
          </div>
          <h2 style={{
            fontFamily:"'Playfair Display', Georgia, serif",
            fontSize:"clamp(2rem, 4vw, 3rem)",
            fontWeight:700, color:STYLES.walnut, lineHeight:1.2,
          }}>
            Why Discerning Buyers<br/>
            <em style={{color:STYLES.maroon}}>Choose Kashmir Veda</em>
          </h2>
          <div style={{marginTop:12}}><FleuronDivider/></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_ITEMS.map((item, i) => (
            <div key={i} style={{
              background:"white",
              borderRadius:4,
              padding:"36px 30px",
              border:`1px solid ${STYLES.beige}`,
              borderTop:`3px solid ${STYLES.gold}`,
              transition:"all 0.35s ease",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(25px)",
              transitionDelay:`${i*0.08}s`,
              boxShadow:"0 2px 20px rgba(75,46,30,0.05)",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow="0 12px 40px rgba(75,46,30,0.12)"; e.currentTarget.style.transform="translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow="0 2px 20px rgba(75,46,30,0.05)"; e.currentTarget.style.transform="translateY(0)"; }}
            >
              <div style={{
                width:52, height:52, borderRadius:"50%",
                background:`linear-gradient(135deg, ${STYLES.gold}22, ${STYLES.gold}44)`,
                border:`1.5px solid ${STYLES.gold}88`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"1.3rem",
                marginBottom:20,
                color: STYLES.walnut,
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontFamily:"'Playfair Display', Georgia, serif",
                color:STYLES.walnut, fontSize:"1.05rem",
                fontWeight:700, marginBottom:10, lineHeight:1.3,
              }}>
                {item.title}
              </h3>
              <p style={{
                color:"#6a5040", fontFamily:"Georgia,serif",
                fontSize:"0.88rem", lineHeight:1.8,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Reusable Premium E-commerce Product Card Component ───────────────────────
function ProductCard({ product }: { product: Product }) {
  return (
    <div style={{background: "#FDFBF7", border: `1px solid ${STYLES.beige}`, position: "relative", padding: "12px", display: "flex", flexDirection: "column", justifyContent: "space-between"}} className="group transition-all duration-500 hover:shadow-2xl">
      
      {/* Inline Schema Microdata Object injection for direct Google Merchant Crawling efficiency */}
      <Script id={`schema-${product.id}`} type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "sku": product.id,
          "name": product.name,
          "image": product.image,
          "description": product.originDetail,
          "brand": {
            "@type": "Brand",
            "name": product.brand
          },
          "offers": {
            "@type": "Offer",
            "url": `https://www.kashmircart.com/products/${product.id}`,
            "priceCurrency": "INR",
            "price": product.priceNumber,
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock"
          }
        })}
      </Script>

      {/* Decorative Tags */}
      <div style={{position: "absolute", top: 20, left: 20, zIndex: 20}} className="flex flex-col gap-1.5 pointer-events-none">
        {product.saleTag && (
          <span style={{background: STYLES.maroon, color: STYLES.cream, fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", padding: "4px 10px"}} className="shadow-md font-serif">
            {product.saleTag}
          </span>
        )}
        {product.hot && (
          <span style={{background: STYLES.walnut, color: STYLES.gold, fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", padding: "4px 10px", border: `1px solid ${STYLES.gold}22`}} className="shadow-md font-serif">
            Hot Choice
          </span>
        )}
      </div>
      
      {/* Restored and Configured Product Image Box */}
      <div style={{position: "relative", width: "100%", height: "270px", bg: STYLES.cream, overflow: "hidden", border: `1px solid rgba(216,155,43,0.12)`}}>
        <div style={{position: "absolute", inset: 0, background: "rgba(75,46,30,0.03)", zIndex: 1}} />
        <Image 
          src={product.image} 
          alt={`${product.name} - high resolution authentic photograph showing genuine product textures`} 
          fill 
          sizes="(max-w-768px) 100vw, 33vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 relative z-10"
        />
        <div style={{position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", opacity:0.04, color:STYLES.gold, zIndex: 2}} className="pointer-events-none">
          <KashmiriMandala size={120}/>
        </div>
      </div>

      {/* Info Content Block */}
      <div style={{padding: "16px 4px 4px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between"}} className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span style={{color: STYLES.maroon, fontSize: "10px", letterSpacing: "0.2em", fontWeight: 800}} className="uppercase">
              {product.brand}
            </span>
            
            {product.rating && (
              <div style={{display: "flex", alignItems: "center", gap: 2}} className="border-l border-gray-200 pl-2">
                <span style={{color: STYLES.gold, fontSize: "11px"}}>★</span>
                <span style={{fontSize: "11px", fontWeight: 700, color: STYLES.walnut}}>{product.rating}</span>
              </div>
            )}
          </div>
          
          <h3 style={{fontFamily: "'Playfair Display', Georgia, serif", color: STYLES.walnut, fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.45}} className="line-clamp-2">
            {product.name}
          </h3>

          <p style={{fontSize: "11px", color: "#8C7665", fontStyle: "italic", borderTop: "1px border-dotted #EADCC9", paddingTop: "6px"}} className="font-sans font-medium">
            {product.originDetail}
          </p>
        </div>

        {/* Pricing & Premium Add to Cart Action Row */}
        <div style={{borderTop: `1px solid ${STYLES.beige}`, paddingTop: "12px"}} className="space-y-3">
          <div className="flex items-baseline gap-2">
            <span style={{fontSize: "1.2rem", fontWeight: 700, color: STYLES.maroon}} className="font-sans">
              {product.price}
            </span>
            {product.originalPrice && (
              <span style={{fontSize: "12px", color: "#8C7665", textDecoration: "line-through"}} className="font-light">
                {product.originalPrice}
              </span>
            )}
          </div>

          <button style={{
            width: "100%",
            background: STYLES.walnut,
            color: STYLES.cream,
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            padding: "13px 0",
            border: `1px solid ${STYLES.walnut}`,
            transition: "all 0.3s ease",
            cursor: "pointer"
          }} className="uppercase hover:bg-[#6B1F1F] hover:border-[#6B1F1F] flex items-center justify-center gap-2 active:scale-[0.99]">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name:"Priya Sharma", loc:"New Delhi", quote:"The saffron is unlike anything I've purchased before. The aroma fills the entire kitchen the moment you open the tin. Genuinely from Kashmir — you can taste the difference.", stars:5 },
  { name:"James Whitfield", loc:"London, UK", quote:"I gifted a Pashmina to my wife and she hasn't taken it off since. The quality is exceptional and the packaging itself felt like receiving a museum piece.", stars:5 },
  { name:"Aisha Mirza", loc:"Dubai, UAE", quote:"Kashmir Veda's Kahwa is now a daily ritual in our home. The blend is perfectly balanced. Customer service was warm and the delivery was impeccable.", stars:5 },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVisible(true); }, {threshold:0.2});
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      background:`linear-gradient(135deg, ${STYLES.maroon} 0%, ${STYLES.walnut} 100%)`,
      padding:"100px 0",
      position:"relative",
      overflow:"hidden",
    }}>
      <div style={{position:"absolute", left:"-5%", top:"50%", transform:"translateY(-50%)", opacity:0.06, color:STYLES.gold}}>
        <KashmiriMandala size={500}/>
      </div>
      <div style={{position:"absolute", right:"-5%", top:"50%", transform:"translateY(-50%)", opacity:0.06, color:STYLES.gold}}>
        <KashmiriMandala size={500}/>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-14" style={{position:"relative", zIndex:1}}>
        <div style={{textAlign:"center", marginBottom:60}}>
          <div style={{color:STYLES.gold, fontSize:"0.65rem", letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:12, fontFamily:"Georgia,serif"}}>
            ✦ &nbsp; Voices of Our Community
          </div>
          <h2 style={{
            fontFamily:"'Playfair Display', Georgia, serif",
            fontSize:"clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight:700, color:STYLES.cream, lineHeight:1.2,
          }}>
            Discover Kashmir's<br/><em style={{color:STYLES.gold}}>Most Loved Products</em>
          </h2>
          <div style={{marginTop:12}}><FleuronDivider/></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-7">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              background: i === active ? "rgba(248,244,237,0.12)" : "rgba(248,244,237,0.05)",
              border:`1px solid ${i === active ? STYLES.gold+"55" : "rgba(248,244,237,0.1)"}`,
              borderRadius:4,
              padding:"36px 30px",
              transition:"all 0.5s ease",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(25px)",
              transitionDelay:`${i*0.12}s`,
              cursor:"pointer",
            }}
              onClick={() => setActive(i)}
            >
              <div style={{
                fontFamily:"Georgia, serif",
                fontSize:"4rem",
                color:STYLES.gold,
                lineHeight:0.5,
                marginBottom:20,
                opacity:0.6,
              }}>"</div>

              <div style={{display:"flex", gap:3, marginBottom:16}}>
                {Array.from({length:t.stars}).map((_,s)=><StarOfKashmir key={s}/>)}
              </div>

              <p style={{
                fontFamily:"Georgia,serif",
                color:STYLES.beige,
                fontSize:"0.92rem",
                lineHeight:1.85,
                marginBottom:24,
                fontStyle:"italic",
              }}>
                {t.quote}
              </p>

              <div style={{
                borderTop:"1px solid rgba(216,155,43,0.2)",
                paddingTop:18,
                display:"flex", alignItems:"center", gap:12,
              }}>
                <div style={{
                  width:42, height:42, borderRadius:"50%",
                  background:`linear-gradient(135deg, ${STYLES.gold}33, ${STYLES.gold}55)`,
                  border:`1.5px solid ${STYLES.gold}55`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:STYLES.gold, fontSize:"1rem",
                  fontFamily:"'Playfair Display',Georgia,serif",
                  fontWeight:700,
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{color:STYLES.cream, fontFamily:"Georgia,serif", fontWeight:600, fontSize:"0.88rem"}}>{t.name}</div>
                  <div style={{color:STYLES.gold, fontSize:"0.65rem", letterSpacing:"0.1em"}}>{t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Kashmir Experience Banner ──────────────────────────────────────────────
function ExperienceBanner() {
  return (
    <section style={{
      background: STYLES.pine,
      padding:"80px 0",
      position:"relative",
      overflow:"hidden",
    }}>
      <div style={{position:"absolute", inset:0, display:"flex", justifyContent:"space-around", alignItems:"center", pointerEvents:"none"}}>
        {[15,25,35,45,55,65,75,85].map((l,i) => (
          <ChinarLeaf key={i} style={{
            width: i%2===0 ? 60 : 40,
            opacity:0.07,
            color:STYLES.gold,
            transform:`rotate(${i*22}deg)`,
          }}/>
        ))}
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-14 text-center" style={{position:"relative", zIndex:1}}>
        <div style={{color:STYLES.gold, fontSize:"0.65rem", letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:12, fontFamily:"Georgia,serif"}}>
          ✦ &nbsp; Authentic Himalayan Heritage
        </div>
        <h2 style={{
          fontFamily:"'Playfair Display', Georgia, serif",
          fontSize:"clamp(1.8rem, 4vw, 3.2rem)",
          fontWeight:700, color:STYLES.cream, lineHeight:1.2,
          maxWidth:700, margin:"0 auto 20px",
        }}>
          Explore Our Complete Collection of<br/>
          <em style={{color:STYLES.gold}}>Authentic Kashmiri Products</em>
        </h2>
        <FleuronDivider/>
        <p style={{
          color:"rgba(248,244,237,0.7)", fontFamily:"Georgia,serif",
          fontSize:"1rem", lineHeight:1.85,
          maxWidth:680, margin:"20px auto 40px",
        }}>
          Welcome to KashmirCart, India's trusted destination for authentic Kashmiri products sourced directly from the valleys, mountains, farms, and traditional communities of Kashmir. Our carefully curated collection brings together premium Himalayan treasures known for their purity, quality, traditional value, and natural goodness.
        </p>
        <div style={{display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap"}}>
          <a href="#vault" style={{
            display:"inline-block",
            background: `linear-gradient(135deg, ${STYLES.gold}, #C8862A)`,
            color:STYLES.walnut,
            padding:"16px 38px",
            fontFamily:"Georgia,serif",
            fontWeight:700,
            fontSize:"0.82rem",
            letterSpacing:"0.14em",
            textTransform:"uppercase",
            textDecoration:"none",
            borderRadius:2,
            transition:"opacity 0.2s",
          }}>
            Shop the Collection
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{background:"#1a0a0a", borderTop:`2px solid ${STYLES.walnut}`}}>
      <BorderPattern/>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-14 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:16}}>
              <div style={{
                width:44, height:44, borderRadius:"50%",
                background:`linear-gradient(135deg, ${STYLES.maroon}, ${STYLES.walnut})`,
                display:"flex", alignItems:"center", justifyContent:"center",
                border:`2px solid ${STYLES.gold}`,
              }}>
                <ChinarLeaf style={{width:24, height:24, color:STYLES.gold}}/>
              </div>
              <div>
                <div style={{fontFamily:"'Playfair Display',Georgia,serif", color:STYLES.cream, fontSize:"1.1rem", fontWeight:700}}>Kashmir Veda</div>
                <div style={{color:STYLES.gold, fontSize:"0.55rem", letterSpacing:"0.18em", textTransform:"uppercase"}}>Heritage · Authenticity · Craft</div>
              </div>
            </div>
            <p style={{color:"rgba(248,244,237,0.5)", fontFamily:"Georgia,serif", fontSize:"0.83rem", lineHeight:1.8, marginBottom:20}}>
              Sourcing world-famous Kashmiri Saffron from Pampore, authentic Himalayan Markhor Shilajit Resin, raw mountain honey, and premium walnuts online for families across India.
            </p>
          </div>

          {/* Links Grid mappings */}
          {[
            { title:"Collections", links:["Kashmiri Saffron","Dry Fruits & Nuts","Pashmina Shawls","Kahwa & Spices","Handicrafts","Walnut Wood Art"] },
            { title:"Company", links:["About Kashmir Veda","Our Heritage Story","Artisan Partners","Authenticity Pledge","Blog & Journal","Press & Media"] },
            { title:"Support", links:["Track Your Order","Shipping Policy","Returns & Refunds","FAQs","Contact Us","Wholesale Enquiry"] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{color:STYLES.gold, fontSize:"0.62rem", letterSpacing:"0.22em", textTransform:"uppercase", fontFamily:"Georgia,serif", fontWeight:600, marginBottom:18}}>
                {col.title}
              </h4>
              <ul style={{listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:10}}>
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" style={{
                      color:"rgba(248,244,237,0.55)",
                      fontFamily:"Georgia,serif",
                      fontSize:"0.83rem",
                      textDecoration:"none",
                      transition:"color 0.2s",
                      lineHeight:1.4,
                    }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop:"1px solid rgba(216,155,43,0.15)",
          marginTop:48,
          paddingTop:24,
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          flexWrap:"wrap",
          gap:12,
        }}>
          <div style={{color:"rgba(248,244,237,0.35)", fontFamily:"Georgia,serif", fontSize:"0.75rem"}}>
            © 2026 Kashmir Veda x KashmirCart. All rights reserved. ISO Certified & Lab Tested Integrity.
          </div>
          <div style={{display:"flex", gap:16}}>
            {["Privacy Policy","Terms of Service","Cookie Policy"].map(link => (
              <a key={link} href="#" style={{
                color:"rgba(248,244,237,0.35)",
                fontSize:"0.72rem", textDecoration:"none",
                fontFamily:"Georgia,serif",
                transition:"color 0.2s",
              }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Root Page Export ──────────────────────────────────────────────────────────
export default function KashmirVedaHomePage() {
  
  // Categorized Rows (Strictly 3 Items Per Category Shelf Row)
  const bestSellers: Product[] = [
    {
      id: "kc-saffron-001",
      name: "KashmirCart Premium Kashmiri Saffron | GI Tagged & Lab Tested Authentic Kesar",
      brand: "KASHMIRCART",
      rating: 4.91,
      price: "₹350.00",
      priceNumber: 350.00,
      image: "/images/product-saffron.jpg",
      hot: true,
      saleTag: "Up to 22%",
      originDetail: "100% Organically Sourced from Pampore Harvest fields"
    },
    {
      id: "kc-mamra-002",
      name: "Premium One Tree Kashmiri Mamra Almond Kernels (Mamra Badam Giri)",
      brand: "KASHMIRCART",
      rating: 4.92,
      price: "₹800.00",
      priceNumber: 800.00,
      image: "/images/product-mamra.jpg",
      saleTag: "Up to 36%",
      originDetail: "Traditional single-tree handpicked wild harvest batch"
    },
    {
      id: "kc-walnut-003",
      name: "KashmirCart Premium Kashmiri Walnut Kernels (Akhrot Giri) – 100% Natural",
      brand: "KASHMIRCART",
      rating: 5.00,
      price: "₹400.00",
      priceNumber: 400.00,
      image: "/images/product-walnuts.jpg",
      saleTag: "Up to 38%",
      originDetail: "Sourced from old-growth traditional Kupwara walnut estates"
    }
  ];

  const skincareProducts: Product[] = [
    {
      id: "ra-cream-001",
      name: "Original Raya Ayurveda Kashmiri Saffron Anti-Wrinkle Brightening Cream",
      brand: "RAYA AYURVEDA",
      rating: 4.98,
      originalPrice: "₹500.00",
      price: "₹344.00",
      priceNumber: 344.00,
      image: "/images/skincare-cream.jpg",
      saleTag: "Sale 31%",
      originDetail: "Infused with genuine slow-extracted Kumkuma Tailam oil"
    },
    {
      id: "kc-scrub-002",
      name: "THE LUXURY Saffron Walnut Face Scrub by KASHMIRCART",
      brand: "KASHMIRCART",
      originalPrice: "₹999.00",
      price: "₹450.00",
      priceNumber: 450.00,
      image: "/images/skincare-scrub.jpg",
      saleTag: "Sale 55%",
      originDetail: "Crushed stone-ground soft walnut hulls from South Kashmir"
    },
    {
      id: "kc-soap-003",
      name: "KASHMIRCART Luxury Kashmiri Saffron Soap 100g – Handmade & Chemical Free",
      brand: "KASHMIRCART",
      rating: 5.00,
      originalPrice: "₹250.00",
      price: "₹100.00",
      priceNumber: 100.00,
      image: "/images/skincare-soap.webp",
      hot: true,
      saleTag: "Sale 60%",
      originDetail: "Cold-pressed artisanal small batch preservation system"
    }
  ];

  const gourmetEssentials: Product[] = [
    {
      id: "kc-noonchai-001",
      name: "Namkeen Tea (Kashmiri Noon Chai) | Traditional Blend",
      brand: "KASHMIRCART",
      price: "₹450.00",
      priceNumber: 450.00,
      image: "/images/gourmet-noon-chai.jpg",
      saleTag: "Up to 25%",
      originDetail: "Authentic premium broad-leaf blend for pink tea preparation"
    },
    {
      id: "kc-gucchi-002",
      name: "Jumbo Gucchi Mushrooms From KASHMIR | Handpicked Wild Delicacy",
      brand: "KASHMIRCART",
      rating: 5.00,
      price: "₹1,500.00",
      priceNumber: 1500.00,
      image: "/images/gourmet-gucchi.jpg",
      hot: true,
      saleTag: "Up to 17%",
      originDetail: "Wild-foraged from natural pine wood forests after spring rains"
    },
    {
      id: "kc-kahwa-003",
      name: "Himalayan Vintage Kahwa – Heritage Botanical Blend",
      brand: "KASHMIRCART",
      originalPrice: "₹950.00",
      price: "₹650.00",
      priceNumber: 650.00,
      image: "/images/gourmet-kahwa.webp",
      saleTag: "Sale 32%",
      originDetail: "Green tea rolled with cardamoms, cinnamon, and saffron shards"
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Georgia, serif; }
        html { scroll-behavior: smooth; }
        .grid { display: grid; }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        @media (min-width: 640px) { .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (min-width: 768px) { .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        @media (min-width: 1024px) {
          .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .lg\\:col-span-1 { grid-column: span 1; }
          .lg\\:flex { display: flex; }
          .lg\\:px-14 { padding-left: 3.5rem; padding-right: 3.5rem; }
          .lg\\:inline-flex { display: inline-flex; }
          .lg\\:hidden { display: none !important; }
        }
        @media (max-width: 1023px) { .hidden { display: none; } }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .items-end { align-items: flex-end; }
        .justify-between { justify-content: space-between; }
        .justify-center { justify-content: center; }
        .flex-col { flex-direction: column; }
        .flex-wrap { flex-wrap: wrap; }
        .shrink-0 { flex-shrink: 0; }
        .gap-3 { gap: 0.75rem; }
        .gap-4 { gap: 1rem; }
        .gap-5 { gap: 1.25rem; }
        .gap-6 { gap: 1.5rem; }
        .gap-7 { gap: 1.75rem; }
        .gap-8 { gap: 2rem; }
        .gap-12 { gap: 3rem; }
        .gap-16 { gap: 4rem; }
        .w-full { width: 100%; }
        .max-w-screen-xl { max-width: 1280px; }
        .max-w-2xl { max-width: 42rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
        .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
        .py-5 { padding-top: 1.25rem; padding-bottom: 1.25rem; }
        .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
        .text-center { text-align: center; }
        .text-xs { font-size: 0.75rem; }
        .text-sm { font-size: 0.875rem; }
        .tracking-widest { letter-spacing: 0.2em; }
        .font-medium { font-weight: 500; }
        .list-none { list-style: none; }
        .overflow-hidden { overflow: hidden; }
        .relative { position: relative; }
        .absolute { position: absolute; }
        .sticky { position: sticky; }
        .inset-0 { inset: 0; }
        .top-0 { top: 0; }
        .z-100 { z-index: 100; }
        .inline-block { display: inline-block; }
        .block { display: block; }
        button { cursor: pointer; }
      `}</style>

      <Navbar/>
      
      <main id="vault">
        <HeroSection/>
        <HeritageSection/>
        <CategoriesSection/>
        <WhyUsSection/>

        {/* SHELF 1: Bestselling Flagships */}
        <section style={{background: STYLES.cream, padding: "100px 0"}}>
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14">
            <div style={{textAlign: "center", marginBottom: 40}}>
              <span style={{color: STYLES.maroon, fontSize: "11px", letterSpacing: "0.2em", fontWeight: 700}} className="uppercase font-serif">✦ Discover Kashmir's Most Loved Products ✦</span>
              <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: STYLES.walnut, marginTop: 8}}>
                Bestselling Heritage Vault
              </h2>
              <FleuronDivider />
            </div>
            
            <PinjrakariBorder />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" style={{marginTop: "30px"}}>
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Editorial Showcase Ribbon Banner */}
        <section style={{background: STYLES.maroon, padding: "40px 0", overflow: "hidden"}} className="hidden md:block">
          <div style={{display: "flex", whitespace: "nowrap", gap: "60px", color: STYLES.lightGold, fontSize: "11px", letterSpacing: "0.25em", fontWeight: 700}} className="uppercase justify-center font-serif animate-pulse">
            <span>GI Tagged & Lab Tested Authentic Kesar</span> • <span>Pure Lab Tested Heavy Metal Free Shilajit</span> • <span>Raw Forest Honey From Pristine Landscapes</span>
          </div>
        </section>

        {/* SHELF 2: RAYA Ayurveda Skincare Line */}
        <section style={{background: "#FDFBF7", padding: "100px 0", borderTop: `1px solid ${STYLES.beige}`}}>
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14">
            <div style={{textAlign: "center", marginBottom: 40}}>
              <span style={{color: STYLES.maroon, fontSize: "11px", letterSpacing: "0.2em", fontWeight: 700}} className="uppercase font-serif">✦ Pure Ayurveda • Premium Skincare ✦</span>
              <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: STYLES.walnut, marginTop: 8}}>
                RAYA Ayurveda Skincare Collection
              </h2>
              <FleuronDivider />
            </div>

            <PinjrakariBorder />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" style={{marginTop: "30px"}}>
              {skincareProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* SHELF 3: Gourmet & Rare Alpine Essentials */}
        <section style={{background: STYLES.cream, padding: "100px 0", borderTop: `1px solid ${STYLES.beige}`}}>
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14">
            <div style={{textAlign: "center", marginBottom: 40}}>
              <span style={{color: STYLES.maroon, fontSize: "11px", letterSpacing: "0.2em", fontWeight: 700}} className="uppercase font-serif">✦ Sourced from pristine ecosystems ✦</span>
              <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: STYLES.walnut, marginTop: 8}}>
                Gourmet & Rare Essentials
              </h2>
              <FleuronDivider />
            </div>

            <PinjrakariBorder />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" style={{marginTop: "30px"}}>
              {gourmetEssentials.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <TestimonialsSection/>
        <ExperienceBanner/>
      </main>
      
      <Footer/>
    </>
  );
}