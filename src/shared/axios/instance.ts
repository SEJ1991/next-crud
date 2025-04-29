import axios from 'axios';

export const movieAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
  },
});

export const productAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCT_API_URL,
  params: {
    limit: 20,
  },
});
