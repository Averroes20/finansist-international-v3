'server only';
import { API_BASE_URL, API_BASE_URL_PRIVATE } from '@/constants/env';
import { ReviewListResponse } from '@/lib/type/review';
import { ReviewType } from '@/lib/validation/schema-form-review';

export async function createReview(data: ReviewType) {
  const response = await fetch(`${API_BASE_URL_PRIVATE}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateReview(id: number, data: ReviewType) {
  const response = await fetch(`${API_BASE_URL_PRIVATE}/reviews/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteReview(id: number) {
  const response = await fetch(`${API_BASE_URL_PRIVATE}/reviews/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}

export const fetchReviews = async (query: string): Promise<ReviewListResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews?${query}`, {
      next: { revalidate: 0 },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return { data: [], meta: { page: 0, limit: 0, totalPages: 0, totalCount: 0 } };
  }
};
