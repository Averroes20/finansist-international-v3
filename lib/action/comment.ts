'use server';

import { revalidatePath } from 'next/cache';
import { prismaClient } from '../database/connection';

interface formData {
  blogId: number;
  name: string;
  email: string;
  comment: string;
}

export const getCommentsByBlog = async (blogId: number) => {
  try {
    const comments = await prismaClient.comments.findMany({
      where: { blog_id: blogId },
    });
    return comments;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch blog');
  }
};

export const createComment = async (form: formData, slug: string) => {
  try {
    if (!(form instanceof FormData)) {
      throw new Error('Invalid form data');
    }

    if (!form.name || !form.email || !form.comment) {
      throw new Error('All fields are required');
    }
    const comments = await prismaClient.comments.create({
      data: {
        name: form.name,
        email: form.email,
        content: form.comment,
        blog_id: form.blogId,
      },
    });
    revalidatePath(`/blog/${slug}`);
    return comments;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to post comment');
  }
};

export const deleteComment = async (id: number, slug: string) => {
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
};
