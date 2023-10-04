import axios, { AxiosResponse } from 'axios';

const API_KEY = '2f3773a2a7d926a284751bbac7b3cd4d';
const BASE_URL = 'http://ws.audioscrobbler.com/2.0/';

interface LastFmParams {
  api_key: string;
  format: string;
}

const lastfmAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    format: 'json',
  } as LastFmParams, // Defina o tipo para params
});

const fetchLastFmData = async (method: string, params: Record<string, any> = {}) => {
  try {
    const response: AxiosResponse = await lastfmAPI.get(`?method=${method}`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchLastFmData;
