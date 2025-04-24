import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">BANG ON TREND</h3>
            <p className="text-gray-300 mb-4">
              Fashion that speaks volumes. Elevate your style with our curated collections.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="text-white hover:text-gray-300 transition-colors" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="https://facebook.com" className="text-white hover:text-gray-300 transition-colors" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-gray-300 transition-colors" aria-label="Twitter">
                <Twitter />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Delivery Information</h3>
            <p className="text-gray-300 mb-2">Doorstep Delivery: $5.00</p>
            <p className="text-gray-300 mb-4">Store Pickup: Free</p>
            <p className="text-gray-300">Contact: info@bangontrend.com</p>
            <p className="text-gray-300">Phone: +1 (123) 456-7890</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} BANG ON TREND. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;