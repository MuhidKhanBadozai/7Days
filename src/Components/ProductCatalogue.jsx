import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://putratraders.com/api"; // your backend API base

const ProductCatalogue = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch products from backend
  const fetchProducts = async (category = "") => {
    try {
      setLoading(true);
      const url = category
        ? `${API_BASE}/fetch_by_category.php?category=${encodeURIComponent(category)}`
        : `${API_BASE}/fetch_all.php`;

      const res = await fetch(url);
      const data = await res.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("Unexpected response:", data);
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // load all products on mount
  }, []);

  // Convert price to number (handles "$16.90" or 16.9)
  const parsePrice = (priceStr) =>
    typeof priceStr === "string"
      ? parseFloat(priceStr.replace("$", ""))
      : parseFloat(priceStr);

  // Sorting
  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    if (sortOption === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "highToLow") {
      sorted.sort(
        (a, b) => parsePrice(b.price_200_500) - parsePrice(a.price_200_500)
      );
    } else if (sortOption === "lowToHigh") {
      sorted.sort(
        (a, b) => parsePrice(a.price_200_500) - parsePrice(b.price_200_500)
      );
    }
    return sorted;
  }, [sortOption, products]);

  // Search Filter
  const filteredProducts = sortedProducts.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuantityChange = (sku, value) => {
    setQuantities((prev) => ({ ...prev, [sku]: value }));
  };

  return (
    <div className="w-[1300px] bg-white p-10 justify-center mx-auto my-20 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Product Catalogue</h1>

      {/* Sort + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-medium">Sort by:</label>
          <select
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#0B2347]"
          >
            <option value="">Default</option>
            <option value="rating">By Rating</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="lowToHigh">Price: Low to High</option>
          </select>
        </div>

        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search with Product Name only"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#0B2347]"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
      </div>

      {/* Loading / Empty states */}
      {loading ? (
        <p className="text-center py-10 text-gray-600">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center py-10 text-gray-600">No products found.</p>
      ) : (
        <>
          {/* Table Header */}
          <div className="grid grid-cols-12 font-semibold text-gray-700 border-b py-3">
            <div className="col-span-2">SKU</div>
            <div className="col-span-2">IMAGE</div>
            <div className="col-span-3">NAME</div>
            <div className="col-span-1 text-center">PRICE</div>
            <div className="col-span-2 text-center">QUANTITY</div>
            <div className="col-span-2 text-center">ACTION</div>
          </div>

          {/* Table Rows */}
          {filteredProducts.map((product) => (
            <div
              key={product.sku}
              className="grid grid-cols-12 items-center border-b py-3 hover:bg-gray-50 transition"
            >
              <div className="col-span-2 text-gray-600">{product.sku}</div>

              {/* Image (click to open ProductDetails) */}
              <div
                className="col-span-2 cursor-pointer"
                onClick={() => navigate(`/product/${product.sku}`)}
              >
                <img
                  src={
                    product.image_url
                      ? product.image_url.startsWith("http")
                        ? product.image_url
                        : `${API_BASE.replace("/api", "")}/${product.image_url}`
                      : "/placeholder.png"
                  }
                  alt={product.name}
                  className="w-16 h-16 object-contain mx-auto hover:scale-105 transition-transform"
                />
              </div>

              {/* Name (click to open ProductDetails) */}
              <div
                className="col-span-3 text-gray-800 cursor-pointer hover:text-blue-600"
                onClick={() => navigate(`/product/${product.sku}`)}
              >
                {product.name}
              </div>

              <div className="col-span-1 text-center font-semibold">
                ${product.price_200_500}
              </div>

              <div className="col-span-2 text-center">
                <input
                  type="number"
                  min="1"
                  value={quantities[product.sku] || 1}
                  onChange={(e) =>
                    handleQuantityChange(product.sku, e.target.value)
                  }
                  className="w-16 text-center border border-gray-300 rounded-md p-1 focus:ring-1 focus:ring-[#0B2347]"
                />
              </div>

              <div className="col-span-2 text-center">
                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ProductCatalogue;
