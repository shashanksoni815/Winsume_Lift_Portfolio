import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const technicalFee = 0; // Complimentary
  const total = subtotal + technicalFee;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#1a3332]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 pt-32">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600"
            alt="Cart Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/85 via-[#1a3332]/75 to-[#1a3332]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-orange-500 text-sm uppercase tracking-widest mb-4 text-center">SELECTION SUMMARY</p>
            <h1 className="font-['Great_Vibes'] text-5xl md:text-6xl lg:text-7xl text-white text-center mb-8">
              Your Inquiry List
            </h1>
            
            {/* Total Investment - Centered */}
            <div className="flex justify-center mb-8">
              <div className="text-center">
                <p className="text-white/60 text-xs uppercase tracking-wider mb-2">TOTAL ESTIMATED INVESTMENT</p>
                <p className="text-orange-500 text-4xl md:text-5xl">₹{(total / 100000).toFixed(1)}L</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-[#2a4544]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cartItems.length === 0 ? (
            // Empty Cart
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 flex items-center justify-center py-20">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <p className="text-white/40 text-sm mb-8">Your consultation list is empty</p>
                  <button
                    onClick={() => navigate('/collection')}
                    className="border border-orange-500/40 text-orange-500 px-8 py-3 rounded-sm hover:bg-orange-500/10 transition-all uppercase tracking-[0.2em] text-xs"
                  >
                    CONTINUE BROWSING
                  </button>
                </motion.div>
              </div>

              {/* Right Side - Summary (Always Visible) */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-[#1a3332]/60 backdrop-blur-sm border border-white/10 rounded-lg p-8 sticky top-32"
                >
                  <p className="text-orange-500/80 text-xs uppercase tracking-widest mb-8">ESTIMATED PROPOSAL</p>
                  
                  <div className="space-y-6 mb-8 pb-8 border-b border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Subtotal</span>
                      <span className="text-white text-lg">₹0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Technical Fee</span>
                      <span className="text-white text-lg italic">Complimentary</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-orange-500/80 text-xs uppercase tracking-widest">TOTAL ESTIMATE</span>
                      <span className="text-white text-2xl">₹0</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 rounded-sm hover:from-orange-700 hover:to-orange-600 transition-all uppercase tracking-[0.2em] text-xs mb-6 flex items-center justify-center gap-2"
                  >
                    SEND INQUIRY <ArrowRight size={14} />
                  </button>

                  <div className="bg-[#1a3332]/40 border border-white/10 rounded-sm p-4">
                    <p className="text-white/40 text-[10px] leading-relaxed text-center uppercase tracking-wide">
                      *There is a consultation convenience, made selection will be finalized after site inspection.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Side - Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-[#1a3332]/60 backdrop-blur-sm border border-white/10 hover:border-orange-500/30 transition-all overflow-hidden rounded-lg"
                  >
                    <div className="grid md:grid-cols-4 gap-6 p-6">
                      {/* Product Image */}
                      <div className="md:col-span-1">
                        <div className="relative aspect-square overflow-hidden rounded-lg group">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="md:col-span-3 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="text-orange-500 text-xs uppercase tracking-wider mb-2">{item.category}</p>
                              <h3 className="text-white text-xl md:text-2xl mb-2">{item.name}</h3>
                              <p className="text-white/40 text-xs mb-3">{item.specifications}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-white/30 hover:text-red-500 transition-colors p-2"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          <p className="text-white text-2xl mb-4">{formatPrice(item.price)}</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <p className="text-white/60 text-xs uppercase tracking-wider">Quantity</p>
                          <div className="flex items-center gap-3 bg-[#2a4544] border border-white/10 px-4 py-2 rounded">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-white/60 hover:text-orange-500 transition-colors"
                              disabled={item.quantity === 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-white font-semibold w-6 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-white/60 hover:text-orange-500 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Side - Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-[#1a3332]/60 backdrop-blur-sm border border-white/10 rounded-lg p-8 sticky top-32"
                >
                  <p className="text-orange-500/80 text-xs uppercase tracking-widest mb-8">ESTIMATED PROPOSAL</p>
                  
                  <div className="space-y-6 mb-8 pb-8 border-b border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Subtotal</span>
                      <span className="text-white text-lg">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Technical Fee</span>
                      <span className="text-white text-lg italic">Complimentary</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-orange-500/80 text-xs uppercase tracking-widest">TOTAL ESTIMATE</span>
                      <span className="text-white text-2xl">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 rounded-sm hover:from-orange-700 hover:to-orange-600 transition-all uppercase tracking-[0.2em] text-xs mb-6 flex items-center justify-center gap-2"
                  >
                    SEND INQUIRY <ArrowRight size={14} />
                  </button>

                  <div className="bg-[#1a3332]/40 border border-white/10 rounded-sm p-4">
                    <p className="text-white/40 text-[10px] leading-relaxed text-center uppercase tracking-wide">
                      *There is a consultation convenience, made selection will be finalized after site inspection.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}