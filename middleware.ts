import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = ['https://localhost:3000', '*'];

export function middleware(req: NextRequest) {
  const origin = req.headers.get('origin');

  if (origin && allowedOrigins.includes(origin)) {
    const res = NextResponse.next();

    res.headers.set('Access-Control-Allow-Origin', origin);
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      res.headers.set('Access-Control-Max-Age', '86400');
      return new Response(null, { status: 204, headers: res.headers });
    }

    return res;
  }

  return new Response('CORS policy does not allow this origin', { status: 403 });
}
