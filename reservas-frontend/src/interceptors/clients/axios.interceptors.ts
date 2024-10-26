import axios from 'axios'

const clientsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL_CLIENT}/v1/client`
})

clientsApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
})

export { clientsApi }
