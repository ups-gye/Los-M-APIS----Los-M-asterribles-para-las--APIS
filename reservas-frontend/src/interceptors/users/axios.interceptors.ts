import axios from 'axios'

// Configura axios con defaults globales

const usersApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/user`
})

usersApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = token
  }
  config.headers['Content-Type'] = 'application/json'
  return config
})



export { usersApi }
