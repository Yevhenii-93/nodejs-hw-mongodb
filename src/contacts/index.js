import path from 'node:path';
import * as fs from 'node:fs';

export const TEMP_UPLOAD_DIR = path.resolve('src', 'temp');
export const UPLOAD_DIR = path.resolve('src', 'uploads', 'photo');
export const SWAGGER_DOC = JSON.parse(
  fs.readFileSync(path.join('docs', 'swagger.json'), 'utf-8'),
);

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'CLOUD_KEY',
  API_SECRET: 'API_SECRET',
};
