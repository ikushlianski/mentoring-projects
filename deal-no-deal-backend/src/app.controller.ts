import { Controller, Get, Post } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: DbService,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    const result = await this.prisma.user.findMany();

    console.log('findmany', result);

    return result;
  }

  @Post()
  async postHello(): Promise<any> {
    const result = await this.prisma.user.create({
      data: {
        username: 'iii',
        customprop: 'some other data',
        role: 'some-role',
      },
    });

    console.log('create', result);

    return result;
  }
}
