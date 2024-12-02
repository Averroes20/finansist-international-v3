import { prismaClient } from '@/lib/database/connection';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');

    const page = pageParam ? parseInt(pageParam, 10) : undefined;
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;
    const skip = page && limit ? (page - 1) * limit : undefined;

    const companyName = searchParams.get('companyName') || undefined;

    const whereClause: Prisma.PortfolioWhereInput = {};
    if (companyName) {
      whereClause.company_name = {
        contains: companyName,
        mode: 'insensitive',
      };
    }

    const totalCount = await prismaClient.portfolio.count({ where: whereClause });

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
      ...portfolio,
      companyName: portfolio.company_name,
      companyLogo: portfolio.company_logo,
      createdAt: portfolio.created_at.toISOString(),
      updatedAt: portfolio.updated_at.toISOString(),
    }));

    return NextResponse.json({
      data: data,
      meta: {
        page: page || null,
        limit: limit || null,
        totalPages: limit ? Math.ceil(totalCount / limit) : null,
        totalCount: totalCount,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}
