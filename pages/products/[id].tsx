{/*import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import api from '../../services/api';
import { Product } from '../../types/product';
import Loader from '../../components/common/Loader';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';

const ProductDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <section className="max-w-5xl mx-auto p-4 flex flex-col md:flex-row gap-6">
      <Image
        src={product.image}
        alt={product.title}
        className="w-full md:w-1/2 object-cover rounded"
      />
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-xl text-gray-700 mb-4">${product.price.toFixed(2)}</p>
        <p className="mb-6">{product.description}</p>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
// pages/Products/[id].tsx
// This file fetches and displays product details based on the product ID from the URL.*/}
import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import MainLayout from '@/components/layouts/MainLayout';

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {

      try {
        // Instead of full URL
{/*const res = await fetch('/api/products?limit=12{/*https://ecom.sakachris.com/api/products'); */}
        // Use relative path for Next.js API routes

        const response = await fetch(`/api/products?limit=12/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product.');
        const data = await response.json();
        console.log(data)
        setProduct(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <MainLayout><div className="p-8">Loading...</div></MainLayout>;
  if (error) return <MainLayout><div className="p-8 text-red-500">Error: {error}</div></MainLayout>;
  if (!product) return <MainLayout><div className="p-8">Product not found</div></MainLayout>;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-green-600 font-semibold mb-4">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
