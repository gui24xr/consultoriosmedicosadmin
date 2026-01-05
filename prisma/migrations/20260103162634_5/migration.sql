/*
  Warnings:

  - You are about to drop the column `code` on the `AdminEmployee` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Provider` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "AdminEmployee_code_key";

-- DropIndex
DROP INDEX "Provider_code_key";

-- AlterTable
ALTER TABLE "AdminEmployee" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "code";
