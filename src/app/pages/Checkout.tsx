import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Separator } from '../components/ui/separator';
import { 
  CreditCard, 
  Smartphone, 
  Wallet, 
  Lock, 
  Truck, 
  Shield, 
  ChevronRight, 
  CheckCircle, 
  MapPin, 
  Mail, 
  Phone, 
  Home, 
  Building2, 
  IndianRupee,
  User,
  Circle
} from 'lucide-react';
import { toast } from 'sonner';
import { trackInitiateCheckout, trackPurchase } from '../utils/analytics';
import { SEO } from '../utils/seo';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Checkout = () => {
  const { cart, getCartTotal, user, placeOrder } = useApp();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
      return;
    }
    trackInitiateCheckout(getCartTotal(), cart.length);
  }, [cart, navigate, getCartTotal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all contact details');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.addressLine1 || !formData.city || !formData.state || !formData.pincode) {
      toast.error('Please fill in all address fields');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setProcessingPayment(true);

    // Simulate payment processing
    setTimeout(() => {
      const address = {
        id: Date.now().toString(),
        name: formData.name,
        phone: formData.phone,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        isDefault: false
      };

      const orderId = placeOrder(address, paymentMethod);
      
      // Track purchase
      trackPurchase(orderId, getCartTotal(), cart);

      setProcessingPayment(false);
      toast.success('Order placed successfully! 🎉');
      navigate(`/order-confirmation/${orderId}`);
    }, 2000);
  };

  const total = getCartTotal();
  const shipping = total >= 999 ? 0 : 50;
  const finalTotal = total + shipping;

  const steps = [
    { number: 1, title: 'Contact Info', icon: Mail },
    { number: 2, title: 'Shipping Address', icon: MapPin },
    { number: 3, title: 'Payment', icon: CreditCard },
  ];

  return (
    <>
      <SEO title="Checkout | Dot & Key" description="Complete your purchase securely" />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Secure Checkout
            </h1>
            <p className="text-gray-500">Complete your purchase with confidence</p>
          </motion.div>

          {/* Steps Progress */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.number} className="flex-1 relative">
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: currentStep >= step.number ? 1 : 0.8 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                        currentStep > step.number
                          ? 'bg-green-500 text-white'
                          : currentStep === step.number
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {currentStep > step.number ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <step.icon className="h-5 w-5" />
                      )}
                    </motion.div>
                    <span className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-gray-800' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`absolute top-6 left-1/2 w-full h-0.5 ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handlePlaceOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-6">
                <AnimatePresence mode="wait">
                  {/* Step 1: Contact Information */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                              <Mail className="h-5 w-5 text-white" />
                            </div>
                            <h2 className="font-bold text-xl text-gray-800">Contact Information</h2>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                              <Label htmlFor="name" className="text-gray-700 font-medium mb-2 block">
                                Full Name <span className="text-red-500">*</span>
                              </Label>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  id="name"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  placeholder="John Doe"
                                  className="pl-10 border-gray-200 focus:border-purple-400 rounded-xl"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="email" className="text-gray-700 font-medium mb-2 block">
                                Email Address <span className="text-red-500">*</span>
                              </Label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  placeholder="john@example.com"
                                  className="pl-10 border-gray-200 focus:border-purple-400 rounded-xl"
                                  required
                                />
                              </div>
                            </div>
                            <div className="md:col-span-2">
                              <Label htmlFor="phone" className="text-gray-700 font-medium mb-2 block">
                                Phone Number <span className="text-red-500">*</span>
                              </Label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  id="phone"
                                  name="phone"
                                  type="tel"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  placeholder="+91 98765 43210"
                                  className="pl-10 border-gray-200 focus:border-purple-400 rounded-xl"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Step 2: Shipping Address */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                              <MapPin className="h-5 w-5 text-white" />
                            </div>
                            <h2 className="font-bold text-xl text-gray-800">Shipping Address</h2>
                          </div>
                          <div className="space-y-5">
                            <div>
                              <Label htmlFor="addressLine1" className="text-gray-700 font-medium mb-2 block">
                                Address Line 1 <span className="text-red-500">*</span>
                              </Label>
                              <div className="relative">
                                <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  id="addressLine1"
                                  name="addressLine1"
                                  value={formData.addressLine1}
                                  onChange={handleInputChange}
                                  placeholder="House No., Building Name"
                                  className="pl-10 border-gray-200 focus:border-purple-400 rounded-xl"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="addressLine2" className="text-gray-700 font-medium mb-2 block">
                                Address Line 2 <span className="text-gray-400 text-xs">(Optional)</span>
                              </Label>
                              <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  id="addressLine2"
                                  name="addressLine2"
                                  value={formData.addressLine2}
                                  onChange={handleInputChange}
                                  placeholder="Road name, Area, Colony"
                                  className="pl-10 border-gray-200 focus:border-purple-400 rounded-xl"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="city" className="text-gray-700 font-medium mb-2 block">
                                  City <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                  id="city"
                                  name="city"
                                  value={formData.city}
                                  onChange={handleInputChange}
                                  placeholder="Mumbai"
                                  className="border-gray-200 focus:border-purple-400 rounded-xl"
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="state" className="text-gray-700 font-medium mb-2 block">
                                  State <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                  id="state"
                                  name="state"
                                  value={formData.state}
                                  onChange={handleInputChange}
                                  placeholder="Maharashtra"
                                  className="border-gray-200 focus:border-purple-400 rounded-xl"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="pincode" className="text-gray-700 font-medium mb-2 block">
                                Pincode <span className="text-red-500">*</span>
                              </Label>
                              <div className="relative">
                                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  id="pincode"
                                  name="pincode"
                                  value={formData.pincode}
                                  onChange={handleInputChange}
                                  maxLength={6}
                                  placeholder="400001"
                                  className="pl-10 border-gray-200 focus:border-purple-400 rounded-xl"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Step 3: Payment Method */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-white" />
                            </div>
                            <h2 className="font-bold text-xl text-gray-800">Payment Method</h2>
                          </div>
                          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                            <div className="space-y-3">
                              {[
                                { value: 'razorpay', icon: CreditCard, color: 'purple', bgColor: 'purple-50', title: 'Razorpay', desc: 'Cards, UPI, Wallets & More' },
                                { value: 'stripe', icon: CreditCard, color: 'blue', bgColor: 'blue-50', title: 'Stripe', desc: 'International Cards' },
                                { value: 'upi', icon: Smartphone, color: 'green', bgColor: 'green-50', title: 'UPI', desc: 'GPay, PhonePe, Paytm' },
                                { value: 'cod', icon: Wallet, color: 'orange', bgColor: 'orange-50', title: 'Cash on Delivery', desc: 'Pay when you receive' },
                              ].map((method) => (
                                <motion.div
                                  key={method.value}
                                  whileHover={{ scale: 1.01 }}
                                  className={`flex items-center space-x-3 border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                                    paymentMethod === method.value
                                      ? `border-${method.color}-500 bg-${method.bgColor}`
                                      : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                  onClick={() => setPaymentMethod(method.value)}
                                >
                                  <RadioGroupItem value={method.value} id={method.value} />
                                  <Label htmlFor={method.value} className="flex items-center gap-3 cursor-pointer flex-1">
                                    <div className={`w-10 h-10 bg-${method.bgColor} rounded-lg flex items-center justify-center`}>
                                      <method.icon className={`h-5 w-5 text-${method.color}-600`} />
                                    </div>
                                    <div>
                                      <p className="font-semibold text-gray-800">{method.title}</p>
                                      <p className="text-sm text-gray-500">{method.desc}</p>
                                    </div>
                                  </Label>
                                </motion.div>
                              ))}
                            </div>
                          </RadioGroup>

                          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                            <p className="text-sm text-yellow-800 flex items-start gap-2">
                              <Lock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span>
                                <strong>Note:</strong> This is a demo application. Payment integrations require actual API keys. 
                                Replace placeholder keys with real credentials before production.
                              </span>
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between gap-4">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePreviousStep}
                      className="rounded-xl"
                    >
                      ← Back
                    </Button>
                  )}
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      className="ml-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl"
                    >
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={processingPayment}
                      className="ml-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl shadow-lg hover:shadow-xl"
                    >
                      {processingPayment ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-5 w-5" />
                          Place Order - ₹{finalTotal.toLocaleString()}
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="sticky top-24 border-0 shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <h2 className="font-bold text-xl mb-4 text-gray-800">Order Summary</h2>

                      {/* Cart Items */}
                      <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
                        {cart.map((item) => (
                          <div key={item.product.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-gray-800 line-clamp-2">
                                {item.product.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                              <p className="font-semibold text-purple-600 mt-1">
                                ₹{(item.product.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Separator className="my-4" />

                      {/* Price Summary */}
                      <div className="space-y-3">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal</span>
                          <span className="font-semibold">₹{total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Shipping</span>
                          <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : 'text-gray-600'}`}>
                            {shipping === 0 ? 'FREE' : `₹${shipping}`}
                          </span>
                        </div>
                        {shipping > 0 && (
                          <div className="p-2 bg-orange-50 rounded-lg text-xs text-orange-600 text-center">
                            Add ₹{(999 - total).toLocaleString()} more for FREE shipping!
                          </div>
                        )}
                        <Separator className="my-2" />
                        <div className="flex justify-between text-xl font-bold">
                          <span>Total</span>
                          <span className="text-purple-600">₹{finalTotal.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-500 text-center">Inclusive of all taxes</p>
                      </div>

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
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};