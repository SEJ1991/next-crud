import { MovieDetail, MoviesRequest, MoviesResponse, MovieStatusWithoutAll } from '@/domains/movie';
import { movieAxios } from '@/shared';

export async function getAllMovies(params: MoviesRequest): Promise<MoviesResponse> {
  const response = await movieAxios.get('/discover/movie', { params });
  return response.data;
}

export async function getMoviesByStatus(
  params: MoviesRequest,
  status: MovieStatusWithoutAll
): Promise<MoviesResponse> {
  const response = await movieAxios.get(`/movie/${status}`, { params });
  return response.data;
}

export async function getMovie(id: string): Promise<MovieDetail> {
  const response = await movieAxios.get(`/movie/${id}`);
  return response.data;
}
