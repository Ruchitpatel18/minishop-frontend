// src/app/components/ProductCard.tsx

'use client'; // <-- MUST be a client component to use useCart() and interactivity

import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react'; // Import icons needed
import { useCart } from '@/app/providers/CartContext'; // Import the cart hook
import { Product } from '@/types/product'; // Adjust path if needed

// --- Helper Component for Rating Stars (Good practice to keep UI clean) ---

interface RatingStarsProps {
    rate: number;
    count?: number; // Count is optional here, as it's not strictly used in the star logic
}

const RatingStars = ({ rate, count }: RatingStarsProps) => { // <-- FIXED LINE
    const fullStars = Math.floor(rate);
    const starArray = Array(5).fill(0).map((_, i) => (
        <Star
            key={i}
            className={`w-4 h-4 transition ${
                i < fullStars ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
            }`}
        />
    ));
    // Include count display if you want it here, but the error is fixed by using RatingStarsProps
    return <div className="flex items-center space-x-0.5">{starArray}</div>; 
};
// --------------------------------------------------------------------------


export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        // Stop the click event from propagating to the parent <Link>
        e.preventDefault(); 
        e.stopPropagation();

        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
        });
        alert(`${product.title} added to cart!`);
    };

    return (
        <div className="bg-white border rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
            
            {/* 1. PRODUCT LINK (Wraps Image and Details) */}
            <Link 
                href={`/products/${product.id}`} 
                className="group block flex-grow p-4 pb-0" // Use flex-grow for consistent sizing
            >
                {/* Image Area */}
                <div className="h-48 w-full overflow-hidden p-4 flex justify-center items-center">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
                    />
                </div>
                
                {/* Text Details */}
                <div className="p-4 pt-3">
                    <p className="text-xs text-indigo-600 font-medium uppercase mb-1 line-clamp-1">{product.category}</p>
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3rem] hover:text-indigo-800 transition">
                        {product.title}
                    </h2>
                    
                    {/* Rating Display */}
                    <div className="mt-2 flex items-center justify-between">
                        <RatingStars rate={product.rating.rate} />
                        <span className="text-sm text-gray-500">({product.rating.count})</span>
                    </div>
                </div>
            </Link>

            {/* 2. PRICE AND ADD TO CART BUTTON (Bottom Bar) */}
            <div className="p-4 border-t flex justify-between items-center bg-gray-50">
                <span className="text-xl font-bold text-teal-700">
                    ${product.price.toFixed(2)}
                </span>
                
                <button
                    onClick={handleAddToCart}
                    className="px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-indigo-700 transition flex items-center"
                    aria-label={`Add ${product.title} to cart`}
                >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add
                </button>
            </div>
        </div>
    );
}