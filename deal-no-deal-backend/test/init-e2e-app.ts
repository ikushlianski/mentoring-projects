import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthModule } from 'src/auth/auth.module';

let app: INestApplication;

export const initE2eApp = async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AuthModule],
  }).compile();

  app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());

  return await app.init();
};
