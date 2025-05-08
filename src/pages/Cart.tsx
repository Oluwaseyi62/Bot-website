

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
      <div className="flex flex-col items-center justify-center px-4 py-24">
        <ShoppingBag size={64} className="mb-4 text-gray-300" />
        <h1 className="mb-2 text-2xl font-bold">Your cart is empty</h1>
        <p className="mb-6 text-gray-600">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container px-4 mx-auto">
        <h1 className="pt-8 mb-8 text-3xl font-bold">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden bg-white rounded-lg">
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
                  <div className="flex flex-col p-4 md:hidden">
                    <div className="flex gap-4 mb-4">
                      <img 
                        src={item.productId.image} 
                        alt={item.productId.name} 
                        className="object-cover w-20 h-20 rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.productId.name}</h3>
                        <p className="my-1 text-sm text-gray-600">
                          ₦{item.productId.price.toLocaleString()}
                        </p>
                        <button 
                          onClick={() => {
                            if (item.productId._id && item._id) {
                              removeFromCart(item.productId._id, item._id);
                            }
                          }}
                          className="flex items-center text-sm text-red-500"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
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
                          onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                          className="px-2 py-1 border-l border-gray-300"
                        >
                          <Plus size={16} />
                        </button>
                        
                      </div>
                      <p className="font-medium">₦{(item.productId.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {/* Desktop View */}
                  <div className="hidden md:grid md:grid-cols-[100px_1fr_120px_120px_40px] gap-4 p-4 items-center">
                    <img 
                      src={item.productId.image} 
                      alt={item.productId.name} 
                      className="object-cover w-20 h-20 rounded"
                    />
                    <div>
                      <h3 className="font-medium">{item.productId.name}</h3>
                      <p className="text-sm text-gray-600">₦{item.productId.price.toLocaleString()} each</p>
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
                    <p className="font-medium text-right">₦{(item.productId.price * item.quantity).toLocaleString()}</p>
                    <button 
                      onClick={() => {
                        if (item.productId._id && item._id) {
                          removeFromCart(item.productId._id, item._id);
                        }
                      }}
                      className="text-gray-500 transition-colors hover:text-red-500"
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
            <div className="p-6 rounded-lg bg-gray-50">
              <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
              
              <div className="mb-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₦{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              
              <div className="pt-4 mb-6 border-t border-gray-200">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₦{totalAmount.toLocaleString()}</span>
                </div>
              </div>
              
              <Link to="/checkout">
                <Button fullWidth>Proceed to Checkout</Button>
              </Link>
              
              <Link to="/shop" className="block mt-4 text-center text-gray-600 hover:underline">
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