

// export default Cart;

import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types';


const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalAmount } = useCart();
  

   

  if (items.length === 0) {
    return (
      <div className="py-24 px-4 flex flex-col items-center justify-center">
        <ShoppingBag size={64} className="text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold pt-8 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden">
              {/* Table Header - visible only on desktop */}
              <div className="hidden md:grid md:grid-cols-[100px_1fr_120px_120px_40px] gap-4 p-4 border-b border-gray-200 bg-gray-50">
                <div></div>
                <div className="font-medium">Product</div>
                <div className="font-medium">Quantity</div>
                <div className="font-medium text-right">Price</div>
                <div></div>
              </div>
              
              {/* Cart Items */}
              {items.map(item => (
                <div key={item.productId._id} className="border-b border-gray-200 last:border-b-0">
                  {/* Mobile View */}
                  <div className="md:hidden p-4 flex flex-col">
                    <div className="flex gap-4 mb-4">
                      <img 
                        src={item.productId.image} 
                        alt={item.productId.name} 
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.productId.name}</h3>
                        <p className="text-gray-600 text-sm my-1">
                          ${item.productId.price.toFixed(2)}
                        </p>
                        <button 
                          onClick={() => {
                            if (item.productId._id && item._id) {
                              removeFromCart(item.productId._id, item._id);
                            }
                          }}
                          className="text-red-500 text-sm flex items-center"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button 
                          onClick={() => {
                        
                              updateQuantity(item.productId._id, item._id, item.quantity - 1);
                           
                          }}
                          className="px-2 py-1 border-r border-gray-300"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button 
                          // onClick={() => updateQuantity(item.productId._id,  item.quantity + 1) }}
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 border-l border-gray-300"
                        >
                          <Plus size={16} />
                        </button>
                        
                      </div>
                      <p className="font-medium">${(item.productId.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                  
                  {/* Desktop View */}
                  <div className="hidden md:grid md:grid-cols-[100px_1fr_120px_120px_40px] gap-4 p-4 items-center">
                    <img 
                      src={item.productId.image} 
                      alt={item.productId.name} 
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{item.productId.name}</h3>
                      <p className="text-gray-600 text-sm">${item.productId.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center border border-gray-300 rounded">
                      <button 
                        onClick={() => {
                          if (item.productId._id && item._id) {
                            updateQuantity(item.productId._id, item._id, item.quantity - 1);
                          }
                        }}
                        className="px-2 py-1 border-r border-gray-300"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button 
                        onClick={() => {
                          if (item.productId._id && item._id) {
                            updateQuantity(item.productId._id, item._id, item.quantity + 1);
                           // setQuantity(item.quantity + 1);
                          }
                        }}
                        className="px-2 py-1 border-l border-gray-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className="font-medium text-right">${(item.productId.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => {
                        if (item.productId._id && item._id) {
                          removeFromCart(item.productId._id, item._id);
                        }
                      }}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <Link to="/checkout">
                <Button fullWidth>Proceed to Checkout</Button>
              </Link>
              
              <Link to="/shop" className="block text-center mt-4 text-gray-600 hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;