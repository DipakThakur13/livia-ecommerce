import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes, FaSearch } from "react-icons/fa";

const categories = [
  { name: "Men", link: "/category/men" },
  { name: "Women", link: "/category/women" },
  { name: "Kids", link: "/category/kids" },
  { name: "Accessories", link: "/category/accessories" },
  { name: "Footwear", link: "/category/footwear" }
];

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  return (
    <>
      {/* 🔷 Top Navbar */}
      <nav className={`flex justify-between items-center p-4 shadow-md ${darkMode ? "bg-gray-900 text-white" : "bg-white"}`}>
        
        {/* Sidebar Button for Mobile */}
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
          <FaBars size={24} />
        </button>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-purple-600">Livia</Link>

        {/* Search Bar */}
        <div className="relative hidden md:flex w-1/3">
          <input
            type="text"
            placeholder="Search for products..."
            className="border p-2 w-full rounded pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>

        {/* Icons */}
        <div className="flex space-x-6">
          {/* Wishlist */}
          <Link to="/wishlist" className="relative">
            <FaHeart size={24} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center space-x-2">
              <FaUser size={24} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 bg-white shadow-md rounded p-3 w-40">
                <Link to="/profile" className="block py-1">Profile</Link>
                <Link to="/orders" className="block py-1">Orders</Link>
                <button onClick={() => alert("Logging out...")} className="block py-1 text-red-500">Logout</button>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 border rounded">
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </nav>

      {/* 🔷 Category Navbar (Desktop) */}
      <div className={`hidden lg:flex justify-center space-x-8 p-2 shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100"}`}>
        {categories.map((category) => (
          <Link key={category.name} to={category.link} className="hover:underline">
            {category.name}
          </Link>
        ))}
      </div>

      {/* 🔷 Sidebar for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-md p-6">
            <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4">
              <FaTimes size={24} />
            </button>

            <h2 className="text-xl font-bold mb-4">Categories</h2>
            {categories.map((category) => (
              <Link key={category.name} to={category.link} className="block py-2 hover:bg-gray-200 rounded">
                {category.name}
              </Link>
            ))}

            <hr className="my-4" />

            <h2 className="text-xl font-bold mb-4">User</h2>
            <Link to="/profile" className="block py-2 hover:bg-gray-200 rounded">Profile</Link>
            <Link to="/orders" className="block py-2 hover:bg-gray-200 rounded">Orders</Link>
            <button onClick={() => alert("Logging out...")} className="block py-2 hover:bg-gray-200 rounded text-red-500">
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
