'server only';
import { CommentType } from '@/lib/validation/schema-form-comment';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('Environment variable NEXT_PUBLIC_API_BASE_URL is missing');
}

export async function createComment(data: CommentType) {
  const response = await fetch(`${API_BASE_URL}/api/comments`, {
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
