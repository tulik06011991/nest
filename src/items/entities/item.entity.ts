import { Document } from "mongoose";
import {Schema, SchemaFactory, Prop} from '@nestjs/mongoose'


@Schema()
export class Items extends Document {
    @Prop({required: true})
    name: string
    @Prop({required: true})
    age: string
}

export const ItemsSchema = SchemaFactory.createForClass(Items)