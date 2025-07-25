import axios from 'axios'

const baseURL = import.meta.env.VITE_SERVER_URL

const serverFetch = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default serverFetch
