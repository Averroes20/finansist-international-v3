import { prismaClient } from '@/lib/database/connection';
import { slugify } from '@/utils/slugify';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

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
