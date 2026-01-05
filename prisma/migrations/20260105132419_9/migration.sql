/*
  Warnings:

  - You are about to drop the column `adminEmployeeId` on the `StaffMember` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `StaffMember` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "StaffMember_adminEmployeeId_key";

-- DropIndex
DROP INDEX "StaffMember_providerId_key";

-- AlterTable
ALTER TABLE "StaffMember" DROP COLUMN "adminEmployeeId",
DROP COLUMN "providerId";
