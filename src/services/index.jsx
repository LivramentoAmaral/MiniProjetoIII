import axios from 'axios';

const API_KEY = '2f3773a2a7d926a284751bbac7b3cd4d';
const BASE_URL = 'http://ws.audioscrobbler.com/2.0/';

const lastfmAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    format: 'json',
  },
});

const fetchLastFmData = async (method, params = {}) => {
  try {
    const response = await lastfmAPI.get(`?method=${method}`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchLastFmData;