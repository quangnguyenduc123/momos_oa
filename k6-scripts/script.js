import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://load_balancer';

// User credentials
const USERNAME = 'quang';
const PASSWORD = '123';

// Login and retrieve JWT
export function setup() {
    const loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
        username: USERNAME,
        password: PASSWORD,
    }), {
        headers: { 'Content-Type': 'application/json' },
    });

    check(loginRes, {
        'Login successful': (res) => res.status === 201,
    });


    const accessToken = JSON.parse(loginRes.body).accessToken;
    return { token: accessToken };
}

// Load test
export const options = {
    stages: [
        { duration: '1m', target: 5000 },
    ],
};

export default function (data) {
    const headers = {
        Authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
    };

    const payload = JSON.stringify({
        url: 'https://unsplash.com/',
        title: 'Test Image',
        description: 'Load test image',
    });

    const res = http.post(`${BASE_URL}/media`, payload, { headers });

    check(res, {
        'Status is 200': (r) => r.status === 200,
    });

    sleep(1);
}
