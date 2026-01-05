/*
  Warnings:

  - Added the required column `displayName` to the `StaffMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StaffMember" ADD COLUMN     "displayName" TEXT NOT NULL;
