import React from 'react';
import Head from 'next/head'; 
import Link from 'next/link';
import { ShoppingCart, Package, Star } from 'lucide-react'; // E-commerce icons
import MainLayout from '@/components/layouts/MainLayout';

export default function Home() {
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
<MainLayout>
      <div className="flex flex-col min-h-screen">
        
          {/* Main Content */}
        <main className="flex-grow justify-center items-center px-4 py-4 max-w-6xl mx-auto bg-yellow-50 text-center rounded-lg shadow-md">
          {/* Welcome Heading */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Welcome to S&G Fast and Easy Buy
          </h1>
          <h2 className="text-xl font-medium text-gray-700 mb-8 py-3rem">
            Your one-stop shop for all your needs – online, fast, and easy!
          </h2>

          {/* Icon Row */}
          <div className="flex justify-center gap-10 mb-10 py-3rem">
            <div className="flex flex-col items-center">
              <ShoppingCart className="w-12 h-12 text-red-500 mb-2" />
              <p className="text-gray-700 font-semibold">Easy Shopping</p>
            </div>
            <div className="flex flex-col items-center">
              <Package className="w-12 h-12 text-blue-500 mb-2" />
              <p className="text-gray-700 font-semibold">Fast Delivery</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-12 h-12 text-yellow-500 mb-2" />
              <p className="text-gray-700 font-semibold">Top Quality</p>
            </div>
          </div>

          {/* Call-to-Action Link */}
          <Link
            href="/ProductList"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
          >
            Explore and Buy Your Favorite Goods With Us →
          </Link>
        </main>
        
      </div>
      </MainLayout>
    </>
  );
}
