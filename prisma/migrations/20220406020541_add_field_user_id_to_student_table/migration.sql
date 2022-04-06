/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `tb_student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tb_student" ADD COLUMN     "user_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "tb_student_user_id_key" ON "tb_student"("user_id");
