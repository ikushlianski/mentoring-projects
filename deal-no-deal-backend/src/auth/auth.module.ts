import { Module } from '@nestjs/common';
import { AuthErrorHandler } from 'src/auth/auth-error.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthErrorHandler],
})
export class AuthModule {}
