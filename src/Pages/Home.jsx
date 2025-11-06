import React, { useEffect, useState } from "react";
import FeaturedProducts from "../Components/FeaturedProducts";
import Reviews from "../Components/Reviews";

const API_BASE = "https://putratraders.com/api";

const Home = () => {
  const [activeTab, setActiveTab] = useState('Personal Care');
  const [products, setProducts] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

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
              'Grocery',
              'Personal Care'
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`uppercase text-sm tracking-wide ${activeTab === tab ? 'border-b-2 border-[#0B2347] pb-1 text-black' : 'text-gray-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Products grid (3 columns) */}
          {categoriesLoading ? (
            <div className="text-center py-12">Loading...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">No products found for this category.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {products.slice(0,3).map((p, idx) => (
                <div key={p.sku || idx} className="text-center">
                  <div className="flex justify-center mb-4">
                    <img src={p.image_url || `/Item${(idx%3)+1}.png`} alt={p.name || 'Product'} className="h-40 object-contain" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{p.name || 'Product Name'}</h3>
                  <div className="text-sm text-gray-500 mb-2">SKU: {p.sku || '—'}</div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-yellow-400">★★★★★</div>
                    <div className="text-sm text-gray-500">({p.reviews ?? 0})</div>
                  </div>
                  <div className="text-xl font-bold text-[#0B2347] mb-4">${p.price_200_500 ?? p.price ?? '0.00'}</div>
                  <button className="px-6 py-2 bg-[#f9b233] text-white rounded-md font-semibold">SELECT OPTIONS</button>
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