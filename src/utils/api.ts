import axios from 'axios'
import { URLHOST } from './conf'

const api = axios.create({
  baseURL: `${URLHOST}/api`,
  headers: {
    'Content-Type': 'application/json'
  },
})

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    try { localStorage.setItem('auth_token', token) } catch(e){}
  } else {
    delete api.defaults.headers.common['Authorization']
    try { localStorage.removeItem('auth_token') } catch(e){}
  }
}

export default api
