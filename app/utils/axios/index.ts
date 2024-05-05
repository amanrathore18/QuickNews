import axios from 'axios';

export const publicInstance = axios.create();

publicInstance.interceptors.response.use(
  function (response) {
    console.log('🚀 ~ response:', response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    console.log('🚀 ~ error:', error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
