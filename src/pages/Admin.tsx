import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order } from '../types';
import { Eye, CheckCircle, XCircle, LogOut, Key, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import AdminProducts from './AdminProducts';

const Admin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { logout, changePassword } = useAuth();
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await fetch("https://bot-server-i8jn.onrender.com/fetch-orders");
      const data = await response.json();
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(data.orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleApproveOrder = async (orderId: string) => {
    const response = await fetch(`https://bot-server-i8jn.onrender.com/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'approved' }),
    });
    if (!response.ok) {
      console.error('Failed to approve order:', response.statusText);
      return;
    }
    const updatedOrders = orders.map(order => 
      order._id === orderId 
        ? { ...order, status: 'approved' }
        : order
    );
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    fetchOrders();
    setOrders(updatedOrders);
    setSelectedOrder(null);
  };

  const handleRejectOrder = async (orderId: string) => {
    const response = await fetch(`https://bot-server-i8jn.onrender.com/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'rejected' }),
    });
    if (!response.ok) {
      console.error('Failed to reject order:', response.statusText);
      return;
    }
    const updatedOrders = orders.map(order => 
      order._id === orderId 
        ? { ...order, status: 'rejected' }
        : order
    );
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async () => {
    if (!selectedOrder) return;

    const response = await fetch(`https://bot-server-i8jn.onrender.com/del-orders/${selectedOrder._id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      console.error('Failed to delete order:', response.statusText);
      return;
    }
    const updatedOrders = orders.filter(order => order._id !== selectedOrder._id);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    setSelectedOrder(null);
    setShowDeleteConfirm(false);
  };

  const handleOrderClick = async (orderId: string) => {
    try {
      const response = await fetch(`https://bot-server-i8jn.onrender.com/orders/${orderId}`);
      const data = await response.json();
      setSelectedOrder(data.order);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (changePassword(currentPassword, newPassword)) {
      setShowPasswordModal(false);
      setCurrentPassword('');
      setNewPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Current password is incorrect');
    }
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between pt-8 mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Button 
              variant="secondary" 
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center"
            >
              <Key size={16} className="mr-2" />
              Change Password
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
            <Button 
              variant="primary" 
              onClick={() => setShowProductForm(!showProductForm)}
              className="flex items-center"
            >
              Add Product
            </Button>
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg">
              <h2 className="mb-4 text-xl font-bold">Change Admin Password</h2>
              <form onSubmit={handleChangePassword}>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                {passwordError && (
                  <p className="mb-4 text-sm text-red-500">{passwordError}</p>
                )}
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPasswordModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Change Password
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-sm p-6 bg-white rounded shadow">
              <h2 className="mb-4 text-lg font-bold">Delete Order</h2>
              <p className="mb-6 text-gray-600">Are you sure you want to delete this order? This action cannot be undone.</p>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteOrder}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {showProductForm && <AdminProducts />}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-xl font-semibold">Orders</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {orders.map(order => (
                  <div 
                    key={order._id} 
                    className="p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleOrderClick(order._id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{order.fullName}</p>
                        <p className="text-sm text-gray-600">{order.email}</p>
                        <p className="text-sm text-gray-600">
                          Order {order._id} - {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          order.status === 'approved' 
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status || 'Pending'}
                        </span>
                        <div className="flex flex-wrap gap-2 ml-4 sm:flex-nowrap">
  <Button 
    variant="secondary"
    className="w-full sm:w-auto"
    onClick={(e) => {
      e.stopPropagation();
      setSelectedOrder(order);
    }}
  >
    <Eye size={16} className="mr-1" />
    View
  </Button>
  <Button 
    variant="outline"
    className="w-full text-red-600 hover:text-red-700 sm:w-auto"
    onClick={(e) => {
      e.stopPropagation();
      setSelectedOrder(order);
      setShowDeleteConfirm(true);
    }}
  >
    <Trash2 size={16} className="mr-1" />
    Delete
  </Button>
</div>

                      </div>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No orders found
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            {selectedOrder ? (
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">Order Details</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Customer Information</h3>
                    <p className="font-medium">{selectedOrder.fullName}</p>
                    <p>{selectedOrder.email}</p>
                    <p>{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Delivery Option</h3>
                    <p>{selectedOrder.deliveryOption === 'delivery' ? 'Doorstep Delivery' : 'Store Pickup'}</p>
                    {selectedOrder.address && (
                      <p className="mt-1">{selectedOrder.address}</p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Payment Proof</h3>
                    <img 
                      src={selectedOrder.paymentProof} 
                      alt="Payment Proof" 
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                  <div>
  <h3 className="text-sm font-medium text-gray-500">Order Items</h3>
  <div className="mt-2 space-y-2">
    {selectedOrder?.cartItems && selectedOrder.cartItems.length > 0 ? (
      selectedOrder.cartItems.map(item => (
        <div key={item.productId._id} className="flex justify-between">
          <span>{item.productId.name} x {item.quantity}</span>
          <span>₦{(item.productId.price * item.quantity).toLocaleString()}</span>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No items found in this order</p>
    )}
  </div>
</div>

<div className="pt-4 border-t">
  <div className="flex justify-between font-medium">
    <span>Total Amount</span>
    <span>
      ₦{selectedOrder?.cartItems?.reduce((acc, item) => acc + item.productId.price * item.quantity, 0).toLocaleString() ?? "0"}
    </span>
  </div>
</div>

                  <div className="flex gap-4 mt-6">
                    <Button
                      onClick={() => handleApproveOrder(selectedOrder._id)}
                      className="flex items-center"
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Approve Order
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleRejectOrder(selectedOrder._id)}
                      className="flex items-center"
                    >
                      <XCircle size={16} className="mr-2" />
                      Reject Order
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-red-600 hover:text-red-700"
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete Order
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center rounded-lg bg-gray-50">
                <p className="text-gray-500">Select an order to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
