import React, { useState } from 'react';

const FormSection = ({ setProduct }) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://scrapper-backend-e9rr.onrender.com/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setProduct(data);
      } else {
        setError(data.message || 'Failed to fetch product details');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Product Scraper</h2>
        <p className="text-gray-600 mt-2">Enter a product URL to fetch details</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            Product URL
          </label>
          <input
            type="text"
            id="url"
            placeholder="https://www.example.com/product"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${
            isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? (
            <>
              <span className="inline-block animate-spin mr-2">↻</span>
              Fetching...
            </>
          ) : (
            'Fetch Product Details'
          )}
        </button>
      </form>
      
      <div className="mt-6 text-sm text-gray-500">
        <p>Supported stores: Amazon, Flipkart, and more</p>
      </div>
    </div>
  );
};

export default FormSection;