-- DropIndex
DROP INDEX `clientes_cpf_key` ON `clientes`;

-- AlterTable
ALTER TABLE `clientes` MODIFY `cpf` VARCHAR(191) NULL;
