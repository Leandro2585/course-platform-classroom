import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard, AuthUser, CurrentUser } from 'src/http/auth';
import {
  CourseService,
  EnrollmentService,
  StudentService,
} from '../../../services';
import { CreateCourseInput } from '../inputs/create-course-input';
import { Course } from '../models';

@Resolver(() => Course)
export class CourseResolver {
  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private studentService: StudentService,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  async loadCourses() {
    return await this.courseService.findAll();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async loadCourse(
    @Args('id') id: string,
    @CurrentUser('data') user: AuthUser,
  ) {
    const student = await this.studentService.findById(user.sub);
    if (!student) throw new Error('Student not found.');
    const enrollment = await this.enrollmentService.findByCourseAndStudentId({
      course_id: id,
      student_id: student.id,
    });
    if (!enrollment) throw new UnauthorizedException();
    return await this.courseService.findById(id);
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  async createCourse(@Args('data') data: CreateCourseInput) {
    return await this.courseService.create(data);
  }
}
