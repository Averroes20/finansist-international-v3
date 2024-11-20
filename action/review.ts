'server only';
import { ReviewListResponse } from '@/lib/type/review';
import { ReviewType } from '@/lib/validation/schema-form-review';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('Environment variable NEXT_PUBLIC_API_BASE_URL is missing');
}

export async function createReview(data: ReviewType) {
  const response = await fetch(`${API_BASE_URL}/api/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateReview(id: number, data: ReviewType) {
  const response = await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteReview(id: number) {
  const response = await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}

export const fetchReviews = async (query: string): Promise<ReviewListResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reviews?${query}`, {
      cache: 'force-cache',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { data: [], meta: { page: 0, limit: 0, totalPages: 0, totalCount: 0 } };
  }
};
