import { FileText, ShoppingBag, Shield, CreditCard, Truck, RotateCcw, AlertCircle, Scale } from 'lucide-react';
import { SEO } from '../utils/seo';
import { motion } from 'framer-motion';

export const Terms = () => {
  const sections = [
    {
      icon: ShoppingBag,
      title: "Order Acceptance",
      content: "All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason."
    },
    {
      icon: CreditCard,
      title: "Pricing & Payment",
      content: "All prices are in Indian Rupees (INR) and include applicable taxes. We accept payments via credit/debit cards, UPI, NetBanking, and Cash on Delivery."
    },
    {
      icon: Truck,
      title: "Shipping & Delivery",
      content: "Estimated delivery times are provided as guidelines. We are not liable for delays beyond our control. Risk of loss transfers to you upon delivery."
    },
    {
      icon: RotateCcw,
      title: "Returns & Refunds",
      content: "Please review our return policy. Refunds will be processed to the original payment method within 5-7 business days of return approval."
    },
    {
      icon: AlertCircle,
      title: "Product Information",
      content: "We strive to display accurate product information, but colors and descriptions may vary slightly. Consult with a dermatologist if you have skin sensitivities."
    },
    {
      icon: Shield,
      title: "Account Responsibility",
      content: "You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately of any unauthorized use."
    },
    {
      icon: Scale,
      title: "Limitation of Liability",
      content: "Dot & Key shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services."
    }
  ];

  return (
    <>
      <SEO title="Terms & Conditions | Dot & Key" description="Read our terms and conditions for using Dot & Key services" />

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
                <FileText className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">Terms & Conditions</h1>
              <p className="text-lg opacity-90">Please read these terms carefully</p>
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
                By accessing or using Dot & Key's website, you agree to be bound by these Terms & Conditions.
                Last updated: March 2024.
              </p>
            </motion.div>

            <div className="space-y-4">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <section.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-gray-800">{section.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-12 p-6 bg-purple-50 rounded-2xl"
            >
              <h3 className="font-bold text-lg mb-2 text-gray-800">Contact Information</h3>
              <p className="text-gray-600">
                For questions regarding these Terms & Conditions, please contact us at{' '}
                <a href="mailto:legal@dotandkey.com" className="text-purple-600 hover:underline">
                  legal@dotandkey.com
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};