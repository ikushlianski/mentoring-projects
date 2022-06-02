import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthErrorHandler } from 'src/auth/auth-error.service';
import { DbService } from 'src/db/db.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { GameModule } from './game/game.module';
import { SettingsModule } from './settings/settings.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DbModule,
    GameModule,
    SettingsModule,
    AuthModule,
    ConfigModule.forRoot({
      expandVariables: true,
    }),
  ],

  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, AuthErrorHandler, DbService],
})
export class AppModule {}
