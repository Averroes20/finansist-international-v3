import { prismaClient } from '@/lib/database/connection';
import { runCors } from '@/lib/middleware/cors';
import { Prisma } from '@prisma/client';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'portfolio');

export async function POST(req: NextRequest) {
  try {
    await runCors(req);
    const formData = await req.formData();
    const companyName = formData.get('companyName') as string;
    const software = formData.get('software') as string;
    const country = formData.get('country') as string;
    const description = formData.get('description') as string;

    if (!companyName || !country || !description) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const companyLogo = formData.get('companyLogo') as File;
    let logoPath = '';

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
        return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
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

    return NextResponse.json(newPortfolio, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}

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
