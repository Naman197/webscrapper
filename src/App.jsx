import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import FormSection from './FormSection';
import ProductDetails from './ProductDetails';
import PriceComparison from './PriceComparison';
import About from './About';

const App = () => {
  const [product, setProduct] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">Smart Shopping Companion</h1>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Get detailed product information and price comparisons from multiple stores
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <FormSection setProduct={setProduct} />
                  </div>
                  <div className="lg:col-span-2">
                    {product ? (
                      <ProductDetails product={product} />
                    ) : (
                      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                        <div className="text-gray-400 mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-700 mb-2">No Product Selected</h3>
                        <p className="text-gray-500">Enter a product URL to see detailed information</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          } />
          
          <Route path="/comparison" element={<PriceComparison />} />
          <Route path="/about" element={<About />} />
        </Routes>
        
        <footer className="bg-white border-t border-gray-200 py-8 mt-12">
          <div className="container mx-auto px-4 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Smart Shopping Companion. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;