import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const url = process.env.MONGODB_URL;
