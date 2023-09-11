/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `pessoas` will be added. If there are existing duplicate values, this will fail.
  - Made the column `user_id` on table `pessoas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `pessoas` DROP FOREIGN KEY `pessoas_user_id_fkey`;

-- AlterTable
ALTER TABLE `pessoas` MODIFY `user_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `pessoas_user_id_key` ON `pessoas`(`user_id`);

-- AddForeignKey
ALTER TABLE `pessoas` ADD CONSTRAINT `pessoas_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
