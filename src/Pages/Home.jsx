import React, { useEffect, useState } from "react";
import FeaturedProducts from "../Components/FeaturedProducts";
import Reviews from "../Components/Reviews";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://putratraders.com/api";

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Health and Household');
  const [products, setProducts] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [quantities, setQuantities] = useState({});

  // Navigate to product details
  const handleProductClick = (sku) => {
    navigate(`/product/${sku}`);
  };

  // Quantity input handler
  const handleQuantityChange = (sku, value) => {
    setQuantities((prev) => ({ ...prev, [sku]: value }));
  };

  // Add to cart handler
  const handleAddToCart = async (product) => {
    const quantity = parseInt(quantities[product.sku] || 1, 10);
    try {
      const key = 'local_cart';
      const raw = localStorage.getItem(key);
      const cart = Array.isArray(JSON.parse(raw || '[]')) ? JSON.parse(raw || '[]') : [];
      const price = product.price_200_500 || product.price || 0;
      const img = product.image_url;
      const existing = cart.find((i) => i.sku === product.sku);
      if (existing) {
        existing.quantity = (existing.quantity || 0) + quantity;
        window.dispatchEvent(new CustomEvent('cart-notification', { detail: { message: `${product.name} quantity updated in cart`, type: 'success' } }));
      } else {
        cart.push({ sku: product.sku, id: product.id || product.product_id || null, name: product.name, price, quantity, image: img });
        window.dispatchEvent(new CustomEvent('cart-notification', { detail: { message: `${product.name} added to cart`, type: 'success' } }));
      }
      localStorage.setItem(key, JSON.stringify(cart));
    } catch (err) {
      console.error('Error updating local cart', err);
      window.dispatchEvent(new CustomEvent('cart-notification', { detail: { message: `Failed to update cart`, type: 'error' } }));
    }
  };

  useEffect(() => {
    // fetch products for activeTab
    const fetchProducts = async () => {
      try {
        setCategoriesLoading(true);
        const url = `${API_BASE}/fetch_by_category.php?category=${encodeURIComponent(activeTab)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (Array.isArray(data)) {
          const processed = data.map((p) => ({
            ...p,
            image_url: p.image_url && p.image_url.startsWith('http') ? p.image_url : `${API_BASE.replace('/api','')}${p.image_url ? (p.image_url.startsWith('/') ? '' : '/') + p.image_url : ''}`,
            price_200_500: p.price_200_500 || p.price || '0.00',
            rating: p.rating || 0,
            reviews: p.reviews || 0,
          }));
          setProducts(processed);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error('Error fetching featured category products:', err);
        setProducts([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab]);

  return (
    <div>
      {/* Minimal Hero Section */}
      <div className="relative w-full h-[40vh] md:h-screen bg-center bg-cover bg-no-repeat flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('/Home.jpg')` }}
          aria-hidden={true}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Centered Content */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4">
            PUTRA TRADERS
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200">
            Global Trade Excellence
          </p>
        </div>
      </div>

      <FeaturedProducts />

      {/* Browse Featured Categories (interactive) */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">BROWSE FEATURED CATEGORIES</h2>
          {/* Tabs */}
          <div className="flex items-center justify-center gap-8 text-gray-600 mb-8">
            {[
              'Health and Household',
              'Grocery and Gourmet Food',
              'Automotive'
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`uppercase text-sm tracking-wide ${activeTab === tab ? 'border-b-2 border-[#000000] pb-1 text-black' : 'text-gray-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Products grid (3 columns) */}
          {categoriesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center border border-gray-200 rounded-2xl p-3 sm:p-4 bg-white h-auto md:h-[400px] w-full animate-pulse"
                >
                  <div className="w-full h-40 md:h-48 bg-gray-300 rounded-lg mb-5"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">No products found for this category.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {products.slice(0,4).map((product, idx) => (
                <div
                  key={product.sku || idx}
                  className="group relative flex flex-col items-center text-center border border-gray-200 rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white h-auto md:h-[400px] w-full"
                >
                  {/* Image */}
                  <div 
                    className="relative w-full h-36 md:h-48 flex items-center justify-center mb-5 overflow-hidden cursor-pointer"
                    onClick={() => handleProductClick(product.sku)}
                  >
                    <img
                      src={product.image_url || `/Item${(idx%3)+1}.png`}
                      alt={product.name || 'Product'}
                      className="max-w-full h-auto max-h-28 md:max-h-40 object-contain transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = "/placeholder.png";
                      }}
                    />

                    {/* Hover overlay removed: add-to-cart handled via quantity + Add button */}
                  </div>

                  {/* Product Info */}
                  <h3 
                    className="text-base font-semibold mb-2 text-gray-800 line-clamp-2 hover:text-[#000000] transition-colors cursor-pointer"
                    onClick={() => handleProductClick(product.sku)}
                  >
                    {product.name || 'Product Name'}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">SKU: {product.sku || '—'}</p>

                  {/* Ratings */}
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-yellow-400 ${
                          i < (product.rating || Math.floor(Math.random() * 2) + 3) ? "opacity-100" : "opacity-30"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-500 ml-1">
                      ({product.reviews || Math.floor(Math.random() * 100) + 20})
                    </span>
                  </div>

                  {/* Price */}
                  <p className="text-lg font-semibold text-gray-800 mb-3">
                    ${product.price_200_500 || product.price || '0.00'}
                  </p>

                  {/* Quantity and Add to Cart */}
                  <div className="flex items-center gap-2 mt-auto">
                    <input
                      type="number"
                      min="1"
                      value={quantities[product.sku] || 1}
                      onChange={(e) => handleQuantityChange(product.sku, e.target.value)}
                      className="w-12 text-center border border-gray-300 rounded-md p-1 focus:ring-1 focus:ring-[#000000] text-sm"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center gap-1"
                    >
                      <ShoppingCart size={16} />
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Reviews />
    </div>
  );
};

export default Home;