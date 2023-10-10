/*
  Warnings:

  - You are about to drop the column `endereco` on the `clientes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `clientes` DROP COLUMN `endereco`,
    ADD COLUMN `rua` VARCHAR(191) NULL;
