'use server';
import { prismaClient } from '@/lib/database/connection';

interface formData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export async function register(form: formData) {
  try {
    if (!(form instanceof FormData)) {
      throw new Error('Invalid form data');
    }
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      throw new Error('All fields are required');
    }

    const existingUser = await prismaClient.user.findUnique({
      where: { email: form.email },
    });

    if (existingUser) {
      throw new Error('email already exists');
    }

    await prismaClient.user.create({
      data: {
        name: form.name,
        email: form.email,
        password: form.password,
      },
    });

    return {
      success: true,
      error: null,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === 'email already exists') {
      return {
        success: false,
        error: 'User already exists',
      };
    }
    throw new Error('Failed to register');
  }
}
