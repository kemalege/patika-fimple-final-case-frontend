import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
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
  async function (error) {
    const toast = useToast()
    if (error.response && error.response.status === 401) {
      window.location.href = '/admin';
      toast({
        title: 'Oturum süresi doldu.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      })
    }
  }
);


export default instance;