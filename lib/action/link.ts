'use server';
import { revalidatePath } from 'next/cache';
import { prismaClient } from '../database/connection';
import { TypeLink } from '../validation/schema-form-link';

export async function getLinks() {
  try {
    const links = await prismaClient.linkSocialMedia.findMany();
    return links;
  } catch (error) {
    console.error('Error fetching links:', error);
    throw new Error('Failed to fetch links');
  }
}

export async function updateLink(data: TypeLink) {
  try {
    await prismaClient.linkSocialMedia.update({
      where: { id: data.id },
      data: {
        label: data.label,
        url: data.url,
      },
    });
    revalidatePath('/admin/links');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update link');
  }
}
