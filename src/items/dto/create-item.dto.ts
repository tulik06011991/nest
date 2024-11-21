import { IsString, IsNotEmpty, IsNumber } from "class-validator";



export class CreateItemDto {
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;
}