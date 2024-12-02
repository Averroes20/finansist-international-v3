import { prismaClient } from '@/lib/database/connection';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const review = await prismaClient.reviews.create({
      data: body,
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to post reviews' }, { status: 500 });
  }
}
