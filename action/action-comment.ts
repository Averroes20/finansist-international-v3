import { CommentType } from '@/lib/validation/schema-form-comment';

export async function createComment(data: CommentType) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create comment: ${response.statusText}`);
  }

  return response.json();
}
