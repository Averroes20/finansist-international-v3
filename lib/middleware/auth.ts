import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTokenExpired = (token: any): boolean => {
  if (!token?.exp) return true;
  const currentTime = Math.floor(Date.now() / 1000);
  return token.exp < currentTime;
};

export default async function authMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/Keg24rNlZa')) {
    if (!token || isTokenExpired(token)) {
      console.log('Token tidak valid atau kedaluwarsa, redirecting...');
      const response = NextResponse.redirect(new URL('/auth/signin', req.url));
      response.headers.set('Cache-Control', 'no-store'); // Prevent caching
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/Keg24rNlZa/:path*'],
};
