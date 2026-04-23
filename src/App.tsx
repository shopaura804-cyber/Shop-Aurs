import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Instagram, Twitter, Facebook } from 'lucide-react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { PRODUCTS } from './constants';
import { Product } from './types';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);

  const addToCart = useCallback((product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== id));
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen">
      <Navbar onCartOpen={() => setCartOpen(true)} cartCount={totalItems} />
      
      <Cart 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      {/* Hero Section */}
      <section className="relative h-[420px] bg-aura-ink overflow-hidden flex items-center mt-18">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-40">
          <div className="absolute inset-0 bg-gradient-to-l from-aura-ink to-transparent z-10" />
          <motion.div 
            initial={{ rotate: 12, x: 100, scale: 1.5 }}
            animate={{ rotate: 12, x: 20, scale: 1.25 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full bg-aura-accent rounded-l-[100px]"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-10 w-full">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-aura-accent font-semibold tracking-widest text-xs uppercase mb-4 block"
          >
            Spring Edition 2026
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight"
          >
            Elevate Your Daily <br />
            <span className="text-aura-accent">Essentials.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-300 text-lg mb-8 leading-relaxed max-w-md font-light"
          >
            Discover our curated selection of premium craftsmanship designed for the modern minimal professional.
          </motion.p>
          <div className="flex gap-4">
            <button className="bg-aura-accent hover:bg-aura-accent-hover text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-aura-accent/20 active:scale-95">
              Shop Now
            </button>
            <button className="border border-white/20 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-bold transition-all active:scale-95">
              View Lookbook
            </button>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="max-w-7xl mx-auto px-10 py-16 md:py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-aura-ink tracking-tight">Featured Pieces</h2>
            <p className="text-aura-muted text-sm mt-1">Hand-picked selection of our top performers this week.</p>
          </div>
          <a href="#" className="hidden md:block text-aura-accent font-bold text-sm hover:underline transition-all">
            Browse all products &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PRODUCTS.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
            />
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-white border-y border-aura-border py-20">
        <div className="max-w-7xl mx-auto px-10 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl border border-aura-border">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200" 
              alt="Experience"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold tracking-tight">Crafted for the <br />modern minimal.</h2>
            <p className="text-aura-muted leading-relaxed font-medium">
              At Shop Aura, we prioritize functionality and refined aesthetics. 
              Our collection is curated to integrate seamlessly into your workspace and home.
            </p>
            <div className="flex gap-4">
              <button className="text-aura-ink font-bold text-sm border-b-2 border-aura-accent">
                Our Philosophy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-aura-border h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-10 w-full flex flex-col md:flex-row justify-between items-center gap-4 py-6 md:py-0">
          <div className="flex items-center gap-6 text-[11px] font-medium text-aura-muted">
            <span>&copy; 2026 Shop Aura Inc.</span>
            <a href="#" className="hover:text-aura-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-aura-accent transition-colors">Terms of Service</a>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 font-bold text-[11px] text-aura-ink uppercase tracking-wider">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              Store Operational
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
