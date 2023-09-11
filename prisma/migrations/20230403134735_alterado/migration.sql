-- AlterTable
ALTER TABLE `pessoas` MODIFY `identidade` VARCHAR(191) NULL,
    MODIFY `dt_nasc` DATETIME(3) NULL,
    MODIFY `tel` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL;
