import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600 border-t">
      © {new Date().getFullYear()} Your Store Name. All rights reserved.
    </footer>
  );
};

export default Footer;
// /components/common/Footer.tsx