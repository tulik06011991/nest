import { PartialType } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';
import { IsNotEmpty, IsNumber, Max, Min, IsOptional, IsString } from 'class-validator';

export class UpdateItemDto extends PartialType(CreateItemDto) {
    // If you want to ensure name is required for updates, add validation
    @IsNotEmpty()
    @IsString()
    @Max(60)
    @Min(3)
    name: string;

    // Apply Min and Max to the age field correctly and remove @IsString()
    @IsNotEmpty()
    @IsNumber()
    @Min(18)
    @Max(100)
    age: number;

    // description is optional
    @IsOptional()
    @IsString()
    description?: string;
}
