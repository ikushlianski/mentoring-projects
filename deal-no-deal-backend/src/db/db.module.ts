import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/db/db.service';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  providers: [PrismaService, DatabaseService],
  exports: [PrismaService, DatabaseService],
})
export class DbModule {}
