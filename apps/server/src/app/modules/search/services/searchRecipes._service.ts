import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma._service';
import { Recipe } from '@prisma/client';

@Injectable()
export class SearchRecipesService {
  constructor(private prisma: PrismaService) {}

  async searchRecipes(searchTerm: string): Promise<Recipe[]> {
    return this.prisma.client.recipe.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive', // Case-insensitive
            },
          },
          {
            uid: {
              contains: searchTerm,
              mode: 'insensitive', // Case-insensitive
            },
          },
        ],
      },
    });
  }
}
