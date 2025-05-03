export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: 'men' | 'women' | 'accessories';
  description: string;
  featured?: boolean;
}

export interface CartItem {
  _id?: string;
  productId: Product;
  quantity: number;
  removed?: boolean;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  deliveryOption: 'pickup' | 'delivery';
  paymentProof: string | null;
  productId: string;
  sessionId: string;
  orderId?:string
  
}
export interface AddProductFormData {
  name: string;
  description: string;
  price: number;
  image: string | null
  category: string;
}

export interface Order extends Omit<CheckoutFormData, 'paymentProof'> {
  _id: string;
  items: CartItem[];
  cartItems?: CartItem[];
totalAmount: number;
totalPrice?: number;
  paymentProof: string;
  orderDate: string;
  status?: 'approved' | 'rejected';
}