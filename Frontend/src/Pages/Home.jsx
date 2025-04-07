// src/pages/Home.jsx
import React from 'react';
// import Layout from '../layouts/Layout';
import Layout from '../Components/Layout/Layout'; // Adjust the import path as necessary

const Home = () => {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Welcome to Sandesh</h2>
      <p>This is the home page content.</p>
    </Layout>
  );
};

export default Home;
