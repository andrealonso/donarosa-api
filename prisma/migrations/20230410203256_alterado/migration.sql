/*
  Warnings:

  - You are about to drop the column `enderecos_id` on the `pessoas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `pessoas` DROP FOREIGN KEY `pessoas_enderecos_id_fkey`;

-- AlterTable
ALTER TABLE `enderecos` ADD COLUMN `pessoa_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `pessoas` DROP COLUMN `enderecos_id`;

-- AddForeignKey
ALTER TABLE `enderecos` ADD CONSTRAINT `enderecos_pessoa_id_fkey` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
