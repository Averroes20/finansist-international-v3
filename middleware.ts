import { NextRequest } from 'next/server';
import { corsMiddleware } from './lib/middleware/cors';
import authMiddleware from './lib/middleware/auth';

export function middleware(req: NextRequest) {
  const corsResponse = corsMiddleware(req);
  if (corsResponse) return corsResponse;

  return authMiddleware(req);
}

export const config = {
  matcher: ['/api/Keg24rNlZa/:path*', '/admin/:path*'],
};
