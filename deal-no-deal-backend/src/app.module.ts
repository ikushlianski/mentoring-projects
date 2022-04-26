import { Module } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { GameModule } from './game/game.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [DbModule, GameModule, SettingsModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, DbService],
})
export class AppModule {}
