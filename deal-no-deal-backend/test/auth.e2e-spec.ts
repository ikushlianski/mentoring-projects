import { AuthModule } from 'src/auth/auth.module';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

describe('Cats', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('Sign Up', () => {
    it(`Should not allow requests without username`, () => {
      return request(app.getHttpServer()).post('/cognito/signup').expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
