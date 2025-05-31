import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from './config.js';

export const options = {
  stages: [
    { duration: '5s', target: 10 },    
    { duration: '5s', target: 20 }, 
    { duration: '5s', target: 30 }, 
    { duration: '5s', target: 40 }, 
    { duration: '5s', target: 50 }, 
    { duration: '2s', target: 0 }, 
  ]
};

export default function () {
  const payload = JSON.stringify(config.post_order.payload);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${config.post_order.token}`
  };

  const res = http.post(config.post_order.apiUrl, payload, { headers });

  check(res, {
    'status is 201': (r) => r.status === 201,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
