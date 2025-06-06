import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/products';
import { ShoppingBag, TrendingUp, Package, CreditCard } from 'lucide-react';

export const getSessionId = () => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

const Home: React.FC = () => {
  const [productss, setProducts] = useState<any[]>([]);
  const featuredProducts = products.filter(product => product.featured);
  
  
  const heroText = "ZYNTH";

 
  const  sessionId = getSessionId();
  

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch("https://bot-server-i8jn.onrender.com/fetch-products");
      const data = await response.json();
      const featured = data.products.filter((product: any) => product.featured);
    
      setProducts(featured);
    } catch (error) {
      console.error("Failed to fetch featured products:", error);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
 
  return (
    <div className="mt-16">
      {/* Hero Section */}
      <section 
        className="relative flex items-center justify-center h-screen bg-center bg-cover"
        style={{ backgroundImage: `url('/images/Artboard 6.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            {heroText.split('').map((char, index) => (
              <span key={index} className="animate-char">
                {char}
              </span>
            ))}
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-xl md:text-2xl animate-fadeIn">
            Discover the latest fashion trends that define your unique style statement.
          </p>
          <div className="flex flex-col justify-center gap-4 hover-white sm:flex-row animate-fadeIn" style={{ animationDelay: '1.5s' }}>
            <Link to="/shop">
              <Button className="text-base">SHOP NOW</Button>
            </Link>
            <Link to="/about">
              <Button className="text-base">LEARN MORE ABOUT US</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <h2 className="mb-4 text-3xl font-bold text-center">Trending Now</h2>
          <p className="max-w-2xl mx-auto mb-12 text-center text-gray-600">
            Explore our handpicked selection of the season's most coveted styles and statement pieces.
          </p>
          
         
          
          <div className="mt-12 text-center">
            <Link to="/shop">
              <Button variant="outline">View All Collections</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Features */}
      <section className="py-16 bg-gray-100">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">Why Shop With Us</h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 text-center bg-white rounded-lg shadow-sm">
              <div className="flex justify-center mb-4">
                <TrendingUp size={48} className="text-black" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">On-Trend Styles</h3>
              <p className="text-gray-600">Curated collections that keep you ahead of the fashion curve.</p>
            </div>
            
            <div className="p-6 text-center bg-white rounded-lg shadow-sm">
              <div className="flex justify-center mb-4">
                <ShoppingBag size={48} className="text-black" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Quality Materials</h3>
              <p className="text-gray-600">Premium fabrics and materials that look and feel luxurious.</p>
            </div>
            
            <div className="p-6 text-center bg-white rounded-lg shadow-sm">
              <div className="flex justify-center mb-4">
                <Package size={48} className="text-black" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Flexible Delivery</h3>
              <p className="text-gray-600">Choose doorstep delivery (₦2,000) or free in-store pickup.</p>
            </div>
            
            <div className="p-6 text-center bg-white rounded-lg shadow-sm">
              <div className="flex justify-center mb-4">
                <CreditCard size={48} className="text-black" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Secure Payment</h3>
              <p className="text-gray-600">Easy and secure bank transfer payment option.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 py-16">
        <div className="container max-w-4xl mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-8 text-center transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:-translate-y-1 hover:shadow-xl">
              <h3 className="mb-4 text-xl font-semibold">Quality</h3>
              <p className="text-gray-700">
                We're committed to creating pieces that aren't just beautiful but built to last, using premium materials and meticulous attention to detail.
              </p>
            </div>
            
            <div className="p-8 text-center transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:-translate-y-1 hover:shadow-xl">
              <h3 className="mb-4 text-xl font-semibold">Innovation</h3>
              <p className="text-gray-700">
                We constantly push boundaries to create designs that feel fresh and exciting, while maintaining a timeless quality that transcends seasons.
              </p>
            </div>
            
            <div className="p-8 text-center transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:-translate-y-1 hover:shadow-xl">
              <h3 className="mb-4 text-xl font-semibold">Inclusivity</h3>
              <p className="text-gray-700">
                We believe fashion should be for everyone. Our collections are designed to empower individuals of all backgrounds to express their unique style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="relative py-20 text-white bg-center bg-cover"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/5325588/pexels-photo-5325588.jpeg)' }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container relative z-10 px-4 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Join Our Style Community</h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl">
            Be the first to know about new arrivals, exclusive offers, and fashion inspiration.
          </p>
          <Link to="/shop">
            <Button className="text-base">JOIN NOW</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;