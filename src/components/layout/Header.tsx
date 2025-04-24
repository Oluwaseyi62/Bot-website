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
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-black tracking-wide">BANG ON TREND</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-black hover:text-gold-500 transition-colors">Home</Link>
          <Link to="/shop" className="text-black hover:text-gold-500 transition-colors">Shop</Link>
          <Link to="/about" className="text-black hover:text-gold-500 transition-colors">About</Link>
          <Link to="/contact" className="text-black hover:text-gold-500 transition-colors">Contact</Link>
          <Link to="/cart" className="relative">
            <ShoppingBag size={24} className="text-black hover:text-gold-500 transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <Link to="/cart" className="relative mr-6">
            <ShoppingBag size={24} className="text-black" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X size={24} className="text-black" />
            ) : (
              <Menu size={24} className="text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 px-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-black hover:text-gold-500 transition-colors py-2">Home</Link>
            <Link to="/shop" className="text-black hover:text-gold-500 transition-colors py-2">Shop</Link>
            <Link to="/about" className="text-black hover:text-gold-500 transition-colors py-2">About</Link>
            <Link to="/contact" className="text-black hover:text-gold-500 transition-colors py-2">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;