import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, User, Search, Menu, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Badge } from "./ui/badge";
import { trackSearch } from "../utils/analytics";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const { user, wishlist, logout, getCartCount } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      trackSearch(searchQuery);
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Best Sellers", path: "/products?filter=bestseller" },
    { name: "New Arrivals", path: "/products?filter=new" },
    { name: "Offers", path: "/products?filter=offers" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-white border-b border-gray-100"
      }`}
    >
      {/* Top Banner - Simple gradient without SVG pattern */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white"
      >
        <div className="py-2.5 px-4 text-center text-sm font-medium">
          <p>
            🎉 Free shipping on orders above ₹999 | Use code{" "}
            <span className="font-bold bg-white/20 px-2 py-0.5 rounded-full">WELCOME20</span> for 20% off
          </p>
        </div>
      </motion.div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo with Animation */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/" className="flex items-center space-x-2 shrink-0 group">
              {/* <div className="h-12 w-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                <span className="text-white font-bold text-xl">D&K</span>
              </div> */}
              <div className="hidden sm:block">
                <span className="font-bold text-xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:from-pink-500 group-hover:to-purple-500 transition-all">
                  Dot & Key
                </span>
                <p className="text-xs text-gray-500 -mt-1">Science-backed skincare</p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation with Hover Effects */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors font-medium rounded-lg group"
              >
                {link.name}
                <span className="absolute inset-x-4 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Search Bar with Animation */}
          <motion.form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md"
            animate={{ scale: searchFocused ? 1.02 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-full">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${
                searchFocused ? "text-purple-500" : "text-gray-400"
              }`} />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="pl-10 w-full border-gray-200 focus:border-purple-400 rounded-full bg-gray-50 focus:bg-white transition-all duration-200"
              />
            </div>
          </motion.form>

          {/* Action Icons */}
          <div className="flex items-center space-x-1">
            {/* Wishlist Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/wishlist" className="relative">
                <Button variant="ghost" size="icon" className="relative hover:bg-pink-50 rounded-full transition-all duration-200">
                  <Heart className="h-5 w-5" />
                  {wishlist.length > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Badge className="h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs rounded-full">
                        {wishlist.length}
                      </Badge>
                    </motion.div>
                  )}
                </Button>
              </Link>
            </motion.div>

            {/* Cart Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon" className="relative hover:bg-purple-50 rounded-full transition-all duration-200">
                  <ShoppingCart className="h-5 w-5" />
                  {getCartCount() > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Badge className="h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs rounded-full">
                        {getCartCount()}
                      </Badge>
                    </motion.div>
                  )}
                </Button>
              </Link>
            </motion.div>

            {/* User Menu */}
            {user ? (
              <Sheet>
                <SheetTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="ghost" size="icon" className="hover:bg-purple-50 rounded-full transition-all duration-200">
                      <User className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </SheetTrigger>
                <SheetContent className="w-[320px] sm:w-[380px] p-0">
                  <div className="h-full flex flex-col">
                    {/* User Profile Header */}
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-2xl backdrop-blur-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Welcome back!</h3>
                          <p className="text-sm opacity-90">{user.name}</p>
                          <p className="text-xs opacity-75">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="flex-1 p-6">
                      <div className="space-y-1">
                        <Link
                          to="/account"
                          className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors group"
                        >
                          <User className="h-5 w-5 text-purple-600" />
                          <span className="font-medium">My Profile</span>
                        </Link>
                        <Link
                          to="/account/orders"
                          className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors group"
                        >
                          <ShoppingCart className="h-5 w-5 text-purple-600" />
                          <span className="font-medium">My Orders</span>
                        </Link>
                        <Link
                          to="/wishlist"
                          className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors group"
                        >
                          <Heart className="h-5 w-5 text-purple-600" />
                          <span className="font-medium">My Wishlist</span>
                        </Link>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t">
                        <Button
                          onClick={logout}
                          variant="destructive"
                          className="w-full bg-red-500 hover:bg-red-600"
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <Link to="/login">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" className="rounded-full border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all">
                    Sign In
                  </Button>
                </motion.div>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="h-5 w-5" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0">
                <div className="h-full flex flex-col">
                  {/* Mobile Header */}
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {/* <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center">
                          <span className="font-bold">D&K</span>
                        </div> */}
                        <span className="font-bold text-lg">Dot & Key</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-white hover:bg-white/20"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <p className="text-sm opacity-90">Science-backed skincare for all skin types</p>
                  </div>
                  
                  {/* Mobile Navigation */}
                  <nav className="flex-1 p-6">
                    <div className="space-y-1">
                      {navLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors text-gray-700 hover:text-purple-600 font-medium"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                    
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="mt-6 pt-6 border-t">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-full border-gray-200 rounded-lg"
                        />
                      </div>
                    </form>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar - Visible only on mobile */}
        <div className="md:hidden mt-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full border-gray-200 rounded-full bg-gray-50 focus:bg-white transition-all"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};