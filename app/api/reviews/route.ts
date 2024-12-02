import { prismaClient } from '@/lib/database/connection';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');

    const page = pageParam ? parseInt(pageParam, 10) : undefined;
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;
    const skip = page && limit ? (page - 1) * limit : undefined;

    const company = searchParams.get('company') || undefined;

    const whereClause: Prisma.ReviewsWhereInput = {};
    if (company) {
      whereClause.company = {
        contains: company,
        mode: 'insensitive',
      };
    }

    const total = await prismaClient.reviews.count({ where: whereClause });

    const reviews = await prismaClient.reviews.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        created_at: 'desc',
      },
    });

    const data = reviews.map((review) => ({
      company: review.company,
      id: review.id,
      name: review.name,
      review: review.review,
      createdAt: review.created_at,
      updatedAt: review.updated_at,
    }));

    return new Response(
      JSON.stringify({
        data: data,
        meta: {
          page: page || null,
          limit: limit || null,
          totalPages: limit ? Math.ceil(total / limit) : null,
          totalCount: total,
        },
      }),
      {
        status: 200,
        headers: {
          'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
