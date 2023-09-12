-- AlterTable
ALTER TABLE `contratos` ADD COLUMN `cliente_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `contratos` ADD CONSTRAINT `contratos_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
