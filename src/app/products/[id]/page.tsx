import { notFound } from 'next/navigation';
import { Product } from '@/types/product';
import AddToCartButton from './AddToCartButton';

// Function to fetch a single product
async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  
  if (!res.ok) {
    if (res.status === 404) notFound();
  }

  // Read the response text first to handle empty bodies gracefully
  const text = await res.text();
  if (!text) {
      notFound(); 
  }
  
  try {
      const product = JSON.parse(text);

      // Check if the parsed object is empty or doesn't have an ID
      if (!product || Object.keys(product).length === 0 || !product.id) {
          notFound(); 
      }
      
      return product;
      
  } catch (e) {
      // Catch JSON parsing errors
      console.error(`Failed to parse JSON for ID ${id}:`, e);
      notFound();
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = params.id; // Correctly isolates the dynamic ID
  const product = await getProduct(productId); 
  
  if (!product) return notFound(); 

  // --- BEGIN JSX RENDERING ---
  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-xl shadow-2xl">
        {/* ... Image, details, and description JSX here ... */}
        
        {/* Example usage of product data: */}
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.title}</h1>
          <p className="text-5xl font-extrabold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
          {/* Add to Cart Component */}
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

// Optional: You can add generateMetadata here for better SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const productId = params.id; // Correctly isolates the dynamic ID
  const product = await getProduct(productId);
  
  if (!product) return {};
  
  return {
    title: product.title,
    description: product.description.substring(0, 150) + '...',
  };
}