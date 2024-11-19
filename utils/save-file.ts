import path from 'path';
import fs from 'fs';

export const saveFile = async (file: File, folder: string): Promise<string> => {
  const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.name}`;
  const filePath = path.join(path.join(process.cwd(), 'public', folder), fileName);
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, fileBuffer);
  return `/${folder}/${fileName}`;
};
