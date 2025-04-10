import { MoviesRequest, MoviesResponse, MovieStatus } from '@/domains/movie';
import { movieAxios } from '@/shared';

export async function getAllMovies(params: MoviesRequest): Promise<MoviesResponse> {
  const response = await movieAxios.get('/discover/movie', { params });
  return response.data;
}

export async function getMoviesByStatus(
  params: MoviesRequest,
  status: Exclude<MovieStatus, 'all'>
): Promise<MoviesResponse> {
  const response = await movieAxios.get(`/movie/${status}`, { params });
  return response.data;
}
