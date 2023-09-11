/*
  Warnings:

  - You are about to drop the `enderecos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `enderecos` DROP FOREIGN KEY `enderecos_pessoa_id_fkey`;

-- AlterTable
ALTER TABLE `pessoas` ADD COLUMN `bairro` VARCHAR(191) NULL,
    ADD COLUMN `cep` VARCHAR(191) NULL,
    ADD COLUMN `cidade` VARCHAR(191) NULL,
    ADD COLUMN `complemento` VARCHAR(191) NULL,
    ADD COLUMN `endereco` VARCHAR(191) NULL,
    ADD COLUMN `ponto_ref` VARCHAR(191) NULL,
    ADD COLUMN `uf` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `enderecos`;
