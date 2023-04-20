import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'recipe_ids' })
export class RecipeIds extends Document {
  @Prop({ required: true })
  uid: string;

  @Prop({ required: true })
  hash: string;
}

export const RecipeIdsSchema = SchemaFactory.createForClass(RecipeIds);
