import { prismaClient } from '@/lib/database/connection';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: {
    blogid: string;
  };
};

export async function GET(req: NextRequest, { params }: Props) {
  const blogId = parseInt(params.blogid, 10);
  try {
    const comments = await prismaClient.comments.findMany({
      where: { blog_id: blogId },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}
