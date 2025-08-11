'use client';

{/*import React from 'react';
import { Category } from '@/redux/categorySlice';

interface SearchFilterBarProps {
  categories: Category[];
  onCategoryChange: (categoryId: string) => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ categories, onCategoryChange }) => {
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="flex gap-4">
      <select className="border p-2" onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        {safeCategories.map((cat, index) => (
          <option key={cat?.category_id ?? index} value={cat?.category_id}>
            {cat?.name ?? 'Unknown'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilterBar;
*/}


import React from 'react';
import { Category } from '@/redux/categorySlice';

interface SearchFilterBarProps {
  categories: Category[];
  onCategoryChange: (categoryId: string) => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ categories, onCategoryChange }) => {
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="flex gap-4">
      <select className="border p-2" onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        {safeCategories.map((cat, index) => (
          <option key={cat?.category_id ?? index} value={cat?.category_id}>
            {cat?.name ?? 'Unknown'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilterBar;