'use server';

import { prismaClient } from '@/lib/database/connection';
import { BlogListResponses, BlogWithComments } from '@/lib/type/blog';
import { deleteFile } from '@/utils/delete-file';
import { dirFiles, saveFile } from '@/utils/save-file';
import { slugify } from '@/utils/slugify';
import { Prisma } from '@prisma/client';
import fs from 'fs';
import { revalidatePath } from 'next/cache';
import path from 'path';

const UPLOAD_DIR = dirFiles('blogs');

interface FetchBlogsParams {
  page?: number;
  limit?: number;
  title?: string;
  category?: string;
  year?: number;
  month?: string;
  author?: string;
}

const buildWhereClause = ({ title, category, year, month, author }: FetchBlogsParams): Prisma.BlogsWhereInput => {
  const whereClause: Prisma.BlogsWhereInput = {};

  if (title) {
    whereClause.title = { contains: title, mode: 'insensitive' };
  }

  if (category) {
    whereClause.category = { contains: category, mode: 'insensitive' };
  }

  if (author) {
    whereClause.author = { contains: author, mode: 'insensitive' };
  }

  if (year) {
    whereClause.created_at = {
      gte: new Date(year, 0, 1),
      lt: new Date(year + 1, 0, 1),
    };
  }

  if (month) {
    const startMonth = parseInt(month) - 1;
    const start = new Date(year ?? new Date().getFullYear(), startMonth, 1);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 1);
    whereClause.created_at = {
      ...(typeof whereClause.created_at === 'object' ? whereClause.created_at : {}),
      gte: start,
      lt: end,
    };
  }

  return whereClause;
};

export async function getBlogs(params: FetchBlogsParams) {
  const { page = 1, limit = 10 } = params;
  const skip = (page - 1) * limit;
  const whereClause = buildWhereClause(params);

  try {
    const [totalCount, blogs] = await Promise.all([
      prismaClient.blogs.count({ where: whereClause }),
      prismaClient.blogs.findMany({
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
          comments: { select: { id: true } },
        },
      }),
    ]);

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

    return { data, meta } as BlogListResponses;
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
  const title = formData.get('title') as string;
  const resume = formData.get('resume') as string;
  const article = formData.get('article') as string;
  const author = formData.get('author') as string;
  const category = formData.get('category') as string;
  const slug = slugify(title);

  if (!title || !resume || !article || !author || !category) {
    throw new Error('All fields are required');
  }

  const existingBlogBySlug = await prismaClient.blogs.findUnique({ where: { slug } });
  if (existingBlogBySlug) {
    throw new Error('A blog with this title already exists');
  }

  const coverFile = formData.get('cover') as File | null;
  const coverPath = coverFile ? await saveFile(coverFile, 'blogs') : '';

  try {
    const newBlog = await prismaClient.blogs.create({
      data: { title, resume, article, author, category, cover: coverPath, slug },
    });
    revalidatePath('/admin/blog');
    revalidatePath('/');
    return newBlog;
  } catch (error) {
    console.error('Failed to create blog post:', error);
    throw new Error('Failed to create blog post');
  }
}

export async function updateBlog(formData: FormData, blogId: number) {
  const title = formData.get('title') as string | null;
  const resume = formData.get('resume') as string | null;
  const article = formData.get('article') as string | null;
  const author = formData.get('author') as string | null;
  const category = formData.get('category') as string | null;
  const slug = slugify(title as string);
  const coverFile = formData.get('cover') as File | null;

  const existingBlog = await prismaClient.blogs.findUnique({ where: { id: blogId } });
  if (!existingBlog) throw new Error('Blog not found');

  const existingSlug = await prismaClient.blogs.findUnique({ where: { slug } });
  if (existingSlug) {
    throw new Error('A blog with this title already exists');
  }

  let coverPath = existingBlog.cover;
  if (coverFile) {
    const oldFilePath = path.join(UPLOAD_DIR, path.basename(existingBlog.cover as string));
    if (existingBlog.cover && fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }
    coverPath = await saveFile(coverFile, 'blogs');
  }

  try {
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
  } catch (error) {
    console.error('Failed to update blog post:', error);
    throw new Error('Failed to update blog post');
  }
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
