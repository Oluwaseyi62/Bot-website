import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            <span className="tracking-wide text-black">BANG ON TREND</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="items-center hidden space-x-8 md:flex">
            <Link to="/" className="text-black transition-colors hover:text-gold-500">Home</Link>
            <Link to="/shop" className="text-black transition-colors hover:text-gold-500">Shop</Link>
            <Link to="/track-order" className="text-black transition-colors hover:text-gold-500">Track Order</Link>
            <Link to="/about" className="text-black transition-colors hover:text-gold-500">About</Link>
            <Link to="/contact" className="text-black transition-colors hover:text-gold-500">Contact</Link>
            <Link to="/cart" className="relative">
              <ShoppingBag className="text-black transition-colors hover:text-gold-500" />
              {totalItems > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-black rounded-full -top-2 -right-2">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            <Link to="/cart" className="relative mr-6">
              <ShoppingBag className="text-black" />
              {totalItems > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-black rounded-full -top-2 -right-2">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="text-black" />
              ) : (
                <Menu className="text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute left-0 w-full px-4 py-4 bg-white shadow-md top-full md:hidden">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-black transition-colors hover:text-gold-500">Home</Link>
              <Link to="/shop" className="text-black transition-colors hover:text-gold-500">Shop</Link>
              <Link to="/track-order" className="text-black transition-colors hover:text-gold-500">Track Order</Link>
              <Link to="/about" className="text-black transition-colors hover:text-gold-500">About</Link>
              <Link to="/contact" className="text-black transition-colors hover:text-gold-500">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;