import { prismaClient } from '@/lib/database/connection';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    const total = await prismaClient.comments.count();

    const reviews = await prismaClient.comments.findMany({
      skip,
      take: limit,
      orderBy: {
        created_at: 'desc',
      },
    });

    const data = reviews.map((review) => ({
      ...review,
      createdAt: review.created_at.toISOString(),
      updatedAt: review.updated_at.toISOString(),
    }));

    return NextResponse.json(
      {
        data: data,
        meta: {
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          totalCount: total,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch comment' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { blogId, name, email, comment } = await req.json();

    const comments = await prismaClient.comments.create({
      data: {
        name,
        email,
        content: comment,
        blog_id: blogId,
      },
    });

    return NextResponse.json(comments, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
  }
}
