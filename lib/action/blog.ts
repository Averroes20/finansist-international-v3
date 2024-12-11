'use server';

import { prismaClient } from '@/lib/database/connection';
import { deleteFile } from '@/utils/delete-file';
import { saveFile } from '@/utils/save-file';
import { slugify } from '@/utils/slugify';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import { BlogListResponses, BlogWithComments } from '@/lib/type/blog';
import { revalidatePath } from 'next/cache';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'blogs');

interface FetchBlogsParams {
  page?: number;
  limit?: number;
  title?: string;
  category?: string;
}

export async function getBlogs({ page = 1, limit = 10, title, category }: FetchBlogsParams) {
  try {
    const skip = (page - 1) * limit;

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

    const totalCount = await prismaClient.blogs.count({
      where: whereClause,
    });

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
        comments: {
          select: {
            id: true,
          },
        },
      },
    });

    const data = blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      resume: blog.resume,
      article: blog.article,
      author: blog.author,
      category: blog.category,
      cover: blog.cover ?? '',
      slug: blog.slug,
      createdAt: blog.created_at,
      updatedAt: blog.updated_at,
      sumComments: blog.comments.length,
    }));

    const meta = {
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    };

    const res: BlogListResponses = {
      data: data,
      meta: meta,
    };

    return res;
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    throw new Error('Failed to fetch blogs');
  }
}

export async function getBlog(slug: string) {
  try {
    const blog = await prismaClient.blogs.findUnique({
      where: { slug: slug },
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
      throw new Error('Blog not found');
    }

    const data: BlogWithComments = {
      id: blog.id,
      title: blog.title,
      resume: blog.resume,
      article: blog.article,
      author: blog.author,
      category: blog.category,
      cover: blog.cover ?? '',
      slug: blog.slug,
      createdAt: blog.created_at,
      updatedAt: blog.updated_at,
      sumComments: blog.comments.length,
      comments: blog.comments.map((comment) => ({
        id: comment.id,
        name: comment.name,
        email: comment.email,
        content: comment.content,
        createdAt: comment.created_at,
        updatedAt: comment.updated_at,
      })),
    };

    return data;
  } catch (error) {
    console.error('Failed to fetch blog:', error);
    throw new Error('Failed to fetch blog');
  }
}

export async function createBlog(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const resume = formData.get('resume') as string;
    const article = formData.get('article') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as string;
    let slug = slugify(title);

    if (!title || !resume || !article || !author || !category) {
      throw new Error('All fields are required');
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
        throw new Error('Failed to upload cover image');
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
    revalidatePath('/admin/blog');
    revalidatePath('/');
    return newBlog;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create blog post');
  }
}

export async function updateBlog(formData: FormData, blogId: number) {
  const title = formData.get('title') as string | null;
  const resume = formData.get('resume') as string | null;
  const article = formData.get('article') as string | null;
  const author = formData.get('author') as string | null;
  const category = formData.get('category') as string | null;
  let slug = slugify(title as string);
  const coverFile = formData.get('cover') as File | null;

  const existingBlog = await prismaClient.blogs.findUnique({
    where: { id: blogId },
  });

  if (!existingBlog) {
    throw new Error('Blog not found');
  }

  const existingSlug = await prismaClient.blogs.findUnique({
    where: { slug },
  });

  if (existingSlug) {
    slug = `${slugify(title as string)}-${randomUUID().split('-')[0]}`;
  }

  let coverPath = existingBlog.cover;

  if (coverFile) {
    const oldFilePath = path.join(UPLOAD_DIR, path.basename(existingBlog.cover as string));
    if (existingBlog.cover && fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }

    coverPath = await saveFile(coverFile, 'blogs');
  }

  const updatedBlog = await prismaClient.blogs.update({
    where: { id: blogId },
    data: {
      title: title ?? undefined,
      resume: resume ?? undefined,
      article: article ?? undefined,
      author: author ?? undefined,
      category: category ?? undefined,
      slug: slug ?? undefined,
      cover: coverPath ?? undefined,
    },
  });
  revalidatePath('/admin/blog');
  revalidatePath('/');
  return updatedBlog;
}

export async function deleteBlog(blogId: number) {
  const existingBlog = await prismaClient.blogs.findUnique({
    where: { id: blogId },
  });

  if (!existingBlog) {
    throw new Error('Blog not found');
  }

  const deletedBlog = await prismaClient.blogs.delete({
    where: { id: blogId },
  });

  if (deletedBlog.cover) {
    const filePath = path.join(UPLOAD_DIR, path.basename(deletedBlog.cover));
    deleteFile(filePath);
  }
  revalidatePath('/admin/blog');
  revalidatePath('/');
  return deletedBlog;
}
