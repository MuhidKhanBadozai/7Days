import React from "react";
import { ShoppingCart } from "lucide-react";

const featuredProducts = [
  {
    sku: "BM-PF-308-TSPT",
    name: "Ultra Premium Soft and Strong",
    price: "$16.90",
    image: "/Item1.png",
    rating: 4,
    reviews: 52,
  },
  {
    sku: "BM-SP-031-RPSD",
    name: "by Chuck Norris Morning Kick",
    price: "$17.90",
    image: "/Item2.png",
    rating: 5,
    reviews: 65,
  },
  {
    sku: "BM-PT-248-SPLM",
    name: "Salonpas Lidocaine Pain Relieving",
    price: "$12.50",
    image: "/Item3.png",
    rating: 4,
    reviews: 18,
  },
  {
    sku: "BM-PF-333-DDOG",
    name: "Dunkin’ Donuts Original Ground",
    price: "$24.90",
    image: "/Item4.png",
    rating: 5,
    reviews: 72,
  },
  {
    sku: "BM-OT-012-CAM",
    name: "Can-Am Premium High",
    price: "$39.90",
    image: "/Item5.png",
    rating: 4,
    reviews: 204,
  },
  {
    sku: "BM-PF-302-BLBF",
    name: "Blue Buffalo Life Protection",
    price: "$17.00",
    image: "/Item6.png",
    rating: 4,
    reviews: 36,
  },
  {
    sku: "BM-KT-059-GVKN",
    name: '8" Global Professional Japanese',
    price: "$31.99",
    image: "/Item7.png",
    rating: 5,
    reviews: 40,
  },
  {
    sku: "BM-AT-139-PL80",
    name: "Polaris Drive Belt for Specific RZR",
    price: "$45.50",
    image: "/Item8.png",
    rating: 4,
    reviews: 29,
  },
  {
    sku: "BM-PF-309-ORVS",
    name: "Nutrition Plan High Protein",
    price: "$16.90",
    image: "/Item9.png",
    rating: 5,
    reviews: 60,
  },
  {
    sku: "BM-PF-317-MMPT",
    name: "Member’s Mark Super Premium",
    price: "$16.00",
    image: "/Item10.png",
    rating: 4,
    reviews: 42,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-[1500px] mx-auto px-8">
        {/* Title */}
        <h2 className="text-8xl font-bold text-center text-[#0B2347] mb-12">
          Featured Products
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-45 justify-items-center">
          {featuredProducts.map((item, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center text-center border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white h-[400px] w-[300px]"
            >
              {/* Image */}
              <div className="relative w-full h-56 flex items-center justify-center mb-5 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-60 h-auto transition-transform duration-500 group-hover:scale-110"
                />

                {/* Add to Cart Icon */}
                <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="bg-[#0B2347] p-4 rounded-full transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                    <ShoppingCart size={24} color="white" />
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <h3 className="text-base font-semibold mb-2 text-gray-800 line-clamp-2">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">SKU: {item.sku}</p>

              {/* Ratings */}
              <div className="flex items-center justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-yellow-400 ${
                      i < item.rating ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="text-sm text-gray-500 ml-1">
                  ({item.reviews})
                </span>
              </div>

              {/* Price */}
              <p className="text-lg font-semibold text-gray-800">
                {item.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
