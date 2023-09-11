import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  public client: PrismaClient;

  constructor() {
    this.client = new PrismaClient({ errorFormat: 'pretty' });
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
