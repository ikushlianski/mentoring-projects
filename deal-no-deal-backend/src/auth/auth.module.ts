import { Module } from '@nestjs/common';
import { AuthErrorHandler } from 'src/auth/auth-error.service';
import { CognitoService } from 'src/auth/cognito.service';
import { DbModule } from 'src/db/db.module';
import { AuthCore } from './auth.core';
import { AuthController } from './auth.controller';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [AuthCore, AuthErrorHandler, CognitoService],
  exports: [CognitoService, AuthCore],
})
export class AuthModule {}
