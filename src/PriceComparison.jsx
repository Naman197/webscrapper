import React, { useState } from 'react';
import ProductDetails from './ProductDetails';

const PriceComparison = () => {
  const [product1, setProduct1] = useState({ url: '', data: null, loading: false, error: null });
  const [product2, setProduct2] = useState({ url: '', data: null, loading: false, error: null });

  const fetchProductData = async (url, setProduct) => {
    setProduct(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch('http://localhost:3000/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error('Failed to fetch product data');
      const data = await response.json();
      setProduct({ url, data, loading: false, error: null });
    } catch (error) {
      setProduct({ url, data: null, loading: false, error: error.message });
    }
  };

  const handleCompare = () => {
    if (product1.url) fetchProductData(product1.url, setProduct1);
    if (product2.url) fetchProductData(product2.url, setProduct2);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Price Comparison Tool
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Compare products from different stores to find the best deal
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="product1" className="block text-sm font-medium text-gray-700 mb-1">
                Product URL 1
              </label>
              <input
                id="product1"
                type="text"
                placeholder="https://www.example.com/product1"
                value={product1.url}
                onChange={(e) => setProduct1({ ...product1, url: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="product2" className="block text-sm font-medium text-gray-700 mb-1">
                Product URL 2
              </label>
              <input
                id="product2"
                type="text"
                placeholder="https://www.example.com/product2"
                value={product2.url}
                onChange={(e) => setProduct2({ ...product2, url: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={handleCompare}
              disabled={(!product1.url && !product2.url) || (product1.loading || product2.loading)}
              className={`px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                (!product1.url && !product2.url) || (product1.loading || product2.loading) 
                  ? 'opacity-50 cursor-not-allowed' 
                  : ''
              }`}
            >
              {product1.loading || product2.loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Comparing...
                </span>
              ) : (
                'Compare Products'
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product 1 */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Product 1</h2>
              {product1.loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : product1.error ? (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{product1.error}</p>
                    </div>
                  </div>
                </div>
              ) : product1.data ? (
                <ProductDetails product={product1.data} />
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No product selected</h3>
                  <p className="mt-1 text-sm text-gray-500">Enter a URL and click compare to see product details</p>
                </div>
              )}
            </div>
          </div>

          {/* Product 2 */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Product 2</h2>
              {product2.loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : product2.error ? (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{product2.error}</p>
                    </div>
                  </div>
                </div>
              ) : product2.data ? (
                <ProductDetails product={product2.data} />
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No product selected</h3>
                  <p className="mt-1 text-sm text-gray-500">Enter a URL and click compare to see product details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceComparison;