import { IsString, IsNotEmpty, IsNumber, Min, Max, IsOptional } from "class-validator";






export class CreateItemDto {

    @IsNotEmpty()
    @IsString()
    @Max(60)
    @Min(3)
    name: string

    @IsNotEmpty()
    @IsString()
    @Max(60)
    @Min(3)
    @IsNumber()
    age:number
    @IsOptional()
    @IsString()
    description: string

}
