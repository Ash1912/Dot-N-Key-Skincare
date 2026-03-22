import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, reviews as allReviews, Product } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent } from '../components/ui/card';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle,
  Clock,
  Award,
  Share2,
  Copy,
  Twitter,
  Facebook,
  Instagram
} from 'lucide-react';
import { toast } from 'sonner';
import { trackViewContent, trackAddToCart, trackAddToWishlist } from '../utils/analytics';
import { SEO, generateProductSchema, injectStructuredData } from '../utils/seo';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find(p => p.slug === slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();

  useEffect(() => {
    if (product) {
      trackViewContent(product);
      injectStructuredData(generateProductSchema(product));
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-gray-800">Product Not Found</h1>
            <p className="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed</p>
            <Link to="/products">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
                Back to Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const productReviews = allReviews.filter(r => r.productId === product.id);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const averageRating = product.rating;
  const ratingDistribution = {
    5: Math.floor(product.reviews * 0.6),
    4: Math.floor(product.reviews * 0.25),
    3: Math.floor(product.reviews * 0.1),
    2: Math.floor(product.reviews * 0.03),
    1: Math.floor(product.reviews * 0.02),
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    trackAddToCart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart!`, {
      icon: '🛒',
      duration: 2000,
    });
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist', {
        icon: '💔',
      });
    } else {
      addToWishlist(product);
      trackAddToWishlist(product);
      toast.success('Added to wishlist', {
        icon: '❤️',
      });
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
    setShowShare(false);
  };

  return (
    <>
      <SEO
        title={`${product.name} | Dot & Key`}
        description={product.description}
        keywords={`${product.name}, ${product.category}, skincare, ${product.ingredients.join(', ')}`}
        ogImage={product.images[0]}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-sm"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <Link to="/" className="text-gray-500 hover:text-purple-600 transition-colors">Home</Link>
              <span className="text-gray-400">/</span>
              <Link to="/products" className="text-gray-500 hover:text-purple-600 transition-colors">Products</Link>
              <span className="text-gray-400">/</span>
              <Link to={`/products?category=${product.category}`} className="text-gray-500 hover:text-purple-600 transition-colors capitalize">
                {product.category.replace('-', ' ')}
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-800 font-medium truncate">{product.name}</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Images Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative">
                {/* Main Image */}
                <div 
                  className="relative aspect-square mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 cursor-zoom-in"
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                >
                  <motion.img
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    animate={{ scale: isZoomed ? 1.5 : 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.discount && (
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                      >
                        {product.discount}% OFF
                      </motion.div>
                    )}
                    {product.isBestSeller && (
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                      >
                        ⭐ Best Seller
                      </motion.div>
                    )}
                    {product.isNew && (
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                      >
                        New Arrival
                      </motion.div>
                    )}
                  </div>

                  {/* Share Button */}
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => setShowShare(!showShare)}
                      className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
                    >
                      <Share2 className="h-5 w-5 text-gray-600" />
                    </button>
                    
                    {/* Share Popup */}
                    <AnimatePresence>
                      {showShare && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: -10 }}
                          className="absolute right-0 mt-2 bg-white rounded-xl shadow-xl p-3 z-10 w-48"
                        >
                          <p className="text-xs font-semibold text-gray-600 mb-2">Share this product</p>
                          <div className="space-y-2">
                            <button onClick={copyShareLink} className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
                              <Copy className="h-4 w-4 text-purple-600" />
                              <span className="text-sm">Copy link</span>
                            </button>
                            <button className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
                              <Twitter className="h-4 w-4 text-blue-400" />
                              <span className="text-sm">Share on Twitter</span>
                            </button>
                            <button className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
                              <Facebook className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">Share on Facebook</span>
                            </button>
                            <button className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
                              <Instagram className="h-4 w-4 text-pink-600" />
                              <span className="text-sm">Share on Instagram</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Navigation Arrows */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'border-purple-600 shadow-lg scale-105' 
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <img src={image} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-800">{averageRating}</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">{product.reviews} reviews</span>
                <span className="text-gray-400">|</span>
                <span className="text-green-600 font-medium">{product.stock}+ sold</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0">
                      Save ₹{(product.originalPrice - product.price).toLocaleString()}
                    </Badge>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

              {/* Skin Type */}
              <div className="mb-6">
                <p className="font-semibold mb-3 text-gray-800">Suitable for:</p>
                <div className="flex flex-wrap gap-2">
                  {product.skinType.map((type) => (
                    <Badge key={type} variant="outline" className="capitalize bg-gray-50 hover:bg-purple-50 transition-colors">
                      {type === 'all' ? '✨ All Skin Types' : type.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-green-600 font-semibold">In Stock</span>
                    {product.stock < 10 && (
                      <span className="text-orange-600 text-sm ml-2">(Only {product.stock} left!)</span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-red-500" />
                    <span className="text-red-600 font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <p className="font-semibold mb-3 text-gray-800">Quantity:</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="h-10 w-10 rounded-full hover:bg-white"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      className="h-10 w-10 rounded-full hover:bg-white"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-500">Available: {product.stock} units</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-8">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white h-12 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleWishlistToggle}
                  variant="outline"
                  className="h-12 w-12 rounded-xl border-2 hover:border-red-300 hover:bg-red-50 transition-all"
                >
                  <Heart className={`h-5 w-5 transition-all ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-b bg-gray-50 rounded-xl p-4">
                <div className="text-center">
                  <Truck className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm font-semibold">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders ₹999+</p>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm font-semibold">100% Authentic</p>
                  <p className="text-xs text-gray-500">Original products</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm font-semibold">Easy Returns</p>
                  <p className="text-xs text-gray-500">7-day return</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <Tabs defaultValue="benefits" className="w-full">
              <TabsList className="w-full justify-start bg-gray-100 rounded-xl p-1">
                <TabsTrigger value="benefits" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  ✨ Benefits
                </TabsTrigger>
                <TabsTrigger value="ingredients" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  🌿 Ingredients
                </TabsTrigger>
                <TabsTrigger value="howtouse" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  📖 How to Use
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  ⭐ Reviews ({productReviews.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="benefits" className="py-6">
                <Card className="border-0 shadow-lg rounded-2xl">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-gray-700">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ingredients" className="py-6">
                <Card className="border-0 shadow-lg rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-3">
                      {product.ingredients.map((ingredient, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Badge variant="outline" className="text-sm py-2 px-4 bg-gray-50 hover:bg-purple-50 transition-colors">
                            {ingredient}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="howtouse" className="py-6">
                <Card className="border-0 shadow-lg rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-gray-700 leading-relaxed">{product.howToUse}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="py-6">
                {productReviews.length > 0 ? (
                  <div className="space-y-6">
                    {/* Rating Summary */}
                    <Card className="border-0 shadow-lg rounded-2xl">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-8">
                          <div className="text-center md:text-left">
                            <div className="text-5xl font-bold text-gray-800">{averageRating}</div>
                            <div className="flex items-center justify-center md:justify-start gap-1 my-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-5 w-5 ${i < Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <p className="text-sm text-gray-500">Based on {product.reviews} reviews</p>
                          </div>
                          <div className="flex-1 space-y-2">
                            {[5, 4, 3, 2, 1].map((star) => (
                              <div key={star} className="flex items-center gap-3">
                                <span className="text-sm w-8">{star}★</span>
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                                    style={{ width: `${(ratingDistribution[star as keyof typeof ratingDistribution] / product.reviews) * 100}%` }}
                                  />
                                </div>
                                <span className="text-sm text-gray-500 w-12">{ratingDistribution[star as keyof typeof ratingDistribution]}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Individual Reviews */}
                    {productReviews.map((review, index) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <img
                                src={review.userImage}
                                alt={review.userName}
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100"
                              />
                              <div className="flex-1">
                                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                                  <div>
                                    <h4 className="font-semibold text-gray-800">{review.userName}</h4>
                                    <p className="text-xs text-gray-500">{review.date}</p>
                                  </div>
                                  <div className="flex gap-1">
                                    {[...Array(review.rating)].map((_, i) => (
                                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                                {review.verified && (
                                  <Badge variant="outline" className="mt-3 text-green-600 border-green-200 bg-green-50">
                                    ✓ Verified Purchase
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <Card className="border-0 shadow-lg rounded-2xl">
                    <CardContent className="p-12 text-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
                      <p className="text-gray-500">Be the first to review this product!</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  You May Also Like
                </h2>
                <Link to="/products">
                  <Button variant="outline" className="rounded-full">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <motion.div
                    key={relatedProduct.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <ProductCard product={relatedProduct} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};