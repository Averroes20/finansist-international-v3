import { prismaClient } from '@/lib/database/connection';
import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{
    id: string; // Sesuaikan tipe params
  }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  const params = await context.params; // Tunggu promise untuk params
  const reviewId = parseInt(params.id, 10);
  try {
    const review = await prismaClient.reviews.findUnique({
      where: { id: reviewId },
    });
    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }
    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch review' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const params = await context.params; // Tunggu promise untuk params
  const reviewId = parseInt(params.id, 10);
  try {
    const existingReview = await prismaClient.reviews.findUnique({
      where: { id: reviewId },
    });
    if (!existingReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }
    const deletedReview = await prismaClient.reviews.delete({
      where: { id: reviewId },
    });
    return NextResponse.json(deletedReview, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: RouteContext) {
  const params = await context.params; // Tunggu promise untuk params
  const reviewId = parseInt(params.id, 10);
  try {
    const body = await req.json();
    const updateReview = await prismaClient.reviews.update({
      where: { id: reviewId },
      data: body,
    });
    return NextResponse.json(updateReview, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to put review' }, { status: 500 });
  }
}
