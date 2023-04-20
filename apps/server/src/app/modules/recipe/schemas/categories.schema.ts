import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop()
  uid: string;

  @Prop()
  parent_uid: string;

  @Prop()
  order_flag: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
