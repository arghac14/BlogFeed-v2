import axios from 'axios';
import { stringify } from 'qs';

import M from 'materialize-css';

// Create an axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/", // process.env.REACT_APP_API_URL, // Update as per your environment variable
  paramsSerializer: function (params) {
    return stringify(params, { arrayFormat: 'indices', allowDots: true });
  }
});

// Add a request interceptor to include the authorization token
axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    console.error('Request error:', error.message);
    return Promise.reject(error); // Ensure the error is propagated
  }
);

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response, // Pass successful responses
  (error) => {
    let errorMessage = 'Something went wrong. Please try again.';

    if (error.response) {
      // Extract server-provided error message
      errorMessage = error.response.data?.error || error.response.data?.message || 'An unexpected error occurred.';
      console.error(`API Error (${error.response.status}): ${errorMessage}`);
    } else if (error.request) {
      // No response received
      errorMessage = 'No response received from the server.';
      console.error('No response received:', error.message);
    } else {
      // Request setup error
      console.error('Request setup error:', error.message);
    }

    // Display the error message using M.toast
    M.toast({ html: errorMessage, classes: '#c62828 red darken-3' });

    // Propagate the error to calling code
    return new Promise(() => {});
  }
);

export default axiosInstance;
