import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';

let app: INestApplication;

export const initE2eApp = async (modules: any[]) => {
  const moduleRef = await Test.createTestingModule({
    imports: [...modules, ConfigModule.forRoot()],
  }).compile();

  app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());

  return await app.init();
};
