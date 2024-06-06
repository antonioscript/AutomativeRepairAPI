/*
  Warnings:

  - You are about to drop the column `serviceid` on the `parts` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `parts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `parts` DROP FOREIGN KEY `parts_serviceid_fkey`;

-- AlterTable
ALTER TABLE `parts` DROP COLUMN `serviceid`,
    ADD COLUMN `serviceId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `parts` ADD CONSTRAINT `parts_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
