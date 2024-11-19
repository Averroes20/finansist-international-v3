export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Hapus karakter spesial
    .replace(/\s+/g, '-') // Ganti spasi dengan "-"
    .replace(/-+/g, '-'); // Ganti tanda hubung berturut-turut dengan satu tanda
}
