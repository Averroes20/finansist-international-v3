'server only';
import { API_BASE_URL } from '@/constants/env';
import { CommentType } from '@/lib/validation/schema-form-comment';

export async function createComment(data: CommentType) {
  const response = await fetch(`${API_BASE_URL}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error(`Failed to create comment: ${response.statusText}`);
  }

  return response.json();
}
