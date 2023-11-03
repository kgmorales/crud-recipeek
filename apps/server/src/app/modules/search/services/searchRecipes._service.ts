import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma._service';
import { Recipe } from '@prisma/client';

@Injectable()
export class SearchRecipesService {
  constructor(private prisma: PrismaService) {}

  async searchRecipes(
    searchTerm: string,
    excludeUids: string[],
  ): Promise<Recipe[]> {
    const recipes = await this.prisma.client.recipe.findMany({
      where: {
        AND: [
          {
            uid: {
              notIn: excludeUids,
            },
          },
          {
            OR: [
              {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive', // Case-insensitive
                },
              },
            ],
          },
        ],
      },
    });

    return recipes;
  }
}
