import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from '../../../http/auth';
import {
  CourseService,
  EnrollmentService,
  StudentService,
} from '../../../services';
import { Enrollment } from '../models';

@Resolver(() => Enrollment)
export class EnrollmentResolver {
  constructor(
    private enrollmentService: EnrollmentService,
    private studentService: StudentService,
    private courseService: CourseService,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  async loadEnrollments() {
    return await this.enrollmentService.findAllAvailable();
  }

  @ResolveField()
  async student(@Parent() enrollment: Enrollment) {
    return await this.studentService.findById(enrollment.student_id);
  }

  @ResolveField()
  async course(@Parent() enrollment: Enrollment) {
    return await this.courseService.findById(enrollment.course_id);
  }
}
