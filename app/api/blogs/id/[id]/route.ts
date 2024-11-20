import { prismaClient } from '@/lib/database/connection';
import { slugify } from '@/utils/slugify';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';
import { deleteFile } from '@/utils/delete-file';
import { saveFile } from '@/utils/save-file';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'blogs');

type Props = {
  params: {
    id: string;
  };
};

export async function PUT(req: NextRequest, { params }: Props) {
  const blogId = parseInt(params.id, 10);
  try {
    const formData = await req.formData();
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
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
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
        title: title || undefined,
        resume: resume || undefined,
        article: article || undefined,
        author: author || undefined,
        category: category || undefined,
        slug: slug || undefined,
        cover: coverPath,
      },
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  const blogId = parseInt(params.id, 10);
  try {
    const existingBlog = await prismaClient.blogs.findUnique({
      where: { id: blogId },
    });
    if (!existingBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    const deletedBlog = await prismaClient.blogs.delete({
      where: { id: blogId },
    });
    if (deletedBlog.cover) {
      const filePath = path.join(UPLOAD_DIR, path.basename(deletedBlog.cover));
      deleteFile(filePath);
    }
    return NextResponse.json(deletedBlog, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
