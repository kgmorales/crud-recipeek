import { Injectable } from '@nestjs/common';
import { Category, Recipe } from '@prisma/client';
import { PrismaService } from './providers/prisma._provider';
// import { Recipe } from '@prisma/client';

interface Home {
  categories: Category[];
  favorites: Recipe[];
  recent: Recipe[];
}

@Injectable()
export class PageService {
  constructor(private prisma: PrismaService) {}

  async getHome(): Promise<Home> {
    const categories = await this.prisma.client.category.findMany({
      where: { parent_uid: null },
    });

    const favorites = await this.prisma.client.recipe.findMany({
      where: { on_favorites: true },
      take: 6,
    });

    const recent = await this.prisma.client.recipe.findMany({
      orderBy: {
        created: 'desc',
      },
      take: 9,
    });

    return { categories, favorites, recent };
  }
}
