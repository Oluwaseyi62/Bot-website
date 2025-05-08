import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import Button from './Button';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="group">
      <div className="relative mb-4 overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full transition-transform duration-500 h-80 group-hover:scale-105"
          />
        </Link>
        <div className="absolute bottom-0 left-0 w-full p-4 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-100">
          <Button 
            onClick={() => addToCart(product)}
            fullWidth
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <Link to={`/product/${product._id}`}>
        <h3 className="mb-1 text-lg font-medium transition-colors group-hover:text-gray-700">{product.name}</h3>
      </Link>
      <p className="font-semibold text-gray-800">₦{product.price.toLocaleString()}</p>
    </div>
  );
};

export default ProductCard;