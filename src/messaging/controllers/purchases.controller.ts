import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CourseService, EnrollmentService, StudentService } from 'src/services';

export type Customer = {
  user_id: string;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
};

export type PurchaseCreatedPayload = {
  customer: Customer;
  product: Product;
};

@Controller()
export class PurchaseController {
  constructor(
    private studentsService: StudentService,
    private coursesService: CourseService,
    private enrollmentsServices: EnrollmentService,
  ) {}

  @EventPattern('purchases.new-purchase')
  async purchaseCreated(
    @Payload('value')
    {
      customer: { user_id },
      product: { id: course_id, title, slug },
    }: PurchaseCreatedPayload,
  ) {
    let student = await this.studentsService.findByUserId(user_id);
    if (!student) {
      student = await this.studentsService.create({ user_id });
    }
    let course = await this.coursesService.findCourseBySlug({ slug });
    if (!course) {
      course = await this.coursesService.create({ title });
    }
    await this.enrollmentsServices.create({ course_id, student_id: user_id });
  }
}
