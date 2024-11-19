import { prismaClient } from '@/lib/database/connection';
import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{
    slug: string; // Sesuaikan tipe params
  }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  const params = await context.params;
  const blogSlug = params.slug;
  try {
    const blog = await prismaClient.blogs.findUnique({
      where: { slug: blogSlug },
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
        comments: {
          orderBy: { created_at: 'desc' },
          select: {
            id: true,
            name: true,
            email: true,
            content: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
    });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const response = {
      data: {
        id: blog.id,
        title: blog.title,
        resume: blog.resume,
        article: blog.article,
        author: blog.author,
        category: blog.category,
        cover: blog.cover,
        slug: blog.slug,
        createdAt: blog.created_at.toISOString(),
        updatedAt: blog.updated_at.toISOString(),
        sum_comments: blog.comments.length,
        comments: blog.comments.map((comment) => ({
          id: comment.id,
          name: comment.name,
          email: comment.email,
          content: comment.content,
          createdAt: comment.created_at,
          updatedAt: comment.updated_at,
        })),
      },
      message: 'Blog fetched successfully',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}
