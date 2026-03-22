import { Truck, Clock, MapPin, CreditCard, Package, Shield } from 'lucide-react';
import { SEO } from '../utils/seo';
import { motion } from 'framer-motion';

export const Shipping = () => {
  const sections = [
    {
      icon: Truck,
      title: "Shipping Options",
      content: "We offer standard and express shipping options across India. Standard shipping takes 3-5 business days, while express shipping delivers within 1-2 business days."
    },
    {
      icon: Clock,
      title: "Processing Time",
      content: "Orders are processed within 24 hours on business days. You'll receive a confirmation email with tracking details once your order ships."
    },
    {
      icon: MapPin,
      title: "Delivery Areas",
      content: "We ship to all pin codes across India. Some remote areas may take additional 1-2 days for delivery."
    },
    {
      icon: Package,
      title: "Free Shipping",
      content: "Enjoy free standard shipping on all orders above ₹999. For orders below ₹999, a nominal shipping fee of ₹50 applies."
    },
    {
      icon: CreditCard,
      title: "Tracking Your Order",
      content: "Once shipped, you'll receive a tracking number via email and SMS. You can also track your order in the 'My Orders' section."
    },
    {
      icon: Shield,
      title: "Safe Delivery",
      content: "All products are packed with care and delivered safely. In case of any damage during transit, please contact our support team immediately."
    }
  ];

  return (
    <>
      <SEO title="Shipping Policy | Dot & Key" description="Learn about our shipping options and delivery policy" />

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
                <Truck className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">Shipping Policy</h1>
              <p className="text-lg opacity-90">Fast, reliable delivery across India</p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <p className="text-gray-600 text-lg">
                We strive to deliver your orders quickly and safely. Our shipping policy ensures transparency and reliability.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <section.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-800">{section.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{section.content}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 p-6 bg-purple-50 rounded-2xl"
            >
              <h3 className="font-bold text-lg mb-2 text-gray-800">Need Assistance?</h3>
              <p className="text-gray-600">
                For any shipping-related queries, please contact our support team at{' '}
                <a href="mailto:shipping@dotandkey.com" className="text-purple-600 hover:underline">
                  shipping@dotandkey.com
                </a>{' '}
                or call us at +91 98765 43210.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};