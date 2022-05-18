/*
  Warnings:

  - Added the required column `from` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxAge` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `server` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `from` VARCHAR(191) NOT NULL,
    ADD COLUMN `maxAge` INTEGER NOT NULL,
    ADD COLUMN `server` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
