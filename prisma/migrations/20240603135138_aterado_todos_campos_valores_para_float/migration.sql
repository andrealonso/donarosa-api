/*
  Warnings:

  - You are about to alter the column `valor` on the `caixa_lanc` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `valor` on the `contrato_itens` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `vl_total` on the `contratos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `vl_uni` on the `venda_itens` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `vl_total` on the `venda_itens` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `vl_total` on the `vendas` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `desconto_val` on the `vendas` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `desconto_per` on the `vendas` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `vl_descontado` on the `vendas` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `caixa_lanc` MODIFY `valor` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `contrato_itens` MODIFY `valor` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `contratos` MODIFY `vl_total` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `venda_itens` MODIFY `vl_uni` DOUBLE NOT NULL,
    MODIFY `vl_total` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `vendas` MODIFY `vl_total` DOUBLE NULL,
    MODIFY `desconto_val` DOUBLE NULL,
    MODIFY `desconto_per` DOUBLE NULL,
    MODIFY `vl_descontado` DOUBLE NULL;
