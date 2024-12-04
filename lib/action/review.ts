'use server';

import { revalidatePath } from 'next/cache';
import { prismaClient } from '../database/connection';
import { Prisma } from '@prisma/client';
import { ReviewListResponse } from '../type/review';

interface formData {
  name: string;
  company: string;
  review: string;
}

interface FetchReviewsParams {
  page?: number;
  limit?: number;
  companyName?: string;
}

export const getReviews = async ({ page = 1, limit, companyName }: FetchReviewsParams) => {
  try {
    const skip = page && limit ? (page - 1) * limit : undefined;

    const whereClause: Prisma.ReviewsWhereInput = {};

    if (companyName) {
      whereClause.company = {
        contains: companyName,
        mode: 'insensitive',
      };
    }

    const totalCount = await prismaClient.reviews.count({
      where: whereClause,
    });

    const reviews = await prismaClient.reviews.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        created_at: 'desc',
      },
    });
    const data = reviews.map((review) => ({
      id: review.id,
      name: review.name,
      company: review.company,
      review: review.review,
    }));

    const result: ReviewListResponse = {
      data: data,
      meta: {
        page,
        limit: limit || null,
        totalPages: limit ? Math.ceil(totalCount / limit) : null,
        totalCount,
      },
    };
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch reviews');
  }
};

export const createReview = async (form: formData) => {
  try {
    if (!form.name || !form.company || !form.review) {
      throw new Error('All fields are required');
    }
    const review = await prismaClient.reviews.create({
      data: {
        name: form.name,
        company: form.company,
        review: form.review,
      },
    });
    revalidatePath('/admin/review');
    revalidatePath('/');
    return review;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to post review');
  }
};

export const deleteReview = async (id: number) => {
  try {
    const existingReview = await prismaClient.reviews.findUnique({
      where: { id },
    });
    if (!existingReview) {
      throw new Error('Review not found');
    }
    const deletedReview = await prismaClient.reviews.delete({
      where: { id },
    });
    revalidatePath('/admin/review');
    revalidatePath('/');
    return deletedReview;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete review');
  }
};

export const updateReview = async (id: number, form: formData) => {
  try {
    const existingReview = await prismaClient.reviews.findUnique({
      where: { id },
    });
    if (!existingReview) {
      throw new Error('Review not found');
    }
    const updatedReview = await prismaClient.reviews.update({
      where: { id },
      data: {
        name: form.name,
        company: form.company,
        review: form.review,
      },
    });
    revalidatePath('/admin/review');
    revalidatePath('/');
    return updatedReview;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update review');
  }
};
