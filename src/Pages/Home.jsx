import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Your Home Page
      </h1>
      <p className="text-gray-600 text-lg max-w-md text-center">
        This is the starting point of your React app built with Vite. 
        Customize this page to create your awesome content!
      </p>
      <h1 className="text-3xl font-bold text-blue-600">Hello Tailwind!</h1>
    </div>
  );
};

export default Home;
