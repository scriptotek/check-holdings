import http from './http';
const axiosCookieJarSupport = require('axios-cookiejar-support').default;

const apiCall = (args) => {
    return http.request(args);
}

export default apiCall
