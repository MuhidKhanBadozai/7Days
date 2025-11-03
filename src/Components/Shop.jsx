// src/pages/Shop.jsx
import React, { useEffect, useState, useRef } from "react";

const API_BASE = "https://putratraders.com/api"; // your API folder

// fixed category order
const CATEGORY_ORDER = [
  "Automotive",
  "Beauty and Personal Care",
  "Perfumes",
  "Grocery and Gourmet Food",
  "Health and Household",
  "Home and Kitchen",
];

// helper to build proper image URLs
const buildFullImageUrl = (img) => {
  if (!img) return "/images/products/placeholder.png";
  if (img.startsWith("http")) return img;
  return `${API_BASE.replace("/api", "")}${img.startsWith("/") ? "" : "/"}${img}`;
};

// reusable rating stars component
const RatingStars = ({ rating = 0 }) => {
  const r = Math.round(Number(rating) || 0);
  return (
    <div className="flex items-center gap-1 text-yellow-400 text-sm">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < r ? "fill-current" : "opacity-30"}`}
          viewBox="0 0 20 20"
        >
          <path d="M10 1.5l2.6 5.27 5.8.84-4.2 4.09.99 5.78L10 14.77 4.81 17.48l.99-5.78L1.6 7.61l5.8-.84L10 1.5z" />
        </svg>
      ))}
    </div>
  );
};

// individual product card
const ProductCard = ({ product, onAddToCart }) => {
  const imgUrl = buildFullImageUrl(product.image_url);

  return (
    <div className="group relative w-[220px] min-w-[220px] bg-white rounded-lg shadow-sm border p-4">
      <div className="h-40 flex items-center justify-center mb-3">
        <img
          src={imgUrl}
          alt={product.name}
          className="max-h-[140px] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="text-xs text-gray-500 mb-1">
        SKU: <span className="text-gray-700">{product.sku}</span>
      </div>
      <div className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
        {product.name}
      </div>

      <div className="flex items-center justify-between mt-1">
        <div className="text-lg font-semibold text-amber-600">
          ${product.price_200_500}
        </div>
        <div className="text-right">
          <RatingStars rating={product.rating} />
          <div className="text-xs text-gray-400">
            {product.reviews ?? 0} reviews
          </div>
        </div>
      </div>

      {/* Add to cart hover button */}
      <button
        onClick={() => onAddToCart(product)}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-orange-500 text-white px-4 py-2 rounded shadow-lg text-sm"
        aria-label={`Add ${product.name} to cart`}
      >
        Add to cart
      </button>
    </div>
  );
};

// one horizontal category row
const CategoryRow = ({ category, products }) => {
  const rowRef = useRef(null);
  const autoRef = useRef(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const scrollStep = () => {
      const cardWidth = el.querySelector(".group")?.offsetWidth || 220;
      const gap = 16;
      const step = cardWidth + gap;

      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    };

    autoRef.current = setInterval(scrollStep, 4000);
    return () => clearInterval(autoRef.current);
  }, [products]);

  const onPrev = () => {
    const el = rowRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(".group")?.offsetWidth || 220;
    el.scrollBy({ left: -(cardWidth + 16) * 2, behavior: "smooth" });
  };

  const onNext = () => {
    const el = rowRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(".group")?.offsetWidth || 220;
    el.scrollBy({ left: (cardWidth + 16) * 2, behavior: "smooth" });
  };

  const handleAddToCart = (product) => {
    alert(`Added "${product.name}" to cart (demo)`);
  };

  return (
    <div className="mb-12">
      {/* Category title + scroll buttons */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-2xl font-semibold">{category}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            className="w-9 h-9 rounded-full border bg-white shadow-sm hover:bg-gray-50 flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 text-gray-700"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M12.3 16.3L7 11l5.3-5.3 1.4 1.4L9.8 11l3.9 3.9z" />
            </svg>
          </button>
          <button
            onClick={onNext}
            className="w-9 h-9 rounded-full border bg-white shadow-sm hover:bg-gray-50 flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 text-gray-700"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M7.7 3.7L13 9l-5.3 5.3-1.4-1.4L10.2 9 6.3 5.1z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Horizontal scrollable product list */}
      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto no-scrollbar px-2 py-2"
        style={{ scrollBehavior: "smooth" }}
      >
        {products.map((p) => (
          <div key={p.sku} className="flex-shrink-0">
            <ProductCard product={p} onAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>

      {/* "See All Products" button */}
      <div className="text-center mt-6">
        <button
          className="px-6 py-2 bg-[#0B2347] text-white rounded-lg hover:bg-[#0b2347d8] transition-all"
          onClick={() => alert(`Show all products for ${category}`)} // Replace this with navigation later
        >
          See All {category} Products
        </button>
      </div>
    </div>
  );
};

// main Shop page
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const url = `${API_BASE}/fetch_all.php`;
        console.log("Fetching from:", url);

        const res = await fetch(url, { cache: "no-store" });
        const text = await res.text();
        console.log("Raw response:", text);

        const data = JSON.parse(text);
        console.log("Parsed data:", data);

        const processed = (data || []).map((p) => ({
          ...p,
          image_url: p.image_url || p.img_path || "/images/products/placeholder.png",
          price_200_500: p.price_200_500 || p.price || "0.00",
          category: p.category || "Uncategorized",
        }));

        setProducts(processed);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // group products by category
  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    acc[cat] = products.filter((p) => p.category === cat);
    return acc;
  }, {});

  // include unmatched categories
  const other = products.filter((p) => !CATEGORY_ORDER.includes(p.category));
  if (other.length) grouped["Other"] = other;

  return (
    <div className="max-w-[1200px] mx-auto my-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>

      {loading ? (
        <div className="text-center py-20">Loading products...</div>
      ) : (
        <>
          {Object.entries(grouped).map(
            ([category, items]) =>
              items.length > 0 && (
                <CategoryRow key={category} category={category} products={items} />
              )
          )}
        </>
      )}
    </div>
  );
};

export default Shop;
