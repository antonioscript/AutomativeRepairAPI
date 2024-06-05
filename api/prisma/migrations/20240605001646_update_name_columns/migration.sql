/*
  Warnings:

  - You are about to drop the column `nome` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `services` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `services` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `services_nome_key` ON `services`;

-- AlterTable
ALTER TABLE `services` DROP COLUMN `nome`,
    DROP COLUMN `valor`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ADD COLUMN `value` DOUBLE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `services_name_key` ON `services`(`name`);
