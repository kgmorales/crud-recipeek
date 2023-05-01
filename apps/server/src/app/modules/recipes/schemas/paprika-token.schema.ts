import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaprikaTokenDocument = PaprikaToken & Document;

@Schema()
export class PaprikaToken extends Document {
  @Prop({ required: true, unique: true })
  token: string;
}

export const PaprikaTokenSchema = SchemaFactory.createForClass(PaprikaToken);
