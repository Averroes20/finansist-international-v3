'use server';
import { prismaClient } from '@/lib/database/connection';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { UserListResponse } from '../type/user';
import { TypeEditUser, validationChangePassword, validationRegister } from '../validation/schema-register';
import { revalidatePath } from 'next/cache';

interface FetchUsersParams {
  page?: number;
  limit?: number;
  username?: string;
}

export async function register(form: FormData) {
  try {
    const validationFiled = validationRegister.safeParse(Object.fromEntries(form.entries()));

    if (!validationFiled.success) {
      return {
        success: false,
        error: validationFiled.error.errors[0].message,
      };
    }
    const { name, email, password, role } = validationFiled.data;
    const existingUser = await prismaClient.user.findUnique({
      where: { email: validationFiled.data.email },
    });

    if (existingUser) {
      return {
        success: false,
        error: 'User already exists',
      };
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
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

export async function getUser({ username, page = 1, limit }: FetchUsersParams) {
  try {
    const skip = page && limit ? (page - 1) * limit : undefined;

    const whereClause: Prisma.UserWhereInput = {};

    if (username) {
      whereClause.name = {
        contains: username,
        mode: 'insensitive',
      };
    }

    const totalCount = await prismaClient.user.count({
      where: whereClause,
    });

    const user = await prismaClient.user.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        created_at: 'desc',
      },
    });

    const data = user.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }));

    const result: UserListResponse = {
      data: data,
      meta: {
        page,
        limit: limit ?? null,
        totalPages: limit ? Math.ceil(totalCount / limit) : null,
        totalCount,
      },
    };

    return result;
  } catch (error) {
    throw new Error('Failed to get user', error as Error);
  }
}

export async function deleteUser(id: number) {
  try {
    const user = await prismaClient.user.delete({
      where: { id },
    });
    return user;
  } catch (error) {
    throw new Error('Failed to delete user', error as Error);
  }
}

export async function updateUser(data: TypeEditUser) {
  try {
    const { name, email, role, id } = data;

    const userToUpdate = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!userToUpdate) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    await prismaClient.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(role && { role }),
      },
    });
    revalidatePath('/admin/users');
    return {
      success: true,
      error: null,
    };
  } catch (error) {
    throw new Error(`Failed to update user: ${error as Error}`);
  }
}

export async function changePassword(id: number, form: FormData) {
  try {
    const validationField = validationChangePassword.safeParse(Object.fromEntries(form.entries()));

    if (!validationField.success) {
      return {
        success: false,
        error: validationField.error.errors[0].message,
      };
    }

    const { currentPassword, newPassword } = validationField.data;

    const user = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    const isPasswordValid = bcrypt.compareSync(currentPassword, user.password); // Replace with compareSync if needed

    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Current password is incorrect',
      };
    }

    const hashNewPassword = bcrypt.hashSync(newPassword, 10);

    await prismaClient.user.update({
      where: { id },
      data: {
        password: hashNewPassword,
      },
    });

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    throw new Error(`Failed to change password: ${error as Error}`);
  }
}
