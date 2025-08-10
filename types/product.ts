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
{/*export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  // Add more fields if the API includes them
}*/}
export interface Product {
  product_id: string;
  name: string;
  price: string; // comes from backend as a string, we'll parse to number in UI
  category: string; // category ID
  category_name: string;
  primary_image: string;
  description?: string; // optional, since backend doesn't always send it
}


