import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string, cartId:string) => void;
  updateQuantity: (productId: string, cartItemId:string, quantity: number) => void;
  delCart: () => void;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const fetschCart = async (sessionId: string) => {
    try {
      
      const response = await fetch(`https://bot-server-i8jn.onrender.com/cart/session/${sessionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
      const data = await response.json();

      // Save the entire data object to local storage
      localStorage.setItem('cartData', JSON.stringify(data));
     

      // Merge server cart items with local storage items
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const mergedCart = [...data.cartItems];
     

      // Remove duplicates by product ID, ensuring valid product objects
      // const uniqueCart = mergedCart.reduce((acc: CartItem[], item: CartItem) => {
      //   if (!item.product || !item.product._id) {
      //     console.warn('Invalid cart item detected and skipped:', item);
      //     return acc;
      //   }

      //   const existingItem = acc.find((i) => i.product._id === item.product._id);
      //   if (existingItem) {
      //     existingItem.quantity += item.quantity;
      //   } else {
      //     acc.push(item);
      //   }
      //   return acc;
      // }, []);

      setItems(mergedCart);
      localStorage.setItem('cart', JSON.stringify(mergedCart));
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
  const fetchCart = async (sessionId: string) => {
    try {
      const response = await fetch(`https://bot-server-i8jn.onrender.com/cart/session/${sessionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
      const data = await response.json();

      // Filter out cart items with `removed` set to true
      const filteredCartItems = data.cartItems.filter((item: CartItem) => !item.removed);
    
      // Save the entire data object to local storage
      localStorage.setItem('cartData', JSON.stringify({  filteredCartItems }));

      // Merge server cart items with local storage items
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const mergedCart = [...filteredCartItems];

      
      setItems(mergedCart);
      localStorage.setItem('cart', JSON.stringify(mergedCart));

    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      fetchCart(sessionId);
    }

  }, [items]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = async (product: Product) => {
    try {
      const sessionId = localStorage.getItem('sessionId');
      // Save to server
      const response = await fetch('https://bot-server-i8jn.onrender.com/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product._id, quantity: 1, sessionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart on server');
      }

      const serverCartItem = await response.json();

      // Save to local storage and update state
      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.productId._id === product._id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.productId._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevItems, { productId: product, quantity: 1 }];
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  const delCart = async () => {

    try {
      const sessionId = localStorage.getItem('sessionId');
      const response = await fetch(
        `https://bot-server-i8jn.onrender.com/delcart/session/${sessionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
    },
      
      }
      );
      const data = await response.json();
      if (!response.ok) {
        console.error("Cart item not deleted successfully:", data.message);
        
      }
      clearCart()
    } catch (error) {
      console.error("Error deleting cart:", error);

    }
  }

 
  const removeFromCart = async (productId: string, cartId: string) => {
    try {
      const response = await fetch(`https://bot-server-i8jn.onrender.com/del-cart/${cartId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to remove item from cart on server');
      }
  

  
      // Update state
      setItems((prevItems) => prevItems.filter((item) => item.productId._id !== productId));
  
      // Refetch cart to ensure latest data
      const sessionId = localStorage.getItem('sessionId');
      if (sessionId) {
        await fetchCart(sessionId);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
 
  const updateQuantity = async (productId: string, cartItemId: string, quantity: number) => {
  
    if (quantity < 1) {
      console.error('Quantity must be at least 1');
      return;
    }
  
    try {
      const response = await fetch(`https://bot-server-i8jn.onrender.com/cart/${cartItemId}/quantity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update item quantity on server');
      }
  
      const updatedCartItem = await response.json();
    
  
      // Update quantity in local storage and state
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: updatedCartItem.cartItem.quantity }
            : item
        )
      );
  
      // Refetch cart to ensure latest data
      const sessionId = localStorage.getItem('sessionId');
      if (sessionId) {
        await fetchCart(sessionId);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };
 

  
  const clearCart = () => {
    setItems([]);
  };
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalAmount = items.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        
        delCart,
        totalItems,
        totalAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
 ;
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};