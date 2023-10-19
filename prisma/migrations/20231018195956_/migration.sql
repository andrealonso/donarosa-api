-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `funcionario_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_funcionario_id_fkey` FOREIGN KEY (`funcionario_id`) REFERENCES `funcionarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
