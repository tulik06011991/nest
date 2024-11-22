import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './entities/auth.entity';

@Module({
  imports: [
      // MongoDB ulanish URL'sini ko'rsating
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },  // Schema va modelni to'g'ri ulash
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
