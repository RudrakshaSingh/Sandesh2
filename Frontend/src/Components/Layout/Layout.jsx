// src/layouts/Layout.jsx
import React from 'react';
import HeaderDrawer from './HeaderDrawer';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderDrawer />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
