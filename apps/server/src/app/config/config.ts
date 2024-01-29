import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  prisma: {
    client: new PrismaClient(),
    dbURL: process.env.DATABASE_URL,
  },
  paprika: {
    baseURL: `https://www.paprikaapp.com/api/v2`,
    bearerToken: process.env.PAPRIKA_BEARER_TOKEN,
    jwtSecret: process.env.JWT_SECRET,
    password: process.env.PAPRIKA_PASS,
    user: process.env.PAPRIKA_USER,
  },
  spotify: {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectURI: process.env.SPOTIFY_REDIRECT_URI,
  },
  port: process.env.PORT || 8080,
});
