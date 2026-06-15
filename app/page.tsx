import Image from "next/image";
import Script from "next/script";
import * as motion from "framer-motion/client";
import type { Variants } from "framer-motion";
import Navbar from "./components/Navbar";

// SEO Metadata following Google Guidelines
export const metadata = {
  title: "Premium Kashmiri Heritage | Authentic Saffron, Pashmina & Crafts",
  description: "Experience the true essence of Kashmir. Shop 100% authentic, high-quality Kashmiri Saffron, handcrafted Pashmina, and antique walnut wood crafts.",
  keywords: ["Kashmiri Saffron", "Authentic Pashmina", "Kashmir Handicrafts", "Buy Kashmiri products online"],
  openGraph: {
    title: "Premium Kashmiri Heritage",
    description: "Experience the true essence of Kashmir with our authentic products.",
    images: ["/images/og-kashmir-heritage.jpg"], // Replace with real image
  },
};

export default function Home() {
  // Animation Variants for smooth transitions
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <main className="min-h-screen bg-[#F9F6F0] text-[#2C1E16] font-sans">
      <Navbar/>
      {/* 1. Google Merchant & SEO Schema Structure (JSON-LD) */}
      <Script id="schema-org" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Kashmiri Heritage",
          "url": "https://www.yourdomain.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.yourdomain.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        })}
      </Script>

      {/* 2. Hero Section - The First Impression */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        {/* Note: Use a real, high-res image of Dal Lake at dawn or a vast Saffron field */}
        <div className="absolute inset-0 bg-black/40 z-10" /> 
        <Image
          src="/images/hero-kashmir-authentic.jpg" 
          alt="Breathtaking view of authentic Kashmiri landscape and heritage"
          fill
          className="object-cover"
          priority
        />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        >
          {/* Custom Vintage Motif Placeholder - Use an actual SVG here */}
          {/* <div className="flex justify-center mb-6">
            <Image src="/images/vintage-chinar-leaf.jpg" alt="Chinar Motif" width={100} height={100} />
          </div> */}
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-lg">
            The Soul of Kashmir, <br /> Delivered to You.
          </h1>
          <p className="text-lg md:text-xl text-[#F9F6F0] mb-10 font-light tracking-wide">
            100% Authentic, deeply rooted in heritage. Explore the finest Saffron, Pashmina, and antique craftsmanship.
          </p>
          <button className="bg-[#8B0000] text-[#F9F6F0] px-8 py-4 rounded-sm text-lg font-medium tracking-wider hover:bg-[#6b0000] transition-all border border-[#D4AF37]/30">
            Explore the Heritage
          </button>
        </motion.div>
      </section>

      {/* 3. Heritage & Authenticity Banner */}
      <section className="py-16 bg-[#2C1E16] text-[#F9F6F0] border-y-4 border-[#D4AF37]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {['Sourced from Valleys', 'Generations of Craft', 'Certified Authentic'].map((title, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="flex flex-col items-center">
              {/* Replace with customized vintage SVGs */}
              <div className="w-20 h-20 rounded-full border border-[#D4AF37] flex items-center justify-center mb-4 overflow-hidden">
                <Image src={"/images/vintage-chinar-leaf1.jpg"} alt={title} width={150} height={150} />
              </div>
              <h3 className="font-serif text-xl mb-2 text-[#D4AF37]">{title}</h3>
              <p className="font-light text-sm text-gray-300">
                Rigorous quality checks ensure you only receive the pure essence of our homeland.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. Detailed Category Structure */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-[#2C1E16] mb-4">Curated by Tradition</h2>
          <div className="h-0.5 w-24 bg-[#D4AF37] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'Pure Saffron', img: '/images/category-saffron.jpg', desc: 'Mongra & Lacha' },
            { name: 'Pashmina', img: '/images/category-pashmina.jpg', desc: 'Handwoven Art' },
            { name: 'Walnut Wood', img: '/images/category-wood.jpg', desc: 'Antique Carvings' },
            { name: 'Dry Fruits', img: '/images/category-nuts.jpg', desc: 'Organic & Rich' }
          ].map((cat, i) => (
            <motion.div 
              key={cat.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="group relative h-96 overflow-hidden border border-gray-200 cursor-pointer"
            >
              <Image src={cat.img} alt={`Premium ${cat.name}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-[#D4AF37] font-serif italic mb-1">{cat.desc}</p>
                <h3 className="text-2xl text-white font-serif">{cat.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Detailed Product Showcase (Like the reference link) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative h-[600px]"
          >
            {/* Real Image of Saffron packaging, high resolution */}
            <Image 
              src="/images/detailed-saffron-product.jpg" 
              alt="Detailed view of Premium Kashmiri Saffron" 
              fill 
              className="object-cover rounded-sm shadow-xl"
            />
            {/* Vintage Motif overlay corner */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[url('/icons/vintage-corner.svg')] bg-contain bg-no-repeat opacity-50 z-10" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <span className="text-[#8B0000] font-semibold tracking-widest text-sm uppercase">Featured Heritage</span>
            <h2 className="text-4xl font-serif text-[#2C1E16]">Premium Super Negin Saffron</h2>
            <p className="text-gray-600 leading-relaxed">
              Harvested by hand in the misty fields of Pampore, our Saffron guarantees unparalleled aroma, deep flavor, and maximum crocin levels. No additives, purely natural.
            </p>
            
            {/* Informative Structure */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div>
                <h4 className="font-serif text-[#D4AF37] text-lg mb-2">Purity Standard</h4>
                <p className="text-sm text-gray-600">ISO 3632 Category 1 Certified. 100% pure red stigmas.</p>
              </div>
              <div>
                <h4 className="font-serif text-[#D4AF37] text-lg mb-2">Health Benefits</h4>
                <p className="text-sm text-gray-600">Rich in antioxidants, supports mood balance and glowing skin.</p>
              </div>
            </div>

            <button className="mt-8 bg-[#2C1E16] text-[#F9F6F0] px-10 py-4 rounded-sm text-lg shadow-lg hover:bg-[#1a120d] transition-all w-full md:w-auto">
              View Complete Details
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}