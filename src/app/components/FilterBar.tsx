// src/app/components/FilterBar.tsx (New File)
'use client';

import { Search, ChevronDown } from 'lucide-react';

interface FilterBarProps {
  categories: string[];
  filters: { category: string; searchTerm: string; sortBy: string };
  onFilterChange: (filters: any) => void;
}

export default function FilterBar({ categories, filters, onFilterChange }: FilterBarProps) {
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ searchTerm: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ category: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ sortBy: e.target.value });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-lg rounded-xl border">
      
      {/* 1. Search Input */}
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search products..."
          value={filters.searchTerm}
          onChange={handleSearch}
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      {/* 2. Category Filter */}
      <div className="relative md:w-1/4">
        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className="appearance-none w-full p-3 border border-gray-300 rounded-lg bg-white pr-8 focus:ring-indigo-500 focus:border-indigo-500 capitalize"
        >
          {categories.map(cat => (
            <option key={cat} value={cat} className="capitalize">
              {cat}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>

      {/* 3. Sort By */}
      <div className="relative md:w-1/4">
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className="appearance-none w-full p-3 border border-gray-300 rounded-lg bg-white pr-8 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="default">Sort By: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}