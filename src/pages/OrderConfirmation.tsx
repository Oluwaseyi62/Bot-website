import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { CheckCircle } from 'lucide-react';
import { Order } from '../types';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order | undefined;

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
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
            <p className="text-gray-600">
              We've received your order and will review your payment proof shortly.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order Number</h3>
                <p className="font-medium">{order.id}</p>
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
                <p className="font-medium">{order.paymentProofName}</p>
              </div>
            </div>
            
            <h3 className="text-sm font-medium text-gray-500 mb-2">Delivery Option</h3>
            <p className="font-medium mb-4">
              {order.deliveryOption === 'delivery' ? 'Doorstep Delivery' : 'Store Pickup'}
            </p>
            
            {order.deliveryOption === 'delivery' && order.address && (
              <>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Shipping Address</h3>
                <p className="font-medium mb-4">{order.address}</p>
              </>
            )}
            
            <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
            <p className="font-medium">{order.fullName}</p>
            <p className="font-medium">{order.email}</p>
            <p className="font-medium mb-4">{order.phone}</p>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {order.items.map(item => (
                <div key={item.product.id} className="flex gap-4">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-gray-800">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span>{order.deliveryOption === 'delivery' ? '$5.00' : 'Free'}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200 mt-2">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-6">
              You'll receive a confirmation email at {order.email} once your payment is verified.
            </p>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;