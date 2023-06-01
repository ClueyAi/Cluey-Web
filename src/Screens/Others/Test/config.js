import axios from 'axios';
import Constants from 'expo-constants';

const PI_KEY = "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";

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${PI_KEY}`,
  },
});

export default openai;
