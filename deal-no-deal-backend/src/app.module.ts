import { Module } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { GameController } from './game/game.controller';
import { GameService } from './game/game.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { GameModule } from './game/game.module';

@Module({
  imports: [DbModule, UserModule, GameModule],
  controllers: [AppController, GameController, AuthController],
  providers: [AppService, GameService, AuthService, DbService],
})
export class AppModule {}
