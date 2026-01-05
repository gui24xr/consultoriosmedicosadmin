/*
  Warnings:

  - You are about to drop the column `label` on the `Prestation` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `StaffMember` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identifier]` on the table `Prestation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier` to the `Prestation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayName` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Prestation_label_key";

-- AlterTable
ALTER TABLE "Prestation" DROP COLUMN "label",
ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "identifier" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Provider" ADD COLUMN     "displayName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StaffMember" DROP COLUMN "displayName";

-- CreateIndex
CREATE UNIQUE INDEX "Prestation_identifier_key" ON "Prestation"("identifier");
