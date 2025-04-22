import React, { useState } from "react";
import { saveAs } from "file-saver";
import axios from "axios";

// Helper: CSV generator
const generateCSV = (products) => {
  const headers = [
    "Title",
    "Image URL",
    "Price",
    "Rating",
    "Reviews",
    "Delivery Info",
    "Offers",
    "Seller Name",
  ];
  const rows = products.map((p) => [
    `"${p.title}"`,
    `"${p.imageUrl || ""}"`,
    `"${p.price}"`,
    `"${p.rating}"`,
    `"${p.reviews}"`,
    `"${p.deliveryInfo}"`,
    `"${p.availableOffers?.map((o) => `${o.offerTitle}: ${o.offerDetails}`).join(" | ") || ""}"`,
    `"${p.sellerName}"`,
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
};

const Productlist = () => {
  const [url, setUrl] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    if (!url.trim()) return;
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/scrape-products", { url });
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch product data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const csv = generateCSV(products);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "products.csv");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Scrape Products</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter product listing URL"
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none"
          />
          <button
            onClick={fetchProducts}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {loading ? "Loading..." : "Fetch Products"}
          </button>
        </div>
      </div>

      {products.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Product List</h3>
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Download CSV
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product, index) => (
              <div key={index} className="border rounded-lg shadow-md p-4 bg-white">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-48 object-contain mb-3"
                  />
                )}
                <h3 className="text-lg font-bold mb-1">{product.title}</h3>
                <p className="text-gray-800 mb-1">💰 Price: {product.price}</p>
                {product.rating && <p className="text-gray-700">⭐ Rating: {product.rating}</p>}
                {product.reviews && <p className="text-gray-700">📝 Reviews: {product.reviews}</p>}
                {product.deliveryInfo && <p className="text-gray-700">🚚 Delivery: {product.deliveryInfo}</p>}
                <p className="text-gray-700">🛍️ Seller: {product.sellerName}</p>

                {product.availableOffers?.length > 0 && (
                  <div className="mt-2">
                    <p className="font-semibold text-gray-800">🎁 Offers:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {product.availableOffers.map((offer, i) => (
                        <li key={i}>
                          <strong>{offer.offerTitle}</strong>: {offer.offerDetails}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Productlist;
