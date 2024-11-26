// src/auth/auth.guard.ts
import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';  // SetMetadata ni import qildik
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// JWT Strategy - Foydalanuvchining kimligini tekshirish
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // Maxfiy kalit
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}

// JWT Auth Guard - JWT tokenni tekshirish
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// Role Guard - Foydalanuvchining rolini tekshirish
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Agar rol kerakli bo'lmasa, barcha foydalanuvchilarga ruxsat
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return requiredRoles.some((role) => user.role?.includes(role)); // Foydalanuvchining roli mos kelsa ruxsat beradi
  }
}

// Roles Decorator - Foydalanuvchidan talab qilinadigan ro'llarni belgilash
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);   // SetMetadata ni import qilganimizga e'tibor bering
