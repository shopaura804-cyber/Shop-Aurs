export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface StoreState {
  cart: { product: Product; quantity: number }[];
  isCartOpen: boolean;
}
