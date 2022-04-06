import path from 'node:path';
import { Module } from '@nestjs/common';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';
import {
  CourseResolver,
  EnrollmentResolver,
  StudentResolver,
} from './graphql/resolvers';
import { CourseService, EnrollmentService, StudentService } from '../services';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Resolvers
    StudentResolver,
    CourseResolver,
    EnrollmentResolver,

    // Services
    CourseService,
    StudentService,
    EnrollmentService,
  ],
})
export class HttpModule {}
