import React from 'react';
import Head from 'next/head';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import ProductList from '@/components/common/ProductList';



export default function Home() {
  return (
    <>
      <Head>
        <title>S&G Fast and Easy Buy/Online Products Stock</title>
        <meta name="description" content="Fast and Easy Online Shopping Platform" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow px-4 py-8 max-w-7xl mx-auto bg-yellow-100 items-center justify-center text-center">
          <h1 className="text-3xl font-bold mb-6">Welcome to S&G Fast and Easy Buy. Fast and Easy Online Shopping Platform</h1>
          <h2 className="text-xl font-semibold mb-4">Your one-stop shop for all your needs/Online Products Stock</h2>
          <p className="text-gray-700 mb-6">Explore our wide range of products and enjoy a seamless shopping experience.</p>
          
          {/* Featured Products Section */}
          <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
          <ProductList />
        </main>
        <Footer />
      </div>
    </>
  );
}
