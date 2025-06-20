'use server';
import { revalidatePath } from 'next/cache';
import { prismaClient } from '@/lib/database/connection';
import { TypeLink } from '@/lib/validation/schema-form-link';

export async function getLinks() {
  try {
    return await prismaClient.linkSocialMedia.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  } catch (error) {
    throw new Error('❌ Failed to fetch links', error as Error);
  }
}

export async function updateLink(data: TypeLink) {
  try {
    await prismaClient.linkSocialMedia.update({
      where: { id: data.id },
      data: {
        label: data.label,
        url: data.url,
        active: data.active,
      },
    });
    revalidatePath('/admin/links');
  } catch (error) {
    throw new Error('❌ Failed to update link', error as Error);
  }
}
