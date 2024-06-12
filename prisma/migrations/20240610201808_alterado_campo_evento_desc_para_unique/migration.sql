/*
  Warnings:

  - A unique constraint covering the columns `[descricao]` on the table `eventos` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `produtos_descricao_key` ON `produtos`;

-- CreateIndex
CREATE UNIQUE INDEX `eventos_descricao_key` ON `eventos`(`descricao`);
