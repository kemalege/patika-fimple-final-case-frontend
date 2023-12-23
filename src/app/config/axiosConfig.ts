import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 18000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;