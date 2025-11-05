import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Search,
    User,
    Heart,
    Shuffle,
    ShoppingBag,
    Menu,
    LogOut,
    List
} from "lucide-react";

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

    // ✅ Fetch categories + check login
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("https://putratraders.com/api/fetch_all_categories.php");
                const data = await res.json();
                if (Array.isArray(data)) setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();

        // ✅ Check login from localStorage
        const user = localStorage.getItem("user");
        if (user) {
            const parsedUser = JSON.parse(user);
            setUserName(parsedUser.full_name || parsedUser.name || "User");
            setIsLoggedIn(true);
        }
    }, []);

    // ✅ Re-check login state if changed in other components
    useEffect(() => {
        const handleStorageChange = () => {
            const user = localStorage.getItem("user");
            if (user) {
                const parsedUser = JSON.parse(user);
                setUserName(parsedUser.full_name || parsedUser.name || "User");
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleCategoryClick = (category) => {
        setDropdownOpen(false);
        navigate(`/category/${encodeURIComponent(category)}`);
    };

    // ✅ Logout handler
    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setProfileOpen(false);
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white text-[#0B2347] shadow-md">
            {/* Top Section */}
            <div className="flex items-center justify-center px-[50px] py-8 space-x-6 w-[1700px] mx-auto">
                {/* Logo */}
                <div className="flex items-center space-x-4">
                    <img
                        src="/logo.jpg"
                        alt="Logo"
                        className="h-29 w-auto object-contain"
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
                <div className="flex items-center space-x-[20px] relative">
                    {/* ✅ User / Profile Section */}
                    {!isLoggedIn ? (
                        <>
                            <button
                                onClick={() => navigate("/login")}
                                className="flex items-center space-x-2 bg-[#0B2347] text-white px-4 py-4 rounded-full hover:bg-white hover:text-[#0B2347] transition"
                            >
                                <User size={22} />
                                <span className="text-lg font-medium">Login</span>
                            </button>
                            <button
                                onClick={() => navigate("/signup")}
                                className="flex items-center space-x-2 bg-[#0B2347] text-white px-4 py-4 rounded-full hover:bg-white hover:text-[#0B2347] transition"
                            >
                                <User size={22} />
                                <span className="text-lg font-medium">Register</span>
                            </button>
                        </>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center space-x-2 bg-[#0B2347] text-white px-4 py-4 rounded-full hover:bg-white hover:text-[#0B2347] transition"
                            >
                                <User size={22} />
                                <span className="text-lg font-medium">{userName}</span>
                            </button>

                            {profileOpen && (
                                <ul className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
                                    <li
                                        onClick={() => {
                                            navigate("/profile");
                                            setProfileOpen(false);
                                        }}
                                        className="px-4 py-2 hover:bg-orange-100 cursor-pointer flex items-center gap-2"
                                    >
                                        <User size={18} /> Profile
                                    </li>
                                    <li
                                        onClick={() => {
                                            navigate("/orders");
                                            setProfileOpen(false);
                                        }}
                                        className="px-4 py-2 hover:bg-orange-100 cursor-pointer flex items-center gap-2"
                                    >
                                        <List size={18} /> Order History
                                    </li>
                                    <li
                                        onClick={handleLogout}
                                        className="px-4 py-2 hover:bg-red-100 cursor-pointer text-red-600 flex items-center gap-2"
                                    >
                                        <LogOut size={18} /> Logout
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}

                    {/* Favorite */}
                    <button className="relative p-4 rounded-full bg-[#0B2347] text-white">
                        <Heart size={26} />
                    </button>

                    {/* Compare */}
                    <button className="relative p-4 rounded-full bg-[#0B2347] text-white">
                        <Shuffle size={26} />
                        <span className="absolute -top-1 -right-1 text-xs bg-white text-[#0B2347] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                            2
                        </span>
                    </button>

                    {/* Cart */}
                    <button
                        onClick={() => navigate("/cart")}
                        className="relative flex items-center bg-[#0B2347] text-white rounded-full px-3 py-4 hover:bg-white hover:text-[#0B2347] transition"
                    >
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
                    {/* Browse Categories */}
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
                                {loading ? (
                                    <li className="px-4 py-2 text-gray-500">Loading...</li>
                                ) : categories.length > 0 ? (
                                    categories.map((cat, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleCategoryClick(cat)}
                                            className="px-4 py-2 hover:bg-orange-100 cursor-pointer"
                                        >
                                            {cat}
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-4 py-2 text-gray-500">No categories found</li>
                                )}
                            </ul>
                        )}
                    </li>

                    {/* Navigation Links */}
                    <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
                    <li><Link to="/shop" className="hover:text-orange-400">Shop</Link></li>
                    <li><Link to="/catalogue" className="hover:text-orange-400">Catalogue</Link></li>
                    <li><a className="hover:text-orange-400">About Us</a></li>
                    <li><a className="hover:text-orange-400">Contact Us</a></li>
                    <li><a className="hover:text-orange-400">Wholesale Account</a></li>
                    <li><a className="hover:text-orange-400">Payment Process</a></li>
                </ul>
            </nav>
        </header>
    );
}
