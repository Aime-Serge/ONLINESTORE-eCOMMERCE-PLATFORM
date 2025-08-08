import React from 'react';

const Loader: React.FC = () => (
  <div className="flex justify-center items-center h-32">
    <span className="loader" />
    {/* You can style .loader with CSS or use a spinner SVG */}
    Loading...
  </div>
);

export default Loader;