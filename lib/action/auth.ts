'use server';
import { prismaClient } from '@/lib/database/connection';
import validationRegister from '../validation/schema-register';
import { hashSync } from 'bcrypt-ts';

export async function register(form: FormData) {
  try {
    const validationFiled = validationRegister.safeParse(Object.fromEntries(form.entries()));

    if (!validationFiled.success) {
      return {
        success: false,
        error: validationFiled.error.errors[0].message,
      };
    }
    const { name, email, password } = validationFiled.data;
    const existingUser = await prismaClient.user.findUnique({
      where: { email: validationFiled.data.email },
    });

    if (existingUser) {
      return {
        success: false,
        error: 'User already exists',
      };
    }

    const hashPassword = hashSync(password, 10);

    await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
      },
    });

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    throw new Error('Failed to register', error as Error);
  }
}
