/*
  Warnings:

  - Added the required column `stock` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` ADD COLUMN `stock` INTEGER UNSIGNED NOT NULL;
