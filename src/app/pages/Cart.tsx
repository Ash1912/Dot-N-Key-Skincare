import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { coupons } from '../data/mockData';
import { toast } from 'sonner';
import { SEO } from '../utils/seo';

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

  const handleApplyCoupon = () => {
    const coupon = coupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    
    if (!coupon) {
      toast.error('Invalid coupon code');
      return;
    }

    if (subtotal < coupon.minOrder) {
      toast.error(`Minimum order value of ₹${coupon.minOrder} required for this coupon`);
      return;
    }

    setAppliedCoupon(coupon);
    toast.success(`Coupon applied! You saved ₹${discount.toFixed(2)}`);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast.success('Coupon removed');
  };

  if (cart.length === 0) {
    return (
      <>
        <SEO title="Shopping Cart | Dot & Key" />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-12">
              <ShoppingBag className="h-24 w-24 mx-auto mb-4 text-gray-300" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some products to get started!</p>
              <Link to="/products">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Shopping Cart | Dot & Key" description="Review your cart and proceed to checkout" />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Shopping Cart ({cart.length} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link to={`/products/${item.product.slug}`} className="flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link to={`/products/${item.product.slug}`}>
                        <h3 className="font-semibold mb-1 hover:text-purple-600">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 mb-2 capitalize">
                        {item.product.category.replace('-', ' ')}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-purple-600">₹{item.product.price}</span>
                        {item.product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ₹{item.product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center gap-2 border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="h-8 w-8"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <p className="font-bold">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-4">Order Summary</h3>

                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="text-sm font-semibold mb-2 block">Have a coupon code?</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={!!appliedCoupon}
                    />
                    {appliedCoupon ? (
                      <Button variant="outline" onClick={handleRemoveCoupon}>
                        Remove
                      </Button>
                    ) : (
                      <Button onClick={handleApplyCoupon}>Apply</Button>
                    )}
                  </div>
                  {appliedCoupon && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ Coupon "{appliedCoupon.code}" applied
                    </p>
                  )}
                </div>

                {/* Available Coupons */}
                <div className="mb-6 p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Available Coupons:</p>
                  <div className="space-y-1">
                    {coupons.map((coupon) => (
                      <div key={coupon.id} className="text-xs">
                        <span className="font-semibold text-purple-600">{coupon.code}</span>
                        <span className="text-gray-600"> - {coupon.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>

                  {subtotal < 999 && (
                    <p className="text-xs text-orange-600">
                      Add ₹{(999 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}

                  <div className="flex justify-between text-xl font-bold border-t pt-3">
                    <span>Total</span>
                    <span className="text-purple-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate('/checkout')}
                  className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white h-12"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Link to="/products">
                  <Button variant="outline" className="w-full mt-3">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
