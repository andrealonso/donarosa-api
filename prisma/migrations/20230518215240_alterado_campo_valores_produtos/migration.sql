/*
  Warnings:

  - You are about to alter the column `vl_custo` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(65,30)`.
  - You are about to alter the column `vl_venda` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(65,30)`.
  - You are about to alter the column `vl_aluguel` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `produtos` MODIFY `vl_custo` DECIMAL(65, 30) NULL,
    MODIFY `vl_venda` DECIMAL(65, 30) NULL,
    MODIFY `vl_aluguel` DECIMAL(65, 30) NULL;
