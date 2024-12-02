import { prismaClient } from '@/lib/database/connection';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    const title = searchParams.get('title') || undefined;
    const category = searchParams.get('category') || undefined;

    const whereClause: Prisma.BlogsWhereInput = {};
    if (title) {
      whereClause.title = {
        contains: title,
        mode: 'insensitive',
      };
    }
    if (category) {
      whereClause.category = {
        contains: category,
        mode: 'insensitive',
      };
    }

    const totalCount = await prismaClient.blogs.count({ where: whereClause });

    const blogs = await prismaClient.blogs.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        title: true,
        resume: true,
        article: true,
        author: true,
        category: true,
        cover: true,
        slug: true,
        created_at: true,
        updated_at: true,
        comments: true,
      },
    });

    const data = blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      resume: blog.resume,
      article: blog.article,
      author: blog.author,
      category: blog.category,
      cover: blog.cover,
      slug: blog.slug,
      createdAt: blog.created_at,
      updatedAt: blog.updated_at,
      sumComments: blog.comments.length || 0,
    }));

    return new Response(
      JSON.stringify({
        data: data,
        meta: {
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
          totalCount,
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
    return NextResponse.json({ message: 'Failed to fetch blogs', error }, { status: 500 });
  }
}
