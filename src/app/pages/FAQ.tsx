import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';
import { Input } from '../components/ui/input';
import { SEO } from '../utils/seo';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: "Orders",
      q: "How do I place an order?",
      a: "Simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or login to complete your purchase."
    },
    {
      category: "Orders",
      q: "Can I cancel or modify my order?",
      a: "Orders can be cancelled within 1 hour of placement. Once processed, cancellations may not be possible. Please contact our support team for assistance."
    },
    {
      category: "Orders",
      q: "How do I track my order?",
      a: "Once your order ships, you'll receive a tracking number via email. You can also track your order in the 'My Orders' section of your account."
    },
    {
      category: "Shipping",
      q: "How long does shipping take?",
      a: "Standard shipping takes 3-5 business days, while express shipping delivers within 1-2 business days. Remote areas may take additional time."
    },
    {
      category: "Shipping",
      q: "Do you ship internationally?",
      a: "Currently, we ship only within India. We're working on expanding to international destinations soon."
    },
    {
      category: "Shipping",
      q: "Is shipping free?",
      a: "Yes! We offer free standard shipping on all orders above ₹999. A nominal fee of ₹50 applies for orders below this amount."
    },
    {
      category: "Returns",
      q: "What is your return policy?",
      a: "We accept returns within 7 days of delivery. Products must be unused, in original packaging with all seals intact. Sale items are final sale."
    },
    {
      category: "Returns",
      q: "How do I initiate a return?",
      a: "Log in to your account, go to 'My Orders', and click 'Return Item'. Follow the instructions to schedule a pickup."
    },
    {
      category: "Returns",
      q: "When will I receive my refund?",
      a: "Refunds are processed within 5-7 business days after we receive and inspect the returned item."
    },
    {
      category: "Products",
      q: "Are your products cruelty-free?",
      a: "Yes! All Dot & Key products are 100% cruelty-free and never tested on animals. We're proudly PETA-certified."
    },
    {
      category: "Products",
      q: "What's your return policy?",
      a: "We accept returns within 7 days of delivery. Products must be unused, in original packaging with all seals intact. Sale items are final sale."
    },
    {
      category: "Products",
      q: "How do I know which products suit my skin type?",
      a: "Each product listing includes detailed information about suitable skin types. You can also filter products by skin type in our shop."
    },
    {
      category: "Account",
      q: "How do I reset my password?",
      a: "Click on 'Forgot Password' on the login page and follow the instructions sent to your registered email."
    },
    {
      category: "Account",
      q: "How do I update my account information?",
      a: "Log in to your account and go to the 'Profile' section to update your personal information, address, and preferences."
    },
    {
      category: "Payments",
      q: "What payment methods do you accept?",
      a: "We accept all major credit/debit cards, UPI, NetBanking, and Cash on Delivery (COD)."
    },
    {
      category: "Payments",
      q: "Is it safe to use my credit card?",
      a: "Yes! We use industry-standard encryption and secure payment gateways to protect your information."
    }
  ];

  const filteredFaqs = searchQuery
    ? faqs.filter(faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = [];
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

  return (
    <>
      <SEO title="FAQ | Dot & Key" description="Frequently asked questions about orders, shipping, returns, and products" />

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
                <HelpCircle className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">Frequently Asked Questions</h1>
              <p className="text-lg opacity-90">Find answers to common questions</p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-purple-400 rounded-xl py-6 text-lg"
                />
              </div>
            </motion.div>

            {/* FAQ Sections */}
            {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-800">{category}</h2>
                <div className="space-y-3">
                  {categoryFaqs.map((faq, index) => {
                    const globalIndex = faqs.findIndex(f => f.q === faq.q && f.a === faq.a);
                    return (
                      <motion.div
                        key={faq.q}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                          className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-left text-gray-800">{faq.q}</span>
                          {openIndex === globalIndex ? (
                            <ChevronUp className="h-5 w-5 text-purple-600 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        <AnimatePresence>
                          {openIndex === globalIndex && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t"
                            >
                              <div className="px-6 py-4 text-gray-600 leading-relaxed">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}

            {filteredFaqs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-gray-500">Try searching with different keywords</p>
              </motion.div>
            )}

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl text-center"
            >
              <h3 className="font-bold text-lg mb-2 text-gray-800">Still have questions?</h3>
              <p className="text-gray-600 mb-4">
                Our support team is here to help you 24/7
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="/contact" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all">
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};