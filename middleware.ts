import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const host = request.headers.get('host')

  if (host?.includes('vercel.app')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.png$).*)', '/((?!_next/static|_next/image|favicon.ico).*)', '/api/:path*'],
};

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };

// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';
// import type { NextRequest } from 'next/server';

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.AUTH_SECRET });

//   const privateRoutes = ['/admin/blogs', '/admin/portfolio', '/admin/review'];

//   if (req.nextUrl.pathname.startsWith('/api/auth/signout') || privateRoutes.includes(req.nextUrl.pathname)) {
//     if (!token) {
//       return NextResponse.redirect(new URL('/', req.url));
//     }
//   }

//   return NextResponse.next();
// }
