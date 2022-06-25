import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/db/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  const mockDb = {
    user: { findMany: () => Promise.resolve([]) },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDb)
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return empty array', () => {
      expect(appController.getHello()).resolves.toEqual([]);
    });
  });
});
