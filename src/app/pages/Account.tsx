import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { ProductCard } from '../components/ProductCard';
import { User, Package, Heart, MapPin, LogOut, Edit2, Trash2, ChevronRight, Calendar, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { SEO } from '../utils/seo';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Account = () => {
  const { user, logout, orders, wishlist } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-gradient-to-r from-green-500 to-emerald-600';
      case 'shipped':
        return 'bg-gradient-to-r from-blue-500 to-indigo-600';
      case 'confirmed':
        return 'bg-gradient-to-r from-purple-500 to-pink-600';
      case 'cancelled':
        return 'bg-gradient-to-r from-red-500 to-rose-600';
      default:
        return 'bg-gradient-to-r from-yellow-500 to-orange-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'shipped':
        return <Truck className="h-4 w-4 mr-1" />;
      case 'confirmed':
        return <CreditCard className="h-4 w-4 mr-1" />;
      default:
        return <Package className="h-4 w-4 mr-1" />;
    }
  };

  const tabs = [
    { value: 'profile', label: 'Profile', icon: User, color: 'purple' },
    { value: 'orders', label: 'Orders', icon: Package, color: 'blue', count: orders.length },
    { value: 'wishlist', label: 'Wishlist', icon: Heart, color: 'pink', count: wishlist.length },
    { value: 'addresses', label: 'Addresses', icon: MapPin, color: 'green', count: user.addresses.length },
  ];

  return (
    <>
      <SEO title="My Account | Dot & Key" description="Manage your account, orders and wishlist" />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section - Removed SVG pattern */}
        <div className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-12">
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-4 mb-4"
                >
                  <div className="h-20 w-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-4xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-1">{user.name}</h1>
                    <p className="text-white/80">{user.email}</p>
                    {user.phone && <p className="text-white/80 text-sm">{user.phone}</p>}
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Button
                  variant="outline"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {tabs.map((tab) => (
              <motion.div
                key={tab.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.value)}
                className={`cursor-pointer rounded-xl p-4 transition-all duration-300 ${
                  activeTab === tab.value
                    ? `bg-gradient-to-r from-${tab.color}-500 to-${tab.color}-600 text-white shadow-lg`
                    : 'bg-white border border-gray-200 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <tab.icon className={`h-6 w-6 ${activeTab === tab.value ? 'text-white' : `text-${tab.color}-500`}`} />
                  <span className={`text-2xl font-bold ${activeTab === tab.value ? 'text-white' : 'text-gray-700'}`}>
                    {tab.count || 0}
                  </span>
                </div>
                <p className={`text-sm mt-2 ${activeTab === tab.value ? 'text-white/80' : 'text-gray-500'}`}>
                  {tab.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="hidden">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-purple-600" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                        <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-500">Email Address</label>
                        <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-500">Phone Number</label>
                        <p className="text-lg font-semibold text-gray-900">{user.phone || 'Not provided'}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-500">Member Since</label>
                        <p className="text-lg font-semibold text-gray-900">2024</p>
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t flex gap-3">
                      <Button variant="outline" className="hover:bg-purple-50 hover:border-purple-300">
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button variant="outline" className="hover:bg-purple-50 hover:border-purple-300">
                        Change Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-4">
              <AnimatePresence mode="wait">
                {orders.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    {orders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-0">
                            {/* Order Header */}
                            <div className={`${getStatusColor(order.status)} text-white p-4`}>
                              <div className="flex justify-between items-start flex-wrap gap-3">
                                <div>
                                  <p className="text-sm opacity-90">Order ID</p>
                                  <p className="font-mono font-semibold">{order.id}</p>
                                  <div className="flex items-center gap-2 mt-2 text-sm opacity-90">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(order.date).toLocaleDateString('en-IN', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                  </div>
                                </div>
                                <Badge className="bg-white/20 text-white border-0 px-3 py-1">
                                  {getStatusIcon(order.status)}
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                              </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-4 space-y-3">
                              {order.items.map((item) => (
                                <div key={item.product.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                                  <img
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                    className="w-20 h-20 object-cover rounded-lg"
                                  />
                                  <div className="flex-1">
                                    <p className="font-semibold text-gray-800">{item.product.name}</p>
                                    <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                                    <p className="text-sm font-semibold text-purple-600 mt-1">
                                      ₹{(item.product.price * item.quantity).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Order Footer */}
                            <div className="border-t p-4 flex justify-between items-center flex-wrap gap-3 bg-gray-50">
                              <div>
                                <p className="text-sm text-gray-500">Total Amount</p>
                                <p className="text-2xl font-bold text-purple-600">₹{order.total.toLocaleString()}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="hover:bg-purple-50">
                                  Track Order
                                </Button>
                                <Button variant="outline" size="sm" className="hover:bg-purple-50">
                                  View Invoice
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <Card className="border-0 shadow-lg rounded-2xl">
                      <CardContent className="p-12 text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Package className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2 text-gray-800">No orders yet</h3>
                        <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
                        <Link to="/products">
                          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl">
                            Browse Products
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <AnimatePresence mode="wait">
                {wishlist.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {wishlist.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <Card className="border-0 shadow-lg rounded-2xl">
                      <CardContent className="p-12 text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-pink-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Heart className="h-12 w-12 text-pink-400" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2 text-gray-800">Your wishlist is empty</h3>
                        <p className="text-gray-500 mb-6">Save products you love to your wishlist</p>
                        <Link to="/products">
                          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl">
                            Browse Products
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="space-y-4">
              <AnimatePresence mode="wait">
                {user.addresses.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    {user.addresses.map((address, index) => (
                      <motion.div
                        key={address.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className={`border-0 shadow-lg rounded-2xl transition-all duration-300 ${
                          address.isDefault ? 'ring-2 ring-purple-500' : ''
                        }`}>
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start flex-wrap gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <h3 className="font-semibold text-lg text-gray-800">{address.name}</h3>
                                  {address.isDefault && (
                                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
                                      Default
                                    </Badge>
                                  )}
                                </div>
                                <div className="space-y-1 text-gray-600">
                                  <p>{address.addressLine1}</p>
                                  {address.addressLine2 && <p>{address.addressLine2}</p>}
                                  <p>{address.city}, {address.state} - {address.pincode}</p>
                                  <p className="text-sm text-gray-500 mt-2">Phone: {address.phone}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="hover:bg-purple-50">
                                  <Edit2 className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                {!address.isDefault && (
                                  <Button variant="outline" size="sm" className="hover:bg-red-50 text-red-600 hover:text-red-700">
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Remove
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                    <Button variant="outline" className="w-full border-2 border-dashed hover:border-purple-400 hover:bg-purple-50 py-6 rounded-2xl">
                      <MapPin className="h-5 w-5 mr-2" />
                      Add New Address
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <Card className="border-0 shadow-lg rounded-2xl">
                      <CardContent className="p-12 text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                          <MapPin className="h-12 w-12 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2 text-gray-800">No saved addresses</h3>
                        <p className="text-gray-500 mb-6">Add addresses for faster checkout</p>
                        <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl">
                          Add Address
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};