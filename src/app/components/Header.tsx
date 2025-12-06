'use client';

import Link from 'next/link';
import { useCart } from '../providers/CartContext';
import { ShoppingCart } from 'lucide-react'; // Example Icon

export default function Header({ toggleCart }: { toggleCart: () => void }) {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-20 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <h1 className="text-3xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            MiniShop
          </h1>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-gray-600 hover:text-indigo-600">
            Products
          </Link>
          <button
            onClick={toggleCart} // Toggles the CartDrawer
            className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="View shopping cart"
          >
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}