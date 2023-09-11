/*
  Warnings:

  - You are about to drop the column `pessoa_id` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `pessoa_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pessoa_tipo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pessoas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pessoas` DROP FOREIGN KEY `pessoas_ativo_status_id_fkey`;

-- DropForeignKey
ALTER TABLE `pessoas` DROP FOREIGN KEY `pessoas_sexo_id_fkey`;

-- DropForeignKey
ALTER TABLE `pessoas` DROP FOREIGN KEY `pessoas_tipo_id_fkey`;

-- DropForeignKey
ALTER TABLE `produtos` DROP FOREIGN KEY `produtos_ativo_status_id_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `usuarios_pessoa_id_fkey`;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `pessoa_id`;

-- DropTable
DROP TABLE `pessoa_status`;

-- DropTable
DROP TABLE `pessoa_tipo`;

-- DropTable
DROP TABLE `pessoas`;

-- CreateTable
CREATE TABLE `clientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `identidade` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `dt_nasc` DATETIME(3) NULL,
    `tel` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `endereco` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NULL,
    `cep` VARCHAR(191) NULL,
    `cidade` VARCHAR(191) NULL,
    `uf` VARCHAR(191) NULL,
    `complemento` VARCHAR(191) NULL,
    `ponto_ref` VARCHAR(191) NULL,
    `sexo_id` INTEGER NULL,
    `ativo_status_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `clientes_nome_key`(`nome`),
    UNIQUE INDEX `clientes_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `identidade` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `dt_nasc` DATETIME(3) NULL,
    `tel` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `endereco` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NULL,
    `cep` VARCHAR(191) NULL,
    `cidade` VARCHAR(191) NULL,
    `uf` VARCHAR(191) NULL,
    `complemento` VARCHAR(191) NULL,
    `ponto_ref` VARCHAR(191) NULL,
    `sexo_id` INTEGER NULL,
    `ativo_status_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `funcionarios_nome_key`(`nome`),
    UNIQUE INDEX `funcionarios_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status_ativo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `status_ativo_descricao_key`(`descricao`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_sexo_id_fkey` FOREIGN KEY (`sexo_id`) REFERENCES `sexo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_ativo_status_id_fkey` FOREIGN KEY (`ativo_status_id`) REFERENCES `status_ativo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `funcionarios` ADD CONSTRAINT `funcionarios_sexo_id_fkey` FOREIGN KEY (`sexo_id`) REFERENCES `sexo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `funcionarios` ADD CONSTRAINT `funcionarios_ativo_status_id_fkey` FOREIGN KEY (`ativo_status_id`) REFERENCES `status_ativo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produtos` ADD CONSTRAINT `produtos_ativo_status_id_fkey` FOREIGN KEY (`ativo_status_id`) REFERENCES `status_ativo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
