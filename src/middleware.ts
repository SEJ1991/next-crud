import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  if (pathname.startsWith('/movies')) {
    response.headers.set('x-path', 'movies');
  } else if (pathname.startsWith('/posts')) {
    response.headers.set('x-path', 'posts');
  }

  return response;
}
