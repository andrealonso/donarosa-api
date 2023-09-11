/*
  Warnings:

  - You are about to drop the column `contrato_itens_id` on the `contratos` table. All the data in the column will be lost.
  - You are about to alter the column `vl_custo` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `vl_venda` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `vl_aluguel` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- DropForeignKey
ALTER TABLE `contratos` DROP FOREIGN KEY `contratos_contrato_itens_id_fkey`;

-- AlterTable
ALTER TABLE `contrato_itens` ADD COLUMN `contrato_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `contratos` DROP COLUMN `contrato_itens_id`;

-- AlterTable
ALTER TABLE `produtos` MODIFY `vl_custo` DECIMAL(10, 2) NULL,
    MODIFY `vl_venda` DECIMAL(10, 2) NULL,
    MODIFY `vl_aluguel` DECIMAL(10, 2) NULL;

-- AddForeignKey
ALTER TABLE `contrato_itens` ADD CONSTRAINT `contrato_itens_contrato_id_fkey` FOREIGN KEY (`contrato_id`) REFERENCES `contratos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
