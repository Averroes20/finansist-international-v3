'use server';
import { BlogListResponse, BlogWithComments } from '@/lib/type/blog';
import { BlogType } from '@/lib/validation/schema-form-blog';

export const createBlog = async (data: BlogType) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('author', data.author);
  formData.append('resume', data.resume);
  formData.append('article', data.article);
  formData.append('category', data.category);

  if (data.cover) {
    formData.append('cover', data.cover);
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to create blog');
  }

  return response.json();
};

export const updateBlog = async (id: number, data: BlogType) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('author', data.author);
  formData.append('resume', data.resume);
  formData.append('article', data.article);
  formData.append('category', data.category);

  if (data.cover) {
    formData.append('cover', data.cover);
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/id/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to update blog');
  }

  return response.json();
};

export const deleteBlog = async (id: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/id/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete blog');
  }
};

export const fetchBlogs = async (query: string): Promise<BlogListResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?${query}`, {
      cache: 'no-cache',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { data: [], meta: { page: 0, limit: 0, totalPages: 0, totalCount: 0 } };
  }
};

export const fetchBlogById = async (slug: string): Promise<BlogWithComments> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/slug/${slug}`, {
      cache: 'no-cache',
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return {} as BlogWithComments;
  }
};
