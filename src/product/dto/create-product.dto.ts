import {
    IsString,
    IsNotEmpty,
    IsNumber,
    MaxLength,
    MinLength,
    IsPositive,
  } from 'class-validator';
  import { Transform } from 'class-transformer';
  
  export class CreateProductDto {
    @IsString()
    @IsNotEmpty({ message: 'Product name is required.' })
    @MaxLength(100, { message: 'Product name cannot be longer than 100 characters.' })
    @MinLength(3, { message: 'Product name must be at least 3 characters long.' })
    name: string;
  
    @IsString()
    @IsNotEmpty({ message: 'Product description is required.' })
    @MaxLength(500, { message: 'Product description cannot be longer than 500 characters.' })
    description: string;
  
    @IsNumber()
    @IsPositive({ message: 'Price must be a positive number.' })
    price: number;
  
    @IsNumber()
    @IsPositive({ message: 'Quantity must be a positive number.' })
    quantity: number;
  
    @Transform(({ value }) => value?.trim())  // Trimming spaces from the string
    @IsString()
    @MaxLength(50)
    category: string;
  }
  
