import axios from 'axios';

export const api = axios.create({
  baseURL: "http://172.19.0.1:4000/"
})