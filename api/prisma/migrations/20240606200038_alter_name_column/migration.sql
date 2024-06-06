/*
  Warnings:

  - You are about to drop the column `ispectionDate` on the `inspections` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inspections` DROP COLUMN `ispectionDate`,
    ADD COLUMN `inspectionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
