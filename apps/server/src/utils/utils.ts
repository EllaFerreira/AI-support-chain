import * as fs from 'fs';

export const loadFile = (filePath: string): string => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(error);
    return null;
  }
};
