import { sleep, check } from 'k6';
import { createClient, getProducts, createCart, addItemToCart, createOrder } from '../utils/ApiHelpers.js';
import { Trend, Rate } from 'k6/metrics';
import {getOptions} from '../utils/PerfOptions.js'
import { config } from '../config.js';

export const createOrderFullTrend = new Trend('create_order_full_cycle_duration');
export const createOrderOnlyTrend = new Trend('create_order_order_only_duration');
export const errorRate = new Rate('create_order_failed_requests');


export const options = getOptions();

export default function () {
  const fullCycle = String(__ENV.fullCycle).toLowerCase() === 'true';

  if (fullCycle) {
    const clientRes = createClient();
    const token = clientRes.json('accessToken');
    check(token, 
      { 'Authentication | Obtained token successfully': (t) => typeof(t) === 'string' && t.length > 0 
      });
  
    const productRes = getProducts();
    const products = productRes.json();
    let productId = '';
    
    if ( products.length > 0 && products[0].id) {
      productId = products[0].id;
      // console.log(`Type is ${typeof(productId)} and id is ${productId}`)
    }
    check(productId, 
      { 'Get All products API | picking a product': (id) =>  typeof(id)== 'number'});
  
    const cartRes = createCart(token);
    const cartId = cartRes.json('cartId');
    check(cartId, 
      { 'Create Cart API | creation is successfull': (id) => typeof(id) == 'string' && id.length > 0 });
  
    const addItemRes = addItemToCart(cartId, productId, token);
    check(addItemRes, 
      { 'Add products to Cart API | response status is 201': (r) => r.status == 201 });
  
      const startOrder = Date.now();
      const orderRes = createOrder(cartId, token);
      const endOrder = Date.now();

console.log(`CO duration manual: ${endOrder - startOrder} ms`);
console.log(`CO duration auto: ${orderRes.timings.duration} ms`);

createOrderFullTrend.add(orderRes.timings.duration);
errorRate.add(orderRes.status !== 201);

    check(orderRes, {
      'Create order API | response status is 201': (r) => r.status === 201,
      'Create order API | response time < 2s': (r) => r.timings.duration < config.response_time.fullCycle,
    });
  }
   else {
    const orderRes = createOrder();

createOrderOnlyTrend.add(orderRes.timings.duration);
errorRate.add(orderRes.status !== 201);
  
    check(orderRes, {
      // 'Create order API | response status is 201': (r) => r.status === 201,
      'Create order API(only) | response status is not 201': (r) => r.status !== 201,
      'Create order API(0nly) | response time < 500ms': (r) => r.timings.duration < config.response_time.regular,
    });
  }

  sleep(1);
}

