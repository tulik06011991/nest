import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  MinLength,
  IsPositive,
} from "class-validator";
import { Transform } from "class-transformer";

// Mongoose schema
@Schema()
export class Product extends Document {
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty({ message: "Product name is required." })
  @MaxLength(100, { message: "Product name cannot be longer than 100 characters." })
  @MinLength(3, { message: "Product name must be at least 3 characters long." })
  name: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty({ message: "Product description is required." })
  @MaxLength(500, { message: "Product description cannot be longer than 500 characters." })
  description: string;

  @Prop({ required: true })
  @IsNumber()
  @IsPositive({ message: "Price must be a positive number." })
  price: number;

  @Prop({ required: true })
  @IsNumber()
  @IsPositive({ message: "Quantity must be a positive number." })
  quantity: number;

  @Prop({ required: true })
  @Transform(({ value }) => value?.trim()) // Trim spaces from the string
  @IsString()
  @MaxLength(50)
  category: string;
}

// Schema yaratish
export const ProductSchema = SchemaFactory.createForClass(Product);
