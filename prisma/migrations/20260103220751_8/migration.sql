/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `AdminEmployee` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `inService` on the `Provider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AdminEmployee" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "deletedAt",
DROP COLUMN "inService";
