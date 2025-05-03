import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { Order } from '../types';

const OrderTracking: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const orders = JSON.parse(localStorage.getItem('orders') || '[]') as Order[];
   
    const response = await fetch(`https://bot-server-i8jn.onrender.com/track-order/${orderId}`);
    const data = await response.json();

    if (response.ok) {
      setOrder(data.items);
      
    } else {
      setOrder(null);
      setError('Order not found. Please check the order number and try again.');
    }
    // if (foundOrder) {
    //   setOrder(foundOrder);
    //   setError('');
    // } else {
    //   setOrder(null);
    //   setError('Order not found. Please check the order number and try again.');
    // }
    setIsSearched(true);
  };
  

  const getStatusDetails = (status?: string) => {
    switch (status) {
      case 'approved':
        return {
          icon: <CheckCircle className="w-12 h-12 text-green-500" />,
          text: 'Order Approved',
          description: 'Your order has been approved and is being processed.',
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        };
      case 'rejected':
        return {
          icon: <XCircle className="w-12 h-12 text-red-500" />,
          text: 'Order Rejected',
          description: 'Your order has been rejected. Please contact support for more information.',
          color: 'text-red-600',
          bgColor: 'bg-red-50'
        };
      default:
        return {
          icon: <Package className="w-12 h-12 text-yellow-500" />,
          text: 'Order Pending',
          description: 'Your order is pending approval.',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50'
        };
    }
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto">
          <h1 className="pt-8 mb-8 text-3xl font-bold text-center">Track Your Order</h1>
          
          <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="orderId" className="sr-only">
                  Order Number
                </label>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => {
                    setOrderId(e.target.value);
                    setError('');
                    setIsSearched(false);
                  }}
                  placeholder="Enter your order number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>
              <Button type="submit" className="flex items-center">
                <Search className="w-4 h-4 mr-2" />
                Track
              </Button>
            </form>
          </div>

          {error && (
            <div className="p-6 text-center border border-red-200 rounded-lg bg-red-50">
              <div className="flex justify-center mb-4">
                <XCircle className="w-12 h-12 text-red-500" />
              </div>
              <p className="mb-4 text-red-600">{error}</p>
              <p className="text-gray-600">
                Need help? <Link to="/contact" className="text-black underline">Contact us</Link>
              </p>
            </div>
          )}

          {order && (
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="mb-8 text-center">
                <div className="flex justify-center mb-4">
                  {getStatusDetails(order.status).icon}
                </div>
                <h2 className="mb-2 text-xl font-bold">{getStatusDetails(order.status).text}</h2>
                <p className={`${getStatusDetails(order.status).color}`}>
                  {getStatusDetails(order.status).description}
                </p>
              </div>

              <div className="space-y-6">
                <div className="pt-4 border-t">
                  <h3 className="mb-2 font-medium">Order Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Order Number</p>
                      <p className="font-medium">{order.orderId}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Order Date</p>
                      <p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Delivery Method</p>
                      <p className="font-medium">
                        {order.deliveryOption === 'delivery' ? 'Doorstep Delivery' : 'Store Pickup'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Amount</p>
                      <p className="font-medium">${order.totalPrice}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="mb-2 font-medium">Items</h3>
                  <div className="space-y-3">
                    {order.cartItems.map((item) => (
                      <div key={item.productId._id} className="flex items-center gap-4">
                        <img
                          src={item.productId.image}
                          alt={item.productId.name}
                          className="object-cover w-16 h-16 rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.productId.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${(item.productId.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {order.deliveryOption === 'delivery' && order.address && (
                  <div className="pt-4 border-t">
                    <h3 className="mb-2 font-medium">Delivery Address</h3>
                    <p className="text-gray-600">{order.address}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {isSearched && !error && !order && (
            <div className="p-6 text-center bg-white rounded-lg shadow-sm">
              <div className="flex justify-center mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <p className="mb-4 text-gray-600">No order found with the provided order number.</p>
              <p className="text-sm text-gray-500">
                Please check the order number and try again or{' '}
                <Link to="/contact" className="text-black underline">
                  contact our support team
                </Link>{' '}
                for assistance.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;