import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Package, Calendar, Truck, CheckCircle, Clock, Eye, ChevronRight } from 'lucide-react';
import { SEO } from '../utils/seo';
import { motion } from 'framer-motion';

export const Orders = () => {
  const { orders } = useApp();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500';
      case 'shipped':
        return 'bg-blue-500';
      case 'confirmed':
        return 'bg-purple-500';
      case 'cancelled':
        return 'bg-red-500';
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
      case 'confirmed':
        return <Package className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <>
      <SEO title="My Orders | Dot & Key" description="View your order history" />

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
                <Package className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">My Orders</h1>
              <p className="text-lg opacity-90">
                {orders.length > 0 
                  ? `You have ${orders.length} order${orders.length !== 1 ? 's' : ''}`
                  : 'Your order history will appear here'}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      {/* Order Header */}
                      <div className={`${getStatusColor(order.status)} text-white p-4`}>
                        <div className="flex justify-between items-start flex-wrap gap-3">
                          <div>
                            <p className="text-sm opacity-90">Order ID</p>
                            <p className="font-mono font-semibold text-lg">{order.id}</p>
                            <div className="flex items-center gap-2 mt-2 text-sm opacity-90">
                              <Calendar className="h-4 w-4" />
                              {new Date(order.date).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.status)}
                            <Badge className="bg-white/20 text-white border-0 px-3 py-1">
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="p-4 space-y-3">
                        {order.items.slice(0, 2).map((item) => (
                          <div key={item.product.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800 line-clamp-2">{item.product.name}</p>
                              <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                              <p className="text-sm font-semibold text-purple-600 mt-1">
                                ₹{(item.product.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-sm text-gray-500 text-center">
                            + {order.items.length - 2} more item{order.items.length - 2 !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>

                      {/* Order Footer */}
                      <div className="border-t p-4 flex justify-between items-center flex-wrap gap-3 bg-gray-50">
                        <div>
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="text-2xl font-bold text-purple-600">₹{order.total.toLocaleString()}</p>
                        </div>
                        <Link to={`/order-confirmation/${order.id}`}>
                          <Button variant="outline" className="rounded-full hover:bg-purple-50">
                            View Details
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto"
            >
              <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden">
                <CardContent className="p-12 text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="h-16 w-16 text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">No orders yet</h2>
                  <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
                  <Link to="/products">
                    <Button className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl shadow-lg hover:shadow-xl">
                      Start Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};