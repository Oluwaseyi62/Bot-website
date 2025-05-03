import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { CheckCircle, Search } from 'lucide-react';
import { Order } from '../types';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order | undefined;
 console.log(order, 'order in order confirmation')
  useEffect(() => {
    // Redirect to home if accessed directly without an order
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) {
    return null;
  }

  const totalAmount = order.deliveryOption === 'delivery'
    ? order.totalAmount + 5
    : order.totalAmount;

  return (
    <div className="pt-20 pb-16">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="mb-8 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle size={64} className="text-green-500" />
              </div>
              <h1 className="mb-2 text-3xl font-bold">Thank You for Your Order!</h1>
              <p className="mb-2 text-gray-600">
                We've received your order and will review your payment proof shortly.
              </p>
              <p className="text-lg font-medium">
                Your order number is: <span className="text-black">{order._id}</span>
              </p>
              <div className="mt-4">
                <Link to="/track-order" className="inline-flex items-center text-black hover:underline">
                  <Search className="w-4 h-4 mr-2" />
                  Track your order
                </Link>
              </div>
            </div>

            <div className="pt-6 mb-6 border-t border-gray-200">
              <h2 className="mb-4 text-xl font-bold">Order Details</h2>
              
              <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Order Number</h3>
                  <p className="font-medium">{order._id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
                  <p className="font-medium">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                  <p className="font-medium">Bank Transfer</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Payment Proof</h3>
                    <img 
                    src={order.paymentProof} 
                    alt="Payment Proof" 
                    className="object-cover w-full h-auto rounded"
                    />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-gray-500">Delivery Option</h3>
                <p className="font-medium">
                  {order.deliveryOption === 'delivery' ? 'Doorstep Delivery' : 'Store Pickup'}
                </p>
              </div>
              
              {order.deliveryOption === 'delivery' && order.address && (
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-medium text-gray-500">Shipping Address</h3>
                  <p className="font-medium">{order.address}</p>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-gray-500">Contact Information</h3>
                <p className="font-medium">{order.fullName}</p>
                <p className="font-medium">{order.email}</p>
                <p className="font-medium">{order.phone}</p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
              
              <div className="mb-6 space-y-4">
                {order.items.map(item => (
                  <div key={item.productId._id} className="flex gap-4">
                    <img 
                      src={item.productId.image} 
                      alt={item.productId.name} 
                      className="object-cover w-16 h-16 rounded"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.productId.name}</h3>
                        <p className="text-gray-800">${(item.productId.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span>{order.deliveryOption === 'delivery' ? '$5.00' : 'Free'}</span>
                </div>
                <div className="flex justify-between pt-2 mt-2 text-lg font-semibold border-t border-gray-200">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;