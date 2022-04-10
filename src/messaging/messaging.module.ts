import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CourseService, EnrollmentService, StudentService } from 'src/services';
import { PurchaseController } from './controllers/purchases.controller';

@Module({
  imports: [DatabaseModule],
  providers: [StudentService, CourseService, EnrollmentService],
  controllers: [PurchaseController],
})
export class MessagingModule {}
