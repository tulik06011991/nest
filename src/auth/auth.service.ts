import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './entities/auth.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Response } from 'express'; // import express Response

dotenv.config(); // .env faylini yuklash

@Injectable()
export class AuthService {
  constructor(@InjectModel("Auth") private readonly AuthModel: Model<Auth>) {}

  // Ro'yxatdan o'tish
  async Register(createAuthDto: CreateAuthDto): Promise<{ message: string }> {
    const { firstName, lastName, email, password } = createAuthDto;
    const user = await this.AuthModel.findOne({ email }).exec();
    
    if (user) {
      throw new ConflictException(`Bu emaildan avval ro'yxatdan o'tilgan`);
    }

    // Parolni shifrlash
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new this.AuthModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await newUser.save();

    return { message: 'Foydalanuvchi muvaffaqiyatli ro\'yxatdan o\'tdi' };
  }

  // Kirish
  async Login(updateAuthDto: UpdateAuthDto, res: Response): Promise<{ message: string, accessToken: string }> {
    const { email, password } = updateAuthDto;

    const user = await this.AuthModel.findOne({ email }).exec();
    
    if (!user) {
      throw new UnauthorizedException(`Invalid credentials`);
    }

    // Parolni tekshirish
    const comparePassword = await bcrypt.compare(password, user.password); // Await qo'shish
    if (!comparePassword) {
      throw new UnauthorizedException(`Invalid credentials`);
    }

    // JWT payload va access token yaratish
    const payload = { sub: user._id, email: user.email };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' }); // 15 daqiqa uchun access token
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }); // 7 kunlik refresh token

    // Refresh tokenni cookie'ga yozish
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,  // XSS hujumlaridan himoya qilish
      secure: process.env.NODE_ENV === 'production',  // HTTPS talab etiladi
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 kunlik maxsus vaqt
    });

    return {
      message: 'Successfully logged in',
      accessToken, // Access tokenni frontendga yuborish
    };
  }
}
