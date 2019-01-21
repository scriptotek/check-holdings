import http from './http';
const axiosCookieJarSupport = require('axios-cookiejar-support').default;

let queue = [];
let openConnections = 0;
let maxOpenConnections = 10;

function apiCall (args) {
    return new Promise((resolve, reject) => {
        queue.push({args: args, resolve: resolve, reject: reject})
        processQueue()
    })
}

function processQueue () {
    if (!queue.length || openConnections >= maxOpenConnections) {
        return;
    }

    openConnections++;
    let request = queue.shift();
    http.request(request.args)
    .then(res => request.resolve(res))
    .catch(res => request.reject(res))
    .finally(() => {
        openConnections--
        processQueue()
    })
}

export default apiCall
