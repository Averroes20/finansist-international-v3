import { prismaClient } from '@/lib/database/connection';
import { slugify } from '@/utils/slugify';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'blogs');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const resume = formData.get('resume') as string;
    const article = formData.get('article') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as string;
    let slug = slugify(title);

    if (!title || !resume || !article || !author || !category) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const existingBlog = await prismaClient.blogs.findUnique({
      where: { slug },
    });

    if (existingBlog) {
      slug = `${slugify(title)}-${randomUUID().split('-')[0]}`;
    }

    const coverFile = formData.get('cover') as File | null;
    let coverPath = '';

    if (coverFile) {
      try {
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${coverFile.name}`;
        coverPath = path.join(UPLOAD_DIR, fileName);

        if (!fs.existsSync(UPLOAD_DIR)) {
          fs.mkdirSync(UPLOAD_DIR, { recursive: true });
        }

        const fileBuffer = Buffer.from(await coverFile.arrayBuffer());
        fs.writeFileSync(coverPath, fileBuffer);

        coverPath = `/blogs/${fileName}`;
      } catch (error) {
        console.error('File upload failed:', error);
        return NextResponse.json({ error: 'Failed to upload cover image' }, { status: 500 });
      }
    }

    const newBlog = await prismaClient.blogs.create({
      data: {
        title,
        resume,
        article,
        author,
        category,
        cover: coverPath,
        slug,
      },
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}

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

    const response = blogs.map((blog) => ({
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
      sum_comments: blog.comments.length || 0,
    }));

    return NextResponse.json({
      data: response,
      meta: {
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch blogs', error }, { status: 500 });
  }
}
