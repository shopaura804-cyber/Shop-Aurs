import { motion } from 'motion/react';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';

interface NavbarProps {
  onCartOpen: () => void;
  cartCount: number;
}

export default function Navbar({ onCartOpen, cartCount }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-aura-border h-18">
      <div className="max-w-7xl mx-auto px-10 h-full flex items-center justify-between">
        <div className="flex-1 hidden md:flex items-center gap-10">
          <a href="#" className="nav-link text-aura-accent">Home</a>
          <a href="#" className="nav-link">Collections</a>
          <a href="#" className="nav-link">New Arrivals</a>
          <a href="#" className="nav-link">About</a>
        </div>

        <button className="md:hidden flex-1">
          <Menu size={20} strokeWidth={2} className="text-aura-muted hover:text-aura-ink" />
        </button>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-shrink-0"
        >
          <span className="text-2xl font-bold tracking-tight text-aura-ink">SHOP<span className="text-aura-accent">AURA</span></span>
        </motion.div>

        <div className="flex-1 flex items-center justify-end gap-6">
          <div className="relative hidden lg:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={14} className="text-aura-muted" />
            </div>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-aura-bg border-none rounded-full py-2 pl-10 pr-4 text-xs w-48 focus:ring-2 focus:ring-aura-accent transition-all outline-none"
            />
          </div>
          
          <button className="hidden sm:block text-aura-muted hover:text-aura-ink transition-colors">
            <User size={20} strokeWidth={1.5} />
          </button>
          
          <button 
            onClick={onCartOpen}
            className="flex items-center gap-2 text-aura-muted hover:text-aura-ink transition-colors relative"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-1 -right-1 bg-aura-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
