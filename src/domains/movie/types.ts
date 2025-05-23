export type MovieStatus = 'all' | 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
export type MovieStatusWithoutAll = Exclude<MovieStatus, 'all'>;

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

export interface MovieDetail extends Movie {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  imdb_id: string | null;
  origin_country: string[];
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
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
