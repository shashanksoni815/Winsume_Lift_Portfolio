import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import React from 'react';

interface CartItem {
  id: string;
  name: string;
  category: string;
  type: string;
  image: string;
  price: number;
  quantity: number;
  unitPrice: number;
}

export function InquiryListPage() {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const isEmpty = cartItems.length === 0;

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change), price: item.unitPrice * Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const totalEstimate = subtotal;

  // Demo function to add sample items (for testing both states)
  const addSampleItem = () => {
    const sampleItems: CartItem[] = [
      {
        id: '1',
        name: 'Sovereign MRL Elevator',
        category: 'ELECTRONIC',
        type: 'RESIDENTIAL',
        image: 'https://images.unsplash.com/photo-1562184552-681ff5dff8b0?w=400',
        price: 1850000,
        quantity: 1,
        unitPrice: 1850000,
      },
      {
        id: '2',
        name: 'Imperial Hydraulic Lift',
        category: 'HYDRAULIC',
        type: 'COMMERCIAL',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
        price: 2250000,
        quantity: 1,
        unitPrice: 2250000,
      },
      {
        id: '3',
        name: 'Majestic Glass Elevator',
        category: 'ELECTRONIC',
        type: 'LUXURY',
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400',
        price: 3500000,
        quantity: 1,
        unitPrice: 3500000,
      }
    ];
    setCartItems(sampleItems);
  };

  return (
    <div className="min-h-screen bg-[#1a3332]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 pt-32">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1772721559246-286e6d986d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGV2YXRvciUyMGNhYmluJTIwaW50ZXJpb3IlMjBnb2xkfGVufDF8fHx8MTc3MzIzNjYyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Inquiry List"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a3332]/85 via-[#1a3332]/75 to-[#1a3332]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-orange-500 text-sm uppercase tracking-widest mb-4"
          >
            Selection Summary
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-['Great_Vibes'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6"
          >
            Inquiry List
          </motion.h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-[#2a4544]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Side - Inquiry List */}
            <div className="lg:col-span-2">
              {isEmpty ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-center py-20 bg-[#1a3332]/30 rounded-lg border border-white/5"
                >
                  <p className="text-white/60 mb-8 text-lg">Your consultation list is empty.</p>
                  <button
                    onClick={() => navigate('/collection')}
                    className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all uppercase tracking-wider text-sm shadow-lg hover:shadow-xl"
                  >
                    Continue Browsing
                  </button>
                  
                  {/* Demo Button - For Testing Both States */}
                  <div className="mt-8">
                    <button
                      onClick={addSampleItem}
                      className="bg-[#2a4544] text-white/60 px-6 py-2 rounded-full hover:bg-[#1a3332] hover:text-white transition-all uppercase tracking-wider text-xs border border-white/10"
                    >
                      Add Demo Items (Testing)
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-[#1a3332] border border-orange-500/20 rounded-lg p-6 flex items-start gap-6 hover:border-orange-500/40 transition-all"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-32 h-32 object-cover rounded border border-white/10"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <h3 className="text-white text-xl mb-2">{item.name}</h3>
                        <p className="text-orange-500/80 text-xs uppercase tracking-widest mb-6">
                          {item.category} • {item.type}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4 mt-6">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-10 h-10 bg-[#2a4544] border border-orange-500/30 rounded flex items-center justify-center text-white/80 hover:text-white hover:bg-orange-500/20 hover:border-orange-500 transition-all"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-white font-semibold w-12 text-center text-lg">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-10 h-10 bg-[#2a4544] border border-orange-500/30 rounded flex items-center justify-center text-white/80 hover:text-white hover:bg-orange-500/20 hover:border-orange-500 transition-all"
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-10 h-10 bg-[#2a4544] border border-white/20 rounded flex items-center justify-center text-white/60 hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10 transition-all ml-3"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex-shrink-0 text-right">
                        <p className="text-orange-500 text-3xl font-semibold mb-2">₹{item.price.toLocaleString()}</p>
                        <p className="text-white/50 text-xs uppercase tracking-wider">UNIT: ₹{item.unitPrice.toLocaleString()}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Summary Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#1a3332] border border-orange-500/20 rounded-lg p-8 sticky top-32 shadow-xl"
              >
                <p className="text-orange-500/80 text-xs uppercase tracking-wider mb-6">Total Estimated Investment</p>
                
                <div className="mb-8">
                  <div className="flex items-baseline mb-6">
                    <span className="text-orange-500 text-5xl">₹{totalEstimate.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8 pt-6 border-t border-white/10">
                  <p className="text-white/70 text-xs uppercase tracking-wider mb-3">Estimated Proposal</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Subtotal</span>
                    <span className="text-white">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Technical Fee</span>
                    <span className="text-white">Complimentary</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mb-6">
                  <div className="flex justify-between mb-6">
                    <span className="text-white/80 uppercase text-xs tracking-wider">Total Estimate</span>
                    <span className="text-orange-500 text-2xl">₹{totalEstimate.toLocaleString()}</span>
                  </div>
                </div>

                <button className="w-full bg-orange-500 text-white py-4 rounded-full hover:bg-orange-600 transition-all shadow-lg font-semibold uppercase tracking-wider text-sm hover:shadow-xl" onClick={() => navigate('/checkout')}>
                  Send Inquiry →
                </button>

                <p className="text-white/40 text-xs text-center mt-6 leading-relaxed">
                  * This is a preliminary estimate. Final pricing will be confirmed after site inspection.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}