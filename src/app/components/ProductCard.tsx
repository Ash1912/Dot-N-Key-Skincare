import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye, Zap, TrendingUp } from 'lucide-react';
import { Product } from '../data/mockData';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import { trackAddToCart, trackAddToWishlist } from '../utils/analytics';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { showCartToast, showWishlistToast } from './ui/sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    trackAddToCart(product);
    showCartToast(product.name);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      showWishlistToast(product.name, false);
    } else {
      addToWishlist(product);
      trackAddToWishlist(product);
      showWishlistToast(product.name, true);
    }
  };

  const discountPercentage = product.discount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Link to={`/products/${product.slug}`}>
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
          
          {/* Image Container with Skeleton Loader */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 animate-pulse" />
            )}
            <img
              src={product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${isHovered ? 'scale-110' : 'scale-100'}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Quick View Overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-x-0 bottom-4 flex justify-center z-10"
                >
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg rounded-full px-4"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Quick View
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Badges with Animations */}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              {product.discount && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 shadow-lg px-3 py-1">
                    <Zap className="h-3 w-3 mr-1 inline" />
                    {discountPercentage}% OFF
                  </Badge>
                </motion.div>
              )}
              {product.isBestSeller && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 shadow-lg px-3 py-1">
                    <TrendingUp className="h-3 w-3 mr-1 inline" />
                    Best Seller
                  </Badge>
                </motion.div>
              )}
              {product.isNew && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg px-3 py-1">
                    New Arrival
                  </Badge>
                </motion.div>
              )}
            </div>

            {/* Wishlist Button with Animation */}
            <motion.button
              onClick={handleWishlistToggle}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
            >
              <Heart
                className={`h-5 w-5 transition-all duration-300 ${
                  inWishlist 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-gray-600 group-hover:text-red-500'
                }`}
              />
            </motion.button>

            {/* Stock Status */}
            {product.stock < 10 && product.stock > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-3 left-3 z-10"
              >
                <Badge variant="destructive" className="bg-orange-500 text-white border-0 shadow-lg">
                  ⚡ Only {product.stock} left!
                </Badge>
              </motion.div>
            )}
            
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
                <Badge variant="destructive" className="text-lg px-6 py-3 border-0 shadow-xl">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* Rating with Stars */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold ml-1 text-gray-700">{product.rating}</span>
                </div>
                <span className="text-xs text-gray-400">({product.reviews})</span>
              </div>
              {product.discount && (
                <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  Save ₹{product.originalPrice! - product.price}
                </div>
              )}
            </div>

            {/* Product Name */}
            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem] hover:text-purple-600 transition-colors duration-200">
              {product.name}
            </h3>

            {/* Category Tag */}
            <div className="mb-3">
              <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full">
                {product.category.replace('-', ' ')}
              </span>
            </div>

            {/* Price Section */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Add to Cart Button with Animation */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full font-semibold rounded-xl transition-all duration-300 ${
                  product.stock === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md hover:shadow-lg'
                }`}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </motion.div>

            {/* Free Shipping Badge for higher value items */}
            {product.price >= 999 && (
              <div className="mt-3 text-center">
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  🚚 Free Shipping
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};