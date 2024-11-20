import { prismaClient } from '@/lib/database/connection';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'portfolio');
type Props = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, { params }: Props) {
  const portfolioId = parseInt(params.id, 10);
  try {
    const portfolio = await prismaClient.portfolio.findUnique({
      where: { id: portfolioId },
    });
    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }
    return NextResponse.json(portfolio, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  const portfolioId = parseInt(params.id, 10);
  try {
    const existingPortfolio = await prismaClient.portfolio.findUnique({
      where: { id: portfolioId },
    });
    if (!existingPortfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }
    const deletedPortfolio = await prismaClient.portfolio.delete({
      where: { id: portfolioId },
    });
    if (deletedPortfolio.company_logo) {
      const filePath = path.join(UPLOAD_DIR, path.basename(deletedPortfolio.company_logo));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    return NextResponse.json(deletedPortfolio, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete portfolio' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Props) {
  const portfolioId = parseInt(params.id, 10);
  try {
    const formData = await req.formData();
    const companyName = formData.get('companyName') as string | null;
    const software = formData.get('software') as string | null;
    const country = formData.get('country') as string | null;
    const description = formData.get('description') as string | null;
    const companyLogo = formData.get('companyLogo') as File | null;

    const existingPortfolio = await prismaClient.portfolio.findUnique({
      where: { id: portfolioId },
    });

    if (!existingPortfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    let companyLogoPath = existingPortfolio.company_logo;

    if (companyLogo) {
      try {
        if (existingPortfolio.company_logo) {
          const oldFilePath = path.join(UPLOAD_DIR, path.basename(existingPortfolio.company_logo));
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${companyLogo.name}`;
        companyLogoPath = `/portfolio/${fileName}`;
        const filePath = path.join(UPLOAD_DIR, fileName);

        const fileBuffer = Buffer.from(await companyLogo.arrayBuffer());
        fs.writeFileSync(filePath, fileBuffer);
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
      }
    }

    const updatedPortfolio = await prismaClient.portfolio.update({
      where: { id: portfolioId },
      data: {
        company_name: companyName || undefined,
        software: software,
        country: country || undefined,
        description: description || undefined,
        company_logo: companyLogoPath || undefined,
      },
    });
    return NextResponse.json(updatedPortfolio, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
  }
}
