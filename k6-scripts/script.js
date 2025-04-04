import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://momos_oa-app-1:3000';

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
    vus: 5000,  // 5000 concurrent virtual users
    duration: '1s',
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
