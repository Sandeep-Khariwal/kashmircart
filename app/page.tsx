import Image from "next/image";
import Script from "next/script";
import * as motion from "framer-motion/client";
import type { Variants } from "framer-motion";
import Navbar from "./components/Navbar";

// SEO Metadata following strict Search Engine Guidelines
export const metadata = {
  title: "Premium Kashmiri Heritage | Authentic Saffron, Pashmina & Crafts",
  description: "Experience the true essence of Kashmir. Shop 100% authentic, high-quality Kashmiri Saffron, handcrafted Pashmina, and antique walnut wood crafts.",
  keywords: ["Kashmiri Saffron", "Authentic Pashmina", "Kashmir Handicrafts", "Buy Kashmiri products online", "KashmirCart"],
  openGraph: {
    title: "Premium Kashmiri Heritage | KashmirCart",
    description: "Experience the true essence of Kashmir with our authentic products sourced directly from local artisans.",
    images: ["/images/og-kashmir-heritage.jpg"],
  },
};

interface Product {
  name: string;
  brand: string;
  rating?: number;
  originalPrice?: string;
  price: string;
  image: string;
  hot?: boolean;
  saleTag?: string;
}

export default function Home() {
  // Animation Variants for dynamic, fluid micro-interactions
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  // Structured Curated Category Arrays (Limited strictly to 3 items per requested rules)
  const bestSellers: Product[] = [
    {
      name: "KashmirCart Premium Kashmiri Saffron | GI Tagged & Lab Tested Authentic Kesar",
      brand: "KASHMIRCART™",
      rating: 4.91,
      price: "₹350.00",
      image: "/images/product-saffron.jpg",
      hot: true,
      saleTag: "Up to 22%"
    },
    {
      name: "Premium One Tree Kashmiri Mamra Almond Kernels (Mamra Badam Giri)",
      brand: "KASHMIRCART™",
      rating: 4.92,
      price: "₹800.00",
      image: "/images/product-mamra.jpg",
      saleTag: "Up to 36%"
    },
    {
      name: "KashmirCart Premium Kashmiri Walnut Kernels (Akhrot Giri) – 100% Natural",
      brand: "KASHMIRCART™",
      rating: 5.00,
      price: "₹400.00",
      image: "/images/product-walnuts.jpg",
      saleTag: "Up to 38%"
    }
  ];

  const skincareProducts: Product[] = [
    {
      name: "Original Raya Ayurveda Kashmiri Saffron Anti-Wrinkle Brightening Cream",
      brand: "RAYA AYURVEDA",
      rating: 4.98,
      originalPrice: "₹500.00",
      price: "₹344.00",
      image: "/images/skincare-cream.jpg",
      saleTag: "Sale 31%"
    },
    {
      name: "THE LUXURY Saffron Walnut Face Scrub by KASHMIRCART",
      brand: "KASHMIRCART™",
      originalPrice: "₹999.00",
      price: "₹450.00",
      image: "/images/skincare-scrub.jpg",
      saleTag: "Sale 55%"
    },
    {
      name: "KASHMIRCART Luxury Kashmiri Saffron Soap 100g – Handmade & Chemical Free",
      brand: "KASHMIRCART™",
      rating: 5.00,
      originalPrice: "₹250.00",
      price: "₹100.00",
      image: "/images/skincare-soap.webp",
      hot: true,
      saleTag: "Sale 60%"
    }
  ];

  const gourmetEssentials: Product[] = [
    {
      name: "Namkeen Tea (Kashmiri Noon Chai) | Traditional Blend",
      brand: "KASHMIRCART™",
      price: "₹450.00",
      image: "/images/gourmet-noon-chai.jpg",
      saleTag: "Up to 25%"
    },
    {
      name: "Jumbo Gucchi Mushrooms From KASHMIR | Handpicked Wild Delicacy",
      brand: "KASHMIRCART™",
      rating: 5.00,
      price: "₹1,500.00",
      image: "/images/gourmet-gucchi.jpg",
      hot: true,
      saleTag: "Up to 17%"
    },
    {
      name: "Himalayan Vintage Kahwa – Heritage Botanical Blend",
      brand: "KASHMIRCART™",
      originalPrice: "₹950.00",
      price: "₹650.00",
      image: "/images/gourmet-kahwa.webp",
      saleTag: "Sale 32%"
    }
  ];

  const collectionsList = [
    { title: "Pure Kashmiri Saffron", desc: "Authentic Pampore Mongra saffron renowned for aroma, color and purity." },
    { title: "Markhor Shilajit", desc: "Lab-tested Himalayan Shilajit resin sourced from high-altitude mountains." },
    { title: "Raw Himalayan Honey", desc: "Natural forest honey collected from pristine Himalayan landscapes." },
    { title: "Premium Kashmiri Nuts", desc: "Fresh almonds, walnuts and nutrient-rich dry fruits from Kashmir." },
    { title: "Kashmiri Kehwa & Tea", desc: "Traditional saffron-infused tea blends inspired by Kashmiri heritage." },
    { title: "Raya Ayurveda Skin Care", desc: "Ayurvedic skincare crafted with saffron, herbs and natural botanicals." },
    { title: "Pahadi Garlic", desc: "Mountain-grown garlic valued for traditional wellness benefits." },
    { title: "Gucci Mushrooms", desc: "Rare wild Himalayan mushrooms treasured for culinary excellence." },
    { title: "Lavender Oil", desc: "Premium essential oil distilled from Kashmir lavender fields." }
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1E120C] font-sans overflow-x-hidden selection:bg-[#8B0000] selection:text-white">
      <Navbar />
      
      {/* 1. Schema Structure for Google Merchant Optimization */}
      <Script id="schema-org" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "KashmirCart",
          "url": "https://www.kashmircart.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.kashmircart.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        })}
      </Script>

      {/* 2. Hero Presentation Section (UNTOUCHED) */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#2C1E16]/90 z-10" /> 
        <Image
          src="/images/hero-kashmir-authentic.jpg" 
          alt="Breathtaking landscape view of dynamic authentic Kashmiri saffron fields"
          fill
          className="object-cover object-center scale-105 transition-transform duration-1000"
          priority
        />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative z-20 text-center px-6 max-w-5xl mx-auto space-y-6"
        >
          <span className="text-[#D4AF37] font-medium tracking-[0.25em] text-xs md:text-sm uppercase block bg-white/5 backdrop-blur-md px-4 py-2 rounded-full w-max mx-auto border border-white/10">
            Farmers From Pampore, Kashmir • Authentic Himalayan Products
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif text-white tracking-tight leading-none drop-shadow-xl">
            Kashmir's Finest.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#f7e39e] to-[#D4AF37]">Delivered Across India.</span>
          </h1>
          <p className="text-base md:text-xl text-[#F9F6F0]/90 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            100% Authentic, deeply rooted in heritage. Explore premium Saffron, pristine Shilajit, raw forest honey, and organic nutrition.
          </p>
          <div className="pt-4">
            <button className="bg-[#8B0000] text-[#F9F6F0] px-8 py-4 rounded-sm text-sm font-semibold tracking-widest uppercase transition-all border border-[#D4AF37]/40 shadow-2xl hover:bg-[#6b0000] hover:border-[#D4AF37] transform hover:-translate-y-0.5 active:translate-y-0">
              Explore the Heritage Collection
            </button>
          </div>
        </motion.div>
      </section>

      {/* 3. Dynamic Infinite Premium Ticker Ribbon */}
      <div className="bg-[#170E0A] border-y border-[#D4AF37]/20 py-4 overflow-hidden shadow-sm">
        <div className="flex whitespace-nowrap space-x-16 animate-marquee text-[#D4AF37]/90 uppercase text-[11px] tracking-[0.25em] font-medium">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="inline-flex space-x-16 shrink-0">
              <span>PREMIUM COLLECTION</span> <span>•</span>
              <span>AUTHENTIC KASHMIRI PRODUCTS</span> <span>•</span>
              <span>FAST SHIPPING ACROSS INDIA</span> <span>•</span>
              <span>LOVED BY THOUSANDS OF CUSTOMERS</span> <span>•</span>
              <span>ISO CERTIFIED COMPANY</span> <span>•</span>
              <span>LAB TESTED PRODUCTS</span> <span>•</span>
              <span>DIRECT FROM KASHMIR</span>
            </span>
          ))}
        </div>
      </div>

      {/* 4. Luxury Trust Matrix Grid */}
      <section className="bg-white text-[#2C1E16] py-14 border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <h4 className="text-4xl font-serif font-light text-[#8B0000]">2016</h4>
              <p className="text-[11px] uppercase tracking-[0.15em] text-gray-500 font-medium">Serving Online Since</p>
            </div>
            <div className="space-y-1 md:border-l border-gray-100">
              <h4 className="text-4xl font-serif font-light text-[#8B0000]">ISO</h4>
              <p className="text-[11px] uppercase tracking-[0.15em] text-gray-500 font-medium">Certified Systems</p>
            </div>
            <div className="space-y-1 md:border-l border-gray-100">
              <h4 className="text-4xl font-serif font-light text-[#8B0000]">100%</h4>
              <p className="text-[11px] uppercase tracking-[0.15em] text-gray-500 font-medium">Lab Tested Integrity</p>
            </div>
            <div className="space-y-1 md:border-l border-gray-100">
              <h4 className="text-4xl font-serif font-light text-[#8B0000]">Pan-IN</h4>
              <p className="text-[11px] uppercase tracking-[0.15em] text-gray-500 font-medium">Nationwide Delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Clean Sophisticated Brand Narrative */}
      <section className="py-24 bg-gradient-to-b from-[#FAF8F5] to-white relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8B0000]/5 rounded-full text-[#8B0000] text-xs tracking-widest uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000]" />
              Direct From Kashmir Valleys
            </div>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-[#2C1E16] max-w-2xl mx-auto leading-tight">
              Preserving the Authentic Purity of the Himalayas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-gray-600 font-normal text-base leading-relaxed pt-4">
              <p className="bg-white p-6 rounded-sm border border-gray-100 shadow-xs">
                <strong>KashmirCart</strong> was founded with a simple mission — to bring genuine Kashmiri products directly from the valleys of Kashmir to homes across India. What began with our family's connection to the saffron fields of Pampore has grown into one of India's trusted destinations for authentic Himalayan wellness, nutrition, and traditional products.
              </p>
              <p className="bg-white p-6 rounded-sm border border-gray-100 shadow-xs">
                Every product is carefully sourced from local farmers, growers, beekeepers, and artisans across Kashmir. From GI-tagged Kashmiri Saffron and Himalayan Markhor Shilajit to forest honey, premium dry fruits, Kehwa, lavender oil, natural skincare, and wellness essentials, each item reflects the heritage, purity, and traditions of the Himalayan region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Modular Visual Grid Directory Overviews */}
      {/* <section className="py-20 bg-[#F5F2EC]/60 border-y border-gray-200/40">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-[#8B0000] text-xs font-bold uppercase tracking-widest block">Curated Categories</span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-[#2C1E16]">Explore Our Collections</h2>
            <p className="text-gray-500 font-light text-sm">
              Discover premium source-verified assets gathered across remote Himalayan territories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collectionsList.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xs border border-gray-200/50 shadow-xs transition-all duration-300 hover:shadow-md group flex flex-col justify-between hover:border-[#8B0000]/20">
                <div>
                  <h3 className="font-serif text-lg text-[#2C1E16] mb-1.5 group-hover:text-[#8B0000] transition-colors font-medium">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">{item.desc}</p>
                </div>
                <div className="pt-4 flex items-center text-[11px] uppercase font-bold tracking-wider text-[#8B0000] opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop Category →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 7. E-COMMERCE ELEGANCE ROW 1: Bestselling Flagships (Exactly 3 Products) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 border-b border-gray-100 pb-6">
            <div className="space-y-1">
              <span className="text-[#8B0000] text-xs font-semibold uppercase tracking-widest block">Highly Requested</span>
              <h2 className="text-2xl md:text-4xl font-serif tracking-tight text-[#2C1E16]">Bestselling Heritage Vault</h2>
            </div>
            <p className="text-gray-400 font-light text-xs max-w-xs mt-2 sm:text-right sm:mt-0">
              Guaranteed genuine products shipped directly under verified clean tracking logs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bestSellers.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Editorial Focal Showcase Block */}
      <section className="py-24 bg-[#1E120C] text-[#FAF8F5] relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#8B0000]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative h-[480px] w-full rounded-xs overflow-hidden bg-black/20 group border border-white/5 p-2">
              <Image 
                src="/images/detailed-saffron-product.jpg" 
                alt="Close-up macro showcasing raw authentic saffron elements" 
                fill 
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-[#D4AF37] font-semibold tracking-[0.2em] text-xs uppercase block">Featured Harvest Profile</span>
              <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight">Premium Super Negin Saffron</h2>
              <p className="text-gray-300 font-light text-base leading-relaxed">
                Harvested meticulously by hand in the premium misty parameters of Pampore, our authentic saffron filaments guarantee unparalleled organic depth, rich thematic aroma levels, and highly concentrated organic crocin structural density metrics. Completely unadulterated.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                <div className="space-y-1">
                  <h4 className="font-serif text-[#D4AF37] text-base font-medium">Purity Verification Baseline</h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">ISO 3632 Category 1 Certified configuration. 100% genuine select red stigmas.</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-[#D4AF37] text-base font-medium">Systemic Wellness Properties</h4>
                  <p className="text-xs text-gray-400 font-light">Abundant trace biochemical antioxidants, perfect layout supporting daily vital mood balance metrics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. E-COMMERCE ELEGANCE ROW 2: RAYA Ayurveda Skincare Line (Exactly 3 Products) */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[#8B0000] text-xs font-bold uppercase tracking-widest block">Pure Ayurveda • Premium Skincare</span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-[#1E120C]">RAYA Ayurveda Skincare Collection</h2>
            <p className="text-gray-500 font-light text-sm max-w-xl mx-auto">
              Luxurious topical formulas traditional rituals combined with modern skin safety benchmarks to restore cellular radiance naturally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skincareProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. E-COMMERCE ELEGANCE ROW 3: Gourmet & Rare Essentials (Exactly 3 Products) */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 border-b border-gray-100 pb-6">
            <div className="space-y-1">
              <span className="text-[#8B0000] text-xs font-semibold uppercase tracking-widest block">Himalayan Delicacies</span>
              <h2 className="text-2xl md:text-4xl font-serif tracking-tight text-[#2C1E16]">Gourmet & Rare Essentials</h2>
            </div>
            <span className="text-xs text-gray-400 font-light tracking-wider mt-1 sm:mt-0">
              Strict culinary quality certification parameters apply.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gourmetEssentials.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// Redesigned Reusable E-commerce Product Card Component
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white border border-gray-200/70 rounded-xs overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-xl hover:border-gray-300 group relative">
      
      {/* Decorative Labels */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 pointer-events-none">
        {product.saleTag && (
          <span className="bg-[#8B0000] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 shadow-sm rounded-xs">
            {product.saleTag}
          </span>
        )}
        {product.hot && (
          <span className="bg-[#1E120C] text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 shadow-sm rounded-xs">
            Hot Choice
          </span>
        )}
      </div>
      
      {/* Product Image Window */}
      <div className="relative h-80 w-full bg-[#FAF8F5] overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-neutral-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          sizes="(max-w-768px) 100vw, 33vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-102"
        />
      </div>

      {/* Contextual Info Panel */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#8B0000] tracking-widest font-bold uppercase">
              {product.brand}
            </span>
            
            {product.rating && (
              <div className="flex items-center space-x-1">
                <span className="text-[#D4AF37] text-xs">★</span>
                <span className="text-[11px] text-gray-500 font-medium">{product.rating}</span>
              </div>
            )}
          </div>
          
          <h3 className="font-serif text-sm text-[#1E120C] tracking-tight line-clamp-2 leading-relaxed transition-colors duration-300 group-hover:text-[#8B0000]">
            {product.name}
          </h3>
        </div>

        {/* Pricing Layout Structure */}
        <div className="pt-3 border-t border-gray-100 space-y-3">
          <div className="flex items-baseline space-x-2">
            <span className="text-lg font-sans font-semibold text-[#1E120C] tracking-tight">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through font-light">
                {product.originalPrice}
              </span>
            )}
          </div>

          {/* High-Conversion "Add to Cart" Layout Action Block */}
          <button className="w-full bg-[#1E120C] text-white text-[11px] uppercase tracking-[0.18em] font-semibold py-3 transition-all duration-300 hover:bg-[#8B0000] active:scale-[0.98] shadow-xs hover:shadow-md rounded-xs flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}