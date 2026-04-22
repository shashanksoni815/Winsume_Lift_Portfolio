import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import React from 'react';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const technicalFee = 0;
  const total = subtotal + technicalFee;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Build the cart payload to forward to the inquiry page
  const buildCartPayload = () => ({
    items: cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      specifications: item.specifications,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      lineTotal: item.price * item.quantity,
    })),
    subtotal,
    technicalFee,
    total,
    formattedTotal: formatPrice(total),
  });

  const handleSendInquiry = () => {
    navigate('/inquiry', {
      state: {
        cartData: buildCartPayload(),
      },
    });
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
            <p className="text-orange-500 text-sm uppercase tracking-widest mb-4 text-center">
              SELECTION SUMMARY
            </p>
            <h1 className="font-['Great_Vibes'] text-5xl md:text-6xl lg:text-7xl text-white text-center mb-8">
              Your Inquiry List
            </h1>

            <div className="flex justify-center mb-8">
              <div className="text-center">
                <p className="text-white/60 text-xs uppercase tracking-wider mb-2">
                  TOTAL ESTIMATED INVESTMENT
                </p>
                <p className="text-orange-500 text-4xl md:text-5xl">
                  ₹{(total / 100000).toFixed(1)}L
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-[#2a4544]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cartItems.length === 0 ? (
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

              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-[#1a3332]/60 backdrop-blur-sm border border-white/10 rounded-lg p-8 sticky top-32"
                >
                  <p className="text-orange-500/80 text-xs uppercase tracking-widest mb-8">
                    ESTIMATED PROPOSAL
                  </p>

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
                      <span className="text-orange-500/80 text-xs uppercase tracking-widest">
                        TOTAL ESTIMATE
                      </span>
                      <span className="text-white text-2xl">₹0</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSendInquiry}
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 rounded-sm hover:from-orange-700 hover:to-orange-600 transition-all uppercase tracking-[0.2em] text-xs mb-6 flex items-center justify-center gap-2"
                  >
                    SEND INQUIRY <ArrowRight size={14} />
                  </button>

                  <div className="bg-[#1a3332]/40 border border-white/10 rounded-sm p-4">
                    <p className="text-white/40 text-[10px] leading-relaxed text-center uppercase tracking-wide">
                      *There is a consultation convenience, made selection will be finalized after site
                      inspection.
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
                      <div className="md:col-span-1">
                        <div className="relative aspect-square overflow-hidden rounded-lg group">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-3 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="text-orange-500 text-xs uppercase tracking-wider mb-2">
                                {item.category}
                              </p>
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

                        <div className="flex items-center gap-4">
                          <p className="text-white/60 text-xs uppercase tracking-wider">Quantity</p>
                          <div className="flex items-center gap-3 bg-[#2a4544] border border-white/10 px-4 py-2 rounded">
                            <button
                              onClick={() =>
                                item.quantity === 1
                                  ? removeFromCart(item.id)
                                  : updateQuantity(item.id, -1)
                              }
                              className="text-white/60 hover:text-orange-500 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-white font-semibold w-6 text-center text-sm">
                              {item.quantity}
                            </span>
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
                  <p className="text-orange-500/80 text-xs uppercase tracking-widest mb-8">
                    ESTIMATED PROPOSAL
                  </p>

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
                      <span className="text-orange-500/80 text-xs uppercase tracking-widest">
                        TOTAL ESTIMATE
                      </span>
                      <span className="text-white text-2xl">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSendInquiry}
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 rounded-sm hover:from-orange-700 hover:to-orange-600 transition-all uppercase tracking-[0.2em] text-xs mb-6 flex items-center justify-center gap-2"
                  >
                    SEND INQUIRY <ArrowRight size={14} />
                  </button>

                  <div className="bg-[#1a3332]/40 border border-white/10 rounded-sm p-4">
                    <p className="text-white/40 text-[10px] leading-relaxed text-center uppercase tracking-wide">
                      *There is a consultation convenience, made selection will be finalized after site
                      inspection.
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

// import React, { useMemo } from "react";
// import { Navigation } from "../components/Navigation";
// import { Footer } from "../components/Footer";
// import { motion } from "motion/react";
// import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
// import { ImageWithFallback } from "../components/figma/ImageWithFallback";
// import { useNavigate } from "react-router";
// import { useCart } from "../context/CartContext";

// export function CartPage() {
//   const navigate = useNavigate();
//   const { cartItems, updateQuantity, removeFromCart } = useCart();

//   // ─────────────────────────────────────────
//   // 🔥 CALCULATIONS (optimized)
//   // ─────────────────────────────────────────
//   const { subtotal, total } = useMemo(() => {
//     const sub = cartItems.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
//     return {
//       subtotal: sub,
//       total: sub, // extend later if needed
//     };
//   }, [cartItems]);

//   const formatPrice = (price: number) =>
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(price);

//   // ─────────────────────────────────────────
//   // 🔥 BUILD CART PAYLOAD (BACKEND READY)
//   // ─────────────────────────────────────────
//   const buildCartPayload = () => ({
//     items: cartItems.map((item) => ({
//       productId: item.id, // ✅ FIXED
//       name: item.name,
//       category: item.category,
//       specifications: item.specifications,
//       price: item.price,
//       quantity: item.quantity,
//       image: item.image,
//       lineTotal: item.price * item.quantity,
//     })),
//     subtotal,
//     total,
//   });

//   // ─────────────────────────────────────────
//   // 🚀 SEND INQUIRY
//   // ─────────────────────────────────────────
//   const handleSendInquiry = () => {
//     if (!cartItems.length) return;

//     navigate("/inquiry", {
//       state: {
//         cartData: buildCartPayload(),
//       },
//     });
//   };

//   // ─────────────────────────────────────────
//   // 🧾 EMPTY STATE
//   // ─────────────────────────────────────────
//   if (!cartItems.length) {
//     return (
//       <div className="min-h-screen bg-[#1a3332]">
//         <Navigation />

//         <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
//           <h2 className="text-3xl text-white mb-4">
//             Your Inquiry List is Empty
//           </h2>
//           <p className="text-white/50 mb-8">
//             Explore our premium lift collection and add products.
//           </p>

//           <button
//             onClick={() => navigate("/collection")}
//             className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition"
//           >
//             Explore Collection
//           </button>
//         </div>

//         <Footer />
//       </div>
//     );
//   }

//   // ─────────────────────────────────────────
//   // 🛒 MAIN UI
//   // ─────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-[#1a3332]">
//       <Navigation />

//       {/* Header */}
//       <section className="py-24 text-center">
//         <p className="text-orange-500 text-xs tracking-widest mb-3">
//           SELECTION SUMMARY
//         </p>

//         <h1 className="text-5xl text-white mb-6 font-['Great_Vibes']">
//           Your Inquiry List
//         </h1>

//         <p className="text-orange-500 text-3xl">
//           {formatPrice(total)}
//         </p>
//       </section>

//       {/* Content */}
//       <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10 pb-20">

//         {/* LEFT: ITEMS */}
//         <div className="lg:col-span-2 space-y-5">
//           {cartItems.map((item, index) => (
//             <motion.div
//               key={item.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.05 }}
//               className="bg-[#1a3332] border border-white/10 rounded-xl p-6 flex gap-6"
//             >
//               {/* IMAGE */}
//               <div className="w-28 h-28 rounded-lg overflow-hidden">
//                 <ImageWithFallback
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {/* DETAILS */}
//               <div className="flex-1">
//                 <h3 className="text-white text-lg mb-1">{item.name}</h3>
//                 <p className="text-white/40 text-sm mb-3">
//                   {item.specifications}
//                 </p>

//                 <p className="text-orange-500 text-xl mb-4">
//                   {formatPrice(item.price)}
//                 </p>

//                 {/* QUANTITY */}
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() =>
//                       item.quantity === 1
//                         ? removeFromCart(item.id)
//                         : updateQuantity(item.id, -1)
//                     }
//                   >
//                     <Minus />
//                   </button>

//                   <span className="text-white">{item.quantity}</span>

//                   <button onClick={() => updateQuantity(item.id, 1)}>
//                     <Plus />
//                   </button>

//                   {/* REMOVE */}
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="ml-auto text-red-400"
//                   >
//                     <Trash2 />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* RIGHT: SUMMARY */}
//         <div className="bg-[#1a3332] border border-white/10 rounded-xl p-6 sticky top-24 h-fit">

//           <h3 className="text-white mb-6">Order Summary</h3>

//           <div className="flex justify-between mb-3">
//             <span className="text-white/60">Subtotal</span>
//             <span className="text-white">{formatPrice(subtotal)}</span>
//           </div>

//           <div className="flex justify-between mb-6">
//             <span className="text-white/60">Total</span>
//             <span className="text-orange-500 text-xl">
//               {formatPrice(total)}
//             </span>
//           </div>

//           <button
//             onClick={handleSendInquiry}
//             className="w-full bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 flex items-center justify-center gap-2"
//           >
//             Send Inquiry <ArrowRight size={16} />
//           </button>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }