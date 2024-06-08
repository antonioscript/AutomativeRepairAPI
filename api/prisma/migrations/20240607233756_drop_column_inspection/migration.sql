/*
  Warnings:

  - You are about to drop the column `isClosed` on the `inspections` table. All the data in the column will be lost.
  - You are about to drop the column `observation` on the `inspections` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `inspections` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inspections` DROP COLUMN `isClosed`,
    DROP COLUMN `observation`,
    DROP COLUMN `value`;
