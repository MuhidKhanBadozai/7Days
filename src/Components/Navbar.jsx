import { useState } from "react";
import { Search, User, Heart, Shuffle, ShoppingBag, Menu } from "lucide-react";

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const categories = [
        "Automotive",
        "Beauty and Personal Care",
        "Perfumes",
        "Grocery and Gourmet Food",
        "Health and Household",
        "Home and Kitchen",
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-white text-[#0B2347] shadow-md">
            {/* Top Section */}
            <div className="flex items-center justify-center px-6 py-8 space-x-6 w-[1700px] mx-auto">
                {/* Logo */}
                <div className="flex items-center space-x-4">
                    {/* 🟠 Replace below with your logo image */}
                    <img
                        src="/NavLogo.png"
                        alt="Logo"
                        className="h-23 w-auto object-contain"
                    />
                </div>

                {/* Search Bar */}
                <div className="flex-grow mx-4 w-[100px] relative">
                    <input
                        type="text"
                        placeholder="Search for products"
                        className="w-full rounded-full py-5 px-4 pr-20 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0B2347]"
                    />
                    <Search className="absolute right-4 top-5 text-gray-500" size={26} />
                </div>


                {/* Right Icons */}
                <div className="flex items-center space-x-5">
                    <button className="flex items-center space-x-2 bg-[#0B2347] text-white px-4 py-4 rounded-full hover:bg-white hover:text-[#0B2347] transition">
                        <User size={22} />
                        <span className="text-lg font-medium">Login / Register</span>
                    </button>

                    <button className="relative p-4 rounded-full bg-[#0B2347] text-white">
                        <Heart size={26} />
                    </button>

                    <button className="relative p-4 rounded-full bg-[#0B2347] text-white">
                        <Shuffle size={26} />
                        <span className="absolute -top-1 -right-1 text-xs bg-white text-[#0B2347] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                            2
                        </span>
                    </button>

                    <button className="relative flex items-center bg-[#0B2347] text-white rounded-full px-3 py-4">
                        <ShoppingBag size={24} />
                        <span className="ml-2 text-lg">$0.00</span>
                        <span className="absolute -top-1 -right-1 text-xs bg-white text-[#0B2347] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                            0
                        </span>
                    </button>
                </div>
            </div>

            {/* Bottom Menu */}
            <nav className="bg-[#0B2347] border-t border-white/10">
                <ul className="flex items-center justify-center space-x-10 px-8 py-6 text-lg font-semibold text-white max-w-7xl mx-auto">
                    {/* Browse Categories Dropdown */}
                    <li className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center space-x-2 hover:text-orange-400 transition text-white"
                        >
                            <Menu size={18} />
                            <span>Browse Categories</span>
                            <span className="ml-1">▾</span>
                        </button>

                        {dropdownOpen && (
                            <ul className="absolute left-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
                                {categories.map((cat) => (
                                    <li
                                        key={cat}
                                        className="px-4 py-2 hover:bg-orange-100 cursor-pointer"
                                    >
                                        {cat}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>

                    {/* Navigation Links */}
                    <li className="hover:text-orange-400 cursor-pointer">Home</li>
                    <li className="hover:text-orange-400 cursor-pointer">Shop</li>
                    <li className="hover:text-orange-400 cursor-pointer">Catalogue</li>
                    <li className="hover:text-orange-400 cursor-pointer">About Us</li>
                    <li className="hover:text-orange-400 cursor-pointer">Contact Us</li>
                    <li className="hover:text-orange-400 cursor-pointer">Wholesale Account</li>
                    <li className="hover:text-orange-400 cursor-pointer">Payment Process</li>
                </ul>
            </nav>
        </header>
    );
}
