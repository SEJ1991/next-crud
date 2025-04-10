/**
 * TMDB 이미지 경로를 생성하는 함수
 *
 * @param path - TMDB에서 제공하는 이미지 경로 (poster_path or backdrop_path)
 * @param w - 이미지 사이즈 (기본값: 500, TMDB의 w 값에 해당)
 */
export function getTMDBImgPath(path: string, w: number = 500) {
  return `https://image.tmdb.org/t/p/w${w}/${path}`;
}
