import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext.jsx';
import Navbar from './components/Navbar.jsx';
import LandingPage from './pages/LandingPage.jsx';
import ProductFormPage from './pages/ProductFormPage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage.jsx';

export default function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="min-h-screen bg-white text-gray-900">
          <Navbar />
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/products" element={<ProductDetailsPage />} />
              <Route path="/add-product" element={<ProductFormPage />} />
            </Routes>
          </div>
          
          
        </div>
      </Router>
    </ProductProvider>
  );
}
