import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from './config.js';
import { Trend, Rate } from 'k6/metrics';

export let fastResponseTrend = new Trend('response_time');
export let standardResponseTrend = new Trend('response_time');
export let errorRate = new Rate('failed_requests');

export const options = {
  stages: [
    { duration: '2s', target: 5 },   // zero to five in 2s
    { duration: '5s', target: 5 }, // stay on 5 for five seconds
    { duration: '2s', target: 0 }, // ramping down to normal
  ],
  thresholds: {
    http_req_duration: ['p(97)<500'],
    checks: ['rate>0.90'],   
  },
};


export default function () {
  const payload = JSON.stringify(config.post_order.payload);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${config.post_order.token}`
  };

  const res = http.post(config.post_order.apiUrl, payload, { headers });

  // console.log(res.status)

  //custom metric for evaluation
  fastResponseTrend.add(res.timings.duration <= 300);
  standardResponseTrend.add(res.timings.duration <= 505);
  errorRate.add(res.status !== 200);

  check(res, {
    'status is success (201)': (r) => r.status === 201,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
