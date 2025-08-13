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
      <div
        className="bg-blue-600 text-white text-sm py-2 px-4 text-center"
        role="banner"
        aria-label="Promotional offers"
      >
        <Link href="/signup" className="hover:underline">
          🎉 Free shipping on orders over $50 · Sign up for 10% off your first order!
        </Link>
      </div>

      <header className="bg-white shadow-md sticky top-0 z-50" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4 flex-wrap lg:flex-nowrap">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0" aria-label="Go to homepage">
            <Image
              src="/images/logo.png"
              alt="S&G Fast and Easy Buy logo"
              width={60}
              height={60}
              className="rounded-full"
            />
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            role="search"
            aria-label="Site search"
            className="hidden md:flex items-center border rounded-full px-4 py-1 bg-gray-50 hover:bg-white focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all flex-1 max-w-md order-last md:order-none"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
              aria-label="Search products"
            />
            <button type="submit" className="text-gray-500 hover:text-black" aria-label="Submit search">
              <Search size={20} aria-hidden="true" />
            </button>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Primary">
            {[
              { href: '/', label: 'Home' },
              { href: '/ProductList', label: 'Products' },
              { href: '#', label: 'Orders' },
              { href: '/contact', label: 'Contact'}
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
          <div className="hidden md:flex items-center space-x-6" aria-label="User actions">
            <Link href="/cart" className="relative text-gray-700 hover:text-black" aria-label="View cart">
              <ShoppingCart size={22} aria-hidden="true" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </Link>
            <Link href="/checkout" className="text-gray-700 hover:text-black" aria-label="Go to checkout">
              <PackageSearch size={22} aria-hidden="true" />
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-black" aria-label="Login">
              <User size={22} aria-hidden="true" />
            </Link>
            
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-white border-t px-6 py-4 space-y-4 shadow-md"
            role="dialog"
            aria-label="Mobile menu"
          >
            {/* Mobile Search */}
            <form
              onSubmit={handleSearch}
              role="search"
              aria-label="Mobile site search"
              className="flex items-center border rounded-full px-4 py-1 bg-gray-50"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
                aria-label="Search products"
              />
              <button type="submit" className="text-gray-500 hover:text-black" aria-label="Submit search">
                <Search size={20} aria-hidden="true" />
              </button>
            </form>

            {/* Mobile Nav Links */}
            <nav aria-label="Mobile primary navigation">
              {[
                { href: '/', label: 'Home' },
                { href: '/ProductList', label: 'Products' },
                { href: '/orders', label: 'Orders' },
                { href: '/cart', label: 'Cart' },
                { href: '/checkout', label: 'Checkout' },
                { href: '/contact', label: 'Contact'},
                { href: '/login', label: 'Login' }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={toggleMenu}
                  className="block text-gray-700 hover:text-black transition-colors py-1"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
export { Header };
export const HeaderComponent = Header;
