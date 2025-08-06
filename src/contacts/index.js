import path from 'node:path';

export const TEMP_UPLOAD_DIR = path.resolve('src', 'temp');
export const UPLOAD_DIR = path.resolve('src', 'uploads', 'photo');

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};
