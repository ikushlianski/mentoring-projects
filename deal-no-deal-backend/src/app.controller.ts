import { Controller, Get } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: DbService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    console.log('this.prisma', this.prisma);

    const result = await this.prisma.user.findMany();

    console.log('result', result);

    return this.appService.getHello();
  }
}
