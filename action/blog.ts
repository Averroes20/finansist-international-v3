'server only';
import { API_BASE_URL, API_BASE_URL_PRIVATE } from '@/constants/env';
import { BlogListResponse, BlogWithComments } from '@/lib/type/blog';
import { BlogType } from '@/lib/validation/schema-form-blog';

const createFormData = (data: BlogType): FormData => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('author', data.author);
  formData.append('resume', data.resume);
  formData.append('article', data.article);
  formData.append('category', data.category);

  if (data.cover) {
    formData.append('cover', data.cover);
  }

  return formData;
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorMessage}`);
  }
  return response.json();
};

export const createBlog = async (data: BlogType) => {
  const formData = createFormData(data);

  const response = await fetch(`${API_BASE_URL_PRIVATE}/blogs`, {
    method: 'POST',
    body: formData,
  });
  return handleResponse(response);
};

export const updateBlog = async (id: number, data: BlogType) => {
  const formData = createFormData(data);

  const response = await fetch(`${API_BASE_URL_PRIVATE}/blogs/${id}`, {
    method: 'PUT',
    body: formData,
  });

  return handleResponse(response);
};

export const deleteBlog = async (id: number) => {
  const response = await fetch(`${API_BASE_URL_PRIVATE}/blogs/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to delete blog: ${response.status} - ${errorMessage}`);
  }
};

export const fetchBlogs = async (query: string): Promise<BlogListResponse> => {
  const data: BlogListResponse = {
    data: [
      {
        id: 1,
        title: 'Blog 1',
        author: 'John Doe',
        resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        article: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        category: 'Category 1',
        cover: '/images/cover-blog.png',
        slug: 'blog-1',
        sumComments: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    meta: { page: 0, limit: 0, totalPages: 0, totalCount: 0 },
  };
  try {
    const response = await fetch(`${API_BASE_URL}/blogs?${query}`, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching blogs: ${error}`);
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      return data;
    }
    return data;
  }
};

export const fetchBlogById = async (slug: string): Promise<BlogWithComments> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${slug}`, {
      next: { revalidate: 0 },
    });
    const data = await handleResponse(response);
    return data.data;
  } catch (error) {
    console.error(`Error fetching blog by ID: ${error}`);
    return {} as BlogWithComments;
  }
};
