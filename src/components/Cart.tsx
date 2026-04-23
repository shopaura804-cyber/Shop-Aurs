import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: { product: Product; quantity: number }[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 overflow-hidden"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-aura-border flex justify-between items-center">
              <h2 className="text-2xl font-extrabold tracking-tight">Your Cart</h2>
              <button onClick={onClose} className="p-2 hover:bg-aura-bg rounded-xl transition-colors">
                <X size={20} className="text-aura-muted" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 text-aura-muted">
                  <div className="w-16 h-16 bg-aura-bg rounded-full flex items-center justify-center">
                    <ShoppingBag size={32} strokeWidth={1.5} />
                  </div>
                  <p className="font-medium text-sm">Your cart is feeling light.</p>
                  <button onClick={onClose} className="text-aura-accent font-bold text-xs uppercase tracking-widest hover:underline">
                    Browse Arrivals
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.product.id} 
                    className="flex gap-4 border-b border-aura-border pb-6"
                   >
                    <div className="w-20 h-24 bg-aura-bg rounded-lg overflow-hidden flex-shrink-0 border border-aura-border">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-0.5">
                        <h3 className="text-sm font-bold text-aura-ink">{item.product.name}</h3>
                        <p className="text-[10px] text-aura-muted uppercase tracking-wider font-semibold">{item.product.category}</p>
                        <p className="text-sm font-bold text-aura-accent">${item.product.price}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-aura-bg rounded-lg p-1 border border-aura-border">
                          <button 
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 hover:bg-white rounded-md transition-all"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="mx-3 min-w-[1rem] text-center text-xs font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 hover:bg-white rounded-md transition-all"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.product.id)}
                          className="text-aura-muted hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-aura-border space-y-6 bg-aura-bg/30">
                <div className="flex justify-between items-end">
                  <span className="text-aura-muted font-bold text-[10px] uppercase tracking-widest">Subtotal</span>
                  <span className="text-2xl font-extrabold tracking-tight">${total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-aura-accent text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-aura-accent-hover transition-all shadow-lg shadow-aura-accent/20 active:scale-[0.98]">
                  Complete Orders
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
