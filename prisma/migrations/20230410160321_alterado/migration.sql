-- DropForeignKey
ALTER TABLE `pessoas` DROP FOREIGN KEY `pessoas_user_id_fkey`;

-- AlterTable
ALTER TABLE `pessoas` MODIFY `user_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `pessoas` ADD CONSTRAINT `pessoas_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
