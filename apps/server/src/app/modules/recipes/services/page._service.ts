import { Injectable } from '@nestjs/common';
import { Category, Recipe } from '@prisma/client';
import { PrismaService } from './providers/prisma._provider';
// import { Recipe } from '@prisma/client';

interface Home {
  categories: Category[];
  favorites: Recipe[];
  recents: Recipe[];
}

@Injectable()
export class PageService {
  constructor(private prisma: PrismaService) {}

  async getHome(): Promise<Home> {
    const categories = await this.prisma.client.category.findMany({
      where: { parent_uid: null },
    });

    const favorites = await this.prisma.client.recipe.findMany({
      where: { on_favorites: true, in_trash: false },
      take: 6,
    });

    const recents = await this.prisma.client.recipe.findMany({
      where: { in_trash: false },
      orderBy: {
        created: 'desc',
      },
      take: 6,
    });

    return { categories, favorites, recents };
  }
}
