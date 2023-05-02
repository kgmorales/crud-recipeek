import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PaprikaTokenDocument = PaprikaToken & Document;

@Schema({ collection: 'paprika_bearer_token' })
export class PaprikaToken extends Document {
  @Prop({ required: true, unique: true })
  token: string;
}

export const PaprikaTokenSchema = SchemaFactory.createForClass(PaprikaToken);

export const PaprikaTokenModel = mongoose.model<PaprikaToken>(
  'Paprika_Token',
  PaprikaTokenSchema
);
