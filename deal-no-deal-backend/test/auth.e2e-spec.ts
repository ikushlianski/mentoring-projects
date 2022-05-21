import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { initE2eApp } from 'test/init-e2e-app';
import * as util from 'util';

const exec = util.promisify(require('node:child_process').exec);

describe('Auth module', () => {
  const username = 'e2e_test_user';

  let app: INestApplication;

  beforeAll(async () => {
    app = await initE2eApp([AuthModule]);
  });

  describe('Sign Up', () => {
    it('should successfully sign the user up', async () => {
      const password = 'test passworD';

      const response = await request(app.getHttpServer())
        .post('/auth/cognito/signup')
        .send({ username, password })
        .expect(201);

      expect(response.body['$metadata'].httpStatusCode).toBe(200);

      const { error } = await exec(
        `aws cognito-idp admin-delete-user --user-pool-id ${process.env.COGNITO_USER_POOL_ID} --username ${username} --profile dnd-profile`,
      );

      if (error) {
        console.error(error);
      }
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
    await app.close();
  });
});
