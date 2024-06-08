/*
  Warnings:

  - Added the required column `value` to the `inspections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inspections` ADD COLUMN `description` VARCHAR(600) NULL,
    ADD COLUMN `isClosed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isServiceOrder` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `observation` VARCHAR(600) NULL,
    ADD COLUMN `value` DOUBLE NOT NULL;
