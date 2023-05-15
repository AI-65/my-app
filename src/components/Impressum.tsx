import React from 'react';

const Impressum = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        {/* Add your MatrixRain component or any other background element here */}
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-4">Impressum</h1>
        <p>
          This is your Impressum content. You can add your legal information, contact details, and any other required information here.
        </p>
        <p>
          You can format and style the content using HTML tags and CSS classes.
        </p>
      </div>
    </div>
  );
};

export default Impressum;
