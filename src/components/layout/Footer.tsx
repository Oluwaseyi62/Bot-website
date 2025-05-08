import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 text-white bg-black">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-semibold">BANG ON TREND</h3>
            <p className="mb-4 text-gray-300">
              Fashion that speaks volumes. Elevate your style with our curated collections.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/botrend__/" className="text-white transition-colors hover:text-gray-300" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="https://facebook.com" className="text-white transition-colors hover:text-gray-300" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="https://twitter.com" className="text-white transition-colors hover:text-gray-300" aria-label="Twitter">
                <Twitter />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 transition-colors hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 transition-colors hover:text-white">Shop</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 transition-colors hover:text-white">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 transition-colors hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-xl font-semibold">Delivery Information</h3>
            <p className="mb-2 text-gray-300">Doorstep Delivery: ₦2,000</p>
            <p className="mb-4 text-gray-300">Store Pickup: Free</p>
            <p className="text-gray-300">Contact: info@bangontrend.com</p>
            <p className="text-gray-300">Phone: +234 906 629 3147</p>
          </div>
        </div>
        
        <div className="pt-8 mt-8 text-center text-gray-400 border-t border-gray-800">
          <p>© {new Date().getFullYear()} BANG ON TREND. All rights reserved.</p>
          <Link 
            to="/admin/login" 
            className="inline-block mt-2 text-sm text-gray-600 transition-colors hover:text-gray-400"
            aria-label="Admin Access"
          >
            Admin Access
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;