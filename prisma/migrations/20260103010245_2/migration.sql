/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `Prestation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Prestation_label_key" ON "Prestation"("label");
