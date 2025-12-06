'use client';

import { useCart } from '../providers/CartContext';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  toggleCart,
}: {
  isOpen: boolean;
  toggleCart: () => void;
}) {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 transition-opacity duration-300"
          onClick={toggleCart}
        ></div>
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center pb-4 border-b">
            <h2 className="text-2xl font-semibold">Your Cart</h2>
            <button
              onClick={toggleCart}
              className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100"
              aria-label="Close cart"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto py-4 space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">
                Your cart is empty. Start shopping!
              </p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center border-b pb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover mr-4 rounded-lg"
                  />
                  <div className="flex-grow">
                    <h3 className="text-sm font-medium line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm font-semibold text-indigo-600 mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 border rounded-full hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 border rounded-full hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-red-500 hover:text-red-700 ml-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between text-xl font-bold mb-4">
              <span>Total:</span>
              <span className="text-indigo-600">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <button
              disabled={cartItems.length === 0}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}