import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { SignUpUserDto } from 'src/auth/dto/signUpUserDto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class DatabaseService {
  constructor(private readonly prisma: PrismaService) {}
  async checkUserExists(username: string): Promise<null | User> {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async createUser({ username }: Partial<SignUpUserDto>) {
    await this.prisma.user.create({
      data: {
        username,
      },
    });
  }
}
