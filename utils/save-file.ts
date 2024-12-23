import path from 'path';
import fs from 'fs';

export const dirFiles = (folder: string) => {
  return path.join(process.cwd(), 'public', 'uploads', folder);
};

export const saveFile = async (file: File, folder: string): Promise<string> => {
  const UPLOAD_DIR = dirFiles(folder);
  const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.name}`;
  const filePath = path.join(UPLOAD_DIR, fileName);

  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, fileBuffer);

  return `/uploads/${folder}/${fileName}`;
};
