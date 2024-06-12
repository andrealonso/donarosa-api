/*
  Warnings:

  - Added the required column `dt_evento` to the `contratos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contratos` ADD COLUMN `dt_evento` DATETIME(3) NOT NULL;
