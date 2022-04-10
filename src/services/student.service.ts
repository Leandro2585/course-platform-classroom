import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

type CreateStudentInput = {
  user_id: string;
};

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async findByUserId(user_id: string) {
    return await this.prisma.tb_student.findUnique({ where: { user_id } });
  }

  async findAll() {
    return await this.prisma.tb_student.findMany();
  }

  async findById(id: string) {
    return await this.prisma.tb_student.findUnique({ where: { id } });
  }

  async create({ user_id }: CreateStudentInput) {
    return await this.prisma.tb_student.create({ data: { user_id } });
  }
}
