import { PrismaClient, PaprikaConfig } from '@prisma/client';
import fetch from 'node-fetch';

let paprikaTokenCache: string | null = null;

export const getPaprikaConfig = (token?: string): PaprikaConfig => ({
  id: 0,
  baseURL: process.env.PAPRIKA_BASE_URL!,
  bearerToken: token || '',
  user: process.env.PAPRIKA_USER!,
  password: process.env.PAPRIKA_PASSWORD!,
});

export const getToken = async (): Promise<string> => {
  if (paprikaTokenCache) {
    try {
      await checkTokenValidity(paprikaTokenCache);
      return paprikaTokenCache;
    } catch (error) {
      paprikaTokenCache = await refreshToken();
    }
  }
  return '';
};

const checkTokenValidity = async (token: string): Promise<void> => {
  const config = getPaprikaConfig(token);
  await fetch(`${config.baseURL}/sync/status/`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
};

const refreshToken = async (): Promise<string> => {
  const config = getPaprikaConfig();
  const response = await fetch(`${config.baseURL}/account/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: config.user,
      password: config.password,
    }),
  });

  const data: any = await response.json();
  return data.result.token;
};

export const buildAuthConfig = async (): Promise<PaprikaConfig> => {
  const token = await getToken();
  const config = getPaprikaConfig(token);
  config.bearerToken = token;
  return config;
};
