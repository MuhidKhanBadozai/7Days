import React from "react";
import FeaturedProducts from "../Components/FeaturedProducts";
// This component renders a single full-viewport background image.
// Place the image file at `public/hero.jpg` so it is served at `/hero.jpg`.
const Home = () => {
  return (
    // Use an element that fills the viewport and displays the image as a centered, cover background.
    <div>
       <div
      className="w-full h-screen bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url('/HomeHero.png')` }}
      aria-hidden={true}
    />
    <FeaturedProducts />
    </div>
   
  );
};

export default Home;
