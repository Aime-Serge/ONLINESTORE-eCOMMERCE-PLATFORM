'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="S&G Fast and Easy Buy"
            width={100}
            height={100}
            className="rounded-full"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="div">
        <nav className="hidden md:flex space-x-6 cols-2">
           <ul className="">
            <li>
              <Link href="/" className="text-gray-700 hover:text-black">Home</Link>
            </li>
            <li>
              <Link href="/ProductList" className="text-gray-700 hover:text-black">Products</Link>
            </li>
            <li>
              <Link href="/cart" className="text-gray-700 hover:text-black">Cart</Link>
            </li>
          </ul>
          <ul className="position-relative">
            <li>
              <Link href="/checkout" className="text-gray-700 hover:text-black">Checkout</Link>
            </li>
            <li>
              <Link href="/login" className="text-gray-700 hover:text-black">Profile</Link>
            </li>
            
            <li>
              <Link href="/orders" className="text-gray-700 hover:text-black">Orders</Link>
            </li>
            </ul>
        </nav>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Nav */}
      {isOpen && (
        <div className="md:hidden mt-2 px-6">
          <nav className="flex flex-col space-y-2">
            <Link href="/" className="text-gray-700 hover:text-black" onClick={toggleMenu}>Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-black" onClick={toggleMenu}>Products</Link>
            <Link href="/cart" className="text-gray-700 hover:text-black" onClick={toggleMenu}>Cart</Link>
            <Link href="/checkout" className="text-gray-700 hover:text-black" onClick={toggleMenu}>Checkout</Link>
            <Link href="/orders" className="text-gray-700 hover:text-black" onClick={toggleMenu}>Orders</Link>
            <Link href="/login" className="text-gray-700 hover:text-black" onClick={toggleMenu}>Login</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
export { Header };
export const HeaderComponent = Header;