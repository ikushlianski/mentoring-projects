import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { initE2eApp } from 'test/init-e2e-app';

describe('Auth module', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await initE2eApp();
  });

  describe('Sign Up', () => {
    it(`Should not allow requests without username`, () => {
      return request(app.getHttpServer())
        .post('/auth/cognito/signup')
        .expect(400);
    });

    it(`Should not allow requests without password`, () => {
      return request(app.getHttpServer())
        .post('/auth/cognito/signup')
        .send({ username: 'test user' })
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
