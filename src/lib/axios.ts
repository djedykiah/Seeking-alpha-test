import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://seekingalpha.free.beeceptor.com',
});
