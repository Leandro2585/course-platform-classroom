import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Enrollment } from '.';

@ObjectType('user')
@Directive('@extends')
@Directive('key(fields: "user_id")')
export class Student {
  id: string;

  @Field(() => ID)
  @Directive('@external')
  user_id: string;

  @Field(() => [Enrollment])
  enrollments: Enrollment[];
}
