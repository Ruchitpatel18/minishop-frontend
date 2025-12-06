// src/app/components/ProductListContainer.tsx (New File)
'use client';

import { useProducts } from '@/app/hooks/useProducts';
import { useState, useMemo } from 'react';
import ProductCard from './ProductCard'; 
import FilterBar from './FilterBar'; // We will create this next

// Define the state for filtering and sorting
interface FilterState {
  category: string;
  searchTerm: string;
  sortBy: 'price-asc' | 'price-desc' | 'rating-desc' | 'default';
}

export default function ProductListContainer() {
  const { products, categories, isLoading, error } = useProducts();
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    searchTerm: '',
    sortBy: 'default',
  });

  // --- Filtering and Sorting Logic ---
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Category Filtering
    if (filters.category !== 'All') {
      result = result.filter(p => p.category === filters.category);
    }

    // 2. Search Filtering (Case-insensitive title match)
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
      );
    }

    // 3. Sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating.rate - a.rating.rate;
        default:
          return 0; // Maintain original order
      }
    });

    return result;
  }, [products, filters]);

  // Handle updates from FilterBar
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (isLoading) return <div className="text-center p-10">Loading products...</div>;
  if (error) return <div className="text-center p-10 text-red-600 border border-red-300">Error: {error}</div>;

  return (
    <>
      <FilterBar 
        categories={categories}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center p-10 text-gray-500 border rounded-lg">
            No products match your current filters.
          </div>
        )}
      </div>
    </>
  );
}