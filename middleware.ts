// export { auth as middleware } from '@/auth';

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const privateRoutes = ['/admin/blogs', '/admin/portfolio', '/admin/review'];

  if (req.nextUrl.pathname.startsWith('/api/auth/signout') || privateRoutes.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.png$).*)', '/((?!_next/static|_next/image|favicon.ico).*)', '/api/:path*'],
};
