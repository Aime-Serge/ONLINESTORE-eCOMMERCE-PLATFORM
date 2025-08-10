'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setPage } from '@/redux/productSlice';
import { RootState, AppDispatch } from '@/redux/store';
import ProductCard from '../components/common/ProductCard';
import Pagination from '../components/common/Pagination';
import SearchFilterBar from '../components/common/SearchFilterBar';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error, totalPages, page } = useSelector((state: RootState) => state.products);
  {/*const { categories } = useSelector((state: RootState) => state.categories);*/}
  const categories = useSelector((state: RootState) => state.categories.categories);


  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProducts({ page, categoryId: selectedCategory || undefined }));
  }, [dispatch, page, selectedCategory]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId || null);
    dispatch(setPage(1)); // reset to first page on category change
  };

  return (
    <section className="container mx-auto p-4">
      <SearchFilterBar categories={categories} onCategoryChange={handleCategoryChange} />

      {status === 'loading' && <p>Loading products...</p>}
      {status === 'failed' && <p className="text-red-600">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {(items || []).map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </section>
  );
};

export default ProductList;
