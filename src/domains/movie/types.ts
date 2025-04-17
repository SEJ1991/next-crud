export type MovieStatus = 'all' | 'now_playing' | 'popular' | 'top_rated' | 'upcoming';

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// api interface
export interface MoviesRequest {
  page: number;
}

export interface PageInfo {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface MoviesResponse extends PageInfo {
  results: Movie[];
}

// utils
export interface GetTMDBImgPathParams {
  path: string;
  size?: 'w500' | 'w780' | 'original';
}
