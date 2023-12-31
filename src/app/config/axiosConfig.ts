import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://patika-fimple-final-case-backend.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
   (config) => {
    if (config.url !== 'auth/admin') {
      const accessToken = (localStorage.getItem('userToken') ?? '');
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