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
      <div className="relative overflow-hidden mb-4">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            onClick={() => addToCart(product)}
            fullWidth
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <Link to={`/product/${product.id}`}>
        <h3 className="text-lg font-medium mb-1 transition-colors group-hover:text-gray-700">{product.name}</h3>
      </Link>
      <p className="text-gray-800 font-semibold">${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;