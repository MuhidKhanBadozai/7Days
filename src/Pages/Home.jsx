import React from "react";
import FeaturedProducts from "../Components/FeaturedProducts";
import Reviews from "../Components/Reviews";

const Home = () => {
  return (
    <div>
      {/* Minimal Hero Section */}
      <div className="relative w-full h-screen bg-center bg-cover bg-no-repeat flex items-center justify-center">
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
      <Reviews />
    </div>
  );
};

export default Home;