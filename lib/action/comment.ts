'use server';

import { prismaClient } from '@/lib/database/connection';
import { revalidatePath } from 'next/cache';

export async function getCommentsByBlog(blogId: number) {
  try {
    const comments = await prismaClient.comments.findMany({
      where: { blog_id: blogId },
    });
    return comments;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch blog');
  }
}

export async function createComment(form: FormData, slug: string) {
  try {
    if (!(form instanceof FormData)) {
      throw new Error('Invalid form data');
    }
    const payload = form.get('payload') as string;
    console.log('payload', payload);

    const { name, email, content, blog_id } = JSON.parse(payload);

    if (!name || !email || !content || !blog_id) {
      throw new Error('All fields are required');
    }
    const comments = await prismaClient.comments.create({
      data: {
        name: name,
        email: email,
        content: content,
        blog_id: Number(blog_id),
      },
    });
    revalidatePath(`/blog/${slug}`);
    return comments;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to post comment');
  }
}

export async function deleteComment(id: number, slug: string) {
  try {
    const comments = await prismaClient.comments.delete({
      where: { id },
    });
    revalidatePath(`/blog/${slug}`);
    return comments;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete comment');
  }
}
