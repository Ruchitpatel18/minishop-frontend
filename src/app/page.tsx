'use client';

import { useState } from 'react'; 
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import ProductListContainer from './components/ProductListContainer';

export default function HomePage() {
  // State for controlling the cart drawer visibility
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Function to toggle the cart visibility
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header and Cart Button */}
      <Header toggleCart={toggleCart} />
      
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
          All Products
        </h1>
        
        {/* The Product List and Filtering UI */}
        <ProductListContainer /> 
        
      </main>
      
      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} toggleCart={toggleCart} />
    </div>
  );
}