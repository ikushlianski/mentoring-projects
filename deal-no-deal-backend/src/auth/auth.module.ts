import { Module } from '@nestjs/common';
import { AuthErrorHandler } from 'src/auth/auth-error.service';
import { DbModule } from 'src/db/db.module';
import { CognitoService } from 'src/auth/cognito.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [AuthErrorHandler, CognitoService],
  exports: [CognitoService],
})
export class AuthModule {}
