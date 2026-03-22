import { Link, useNavigate } from "react-router-dom";
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone, Clock, ArrowRight, CreditCard, Shield, Truck, Heart } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing! 🎉", {
        duration: 3000,
      });
      setEmail("");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 border-t border-gray-200">
      {/* Newsletter Section - Enhanced */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-95"></div>
        
        <div className="relative py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm mb-6">
                <Mail className="h-8 w-8" />
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-3">
                Subscribe to our Newsletter
              </h3>
              
              <p className="text-lg mb-8 opacity-95 max-w-2xl mx-auto">
                Get exclusive offers, skincare tips & early access to new products
              </p>
              
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white text-gray-900 border-0 h-12 px-6 rounded-xl focus:ring-2 focus:ring-white/50"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100 hover:text-purple-700 h-12 px-8 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              
              <p className="text-xs mt-4 opacity-80">No spam, unsubscribe anytime. We respect your privacy.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* About Section - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              {/* <div className="h-10 w-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">D&K</span>
              </div> */}
              <h3 className="font-bold text-xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Dot & Key
              </h3>
            </div>
            
            <p className="text-gray-600 mb-4 leading-relaxed">
              Science-backed skincare for all skin types. Formulated with love in India.
            </p>
            
            <div className="flex space-x-3 mb-6">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-50 group"
              >
                <Facebook className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/dotandkey.skincare/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-pink-50 group"
              >
                <Instagram className="h-5 w-5 text-gray-600 group-hover:text-pink-600 transition-colors" />
              </a>
              <a
                href="https://youtube.com/@dotandkeyskincare"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-red-50 group"
              >
                <Youtube className="h-5 w-5 text-gray-600 group-hover:text-red-600 transition-colors" />
              </a>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4 text-purple-500" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Phone className="h-4 w-4 text-purple-500" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4 text-purple-500" />
                <span>Mon-Sat: 10AM - 7PM</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-4 text-gray-800 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 mt-2"></div>
            </h4>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "All Products", path: "/products" },
                { name: "Best Sellers", path: "/products?filter=bestseller" },
                { name: "New Arrivals", path: "/products?filter=new" },
                { name: "Offers", path: "/products?filter=offers" },
                { name: "My Account", path: "/account" },
                { name: "My Orders", path: "/account/orders" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-500 hover:text-purple-600 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-purple-400 rounded-full group-hover:bg-purple-600 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Shop by Category - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-4 text-gray-800 relative">
              Shop by Category
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 mt-2"></div>
            </h4>
            <ul className="space-y-2">
              {[
                { name: "Serums", path: "serums", icon: "✨" },
                { name: "Moisturizers", path: "moisturizers", icon: "💧" },
                { name: "Cleansers", path: "cleansers", icon: "🧼" },
                { name: "Sunscreen", path: "sunscreen", icon: "☀️" },
                { name: "Face Masks", path: "face-masks", icon: "🎭" },
              ].map((cat) => (
                <li key={cat.path}>
                  <Link
                    to={`/products?category=${cat.path}`}
                    className="text-gray-500 hover:text-purple-600 transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-sm group-hover:scale-110 transition-transform">{cat.icon}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-4 text-gray-800 relative">
              Customer Service
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 mt-2"></div>
            </h4>
            <ul className="space-y-2">
              {[
                { name: "Contact Us", path: "/contact" },
                { name: "Shipping Policy", path: "/shipping" },
                { name: "Returns & Exchanges", path: "/returns" },
                { name: "FAQ", path: "/faq" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms & Conditions", path: "/terms" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-500 hover:text-purple-600 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-pink-400 rounded-full group-hover:bg-pink-600 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Truck className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium">Free Shipping</span>
              <span className="text-xs text-gray-400">on ₹999+</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Shield className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium">100% Authentic</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Heart className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium">Love Your Skin</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <CreditCard className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium">Secure Payments</span>
            </div>
          </div>
        </div>

        {/* Payment Methods - Enhanced */}
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-gray-600 mb-4">We Accept</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {[
              { name: "Visa", color: "hover:border-blue-500" },
              { name: "Mastercard", color: "hover:border-orange-500" },
              { name: "RuPay", color: "hover:border-green-500" },
              { name: "UPI", color: "hover:border-purple-500" },
              { name: "Paytm", color: "hover:border-blue-400" },
              { name: "GPay", color: "hover:border-green-600" },
              { name: "PhonePe", color: "hover:border-purple-600" },
            ].map((method) => (
              <div
                key={method.name}
                className={`px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:shadow-md transition-all duration-300 cursor-default border border-gray-200 ${method.color}`}
              >
                {method.name}
              </div>
            ))}
          </div>
        </div>

        {/* Copyright - Enhanced */}
        <div className="text-center pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            © {currentYear} Dot & Key. All rights reserved. | Made with{" "}
            <span className="text-red-500 inline-block animate-pulse">❤️</span> in India
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Science-backed skincare for radiant, healthy skin
          </p>
        </div>
      </div>
    </footer>
  );
};