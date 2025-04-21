import React from 'react';

const ProductDetails = ({ product }) => {
  const productData = product?.product;

  if (!productData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  const cleanPrice = productData?.price
    ? productData.price.match(/₹\d{1,3}(?:,\d{3})*(?:\.\d{2})?/)?.[0] || 'Price not available'
    : 'Price not available';

  const availableOffers = Array.isArray(productData.availableOffers) ? productData.availableOffers : [];
  const reviews = productData.reviews || 'No reviews yet';

  const convertToCSV = () => {
    const header = ['Title', 'Price', 'Original Price', 'Rating', 'Reviews', 'Seller Name', 'Delivery Info', 'Available Offers'];
    const rows = [
      [
        productData.title,
        cleanPrice,
        productData.originalPrice || 'N/A',
        productData.rating || 'N/A',
        reviews,
        productData.sellerName,
        productData.deliveryInfo,
        availableOffers.join('; ') || 'No offers'
      ]
    ];

    let csvContent = "data:text/csv;charset=utf-8,";

    csvContent += header.join(',') + "\r\n";

    rows.forEach(row => {
      csvContent += row.join(',') + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${productData.title}_details.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-50">
          <img 
            src={productData.imageUrl} 
            alt={productData.title} 
            className="max-h-96 object-contain rounded-lg"
          />
        </div>

        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{productData.title}</h2>
          
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mr-4">
              {productData.rating || 'N/A'} ★
            </div>
            <span className="text-gray-500">{reviews}</span>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">{cleanPrice}</span>
            {productData.originalPrice && (
              <span className="ml-2 text-lg text-gray-500 line-through">
                {productData.originalPrice}
              </span>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Seller Information</h3>
            <p className="text-gray-600">{productData.sellerName}</p>
            <p className="text-gray-600 mt-1">{productData.deliveryInfo}</p>
          </div>

          {availableOffers.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Available Offers</h3>
              <ul className="space-y-2">
                {availableOffers.map((offer, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">{offer}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 mb-4">
            View on Store
          </button>

          <button 
            onClick={convertToCSV} 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
            Download Product Details as CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
