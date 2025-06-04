import { config } from '../config.js';


export function getOptions() {
    const perfTestType = (__ENV.type || 'load').toLowerCase();
    const fullCycle = String(__ENV.fullCycle || 'false').toLowerCase() === 'true';

    let stages = [];

    if (perfTestType === 'load') {

        stages = [
            { duration: '2s', target: 5 },
            { duration: '5s', target: 5 },
            { duration: '2s', target: 0 },
        ];
    }
    else if (perfTestType === 'spike') {
        stages = [
            { duration: '2s', target: 1 },
            { duration: '1s', target: 50 },
            { duration: '2s', target: 0 },
        ];
    } else if (perfTestType === 'stress') {
        stages = [
            { duration: '2s', target: 10 },
            { duration: '5s', target: 30 },
            { duration: '5s', target: 40 },
            { duration: '3s', target: 0 },
        ];
    } else {
        stages = [
            { duration: '2s', target: 1 },
            { duration: '5s', target: 1 },
            { duration: '2s', target: 0 },
        ];
    }

    const responseTimeThreshold = fullCycle ? config.response_time.fullCycle : config.response_time.regular;

    return {
        stages,
        thresholds: {
            create_order_response_times:[
                `p(90)<${responseTimeThreshold}`,
                `avg<${responseTimeThreshold}`
            ],
            create_order_success_rate:[`rate > 0.95`],
            http_req_duration: [`p(90)<${responseTimeThreshold}`],
            checks: ['rate > 0.95'],
        },
    };
}
