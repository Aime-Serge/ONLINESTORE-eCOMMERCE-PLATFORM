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

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { Category, fetchCategories } from '@/redux/categorySlice';
import { setCategoryFilter, setPage, fetchProducts } from '@/redux/productSlice';
export interface SearchFilterBarProps {
  categories: Category[];
  onCategoryChange: (categoryId: string) => void;
  // Add other props as needed
}
const SearchFilterBar: React.FC<SearchFilterBarProps>= () => {
  const dispatch = useDispatch<AppDispatch>();
  

  const { categories, status: categoryStatus } = useSelector((state: RootState) => state.categories);
  const { categoryFilter, priceRangeFilter, search } = useSelector((state: RootState) => state.products);

  // Fetch categories on mount
  useEffect(() => {
    if (categoryStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoryStatus]);

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    dispatch(setCategoryFilter(categoryId));
    dispatch(setPage(1)); // reset to page 1
    dispatch(fetchProducts({ 
      page: 1,
      categoryId,
      minPrice: priceRangeFilter?.min,
      maxPrice: priceRangeFilter?.max,
      search
    }));
  };

  return (
    <div className="flex gap-4">
      <select
        className="border p-2"
        value={categoryFilter}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.category_id} value={cat.category_id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilterBar;
