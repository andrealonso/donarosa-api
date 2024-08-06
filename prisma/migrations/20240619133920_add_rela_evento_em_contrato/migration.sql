-- AlterTable
ALTER TABLE `contratos` ADD COLUMN `evento_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `contratos` ADD CONSTRAINT `contratos_evento_id_fkey` FOREIGN KEY (`evento_id`) REFERENCES `eventos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
