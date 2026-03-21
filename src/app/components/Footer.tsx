import { Link, useNavigate } from "react-router-dom";
import { Facebook, Instagram, Youtube, Mail } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-gradient-to-br from-purple-50 to-pink-50 border-t">

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-12">
        <div className="container mx-auto px-4 text-center text-white">

          <Mail className="h-12 w-12 mx-auto mb-4" />

          <h3 className="text-2xl font-bold mb-2">
            Subscribe to our Newsletter
          </h3>

          <p className="mb-6 opacity-90">
            Get exclusive offers & new product updates
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex gap-2 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white text-black"
            />

            <Button type="submit" variant="secondary">
              Subscribe
            </Button>
          </form>
        </div>
      </div>


      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">


          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              Dot & Key
            </h3>

            <p className="text-gray-600 mb-4">
              Science-backed skincare for all skin types.
            </p>

            <div className="flex space-x-4">

              <a
                href="https://www.facebook.com"
                target="_blank"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://www.youtube.com"
                target="_blank"
              >
                <Youtube className="h-5 w-5" />
              </a>

            </div>
          </div>


          {/* Quick Links */}
          <div>

            <h4 className="font-semibold mb-4">
              Quick Links
            </h4>

            <ul className="space-y-2">

              <li>
                <Link to="/">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/products">
                  All Products
                </Link>
              </li>

              <li>
                <Link to="/products?filter=bestseller">
                  Best Sellers
                </Link>
              </li>

              <li>
                <Link to="/products?filter=new">
                  New Arrivals
                </Link>
              </li>

              <li>
                <Link to="/products?filter=offers">
                  Offers
                </Link>
              </li>

              <li>
                <Link to="/account">
                  My Account
                </Link>
              </li>

            </ul>
          </div>



          {/* Categories */}
          <div>

            <h4 className="font-semibold mb-4">
              Shop by Category
            </h4>

            <ul className="space-y-2">

              <li>
                <Link to="/products?category=serums">
                  Serums
                </Link>
              </li>

              <li>
                <Link to="/products?category=moisturizers">
                  Moisturizers
                </Link>
              </li>

              <li>
                <Link to="/products?category=cleansers">
                  Cleansers
                </Link>
              </li>

              <li>
                <Link to="/products?category=sunscreen">
                  Sunscreen
                </Link>
              </li>

              <li>
                <Link to="/products?category=face-masks">
                  Face Masks
                </Link>
              </li>

            </ul>
          </div>



          {/* Customer */}
          <div>

            <h4 className="font-semibold mb-4">
              Customer Service
            </h4>

            <ul className="space-y-2">

              <li>
                <Link to="/contact">
                  Contact
                </Link>
              </li>

              <li>
                <Link to="/shipping">
                  Shipping
                </Link>
              </li>

              <li>
                <Link to="/returns">
                  Returns
                </Link>
              </li>

              <li>
                <Link to="/faq">
                  FAQ
                </Link>
              </li>

              <li>
                <Link to="/privacy">
                  Privacy
                </Link>
              </li>

              <li>
                <Link to="/terms">
                  Terms
                </Link>
              </li>

            </ul>
          </div>

        </div>



        {/* Payment */}
        <div className="mt-10 text-center">

          <p className="text-sm mb-2">
            We Accept
          </p>

          <div className="flex justify-center gap-3 flex-wrap">

            <div className="px-3 py-1 border">Visa</div>
            <div className="px-3 py-1 border">Mastercard</div>
            <div className="px-3 py-1 border">RuPay</div>
            <div className="px-3 py-1 border">UPI</div>
            <div className="px-3 py-1 border">Paytm</div>
            <div className="px-3 py-1 border">GPay</div>

          </div>

        </div>



        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-600">

          © 2026 Dot & Key. All rights reserved. | Made with ❤️ in India

        </div>

      </div>

    </footer>
  );
};