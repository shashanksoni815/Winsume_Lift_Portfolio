// import { RouterProvider } from 'react-router';
// import React from 'react';
// import { router } from './routes';
// import { CartProvider } from './context/CartContext';

// export default function App() {
//   return (
//     <CartProvider>
//       <RouterProvider router={router} />
//     </CartProvider>
//   );
// }

import { RouterProvider } from 'react-router';
import React from 'react';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import WhatsAppFloat from './components/WhatsAppFloat'; // ✅ ADD

export default function App() {
  return (
    <CartProvider>
      <>
        <RouterProvider router={router} />
        <WhatsAppFloat /> {/* ✅ ADD ONLY THIS */}
      </>
    </CartProvider>
  );
}