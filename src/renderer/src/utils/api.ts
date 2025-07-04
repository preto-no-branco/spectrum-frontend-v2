import axios from 'axios'

let baseURL = localStorage.getItem('server') || ''

// Certifique-se de que o baseURL contém um protocolo
if (baseURL && !baseURL.startsWith('http://') && !baseURL.startsWith('https://')) {
  baseURL = `http://${baseURL}`
}

export const api = axios.create({
  baseURL: baseURL || ''
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
