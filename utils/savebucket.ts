import { supabase } from '@/lib/database/supabase';

export async function uploadImage(file: File, folder: string) {

  if (!file) {
    throw new Error('File is required');
  }

  if (!(file instanceof File)) {
    throw new Error('Invalid file type');
  }

  if (file.size === 0) {
    throw new Error('Empty file');
  }

  const fileExt = file.name?.split('.').pop();

  if (!fileExt) {
    throw new Error('File extension not found');
  }

  const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from('uploads')
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${filePath}`;
}
