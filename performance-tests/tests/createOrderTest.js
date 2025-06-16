import {sleep, check} from 'k6';
import {createClient, getProducts, createCart, addItemToCart, createOrder} from '../utils/ApiHelpers.js';
import {Trend, Rate} from 'k6/metrics';
import {getOptions} from '../utils/PerfOptions.js'
import {config} from '../config.js';

export const createOrderTrend = new Trend('create_order_response_times');
export const exceptionErrorRate = new Rate('overall_exception_errors');
export const apiErrorRate = new Rate('create_order_fail_rate');
export const successRate = new Rate('create_order_success_rate');

export const options = getOptions();

export default function () {
    const fullCycle = String(__ENV.fullCycle).toLowerCase() === 'true';

    if (fullCycle) {
        // Obtaining Authentication
        const clientRes = createClient();
        let token;
        try {
            token = clientRes.json('accessToken');
        } catch (e) {
            console.log('Failed to parse accessToken:', e.message);
            exceptionErrorRate.add(true);
            return;
        }

        check(token, {
            'Authentication | Obtained token successfully': (t) => typeof(t) === 'string' && t.length > 0
        });

        // Get products
        const productRes = getProducts();
        let products;

        try {
            products = productRes.json();
            exceptionErrorRate.add(false);
        } catch (e) {
            console.log('product parsing failed:', e.message);
            exceptionErrorRate.add(true);
            return;
        }

        let productId = '';

        if (products.length > 0 && products[0].id) {
            productId = products[0].id;
        }
        check(productId, {
            'Get All products API | picking a product': (id) => typeof(id) == 'number'
        });

        // Create Cart
        const cartRes = createCart(token);
        let cartId;
        try {
            cartId = cartRes.json('cartId');
            exceptionErrorRate.add(false);
        } catch (e) {
            console.error('cartId parsing failed', e.message);
            exceptionErrorRate.add(true);
            return;
        }
        check(cartId, {
            'Create Cart API | creation is successfull': (id) => typeof(id) == 'string' && id.length > 0
        });

        // Add items to Cart
        const addItemRes = addItemToCart(cartId, productId, token);
        check(addItemRes, {
            'Products to Cart API | response status is 201': (r) => r.status == 201
        });

        // Place an order
        const orderRes = createOrder(cartId, token);

        //Trace the response time metric of POST/order API
        createOrderTrend.add(orderRes.timings.duration);
        orderRes.status !== 201
            ? apiErrorRate.add(true)
            : successRate.add(true)

        check(orderRes, {
            'Create order API | response status is 201': (r) => r.status === 201,
            'Create order API | response time < 5s': (r) => r.timings.duration < config.response_time.fullCycle
        });
    } else {
        const orderRes = createOrder();

        // This is a negative scenario, Where failure is expected
        check(orderRes, {
            // 'Create order API | response status is 201': (r) => r.status === 201,
            'Create order API(only) | response status is not 201': (r) => r.status !== 201,
            'Create order API(0nly) | response time': (r) => r.timings.duration < config.response_time.regular
        });
    }

    sleep(1);
}
