import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 18000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
   (config) => {
    if (config.url !== 'admin') {
      const accessToken = JSON.parse(localStorage.getItem('userToken') ?? '');
      if (accessToken === ''){
        localStorage.removeItem('user');
      }
      if (accessToken) {
        config.headers.Authorization = `Bearer: ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;