import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, Truck, Shield, CreditCard, X } from 'lucide-react';
import { useState } from 'react';
import { coupons } from '../data/mockData';
import { toast } from 'sonner';
import { SEO } from '../utils/seo';
import { motion, AnimatePresence } from 'framer-motion';

export const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, getCartTotal } = useApp();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const discount = appliedCoupon
    ? appliedCoupon.type === 'percentage'
      ? (subtotal * appliedCoupon.discount) / 100
      : appliedCoupon.discount
    : 0;
  const shipping = subtotal >= 999 ? 0 : 50;
  const total = subtotal - discount + shipping;
  const freeShippingAmount = 999 - subtotal;
  const freeShippingProgress = Math.min((subtotal / 999) * 100, 100);

  const handleApplyCoupon = () => {
    const coupon = coupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    
    if (!coupon) {
      toast.error('Invalid coupon code', {
        icon: '❌',
      });
      return;
    }

    if (subtotal < coupon.minOrder) {
      toast.error(`Minimum order value of ₹${coupon.minOrder} required for this coupon`, {
        icon: '⚠️',
      });
      return;
    }

    setAppliedCoupon(coupon);
    toast.success(`Coupon applied! You saved ₹${discount.toFixed(2)}`, {
      icon: '🎉',
    });
    setCouponCode('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast.success('Coupon removed', {
      icon: '🗑️',
    });
  };

  if (cart.length === 0) {
    return (
      <>
        <SEO title="Shopping Cart | Dot & Key" />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
                <CardContent className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <ShoppingBag className="h-16 w-16 text-gray-400" />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">Your cart is empty</h2>
                  <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
                  <Link to="/products">
                    <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl">
                      Start Shopping
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Shopping Cart | Dot & Key" description="Review your cart and proceed to checkout" />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <p className="text-gray-500">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="wait">
                {cart.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <Link to={`/products/${item.product.slug}`} className="flex-shrink-0">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="w-24 h-24 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl overflow-hidden"
                            >
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </motion.div>
                          </Link>

                          {/* Product Info */}
                          <div className="flex-1">
                            <Link to={`/products/${item.product.slug}`}>
                              <h3 className="font-semibold text-gray-800 hover:text-purple-600 transition-colors line-clamp-2">
                                {item.product.name}
                              </h3>
                            </Link>
                            <p className="text-xs text-gray-500 mt-1 capitalize">
                              {item.product.category.replace('-', ' ')}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="font-bold text-purple-600">₹{item.product.price}</span>
                              {item.product.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                  ₹{item.product.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity Controls & Remove */}
                          <div className="flex flex-col items-end justify-between gap-3">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>

                            <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="h-8 w-8 rounded-full hover:bg-white"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-semibold text-gray-700">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                disabled={item.quantity >= item.product.stock}
                                className="h-8 w-8 rounded-full hover:bg-white"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <p className="font-bold text-gray-800">
                              ₹{(item.product.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="sticky top-24 border-0 shadow-xl rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-4 text-gray-800">Order Summary</h3>

                    {/* Free Shipping Progress */}
                    {subtotal < 999 && (
                      <div className="mb-6 p-4 bg-orange-50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-orange-600">Free Shipping Progress</span>
                          <span className="text-sm font-bold text-orange-600">₹{freeShippingAmount} more</span>
                        </div>
                        <div className="h-2 bg-orange-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${freeShippingProgress}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                          />
                        </div>
                        <p className="text-xs text-orange-600 mt-2">
                          Add ₹{freeShippingAmount.toLocaleString()} more to get FREE shipping!
                        </p>
                      </div>
                    )}

                    {/* Coupon Code */}
                    <div className="mb-6">
                      <label className="text-sm font-semibold mb-2 block text-gray-700">
                        <Tag className="h-4 w-4 inline mr-1" />
                        Have a coupon code?
                      </label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          disabled={!!appliedCoupon}
                          className="flex-1 border-gray-200 focus:border-purple-400 rounded-xl"
                        />
                        {appliedCoupon ? (
                          <Button 
                            variant="outline" 
                            onClick={handleRemoveCoupon}
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        ) : (
                          <Button 
                            onClick={handleApplyCoupon}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            Apply
                          </Button>
                        )}
                      </div>
                      {appliedCoupon && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 p-2 bg-green-50 rounded-lg"
                        >
                          <p className="text-sm text-green-600">
                            ✓ Coupon "{appliedCoupon.code}" applied - Saved ₹{discount.toFixed(2)}
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {/* Available Coupons */}
                    <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                      <p className="text-sm font-semibold mb-3 text-gray-700">Available Coupons:</p>
                      <div className="space-y-2">
                        {coupons.map((coupon) => (
                          <div key={coupon.id} className="flex items-center justify-between p-2 bg-white rounded-lg">
                            <div>
                              <span className="font-bold text-purple-600">{coupon.code}</span>
                              <p className="text-xs text-gray-500">{coupon.description}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setCouponCode(coupon.code)}
                              disabled={!!appliedCoupon}
                              className="text-xs"
                            >
                              Apply
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3 border-t pt-4">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                      </div>
                      
                      {appliedCoupon && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex justify-between text-green-600"
                        >
                          <span>Discount ({appliedCoupon.code})</span>
                          <span>-₹{discount.toLocaleString()}</span>
                        </motion.div>
                      )}

                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="font-semibold">
                          {shipping === 0 ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            `₹${shipping}`
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between text-xl font-bold pt-3 border-t">
                        <span>Total</span>
                        <span className="text-purple-600">₹{total.toLocaleString()}</span>
                      </div>

                      {total > 0 && (
                        <p className="text-xs text-gray-500 text-center mt-2">
                          Inclusive of all taxes
                        </p>
                      )}
                    </div>

                    {/* Checkout Button */}
                    <Button
                      onClick={() => navigate('/checkout')}
                      className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>

                    {/* Trust Badges */}
                    <div className="mt-6 pt-6 border-t">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Truck className="h-4 w-4 text-purple-500" />
                          <span>Free Shipping on ₹999+</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Shield className="h-4 w-4 text-purple-500" />
                          <span>Secure Payments</span>
                        </div>
                      </div>
                    </div>

                    {/* Continue Shopping Link */}
                    <Link to="/products">
                      <Button variant="outline" className="w-full mt-3 rounded-xl">
                        Continue Shopping
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};