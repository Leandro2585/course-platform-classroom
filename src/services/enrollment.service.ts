import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

type CreateEnrollmentInput = {
  course_id: string;
  student_id: string;
};

type FindByCourseAndStudentIdInput = {
  course_id: string;
  student_id: string;
};

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  async findByCourseAndStudentId({
    course_id,
    student_id,
  }: FindByCourseAndStudentIdInput) {
    return await this.prisma.tb_enrollment.findFirst({
      where: {
        course_id,
        student_id,
        canceled_at: null,
      },
    });
  }

  async findAllAvailable() {
    return await this.prisma.tb_enrollment.findMany({
      where: { canceled_at: null },
      orderBy: { created_at: 'desc' },
    });
  }

  async findAllByStudentId(student_id: string) {
    return await this.prisma.tb_enrollment.findMany({
      where: { student_id, canceled_at: null },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async create({ course_id, student_id }: CreateEnrollmentInput) {
    return await this.prisma.tb_enrollment.create({
      data: { course_id, student_id },
    });
  }
}
