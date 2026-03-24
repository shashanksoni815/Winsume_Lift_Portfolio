import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import React from 'react';
export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
  specifications: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, change: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) return;
      try {
        const res = await fetch('https://winsume-lift-backend01.onrender.com/api/cart/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('userRole');
          localStorage.removeItem('isLoggedIn');
          return;
        }
        if (!res.ok) return;
        const data = await res.json().catch(() => null);
        const cart = data?.cart;
        if (!cart || !Array.isArray(cart.items)) return;
        const mapped: CartItem[] = cart.items.map((item: any) => {
          const rawImage = item.image ?? '';
          const image =
            typeof rawImage === 'string' && rawImage.startsWith('/uploads')
              ? `https://winsume-lift-backend01.onrender.com${rawImage}`
              : rawImage;
          return {
            id: item._id,
            name: item.name ?? '',
            category: item.category ?? '',
            price: item.price ?? 0,
            image,
            quantity: item.quantity ?? 1,
            specifications: item.specifications ?? '',
          };
        });
        setCartItems(mapped);
      } catch {
        // ignore cart load errors
      }
    };
    loadCart();
  }, []);

  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('Please log in before adding items to consultation.');
      return;
    }

    try {
      const res = await fetch('https://winsume-lift-backend01.onrender.com/api/cart/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ productId: item.id }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        const message = errData?.message || 'Failed to add item to consultation.';
        alert(message);
        return;
      }
      const data = await res.json().catch(() => null);
      const cart = data?.cart;
      if (!cart || !Array.isArray(cart.items)) return;
      const mapped: CartItem[] = cart.items.map((ci: any) => {
        const rawImage = ci.image ?? '';
        const image =
          typeof rawImage === 'string' && rawImage.startsWith('/uploads')
            ? `https://winsume-lift-backend01.onrender.com${rawImage}`
            : rawImage;
        return {
          id: ci._id,
          name: ci.name ?? '',
          category: ci.category ?? '',
          price: ci.price ?? 0,
          image,
          quantity: ci.quantity ?? 1,
          specifications: ci.specifications ?? '',
        };
      });
      setCartItems(mapped);
    } catch {
      alert('Unable to add item right now. Please try again.');
    }
  };

  const removeFromCart = async (id: string) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
      return;
    }

    try {
      await fetch(`https://winsume-lift-backend01.onrender.com/api/cart/items/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch {
      // ignore backend error, still update UI
    }

    setCartItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = async (id: string, change: number) => {
    const accessToken = localStorage.getItem('accessToken');

    let newQuantity = 1;
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );

    if (!accessToken) return;

    try {
      await fetch(`https://winsume-lift-backend01.onrender.com/api/cart/items/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
    } catch {
      // ignore backend error
    }
  };

  const clearCart = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        await fetch('https://winsume-lift-backend01.onrender.com/api/cart/me', {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch {
        // ignore errors
      }
    }

    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
