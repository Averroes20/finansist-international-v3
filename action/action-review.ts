import { Review } from '@/lib/type/review';
import { ReviewType } from '@/lib/validation/schema-form-review';

export async function createReview(data: ReviewType) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateReview(id: number, data: ReviewType) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteReview(id: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}

export const fetchReviews = async (): Promise<Review[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews`, {
      cache: 'force-cache',
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
