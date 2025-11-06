import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://putratraders.com/api/fetch_all_categories.php");
        const data = await res.json();
        if (Array.isArray(data)) setCategories(data.slice(0, 6));
      } catch (err) {
        console.error("Error fetching footer categories:", err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B2347] text-white py-10 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-gray-700 pb-10">
        {/* Brand Info */}
        <div className="space-y-4">
          <img
            src="/logo.jpg"
            alt="Brand Masters Wholesale"
            className="w-32 md:w-48 h-auto object-contain"
          />
          <div className="flex items-start gap-2">
            <MapPin size={18} className="mt-1 text-[#f9b233]" />
            <p>5900 BALCONES DR STE 19007 AUSTIN, TX 78731</p>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={18} className="text-[#f9b233]" />
            <p>+1 (512) 5430711</p>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-[#f9b233]" />
            <p>info@putratraders.com</p>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            {loading ? (
              // show skeleton placeholders while loading
              Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="h-3 bg-white/10 rounded w-3/4 animate-pulse" />
              ))
            ) : categories && categories.length > 0 ? (
              categories.map((cat, idx) => (
                <li key={idx}>
                  <Link
                    to={`/category/${encodeURIComponent(cat)}`}
                    className="hover:text-[#f9b233] block truncate"
                    onClick={handleLinkClick}
                  >
                    {cat}
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-300">No categories available</li>
            )}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/contactus" className="hover:text-[#f9b233]">Contact Us</a></li>
            <li><a href="/aboutus" className="hover:text-[#f9b233]">About Us</a></li>
            <li>
              <Link 
                to="/privacypolicy" 
                className="hover:text-[#f9b233]"
                onClick={handleLinkClick}
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link 
                to="/returnsrefund" 
                className="hover:text-[#f9b233]"
                onClick={handleLinkClick}
              >
                Returns & Refund
              </Link>
            </li>
            <li>
              <Link 
                to="/termsofservice" 
                className="hover:text-[#f9b233]"
                onClick={handleLinkClick}
              >
                Terms & Condition
              </Link>
            </li>
            <li>
              <Link 
                to="/paymentprocess" 
                className="hover:text-[#f9b233]"
                onClick={handleLinkClick}
              >
                Payment Process
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
          <p className="text-sm mb-3">
            Sign up for our newsletter for product updates
          </p>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full md:w-64 px-4 py-2 rounded-md text-black focus:outline-none"
            />
            <button className="bg-[#f9b233] text-[#0B2347] font-semibold py-2 rounded-md hover:bg-yellow-500 transition w-full md:w-auto">
              SUBSCRIBE NOW
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mt-8 text-sm text-gray-400 gap-4">
        <div>
          <p>Shipping System:</p>
          <div className="flex gap-3 mt-2">
            <img src="/images/dhl.png" alt="DHL" className="h-6" />
            <img src="/images/fedex.png" alt="FedEx" className="h-6" />
            <img src="/images/ups.png" alt="UPS" className="h-6" />
            <img src="/images/usps.png" alt="USPS" className="h-6" />
            <img src="/images/dpd.png" alt="DPD" className="h-6" />
            <img src="/images/gls.png" alt="GLS" className="h-6" />
          </div>
        </div>

        <p className="text-center md:text-right">
          Copyright © 2024 BM Wholesale all rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;