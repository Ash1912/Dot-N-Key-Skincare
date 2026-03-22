import { RotateCcw, Calendar, Package, AlertCircle, CheckCircle, Mail, Phone } from 'lucide-react';
import { SEO } from '../utils/seo';
import { motion } from 'framer-motion';

export const Returns = () => {
  const steps = [
    {
      icon: Package,
      title: "Initiate Return",
      description: "Log in to your account, go to 'My Orders', and click 'Return Item' within 7 days of delivery."
    },
    {
      icon: Calendar,
      title: "Schedule Pickup",
      description: "Select a convenient date for pickup. Our partner will collect the item from your address."
    },
    {
      icon: CheckCircle,
      title: "Quality Check",
      description: "Once received, our team will inspect the product to ensure it meets return conditions."
    },
    {
      icon: RotateCcw,
      title: "Refund/Exchange",
      description: "Refund is processed within 5-7 business days or exchange item is shipped."
    }
  ];

  const conditions = [
    "Product must be unused and in original packaging",
    "All seals and tags must be intact",
    "Return request must be initiated within 7 days of delivery",
    "Proof of purchase is required",
    "Sale items are final sale (unless damaged)"
  ];

  return (
    <>
      <SEO title="Returns & Exchanges | Dot & Key" description="Learn about our return and exchange policy" />

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
                <RotateCcw className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">Returns & Exchanges</h1>
              <p className="text-lg opacity-90">Hassle-free returns within 7 days</p>
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
                Not satisfied with your purchase? We're here to help! Our easy return process ensures you shop with confidence.
              </p>
            </motion.div>

            {/* Return Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Return Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step, index) => (
                  <div key={step.title} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-purple-600 mb-2">{index + 1}</div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">{step.title}</h3>
                    <p className="text-gray-500 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Return Conditions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12 bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-purple-600" />
                Return Conditions
              </h2>
              <ul className="space-y-2">
                {conditions.map((condition) => (
                  <li key={condition} className="flex items-start gap-2 text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl"
            >
              <h3 className="font-bold text-lg mb-3 text-gray-800">Need Help with Returns?</h3>
              <p className="text-gray-600 mb-4">
                Our customer support team is available to assist you with any return or exchange queries.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:returns@dotandkey.com" className="flex items-center gap-2 text-purple-600 hover:text-purple-700">
                  <Mail className="h-4 w-4" />
                  returns@dotandkey.com
                </a>
                <a href="tel:+919876543210" className="flex items-center gap-2 text-purple-600 hover:text-purple-700">
                  <Phone className="h-4 w-4" />
                  +91 98765 43210
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};