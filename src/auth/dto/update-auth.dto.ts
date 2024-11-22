import { PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {

    @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string; 
}
