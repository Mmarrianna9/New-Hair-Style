import axios from 'axios';

const api = axios.create({
  baseURL: 'https://new-hair-style-backend.onrender.com/api'
});

export default api;