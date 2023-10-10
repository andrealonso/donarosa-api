-- CreateTable
CREATE TABLE `prod_imgs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `extensao` VARCHAR(191) NOT NULL,
    `lado` VARCHAR(191) NOT NULL,
    `produto_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `prod_imgs` ADD CONSTRAINT `prod_imgs_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `produtos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
