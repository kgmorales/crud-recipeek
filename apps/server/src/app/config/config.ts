import { PrismaClient } from '@prisma/client';

export default () => ({
  prisma: {
    client: new PrismaClient(),
    dbURL: process.env.DATABASE_URL,
  },
  paprika: {
    baseURL: `https://www.paprikaapp.com/api/v2`,
    bearerToken: process.env.PAPRIKA_BEARER_TOKEN,
    password: process.env.PAPRIKA_PASS,
    user: process.env.PAPRIKA_USER,
  },
  port: process.env.PORT || 3000,
});
