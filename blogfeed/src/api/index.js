import axios from 'axios';
import { stringify } from 'qs';
import {useNavigate} from 'react-router-dom';
import M from 'materialize-css';

// Create an axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/", // process.env.REACT_APP_API_URL, // Update as per your environment variable
  paramsSerializer: function (params) {
    return stringify(params, { arrayFormat: 'indices', allowDots: true });
  }
});

// Function to base64 decode a string
const base64UrlDecode = (base64Url) => {
  // Replace URL-safe characters with standard base64 encoding characters
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decoded = atob(base64);
  return decoded;
};

// Function to parse the JWT and extract the payload
const parseJWT = (token) => {
  const [header, payload, signature] = token.split('.');

  // Decode the payload (Base64Url decoded)
  const decodedPayload = base64UrlDecode(payload);
  return JSON.parse(decodedPayload);
};

// Add a request interceptor to include the authorization token
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken) {
      var token = parseJWT(accessToken);
      // const { exp } = jwtDecode(accessToken, { header: true });

      // If access token is expired, refresh it
      if (Date.now() >= token.exp * 1000) {
          const response = await axios.post('/api/refresh', { refreshToken });
          const newAccessToken = response.data.accessToken;

          localStorage.setItem('accessToken', newAccessToken);
          config.headers.Authorization = `Bearer ${newAccessToken}`;
      } else {
          config.headers.Authorization = `Bearer ${accessToken}`;
      }
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

    if (error.response.status === 403) {
      // Redirect to /signin if status is 403
      window.location = '/signin'; // Or use navigate('/signin') in functional components
    }
    
    // Propagate the error to calling code
    return new Promise(() => {});
  }
);

export default axiosInstance;
