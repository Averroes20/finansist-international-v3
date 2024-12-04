'use server';
import { Prisma } from '@prisma/client';
import { prismaClient } from '../database/connection';
import path from 'path';
import fs from 'fs';
import { PortfolioListResponse } from '../type/portfolio';
import { revalidatePath } from 'next/cache';

interface FetchPortfolioParams {
  page?: number;
  limit?: number;
  companyName?: string;
}
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'portfolio');

export async function getPortfolio({ page = 1, limit, companyName }: FetchPortfolioParams) {
  try {
    const skip = page && limit ? (page - 1) * limit : undefined;

    const whereClause: Prisma.PortfolioWhereInput = {};

    if (companyName) {
      whereClause.company_name = {
        contains: companyName,
        mode: 'insensitive',
      };
    }

    const totalCount = await prismaClient.portfolio.count({
      where: whereClause,
    });

    const portfolios = await prismaClient.portfolio.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        created_at: 'desc',
      },
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
    });

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

    const result: PortfolioListResponse = {
      data,
      meta,
    };

    return result;
  } catch (error) {
    console.error('Failed to fetch portfolios:', error);
    throw new Error('Failed to fetch portfolios');
  }
}

export const createPortfolio = async (formData: FormData) => {
  const companyName = formData.get('companyName') as string;
  const software = formData.get('software') as string;
  const country = formData.get('country') as string;
  const description = formData.get('description') as string;

  if (!companyName || !country || !description) {
    throw new Error('All fields are required');
  }

  let logoPath = '';
  const companyLogo = formData.get('companyLogo') as File;

  if (companyLogo) {
    try {
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${companyLogo.name}`;
      logoPath = path.join(UPLOAD_DIR, fileName);

      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      }

      const fileBuffer = Buffer.from(await companyLogo.arrayBuffer());
      fs.writeFileSync(logoPath, fileBuffer);

      logoPath = `/portfolio/${fileName}`;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to upload logo');
    }
  }

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
};

export async function updatePortfolio(formData: FormData, id: number) {
  try {
    const company_name = formData.get('company_name') as string | null;
    const software = formData.get('software') as string | null;
    const country = formData.get('country') as string | null;
    const description = formData.get('description') as string | null;
    const company_logo = formData.get('company_logo') as File | null;

    const existingPortfolio = await prismaClient.portfolio.findUnique({
      where: { id },
    });

    if (!existingPortfolio) {
      throw new Error('Portfolio not found');
    }

    let logoPath = existingPortfolio.company_logo;

    if (company_logo) {
      try {
        if (existingPortfolio.company_logo) {
          const oldFilePath = path.join(UPLOAD_DIR, path.basename(existingPortfolio.company_logo));
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${company_logo.name}`;
        logoPath = `/portfolio/${fileName}`;

        const fileBuffer = Buffer.from(await company_logo.arrayBuffer());
        fs.writeFileSync(path.join(UPLOAD_DIR, fileName), fileBuffer);
      } catch (error) {
        console.error('File upload failed:', error);
        throw new Error('Failed to upload logo image');
      }
    }

    const updatedPortfolio = await prismaClient.portfolio.update({
      where: { id },
      data: {
        company_name: company_name || undefined,
        software: software || undefined,
        country: country || undefined,
        description: description || undefined,
        company_logo: logoPath || undefined,
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
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    revalidatePath('/admin/portfolio');
    revalidatePath('/');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete portfolio post');
  }
}
