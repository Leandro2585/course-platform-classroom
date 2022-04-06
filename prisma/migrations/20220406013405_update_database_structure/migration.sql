/*
  Warnings:

  - You are about to drop the column `createdAt` on the `tb_course` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tb_course` table. All the data in the column will be lost.
  - You are about to drop the column `canceledAt` on the `tb_enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `tb_enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tb_enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `tb_enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tb_enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tb_student` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tb_student` table. All the data in the column will be lost.
  - Added the required column `course_id` to the `tb_enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `tb_enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tb_enrollment" DROP CONSTRAINT "tb_enrollment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "tb_enrollment" DROP CONSTRAINT "tb_enrollment_studentId_fkey";

-- AlterTable
ALTER TABLE "tb_course" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tb_enrollment" DROP COLUMN "canceledAt",
DROP COLUMN "courseId",
DROP COLUMN "createdAt",
DROP COLUMN "studentId",
DROP COLUMN "updatedAt",
ADD COLUMN     "canceled_at" TIMESTAMP(3),
ADD COLUMN     "course_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "student_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tb_student" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "tb_enrollment" ADD CONSTRAINT "tb_enrollment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "tb_student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_enrollment" ADD CONSTRAINT "tb_enrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "tb_course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
