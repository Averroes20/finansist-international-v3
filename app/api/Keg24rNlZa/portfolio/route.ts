import { prismaClient } from '@/lib/database/connection';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'portfolio');

export async function POST(req: NextRequest) {
  try {
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
