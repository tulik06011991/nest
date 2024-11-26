import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode , Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express';
import { Throttle } from '@nestjs/throttler';

@Controller('auth') // '/auth' yo'li bilan kirish
export class AuthController {
 constructor(private readonly authService: AuthService){}

 @Post('register')
 async register(@Body() createAuthDto: CreateAuthDto ){
  return this.authService.Register(createAuthDto)
 }

 @Post('login')

 @HttpCode(200)
  // Javob kodi 200 bo'lishi kerak (to'g'ri kirish uchun)
 async login(@Body() updateAuthDto: UpdateAuthDto, @Res() res: Response) {
   const { message, accessToken } = await this.authService.Login(updateAuthDto, res);
   return res.json({ message, accessToken });
 }
 
}
