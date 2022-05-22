import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { initE2eApp, removeTestUser } from 'test/e2e-utils';

describe('Auth module', () => {
  const username = 'e2e_test_user';

  let app: INestApplication;

  beforeAll(async () => {
    app = await initE2eApp([AuthModule]);

    // remove the e2e test user from DB if it was not removed for some reason
    try {
      await removeTestUser(username);
    } catch (e) {}
  });

  describe('Sign Up', () => {
    it('should successfully sign the user up', async () => {
      const password = 'test passworD';

      const response = await request(app.getHttpServer())
        .post('/auth/cognito/signup')
        .send({ username, password })
        .expect(201);

      await removeTestUser(username);

      expect(response.body['$metadata'].httpStatusCode).toBe(200);
    });

    it(`Should not allow requests without username`, () => {
      return request(app.getHttpServer())
        .post('/auth/cognito/signup')
        .expect(400);
    });

    it(`Should not allow requests with empty username`, () => {
      return request(app.getHttpServer())
        .post('/auth/cognito/signup')
        .send({ username: '', password: 'valid passworD' })
        .expect(400);
    });

    it(`Should not allow requests with username containing only spaces`, () => {
      return request(app.getHttpServer())
        .post('/auth/cognito/signup')
        .send({ username: '  ', password: 'valid passworD' })
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
    // remove the e2e test user from DB if it was not removed for some reason
    try {
      await removeTestUser(username);
    } catch (e) {
      // do nothing
    } finally {
      await app.close();
    }
  });
});
