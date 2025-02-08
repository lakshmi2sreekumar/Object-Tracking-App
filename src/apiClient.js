import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',  // Replace with your actual base URL
    // You can add other configurations if needed
});

// Add the interceptor to log request headers
api.interceptors.request.use(request => {
    console.log(request.headers);  // Check the headers being sent
    return request;
}, error => {
    console.error('Request error:', error);
    return Promise.reject(error);
});

export default api;
