import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './Pages/Home.jsx'
import Navbar from './Components/Navbar.jsx'
import ProductCatalogue from './Components/ProductCatalogue.jsx'
import Footer from './Components/Footer.jsx'
import Shop from "./Components/Shop.jsx";
import Category from "./Components/Category.jsx";
import ProductDetails from "./Components/ProductDetails.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar is outside Routes so it stays visible on all pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<ProductCatalogue />} />
        <Route path="/shop" element={<Shop />} />
         <Route path="/category/:categoryName" element={<Category />} />
         <Route path="/product/:sku" element={<ProductDetails />} />
      </Routes>
      {/* Footer is outside Routes so it shows on every page */}
      <Footer />
    </BrowserRouter>
  )
}

export default App
