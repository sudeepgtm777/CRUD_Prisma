import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  getUsers() {
    return this.prisma.user.findMany();
  }

  getUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateUserById(id: number, data: Prisma.UserUpdateInput) {
    const findUser = await this.getUserById(id);
    if (!findUser) throw new HttpException('User not Found', 404);
    if (data.userName) {
      const findUser = await this.prisma.user.findUnique({
        where: { userName: data.userName as string },
      });
      if (findUser) throw new HttpException('UserName already taken', 400);
    }
    return this.prisma.user.update({ where: { id }, data });
  }

  async deleteUserById(id: number) {
    const findUser = await this.getUserById(id);
    if (!findUser) throw new HttpException('User not Found', 404);
    const deletedUser = await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully', deletedUser };
  }
}
