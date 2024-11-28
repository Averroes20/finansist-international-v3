'server only';
import API_BASE_URL from '@/constants/env';
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

  const response = await fetch(`${API_BASE_URL}/api/blogs`, {
    method: 'POST',
    body: formData,
  });
  return handleResponse(response);
};

export const updateBlog = async (id: number, data: BlogType) => {
  const formData = createFormData(data);

  const response = await fetch(`${API_BASE_URL}/api/blogs/id/${id}`, {
    method: 'PUT',
    body: formData,
  });

  return handleResponse(response);
};

export const deleteBlog = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/blogs/id/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to delete blog: ${response.status} - ${errorMessage}`);
  }
};

export const fetchBlogs = async (query: string): Promise<BlogListResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs?${query}`, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching blogs: ${error}`);
    return {
      data: [],
      meta: { page: 0, limit: 0, totalPages: 0, totalCount: 0 },
    };
  }
};

export const fetchBlogById = async (slug: string): Promise<BlogWithComments> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs/slug/${slug}`, {
      next: { revalidate: 0 },
    });
    const data = await handleResponse(response);
    return data.data;
  } catch (error) {
    console.error(`Error fetching blog by ID: ${error}`);
    return {} as BlogWithComments;
  }
};
