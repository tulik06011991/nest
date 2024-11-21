import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class  CreateItemDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    age: number
}