-- CreateTable
CREATE TABLE `services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `observation` VARCHAR(255) NULL,

    UNIQUE INDEX `services_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ServiceParts` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ServiceParts_AB_unique`(`A`, `B`),
    INDEX `_ServiceParts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ServiceParts` ADD CONSTRAINT `_ServiceParts_A_fkey` FOREIGN KEY (`A`) REFERENCES `parts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ServiceParts` ADD CONSTRAINT `_ServiceParts_B_fkey` FOREIGN KEY (`B`) REFERENCES `services`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
