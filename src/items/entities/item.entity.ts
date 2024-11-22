import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Item extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    age: number;

    @Prop({ required: false })
    description?: string; // Optional field, no need for `required: false` since it's optional
}

export const ItemSchema = SchemaFactory.createForClass(Item);
