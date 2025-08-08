// types/product.ts
{/*export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category?: string;
}
*/}
export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  // Add more fields if the API includes them
}
