'use client';

import React from 'react';
import Header from '@/components/common/Header'; // Ensure this file exists
import Footer from '@/components/common/Footer'; // We'll add this too

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-1 container mx-auto px-4">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
