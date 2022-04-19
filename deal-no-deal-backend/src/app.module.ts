import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { GameController } from './game/game.controller';
import { GameService } from './game/game.service';

@Module({
  imports: [DbModule, UserModule],
  controllers: [AppController, GameController],
  providers: [AppService, GameService],
})
export class AppModule {}
