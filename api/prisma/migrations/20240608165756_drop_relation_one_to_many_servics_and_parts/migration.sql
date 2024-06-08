/*
  Warnings:

  - You are about to drop the column `serviceId` on the `parts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `parts` DROP FOREIGN KEY `parts_serviceId_fkey`;

-- AlterTable
ALTER TABLE `parts` DROP COLUMN `serviceId`;
