import { IsString, IsEmail, IsNotEmpty, MinLength, Matches, ValidateIf } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password should be at least 8 characters long' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must contain at least one uppercase letter, one number, and one special character',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  // password va confirmPassword tengligini tekshirish
  @ValidateIf(o => o.password === o.confirmPassword)
  @IsString()
  @IsNotEmpty({ message: 'Confirm Password must be the same as password' })
  confirmPasswordMatch() {
    return this.password === this.confirmPassword;
  }
}
