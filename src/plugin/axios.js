import axios from 'axios'
import { toastEvent, windowTo } from '@/helper'

const http = axios.create()

http.defaults.baseURL = import.meta.env.VITE_API_URL + '/'

http.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ERR_NETWORK' && !window.location.pathname.includes('/503')) {
      windowTo('503')
    }
    if (error.response) {
      let code = error.response.status
      let message = error.response.data?.message || error.response.statusText

      if (code === 401 && !window.location.pathname.includes('/login')) {
        windowTo('login')
      } else {
        toastEvent('error', 'error', message, 6000)
      }

      error = {
        code: code,
        message: message,
        errors: error.response?.data?.errors || [],
      }

      if (import.meta.env.MODE === 'development') console.log(error)
    }

    return Promise.reject(error)
  },
)

export default http
