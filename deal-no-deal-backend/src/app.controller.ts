import { Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
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
        username: 'xxxxxx',
      },
    });

    console.log('create', result);

    return result;
  }
}
