import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ChevronLeft } from 'lucide-react';
import { Product } from '../types';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p._id === id);
      setProduct(foundProduct || null);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  if (!product) {
    return (
      <div className="container px-4 py-24 mx-auto text-center">
        <p>Product not found</p>
        <Link to="/shop" className="inline-block mt-4 text-black hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  // Find related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  return (
    <div className="pt-20 pb-16">
      <div className="container px-4 mx-auto">
        <Link to="/shop" className="inline-flex items-center mt-8 mb-6 text-gray-600 hover:text-black">
          <ChevronLeft size={16} />
          <span>Back to shop</span>
        </Link>

        <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2">
          {/* Product Image */}
          <div className="overflow-hidden rounded-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="object-cover w-full h-full"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
            <span className="mb-6 text-2xl font-medium">₦{product.price. toLocaleString()}</span>
            
            <div className="mb-6">
              <span className="inline-block mb-2 text-sm text-gray-600">Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="flex items-center mb-8 space-x-4">
              <div className="flex flex-col">
                <label htmlFor="quantity" className="mb-1 text-sm">Quantity</label>
                <input 
                  type="number" 
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>
            </div>
            
            <Button 
              onClick={handleAddToCart}
              className="flex items-center justify-center"
            >
              <ShoppingBag size={18} className="mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">You Might Also Like</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map(relatedProduct => (
                <Link to={`/product/${relatedProduct._id}`} key={relatedProduct._id}>
                  <div className="group">
                    <div className="relative mb-4 overflow-hidden">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name} 
                        className="object-cover w-full transition-transform duration-500 h-60 group-hover:scale-105" 
                      />
                    </div>
                    <h3 className="mb-1 text-base font-medium transition-colors group-hover:text-gray-700">
                      {relatedProduct.name}
                    </h3>
                    <p className="font-semibold text-gray-800">₦{relatedProduct.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;