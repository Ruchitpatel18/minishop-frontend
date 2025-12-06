'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

// Define types for clarity and safety
interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: {
    id: number;
    title: string;
    price: number;
    image: string;
  }) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// --- Cart Provider Component ---
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 1. Load from localStorage on initial mount (Client-side)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('minishop_cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, []);

  // 2. Save to localStorage whenever cartItems changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('minishop_cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // --- Cart Operations ---

  const addToCart = useCallback((product: { id: number; title: string; price: number; image: string }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Item exists, increase quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // New item, add to cart
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  // --- Total Price Calculation ---

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const contextValue = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  }), [cartItems, addToCart, removeFromCart, updateQuantity, cartTotal]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// --- Custom Hook to Use Cart ---
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}