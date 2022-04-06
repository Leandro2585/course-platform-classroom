import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import slugify from 'slugify';

type CreateCourseInput = {
  title: string;
};

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.tb_course.findMany();
  }

  async findById(id: string) {
    return await this.prisma.tb_course.findUnique({ where: { id } });
  }

  async create({ title }: CreateCourseInput) {
    const slug = slugify(title, { lower: true });
    const courseAlreadyExists = await this.prisma.tb_course.findUnique({
      where: { slug },
    });
    if (courseAlreadyExists) throw new Error('Course already exists');
    return await this.prisma.tb_course.create({ data: { title, slug } });
  }
}
