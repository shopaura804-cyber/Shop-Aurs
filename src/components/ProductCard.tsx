import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-polish group flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-aura-bg rounded-lg mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-aura-ink/5 group-hover:bg-transparent transition-colors duration-300" />
        
        <button
          onClick={() => onAddToCart(product)}
          className="absolute bottom-3 right-3 bg-aura-accent hover:bg-aura-accent-hover text-white p-3 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto"
        >
          <ShoppingBag size={18} />
        </button>
      </div>
      
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-aura-ink text-sm leading-snug">{product.name}</h3>
          <span className="font-bold text-aura-accent text-sm ml-2">${product.price}</span>
        </div>
        <p className="text-[10px] text-aura-muted uppercase tracking-wider font-semibold">{product.category}</p>
        
        <div className="mt-auto pt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-medium text-aura-muted underline underline-offset-2 cursor-pointer hover:text-aura-accent">View Details</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
