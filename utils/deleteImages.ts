import { supabase } from '@/lib/database/supabase';

export const deleteImage = async (url: string) => {
  if (!url) return;

  const path = url.split('/storage/v1/object/public/uploads/')[1];

  if (!path) return;

  await supabase.storage
    .from('uploads')
    .remove([path]);
};
