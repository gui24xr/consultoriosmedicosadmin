/*
  Warnings:

  - You are about to drop the column `employeeId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[staffMemberId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_employeeId_fkey";

-- DropIndex
DROP INDEX "User_employeeId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "employeeId",
ADD COLUMN     "staffMemberId" TEXT;

-- DropTable
DROP TABLE "Employee";

-- CreateTable
CREATE TABLE "StaffMember" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "whatsAppNumber" TEXT,
    "record" TEXT,
    "providerId" TEXT,
    "adminEmployeeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "StaffMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminEmployee" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "AdminEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaffMember_code_key" ON "StaffMember"("code");

-- CreateIndex
CREATE UNIQUE INDEX "StaffMember_dni_key" ON "StaffMember"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "StaffMember_record_key" ON "StaffMember"("record");

-- CreateIndex
CREATE UNIQUE INDEX "StaffMember_providerId_key" ON "StaffMember"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "StaffMember_adminEmployeeId_key" ON "StaffMember"("adminEmployeeId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminEmployee_code_key" ON "AdminEmployee"("code");

-- CreateIndex
CREATE UNIQUE INDEX "AdminEmployee_task_key" ON "AdminEmployee"("task");

-- CreateIndex
CREATE UNIQUE INDEX "User_staffMemberId_key" ON "User"("staffMemberId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_staffMemberId_fkey" FOREIGN KEY ("staffMemberId") REFERENCES "StaffMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_id_fkey" FOREIGN KEY ("id") REFERENCES "StaffMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminEmployee" ADD CONSTRAINT "AdminEmployee_id_fkey" FOREIGN KEY ("id") REFERENCES "StaffMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;
