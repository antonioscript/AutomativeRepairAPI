/*
  Warnings:

  - Added the required column `serviceid` to the `parts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `parts` ADD COLUMN `serviceid` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `parts` ADD CONSTRAINT `parts_serviceid_fkey` FOREIGN KEY (`serviceid`) REFERENCES `services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
