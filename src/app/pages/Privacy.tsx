import { Shield, Lock, Eye, Database, Mail, FileText } from 'lucide-react';
import { SEO } from '../utils/seo';
import { motion } from 'framer-motion';

export const Privacy = () => {
  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content: "We collect personal information including name, email address, phone number, shipping address, and payment details when you create an account, place an order, or subscribe to our newsletter."
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: "Your information is used to process orders, improve our services, send order updates, and personalize your shopping experience. We never sell your personal data to third parties."
    },
    {
      icon: Database,
      title: "Data Security",
      content: "We implement industry-standard security measures including SSL encryption to protect your personal information during transmission and storage."
    },
    {
      icon: Eye,
      title: "Cookies & Tracking",
      content: "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage cookie preferences in your browser settings."
    },
    {
      icon: Mail,
      title: "Marketing Communications",
      content: "With your consent, we'll send you promotional emails about new products, special offers, and skincare tips. You can unsubscribe at any time."
    },
    {
      icon: FileText,
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal data. Contact us to exercise these rights or for any privacy-related concerns."
    }
  ];

  return (
    <>
      <SEO title="Privacy Policy | Dot & Key" description="Learn how we protect and handle your personal information" />

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
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">Privacy Policy</h1>
              <p className="text-lg opacity-90">Your privacy matters to us</p>
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
                Last updated: March 2024. This Privacy Policy explains how Dot & Key collects, uses, and protects your personal information.
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
              <h3 className="font-bold text-lg mb-2 text-gray-800">Contact Us</h3>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@dotandkey.com" className="text-purple-600 hover:underline">
                  privacy@dotandkey.com
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};