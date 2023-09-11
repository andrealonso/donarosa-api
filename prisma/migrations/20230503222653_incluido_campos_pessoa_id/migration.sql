/*
  Warnings:

  - You are about to drop the column `user_id` on the `pessoas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `pessoas` DROP FOREIGN KEY `pessoas_user_id_fkey`;

-- AlterTable
ALTER TABLE `pessoas` DROP COLUMN `user_id`;

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `pessoa_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_pessoa_id_fkey` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
