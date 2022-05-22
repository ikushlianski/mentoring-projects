import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import * as util from 'util';

const exec = util.promisify(require('node:child_process').exec);

let app: INestApplication;

export const initE2eApp = async (modules: any[]) => {
  const moduleRef = await Test.createTestingModule({
    imports: [...modules, ConfigModule.forRoot()],
  }).compile();

  app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());

  return await app.init();
};

export const removeTestUser = async (username: string) => {
  await exec(
    `aws cognito-idp admin-delete-user --user-pool-id ${process.env.COGNITO_USER_POOL_ID} --username ${username} --profile dnd-profile`,
  );
};
