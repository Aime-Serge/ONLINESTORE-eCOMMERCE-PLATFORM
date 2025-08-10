'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, ShoppingCart, User, PackageSearch, Search } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      {/* 🔹 Top Promo Bar */}
      <div className="bg-blue-600 text-white text-sm py-2 px-4 text-center">
        <Link href="/promotions" className="hover:underline">
          🎉 Free shipping on orders over $50 · Sign up for 10% off your first order!
        </Link>
      </div>

      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="S&G Fast and Easy Buy"
              width={60}
              height={60}
              className="rounded-full"
            />
            <span className="font-bold text-lg text-gray-800 hidden sm:block">
              S&G Buy
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center border rounded-full px-4 py-1 bg-gray-50 hover:bg-white focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all flex-1 max-w-md"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
            />
            <button type="submit" className="text-gray-500 hover:text-black">
              <Search size={20} />
            </button>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { href: '/', label: 'Home' },
              { href: '/ProductList', label: 'Products' },
              
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-black transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right-side Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/cart" className="relative text-gray-700 hover:text-black">
              <ShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </Link>
            <Link href="/checkout" className="text-gray-700 hover:text-black">
              <PackageSearch size={22} />
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-black">
              <User size={22} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={toggleMenu}>
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4 space-y-4 shadow-md">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex items-center border rounded-full px-4 py-1 bg-gray-50">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
              />
              <button type="submit" className="text-gray-500 hover:text-black">
                <Search size={20} />
              </button>
            </form>

            {/* Mobile Nav Links */}
            {[
              { href: '/', label: 'Home' },
              { href: '/ProductList', label: 'Products' },
              { href: '/cart', label: 'Cart' },
              { href: '/checkout', label: 'Checkout' },
              { href: '/login', label: 'Login' }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleMenu}
                className="block text-gray-700 hover:text-black transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
export { Header };
export const HeaderComponent = Header;
