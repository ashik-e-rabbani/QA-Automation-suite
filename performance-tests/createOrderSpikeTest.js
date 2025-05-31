import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from './config.js';

export const options = {
  stages: [
    { duration: '10s', target: 10 },     // ramping up
    { duration: '10s', target: 1000 },   // spiking up
    { duration: '30s', target: 1000 },   // hold spike
    { duration: '10s', target: 10 },      //  spike to normal
    { duration: '10s', target: 0 },       // Ramping down
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
