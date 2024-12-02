import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prismaClient } from '@/lib/database/connection';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const existingUser = await prismaClient.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prismaClient.user.create({
    data: { name, email, password: hashedPassword },
  });

  return NextResponse.json(newUser, { status: 201 });
}
