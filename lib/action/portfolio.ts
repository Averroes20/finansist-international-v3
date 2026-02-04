'use server';
import { Prisma } from '@prisma/client';
import { prismaClient } from '../database/connection';
import { PortfolioListResponse } from '../type/portfolio';
import { revalidatePath } from 'next/cache';
import { uploadImage } from '@/utils/savebucket';
import { deleteImage } from '@/utils/deleteImages';

interface FetchPortfolioParams {
  page?: number;
  limit?: number;
  companyName?: string;
}

const buildWhereClause = ({ companyName }: FetchPortfolioParams): Prisma.PortfolioWhereInput => {
  const whereClause: Prisma.PortfolioWhereInput = {};

  if (companyName) {
    whereClause.companyName = {
      contains: companyName,
      mode: 'insensitive',
    };
  }

  return whereClause;
};

export async function getPortfolio({ page = 1, limit, companyName }: FetchPortfolioParams) {
  const skip = page && limit ? (page - 1) * limit : undefined;
  const whereClause = buildWhereClause({ companyName });

  try {
    const [totalCount, portfolios] = await Promise.all([
      prismaClient.portfolio.count({ where: whereClause }),
      prismaClient.portfolio.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
          companyName: true,
          software: true,
          country: true,
          description: true,
          company_logo: true,
          created_at: true,
          updated_at: true,
        },
      }),
    ]);

    const data = portfolios.map((portfolio) => ({
      id: portfolio.id,
      software: portfolio.software,
      country: portfolio.country,
      description: portfolio.description,
      companyName: portfolio.companyName,
      companyLogo: portfolio.company_logo,
      createdAt: portfolio.created_at,
      updatedAt: portfolio.updated_at,
    }));

    const meta = {
      page,
      limit: limit ?? 0,
      totalPages: limit ? Math.ceil(totalCount / limit) : null,
      totalCount,
    };

    return { data, meta } as PortfolioListResponse;
  } catch (error) {
    console.error('Failed to fetch portfolios:', error);
    throw new Error('Failed to fetch portfolios');
  }
}

export async function createPortfolio(formData: FormData) {
  const companyName = formData.get('companyName') as string;
  const software = formData.get('software') as string;
  const country = formData.get('country') as string;
  const description = formData.get('description') as string;

  if (!companyName || !country || !description) {
    throw new Error('All fields are required');
  }

  const companyLogo = formData.get('companyLogo') as File;
  const logoPath = companyLogo ? await uploadImage(companyLogo, 'portfolio') : '';

  try {
    const newPortfolio = await prismaClient.portfolio.create({
      data: {
        companyName: companyName,
        software,
        country,
        description,
        company_logo: logoPath,
      },
    });
    revalidatePath('/admin/portfolio');
    revalidatePath('/');
    return newPortfolio;
  } catch (error) {
    throw new Error(`Failed to create portfolio post: ${error instanceof Error ? error.message : error}`);
  }
}

export async function updatePortfolio(formData: FormData, portoID: number) {
  const companyName = formData.get('companyName') as string | null;
  const software = formData.get('software') as string | null;
  const country = formData.get('country') as string | null;
  const description = formData.get('description') as string | null;
  const company_logo = formData.get('company_logo') as File | null;


  const existingPortfolio = await prismaClient.portfolio.findUnique({ where: { id: portoID } });
  if (!existingPortfolio) throw new Error('Portfolio not found');

  let newLogo = existingPortfolio.company_logo;

  if (company_logo instanceof File && company_logo.size > 0) {
    try {
      newLogo = await uploadImage(company_logo, 'portfolio');
    } catch {
      throw new Error('Image upload failed');
    }
  }

  if (existingPortfolio.company_logo && existingPortfolio.company_logo !== newLogo) {
    await deleteImage(existingPortfolio.company_logo);
  }
  try {
  const updatedPortfolio = await prismaClient.portfolio.update({
    where: { id: portoID },
    data: {
      companyName: companyName ?? undefined,
      software: software ?? undefined,
      country: country ?? undefined,
      description: description ?? undefined,
      company_logo: newLogo ?? undefined,
    },
  });
    revalidatePath('/admin/portfolio');
    revalidatePath('/');
    return updatedPortfolio;
    } catch (error) {
    console.error('Failed to update portfolio post:', error);
    throw new Error('Failed to update portfolio post');
  }
}

export async function deletePortfolio(portoID: number) {
  try {
    const existingPortfolio = await prismaClient.portfolio.findUnique({
      where: { id: portoID },
    });

    if (!existingPortfolio) {
      throw new Error('Portfolio not found');
    }

    const deletePortfolio = await prismaClient.portfolio.delete({
      where: { id: portoID },
    });

    if (deletePortfolio.company_logo) {
      await deleteImage(deletePortfolio.company_logo);
    }

    revalidatePath('/admin/portfolio');
    revalidatePath('/');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete portfolio post');
  }
}
