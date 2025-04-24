export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'men' | 'women' | 'accessories';
  description: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  deliveryOption: 'pickup' | 'delivery';
  paymentProof: File | null;
}

export interface Order extends Omit<CheckoutFormData, 'paymentProof'> {
  id: string;
  items: CartItem[];
  totalAmount: number;
  paymentProofName: string;
  orderDate: string;
}