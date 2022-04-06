-- CreateTable
CREATE TABLE "tb_student" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_enrollment" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "canceledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_course_slug_key" ON "tb_course"("slug");

-- AddForeignKey
ALTER TABLE "tb_enrollment" ADD CONSTRAINT "tb_enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "tb_student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_enrollment" ADD CONSTRAINT "tb_enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "tb_course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
