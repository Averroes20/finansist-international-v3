'use server';
import { Prisma } from '@prisma/client';
import { prismaClient } from '../database/connection';
import path from 'path';
import fs from 'fs';
import { PortfolioListResponse } from '../type/portfolio';
import { revalidatePath } from 'next/cache';
import { deleteFile } from '@/utils/delete-file';
import { dirFiles, saveFile } from '@/utils/save-file';

const UPLOAD_DIR = dirFiles('portfolio');

interface FetchPortfolioParams {
  page?: number;
  limit?: number;
  companyName?: string;
}

const buildWhereClause = ({ companyName }: FetchPortfolioParams): Prisma.PortfolioWhereInput => {
  const whereClause: Prisma.PortfolioWhereInput = {};

  if (companyName) {
    whereClause.company_name = {
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
          company_name: true,
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
      companyName: portfolio.company_name,
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
  const logoPath = companyLogo ? await saveFile(companyLogo, 'portfolio') : '';

  try {
    const newPortfolio = await prismaClient.portfolio.create({
      data: {
        company_name: companyName,
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

export async function updatePortfolio(formData: FormData, id: number) {
  const company_name = formData.get('company_name') as string | null;
  const software = formData.get('software') as string | null;
  const country = formData.get('country') as string | null;
  const description = formData.get('description') as string | null;
  const company_logo = formData.get('company_logo') as File | null;

  try {
    const existingPortfolio = await prismaClient.portfolio.findUnique({ where: { id: id } });
    if (!existingPortfolio) throw new Error('Portfolio not found');

    let logoPath = existingPortfolio.company_logo;

    if (company_logo) {
      const oldFilePath = path.join(UPLOAD_DIR, path.basename(existingPortfolio.company_logo as string));
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      logoPath = await saveFile(company_logo, 'portfolio');
    }

    const updatedPortfolio = await prismaClient.portfolio.update({
      where: { id },
      data: {
        company_name: company_name ?? undefined,
        software: software ?? undefined,
        country: country ?? undefined,
        description: description ?? undefined,
        company_logo: logoPath ?? undefined,
      },
    });

    revalidatePath('/admin/portfolio');
    revalidatePath('/');
    return updatedPortfolio;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update blog post');
  }
}

export async function deletePortfolio(id: number) {
  try {
    const existingPortfolio = await prismaClient.portfolio.findUnique({
      where: { id },
    });

    if (!existingPortfolio) {
      throw new Error('Portfolio not found');
    }

    await prismaClient.portfolio.delete({
      where: { id },
    });

    if (existingPortfolio.company_logo) {
      const filePath = path.join(UPLOAD_DIR, path.basename(existingPortfolio.company_logo));
      deleteFile(filePath);
    }

    revalidatePath('/admin/portfolio');
    revalidatePath('/');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete portfolio post');
  }
}
