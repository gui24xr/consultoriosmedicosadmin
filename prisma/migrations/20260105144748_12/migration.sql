/*
  Warnings:

  - You are about to drop the column `label` on the `Specialty` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identifier]` on the table `Specialty` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `displayName` to the `Specialty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identifier` to the `Specialty` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Specialty_label_key";

-- AlterTable
ALTER TABLE "Specialty" DROP COLUMN "label",
ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "identifier" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_identifier_key" ON "Specialty"("identifier");
