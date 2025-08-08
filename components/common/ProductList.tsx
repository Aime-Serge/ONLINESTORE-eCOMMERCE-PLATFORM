'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setPage } from '@/redux/productSlice';
import { RootState, AppDispatch } from '@/redux/store';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import SearchFilterBar from './SearchFilterBar';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error, totalPages, page } = useSelector((state: RootState) => state.products);
  const { categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, page]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  return (
    <section className="container mx-auto p-4">
      <SearchFilterBar categories={categories} />

      {status === 'loading' && <p>Loading products...</p>}
      {status === 'failed' && <p className="text-red-600">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
  {(items || []).map((product) => (
    
    <ProductCard key={product.id} product={product} />
  ))}
</div>


      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </section>
  );
};

export default ProductList;
