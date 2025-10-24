import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0B2347] text-white py-10 px-6 md:px-16">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-gray-700 pb-10">
        {/* Brand Info */}
        <div className="space-y-4">
          <img
            src="/logo.jpg"
            alt="Brand Masters Wholesale"
            className="w-15 md:w-25 h-25"
          />
          <div className="flex items-start gap-2">
            <MapPin size={18} className="mt-1 text-[#f9b233]" />
            <p>18538 Anderwood Forest Dr Richmond TX 77407</p>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={18} className="text-[#f9b233]" />
            <p>+1 (281) 6289854</p>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-[#f9b233]" />
            <p>support@brandmasterswholesale.com</p>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#f9b233]">Automotive</a></li>
            <li><a href="#" className="hover:text-[#f9b233]">Health & Household</a></li>
            <li><a href="#" className="hover:text-[#f9b233]">Home and Kitchen</a></li>
            <li><a href="#" className="hover:text-[#f9b233]">Grocery & Gourmet Food</a></li>
            <li><a href="#" className="hover:text-[#f9b233]">Beauty & Personal Care</a></li>
            <li><a href="#" className="hover:text-[#f9b233]">Clothing, Shoes & Jewelry</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#f9b233]">Contact Us</a></li>
            <li><a href="#" className="hover:text-[#f9b233]">About Us</a></li>
            <li><a href="#" className="hover:text-[#f9b233]">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#f9b233]">Returns & Refund</a></li>
            <li><a href="#" className="hover:text-[#f9b233]">Terms & Condition</a></li>
            <li><a href="#" className="hover:text-[#f9b233]">Payment Process</a></li>
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
