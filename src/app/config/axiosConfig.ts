import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('userToken');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);


export default instance;