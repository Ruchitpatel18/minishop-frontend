// src/app/hooks/useProducts.ts (Create this file)
'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product'; 

export interface UseProductsResult {
  products: Product[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
}

export const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Products
        const productRes = await fetch('https://fakestoreapi.com/products');
        if (!productRes.ok) throw new Error('Failed to fetch products.');
        const productData: Product[] = await productRes.json();
        setProducts(productData);

        // 2. Fetch Categories
        const categoryRes = await fetch('https://fakestoreapi.com/products/categories');
        if (!categoryRes.ok) throw new Error('Failed to fetch categories.');
        const categoryData: string[] = await categoryRes.json();
        setCategories(['All', ...categoryData]); // Add 'All' option

      } catch (err: any) {
        console.error(err);
        setError(err.message || 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { products, categories, isLoading, error };
};