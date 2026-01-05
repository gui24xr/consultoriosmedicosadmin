/*
  Warnings:

  - You are about to drop the column `dni` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `record` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `whatsAppNumber` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeeId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_providerId_fkey";

-- DropIndex
DROP INDEX "Provider_dni_key";

-- DropIndex
DROP INDEX "Provider_record_key";

-- DropIndex
DROP INDEX "User_providerId_key";

-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "dni",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "phone",
DROP COLUMN "record",
DROP COLUMN "whatsAppNumber";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "providerId",
ADD COLUMN     "employeeId" TEXT;

-- CreateTable
CREATE TABLE "Employee" (
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_code_key" ON "Employee"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_dni_key" ON "Employee"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_record_key" ON "Employee"("record");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_providerId_key" ON "Employee"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_employeeId_key" ON "User"("employeeId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_id_fkey" FOREIGN KEY ("id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
