/*
  Warnings:

  - Added the required column `value` to the `inspections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inspections` ADD COLUMN `value` DOUBLE NOT NULL;
