import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdateItemDto {
    @IsOptional() // Makes the name field optional
    @IsString()
    name?: string; // Use ? to indicate the field is optional

    @IsOptional() // Makes the age field optional
    @IsNumber()
    age?: number; // Use ? to indicate the field is optional
}
