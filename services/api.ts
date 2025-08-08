{/*import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default api;*/}
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ecom.sakachris.com/api', // Adjust based on API root
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

export const fetchProducts = async (params: Record<string, string>) => {
  const response = await api.get('/products', { params });
  return response.data;
};
