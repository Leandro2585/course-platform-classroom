import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { EnrollmentService, StudentService } from '../../../services';
import { AuthorizationGuard, AuthUser, CurrentUser } from '../../../http/auth';
import { Student } from '../models';

@Resolver(() => Student)
export class StudentResolver {
  constructor(
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
  ) {}

  @Query(() => Student)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.studentService.findByUserId(user.sub);
  }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  async loadStudents() {
    return await this.studentService.findAll();
  }

  @ResolveField()
  async enrollments(@Parent() student: Student) {
    return await this.enrollmentService.findAllByStudentId(student.id);
  }
}
