import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthErrorHandler } from 'src/auth/auth-error.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { AuthController } from './auth/auth.controller';
import { GameModule } from './game/game.module';
import { SettingsModule } from './settings/settings.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    DbModule,
    GameModule,
    SettingsModule,
    ConfigModule.forRoot({
      expandVariables: true,
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthErrorHandler],
})
export class AppModule {}
