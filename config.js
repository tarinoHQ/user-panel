import path from 'path';
export const host = 'localhost';
export const port = process.env.PORT || 5000;
export const staticPath = path.resolve(__dirname, 'dist');
export const rootDir = path.resolve(__dirname, '..');
