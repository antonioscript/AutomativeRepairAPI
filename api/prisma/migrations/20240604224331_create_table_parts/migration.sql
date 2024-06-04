-- CreateTable
CREATE TABLE `parts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `supplier` VARCHAR(255) NULL,
    `manufacturer` VARCHAR(255) NULL,
    `barcode` VARCHAR(255) NULL,
    `observation` VARCHAR(255) NULL,
    `quantity` INTEGER NOT NULL,
    `value` DOUBLE NOT NULL,

    UNIQUE INDEX `parts_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
