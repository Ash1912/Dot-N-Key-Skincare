import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Heart, ShoppingBag, Sparkles, ArrowRight, Trash2, Share2 } from 'lucide-react';
import { SEO } from '../utils/seo';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useApp();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleRemoveFromWishlist = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromWishlist(productId);
  };

  return (
    <>
      <SEO title="My Wishlist | Dot & Key" description="View your saved products" />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">My Wishlist</h1>
              <p className="text-lg opacity-90">
                {wishlist.length > 0 
                  ? `You have ${wishlist.length} item${wishlist.length !== 1 ? 's' : ''} saved`
                  : 'Your saved products will appear here'}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {wishlist.length > 0 ? (
            <>
              {/* Wishlist Stats */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 flex flex-wrap justify-between items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 rounded-full px-4 py-2">
                    <span className="text-purple-600 font-semibold">{wishlist.length}</span>
                    <span className="text-purple-600 ml-1">items</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.print()}
                    className="rounded-full"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Wishlist
                  </Button>
                </div>
                <Link to="/products">
                  <Button variant="outline" className="rounded-full group">
                    <ShoppingBag className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Continue Shopping
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              {/* Products Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key="wishlist-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {wishlist.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative group"
                      onMouseEnter={() => setHoveredItem(product.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <ProductCard product={product} />
                      
                      {/* Quick Remove Button on Hover */}
                      <AnimatePresence>
                        {hoveredItem === product.id && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={(e) => handleRemoveFromWishlist(product.id, e)}
                            className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Recommendation Section */}
              {wishlist.length >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-12 pt-8 border-t border-gray-200"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      You Might Also Like
                    </h2>
                    <p className="text-gray-500 mt-1">
                      Based on your wishlist preferences
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.slice(0, 4).map((product, index) => (
                      <motion.div
                        key={`rec-${product.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto"
            >
              <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden">
                <CardContent className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Heart className="h-16 w-16 text-pink-400" />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">Your wishlist is empty</h2>
                  <p className="text-gray-500 mb-6">
                    Save products you love to your wishlist and shop them later!
                  </p>
                  
                  <div className="space-y-3">
                    <Link to="/products">
                      <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Browse Products
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    
                    <div className="pt-4">
                      <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Discover our latest collections
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};