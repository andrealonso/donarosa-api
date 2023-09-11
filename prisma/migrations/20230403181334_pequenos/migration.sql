/*
  Warnings:

  - You are about to drop the column `estoque_lanc_id` on the `produtos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `produtos` DROP FOREIGN KEY `produtos_estoque_lanc_id_fkey`;

-- AlterTable
ALTER TABLE `caixa_cate` ADD COLUMN `caixa_operacao_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `caixa_lanc` ADD COLUMN `caixa_operacao_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `enderecos` MODIFY `complemento` VARCHAR(191) NULL,
    MODIFY `ponto_ref` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `estoque_lanc` ADD COLUMN `produto_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `produtos` DROP COLUMN `estoque_lanc_id`,
    MODIFY `vl_custo` DECIMAL(65, 30) NULL,
    MODIFY `vl_venda` DECIMAL(65, 30) NULL,
    MODIFY `vl_aluguel` DECIMAL(65, 30) NULL,
    MODIFY `qtd_estoque` INTEGER NOT NULL DEFAULT 0,
    MODIFY `prod_imagem` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `venda_itens` ADD COLUMN `produto_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `caixa_operacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `estoque_lanc` ADD CONSTRAINT `estoque_lanc_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `produtos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `caixa_lanc` ADD CONSTRAINT `caixa_lanc_caixa_operacao_id_fkey` FOREIGN KEY (`caixa_operacao_id`) REFERENCES `caixa_operacao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `caixa_cate` ADD CONSTRAINT `caixa_cate_caixa_operacao_id_fkey` FOREIGN KEY (`caixa_operacao_id`) REFERENCES `caixa_operacao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venda_itens` ADD CONSTRAINT `venda_itens_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `produtos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
