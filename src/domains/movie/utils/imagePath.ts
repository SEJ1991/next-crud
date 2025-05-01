import { GetTMDBImgPathParams } from '@/domains/movie/types';

/**
 * TMDB 이미지 경로를 생성하는 함수
 *
 * @param path TMDB에서 제공하는 이미지 경로 (poster_path or backdrop_path)
 * @param size 이미지 사이즈 (기본값: 500, TMDB의 w 값에 해당)
 */
export function getTMDBImgPath({ path, size = 'w500' }: GetTMDBImgPathParams) {
  return `https://image.tmdb.org/t/p/${size}/${path}`;
}
