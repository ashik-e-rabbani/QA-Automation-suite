import http from 'k6/http';
import { config } from '../config.js';

const BASE_URL = __ENV.k6_baseUrl || 'https://simple-grocery-api.store';

export function createClient() {
  return http.post(
    `${BASE_URL}/api-clients`,
    JSON.stringify({
      clientName: 'Test Client',
      clientEmail: `ashik_${Math.floor(Math.random() * 1000000)}@gmail.com`,
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}

export function getProducts() {
  return http.get(`${BASE_URL}/products?available=true`);
}

export function createCart(token) {
  return http.post(`${BASE_URL}/carts`, null, {
    headers: { Authorization: token },
  });
}

export function addItemToCart(cartId, productId, token) {
  return http.post(
    `${BASE_URL}/carts/${cartId}/items`,
    JSON.stringify({ productId }),
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }
  );
}
export function createOrder(cartId, token) {
    if (cartId && token) {
      return http.post(
        `${BASE_URL}/orders`,
        JSON.stringify({
          cartId,
          customerName: 'Ashik Rabbani',
        }),
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );
    } else {
      const payload = JSON.stringify(config.post_order.payload);
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.post_order.token}`,
      };
      return http.post(config.post_order.apiUrl, payload, { headers });
    }
  }
  
