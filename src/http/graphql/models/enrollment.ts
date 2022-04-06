import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Student } from './'
import { Course } from './course'

@ObjectType()
export class Enrollment {
  @Field(() => ID)
  id: string

  student_id: string

  course_id: string

  @Field(() => Student)
  student: Student

  @Field(() => Course)
  course: Course
  
  @Field(() => Date, { nullable: true })
  caceled_at: Date

  @Field(() => Date)
  created_at: Date
}