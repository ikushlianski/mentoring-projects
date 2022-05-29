import { Test, TestingModule } from '@nestjs/testing';
import { DbService } from 'src/db/db.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  const mockPrisma = {
    user: { findMany: () => [] },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, DbService],
    })
      .overrideProvider('DbService')
      .useValue(mockPrisma)
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
