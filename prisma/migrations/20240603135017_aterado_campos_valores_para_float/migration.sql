/*
  Warnings:

  - You are about to alter the column `vl_custo` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `vl_venda` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `vl_aluguel` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `produtos` MODIFY `vl_custo` DOUBLE NULL,
    MODIFY `vl_venda` DOUBLE NULL,
    MODIFY `vl_aluguel` DOUBLE NULL;
