import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle, Package, Truck, Calendar, CreditCard, MapPin, Phone, Mail, Download, Share2, Printer, ArrowLeft, ShoppingBag } from 'lucide-react';
import { SEO } from '../utils/seo';
import { motion } from 'framer-motion';

export const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useApp();
  
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-gray-800">Order Not Found</h1>
            <p className="text-gray-500 mb-6">We couldn't find the order you're looking for</p>
            <Link to="/account/orders">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
                View All Orders
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500';
      case 'shipped':
        return 'bg-blue-500';
      case 'confirmed':
        return 'bg-purple-500';
      default:
        return 'bg-yellow-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5" />;
      case 'shipped':
        return <Truck className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  return (
    <>
      <SEO title="Order Confirmation | Dot & Key" description="Your order has been placed successfully" />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4">
          {/* Success Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg mb-4">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Order Confirmed!
            </h1>
            <p className="text-gray-500 text-lg">Thank you for your purchase</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Order Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-0 shadow-xl rounded-2xl overflow-hidden mb-6">
                <CardContent className="p-0">
                  <div className={`${getStatusColor(order.status)} text-white p-6`}>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(order.status)}
                        <div>
                          <p className="text-sm opacity-90">Order Status</p>
                          <p className="text-2xl font-bold capitalize">{order.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm opacity-90">Order ID</p>
                        <p className="font-mono font-bold text-lg">{order.id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Order Date</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {new Date(order.date).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Payment Method</p>
                          <p className="text-sm font-semibold text-gray-800 capitalize">
                            {order.paymentMethod}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Package className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Total Items</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Truck className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Delivery Estimate</p>
                          <p className="text-sm font-semibold text-gray-800">
                            3-5 business days
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Order Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-4 text-gray-800 flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-purple-600" />
                      Order Items
                    </h3>
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <motion.div
                          key={item.product.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{item.product.name}</p>
                            <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="font-bold text-purple-600">
                                ₹{(item.product.price * item.quantity).toLocaleString()}
                              </span>
                              <span className="text-xs text-gray-400">
                                (₹{item.product.price.toLocaleString()} each)
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold">₹{order.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-green-600 font-semibold">FREE</span>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t">
                        <span className="text-lg font-bold text-gray-800">Total</span>
                        <span className="text-2xl font-bold text-purple-600">
                          ₹{order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Delivery Address & Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="space-y-6"
              >
                {/* Delivery Address */}
                <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-purple-600" />
                      Delivery Address
                    </h3>
                    <div className="space-y-1 text-gray-600">
                      <p className="font-semibold text-gray-800">{order.address.name}</p>
                      <p>{order.address.addressLine1}</p>
                      {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
                      <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <p className="text-sm">{order.address.phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3 text-gray-800">Need Help?</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start rounded-xl">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Support
                      </Button>
                      <Button variant="outline" className="w-full justify-start rounded-xl">
                        <Printer className="h-4 w-4 mr-2" />
                        Print Invoice
                      </Button>
                      <Button variant="outline" className="w-full justify-start rounded-xl">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Order
                      </Button>
                      <Button variant="outline" className="w-full justify-start rounded-xl">
                        <Download className="h-4 w-4 mr-2" />
                        Download Receipt
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-gray-800">What's Next?</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                        <p className="text-sm text-gray-600">We'll send you a confirmation email with order details</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                        <p className="text-sm text-gray-600">You'll receive tracking information once your order ships</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                        <p className="text-sm text-gray-600">Estimated delivery in 3-5 business days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/account/orders">
                <Button variant="outline" className="rounded-xl px-8">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  View All Orders
                </Button>
              </Link>
              <Link to="/products">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl px-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>

            {/* Email Confirmation Note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-center text-sm text-gray-500 mt-8"
            >
              A confirmation email has been sent to your registered email address.
              <br />
              You can track your order status in the <Link to="/account/orders" className="text-purple-600 hover:underline">My Orders</Link> section.
            </motion.p>
          </div>
        </div>
      </div>
    </>
  );
};