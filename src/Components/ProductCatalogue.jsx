import React, { useState, useMemo } from "react";

const TotalProducts = [
  {
    sku: "BM-PF-308-TSPT",
    name: "Ultra Premium Soft and Strong",
    price: "$16.90",
    image: "/Item1.png",
    rating: 4,
    reviews: 52,
    category: "Health and Household",
  },
  {
    sku: "BM-SP-031-RPSD",
    name: "by Chuck Norris Morning Kick",
    price: "$17.90",
    image: "/Item2.png",
    rating: 5,
    reviews: 65,
    category: "Grocery and Gourmet Food",
  },
  {
    sku: "BM-PT-248-SPLM",
    name: "Salonpas Lidocaine Pain Relieving",
    price: "$12.50",
    image: "/Item3.png",
    rating: 4,
    reviews: 18,
    category: "Health and Household",
  },
  {
    sku: "BM-PF-333-DDOG",
    name: "Dunkin’ Donuts Original Ground",
    price: "$24.90",
    image: "/Item4.png",
    rating: 5,
    reviews: 72,
    category: "Grocery and Gourmet Food",
  },
  {
    sku: "BM-OT-012-CAM",
    name: "Can-Am Premium High",
    price: "$39.90",
    image: "/Item5.png",
    rating: 4,
    reviews: 204,
    category: "Automotive",
  },
  {
    sku: "BM-PF-302-BLBF",
    name: "Blue Buffalo Life Protection",
    price: "$17.00",
    image: "/Item6.png",
    rating: 4,
    reviews: 36,
    category: "Grocery and Gourmet Food",
  },
  {
    sku: "BM-KT-059-GVKN",
    name: '8" Global Professional Japanese',
    price: "$31.99",
    image: "/Item7.png",
    rating: 5,
    reviews: 40,
    category: "Home and Kitchen",
  },
  {
    sku: "BM-AT-139-PL80",
    name: "Polaris Drive Belt for Specific RZR",
    price: "$45.50",
    image: "/Item8.png",
    rating: 4,
    reviews: 29,
    category: "Automotive",
  },
  {
    sku: "BM-PF-309-ORVS",
    name: "Nutrition Plan High Protein",
    price: "$16.90",
    image: "/Item9.png",
    rating: 5,
    reviews: 60,
    category: "Health and Household",
  },
  {
    sku: "BM-PF-317-MMPT",
    name: "Member’s Mark Super Premium",
    price: "$16.00",
    image: "/Item10.png",
    rating: 4,
    reviews: 42,
    category: "Grocery and Gourmet Food",
  },
];

const ProductCatalogue = () => {
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});

  // Convert price string "$12.90" → number 12.9
  const parsePrice = (priceStr) => parseFloat(priceStr.replace("$", ""));

  // Handle sorting
  const sortedProducts = useMemo(() => {
    let sorted = [...TotalProducts];
    if (sortOption === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "highToLow") {
      sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortOption === "lowToHigh") {
      sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    }
    return sorted;
  }, [sortOption]);

  // Handle search filter
  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuantityChange = (sku, value) => {
    setQuantities((prev) => ({ ...prev, [sku]: value }));
  };

  return (
    <div className="w-[1300px] bg-white p-10 justify-center mx-auto my-20 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Product Catalogue</h1>

      {/* Sort and Search */}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        </div>
      </div>

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
          <div className="col-span-2">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-contain"
            />
          </div>
          <div className="col-span-3 text-gray-800">{product.name}</div>
          <div className="col-span-1 text-center font-semibold">
            {product.price}
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

      {/* Pagination (static example) */}
      <div className="flex justify-center mt-8">
        <button className="border px-3 py-1 mx-1 rounded hover:bg-gray-100">1</button>
        <button className="border px-3 py-1 mx-1 rounded hover:bg-gray-100">2</button>
        <button className="border px-3 py-1 mx-1 rounded hover:bg-gray-100">...</button>
        <button className="border px-3 py-1 mx-1 rounded hover:bg-gray-100">52</button>
      </div>
    </div>
  );
};

export default ProductCatalogue;
