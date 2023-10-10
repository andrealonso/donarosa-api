/*
  Warnings:

  - You are about to drop the column `complemento` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `complemento` on the `funcionarios` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `funcionarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `clientes` DROP COLUMN `complemento`;

-- AlterTable
ALTER TABLE `funcionarios` DROP COLUMN `complemento`,
    DROP COLUMN `endereco`,
    ADD COLUMN `num` VARCHAR(191) NULL,
    ADD COLUMN `rua` VARCHAR(191) NULL;
