/*
  Warnings:

  - You are about to drop the column `name` on the `Specialty` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[label]` on the table `Specialty` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `Specialty` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Specialty_name_key";

-- AlterTable
ALTER TABLE "Specialty" DROP COLUMN "name",
ADD COLUMN     "label" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_label_key" ON "Specialty"("label");
