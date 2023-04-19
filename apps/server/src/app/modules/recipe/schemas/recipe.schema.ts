import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Recipe extends Document {
  @Prop({ type: [String] })
  categories: string[];

  @Prop()
  cook_time: string;

  @Prop()
  created: Date;

  @Prop()
  description: string;

  @Prop()
  difficulty: string;

  @Prop()
  directions: string;

  @Prop()
  on_favorites: boolean;

  @Prop()
  hash: string;

  @Prop()
  ingredients: string;

  @Prop()
  is_pinned: boolean;

  @Prop()
  in_trash: boolean;

  @Prop()
  image_url: string;

  @Prop()
  name: string;

  @Prop()
  notes: string;

  @Prop()
  nutritional_info: string;

  @Prop()
  on_grocery_list: boolean;

  @Prop()
  photo: string;

  @Prop()
  photo_large: string;

  @Prop()
  photo_hash: string;

  @Prop()
  photo_url: string;

  @Prop()
  prep_time: string;

  @Prop()
  rating: number;

  @Prop()
  scale: string;

  @Prop()
  servings: string;

  @Prop()
  source: string;

  @Prop()
  source_url: string;

  @Prop()
  total_time: string;

  @Prop()
  uid: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);

export const RecipeModel = mongoose.model<Recipe>('Recipe', RecipeSchema);
