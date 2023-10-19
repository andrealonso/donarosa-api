-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `ativo_status_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_ativo_status_id_fkey` FOREIGN KEY (`ativo_status_id`) REFERENCES `status_ativo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
