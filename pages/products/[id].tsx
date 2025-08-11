'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchProducts } from '@/redux/productSlice';
import ProductCard from '@/components/common/ProductCard';
import SearchFilterBar from '@/components/common/SearchFilterBar';
import Pagination from '@/components/common/Pagination';
import Loader from '@/components/common/Loader';
import Head from 'next/head';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, totalPages, page, categoryFilter, priceRangeFilter, search } =
    useSelector((state: RootState) => state.products);

  // Fetch products on first load or when filters/page change
  useEffect(() => {
    dispatch(fetchProducts({
      page,
      categoryId: categoryFilter,
      minPrice: priceRangeFilter?.min,
      maxPrice: priceRangeFilter?.max,
      search
    }));
  }, [dispatch, page, categoryFilter, priceRangeFilter, search]);

  if (status === 'loading') return <Loader />;

  return (
    <>
    <Head>
            <title>S&G Fast and Easy Buy | Online Products Stock</title>
            <meta
              name="description"
              content="Fast and Easy Online Shopping Platform"
            />
            <link rel="icon" href="/images/logo.png" />
          </Head>
    <div className="container mx-auto p-4">
      <SearchFilterBar categories={[]} onCategoryChange={(selectedCategory) => { console.log("Category changed:", selectedCategory); }} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {items.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
      <Pagination 
        totalPages={totalPages} 
        currentPage={page} 
        onPageChange={(newPage: number) => console.log("Page changed:", newPage)} 
      />
    </div>
    </>
  );
};

export default ProductsPage;
