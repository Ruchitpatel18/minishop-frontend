// src/app/products/[id]/AddToCartButton.tsx

'use client';

import { useCart } from '@/app/providers/CartContext'; 
import { Product } from '@/types/product'; 
import { ShoppingBag } from 'lucide-react';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Pass only the required properties to the context function
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    alert(`${product.title} added to cart!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex items-center justify-center w-full lg:w-3/4 py-3 px-6 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
    >
      <ShoppingBag className="w-5 h-5 mr-3" />
      Add to Cart
    </button>
  );
}