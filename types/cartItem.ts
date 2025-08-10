import { Product } from './product';

export interface CartItem {
  id: string; // unique cart entry ID
  product: Product;
  quantity: number;
  price: number; // numeric unit price
  totalPrice: number; // numeric total
}

export interface UpdateCartItemPayload {
  cartItemId: string;
  quantity: number;
}
