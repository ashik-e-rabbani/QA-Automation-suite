import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from './config.js';

export const options = {
  stages: [
    { duration: '2s', target: 5 },   // zero to five in 2s
    { duration: '5s', target: 5 }, // stay on 5 for five seconds
    { duration: '2s', target: 0 }, // ramping down to normal
  ]
};


export default function () {
  const payload = JSON.stringify(config.post_order.payload);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${config.post_order.token}`
  };

  const res = http.post(config.post_order.apiUrl, payload, { headers });

  console.log(res.status)

  check(res, {
    'status is success (201)': (r) => r.status === 201,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'Error found (4xx/5xx)': (r) => r.status >= 400,
  });

  sleep(1);
}
