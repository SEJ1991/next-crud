import { getAllMovies, getMoviesByStatus, MovieStatus } from '@/domains/movie';

export function getMovies(status: MovieStatus, page: number = 1) {
  if (status === 'all') {
    return getAllMovies({ page });
  }
  return getMoviesByStatus({ page }, status);
}
