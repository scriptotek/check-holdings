import axios from 'axios'
import localforage from 'localforage'
import { setupCache } from 'axios-cache-adapter'

// Create `localforage` instance
const store = localforage.createInstance({
  name: 'check-holdings',
})

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 10 * 60 * 1000,  // 10 minutes
  store,  // Pass `localforage` store to `axios-cache-adapter`
  exclude: {
    query: false,  // Cache requests with queries as well (default is true)
  },
  key: req => req.url + JSON.stringify(req.params),
  debug: false,
})

const http = axios.create({
  baseURL: process.env.VUE_APP_LSM_BASE_URL,
  timeout: 10000,
  //adapter: cache.adapter,
  //timeout: 60000, // milliseconds
  // withCredentials: true,
})

export default http
