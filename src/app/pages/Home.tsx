import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Star, Truck, Shield, HeadphonesIcon } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { products, categories, banners, testimonials } from "../data/mockData";
import { SEO } from "../utils/seo";
import { motion } from "motion/react";

export const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <SEO
        title="Dot & Key - Premium Skincare Products | Science-Backed Formulations"
        description="Shop premium skincare products with science-backed formulations. Serums, moisturizers, sunscreens & more. Free shipping on orders above ₹999. Up to 30% off!"
        keywords="skincare, beauty products, serums, moisturizers, sunscreen, anti-aging, vitamin c, hyaluronic acid"
      />

      <div className="min-h-screen">
        {/* Hero Banner Slider */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
          {banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentBanner ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
              style={{ display: index === currentBanner ? "block" : "none" }}
            >
              <div className="relative h-full">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
                  <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-2xl text-white">
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl mb-2 font-medium"
                      >
                        {banner.subtitle}
                      </motion.p>
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-6xl font-bold mb-4"
                      >
                        {banner.title}
                      </motion.h1>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl mb-6"
                      >
                        {banner.description}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Link to={banner.link}>
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg"
                          >
                            {banner.cta}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Banner Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentBanner ? "bg-white w-8" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Truck className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Free Shipping</h4>
                  <p className="text-sm text-gray-600">On orders above ₹999</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-pink-100 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <h4 className="font-semibold">100% Authentic</h4>
                  <p className="text-sm text-gray-600">Original products</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <HeadphonesIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-semibold">24/7 Support</h4>
                  <p className="text-sm text-gray-600">We're here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">5000+ Reviews</h4>
                  <p className="text-sm text-gray-600">Trusted by customers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Shop by Category
              </h2>
              <p className="text-gray-600">
                Discover the perfect products for your skin
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-5">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.slug}`}
                  className="group"
                >
                  <Card className="overflow-hidden border hover:shadow-2xl transition-all duration-300 rounded-2xl">
                    <CardContent className="p-0">
                      {/* Image */}
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover 
              group-hover:scale-110 
              transition-transform duration-300"
                        />
                      </div>

                      {/* Text */}
                      <div className="p-3 text-center">
                        <h3 className="font-semibold text-sm md:text-base">
                          {category.name}
                        </h3>

                        <p className="text-xs text-gray-500">
                          {category.productCount} products
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Featured Products
                </h2>
                <p className="text-gray-600">
                  Handpicked favorites for glowing skin
                </p>
              </div>
              <Link to="/products">
                <Button variant="outline">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Best Sellers
                </h2>
                <p className="text-gray-600">Customer favorites you'll love</p>
              </div>
              <Link to="/products?filter=bestseller">
                <Button variant="outline">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Offer Banner */}
        <section className="py-16 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Special Offer - 30% Off!
              </h2>
              <p className="text-xl mb-6">
                Use code{" "}
                <span className="font-bold bg-white text-purple-600 px-4 py-1 rounded">
                  GLOW30
                </span>{" "}
                on orders above ₹1499
              </p>
              <Link to="/products">
                <Button size="lg" variant="secondary" className="text-lg">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                What Our Customers Say
              </h2>
              <p className="text-gray-600">Real reviews from real customers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 italic">
                      "{testimonial.comment}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
