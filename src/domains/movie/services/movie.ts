import { MoviesRequest, MoviesResponse } from '@/domains/movie';
import { movieAxios } from '@/shared';

export async function getAllMovies(params: MoviesRequest): Promise<MoviesResponse> {
  const response = await movieAxios.get('/discover/movie', { params });
  return response.data;
}
