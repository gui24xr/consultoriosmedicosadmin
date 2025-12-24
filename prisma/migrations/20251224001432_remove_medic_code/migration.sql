/*
  Warnings:

  - You are about to drop the column `code` on the `Medic` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Medic_code_key";

-- AlterTable
ALTER TABLE "Medic" DROP COLUMN "code";
