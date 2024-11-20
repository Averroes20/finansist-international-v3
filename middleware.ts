import { NextRequest, NextResponse } from 'next/server';

// Daftar origin yang diizinkan
const allowedOrigins = ['https://localhost:3000', 'https://finansist-international-v3.vercel.app'];

export function middleware(req: NextRequest) {
  const origin = req.headers.get('origin') || '';

  const res = NextResponse.next();

  if (allowedOrigins.includes(origin)) {
    res.headers.set('Access-Control-Allow-Origin', origin);
  } else {
    res.headers.set('Access-Control-Allow-Origin', 'https://finansist-international-v3.vercel.app'); // Default yang valid
  }

  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.headers.set('Access-Control-Max-Age', '86400'); // Cache preflight
    return new Response(null, { status: 204, headers: res.headers });
  }

  if (!allowedOrigins.includes(origin)) {
    return new Response(JSON.stringify({ error: 'CORS policy does not allow this origin' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return res;
}

export const config = {
  matcher: '/api/:path*', // Berlaku hanya untuk API
};
