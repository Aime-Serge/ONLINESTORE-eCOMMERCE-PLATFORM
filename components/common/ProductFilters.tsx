'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setCategoryFilter, setPriceRangeFilter, clearFilters } from '@/redux/productSlice';

const ProductFilters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleApplyFilters = () => {
    dispatch(setCategoryFilter(category));
    dispatch(setPriceRangeFilter({ min: Number(minPrice), max: Number(maxPrice) }));
  };

  const handleClearFilters = () => {
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    dispatch(clearFilters());
  };

  return (
    <div className="p-4 border rounded-md bg-gray-50 shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Filter Products</h2>

      <div className="mb-3">
        <label className="block mb-1">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="e.g., electronics"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Min Price</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Max Price</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleApplyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Apply
        </button>
        <button
          onClick={handleClearFilters}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;



