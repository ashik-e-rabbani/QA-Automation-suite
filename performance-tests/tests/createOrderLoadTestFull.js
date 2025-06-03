import { sleep, check } from 'k6';
import {createClient, getProducts, createCart, addItemToCart, createOrder,} from '../utils/ApiHelpers.js';

export const options = {
  stages: [
    { duration: '2s', target: 5 },
    { duration: '5s', target: 5 },
    { duration: '2s', target: 0 },
  ],
};

export default function () {
  const clientRes = createClient();
  const token = clientRes.json('accessToken');
  check(token, {
    'Token exists': (t) => t !== undefined && t !== null
  });

  const productRes = getProducts();
  const productId = productRes.json()[0]?.id;
  check(productId, { 'Got product ID': (id) => !!id });

  const cartRes = createCart(token);
  const cartId = cartRes.json('cartId');
  check(cartId, { 'Cart created': (id) => !!id });

  const addItemRes = addItemToCart(cartId, productId, token);
  check(addItemRes, { 'Item added to cart': (r) => r.status === 201 });

  const orderRes = createOrder(cartId, token);
  check(orderRes, {
    'Order created': (r) => r.status === 201,
    'Response time < 500ms': (r) => r.timings.duration < 800,
  });

  sleep(1);
}
