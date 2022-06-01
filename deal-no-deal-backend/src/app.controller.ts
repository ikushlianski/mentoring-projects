import { Controller, Get } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any> {
    // const client = new MongoClient(process.env.DATABASE_URL);
    //
    // // Database Name
    // const dbName = process.env.MONGO_INITDB_DATABASE;
    //
    // await client.connect();
    // const db = client.db(dbName);
    // const users = db.collection('user');
    //
    // console.log({ users });

    return this.appService.getHello();
  }
}
