import http from './http';
const axiosCookieJarSupport = require('axios-cookiejar-support').default;

const mocks = {
  'auth': { 'POST': { token: 'This-is-a-mocked-token' } },
  'user/me': { 'GET': { name: 'doggo', title: 'sir' } }
}

// const instance = http.create({
//   baseURL: '/api/',
//   timeout: 6000,
//   withCredentials: true,
// });

const apiCall = (args) => {
    // args.url = '/api/' + args.url;
    console.log(args);

    // TODO: Can we get this from Vuex instead?
    // args.headers = {apiToken: localStorage.getItem('api-token')};

    return http.request(args);
};
/*new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      resolve(mocks[url][method || 'GET'])
      console.log(`Mocked '${url}' - ${method || 'GET'}`)
      console.log('response: ', mocks[url][method || 'GET'])
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})*/

export default apiCall
