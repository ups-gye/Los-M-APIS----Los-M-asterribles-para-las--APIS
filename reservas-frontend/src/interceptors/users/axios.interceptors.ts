import axios from 'axios'

const usersApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/user`
})

usersApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
})

export { usersApi }
