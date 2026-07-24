import axios from 'axios';

const chatApi = axios.create({
  baseURL: 'https://new-hair-style-chatbot.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default chatApi;