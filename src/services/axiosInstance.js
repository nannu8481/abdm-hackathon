import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const instanceB = axios.create({
  baseURL: process.env.REACT_APP_AFF_CLOUD_GATEWAY,
})

const instanceC = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
})

export { instance, instanceB, instanceC }
