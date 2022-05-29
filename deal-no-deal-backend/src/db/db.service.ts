import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DbService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    console.log('db url', process.env.DATABASE_URL);
    await this.$connect();
    console.log('connected successfully');
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

// export class DbService {}
