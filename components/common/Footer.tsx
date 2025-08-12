'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t mt-8">
      <div className="container mx-auto px-4 py-2 text-center text-gray-600">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} MyStore. All rights reserved.
        </p>
        <div className="space-x-4">
          <Link href="/privacy" className="hover:text-blue-500">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-blue-500">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
