/*
  Warnings:

  - You are about to drop the column `categoryId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `product_options_pictures` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `avatar` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `product_options` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `product_options` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `product_options` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stock` on table `product_options` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `category_id` to the `products` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avatar` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `des` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `product_options_pictures` DROP FOREIGN KEY `product_options_pictures_product_option_id_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_categoryId_fkey`;

-- AlterTable
ALTER TABLE `categories` ADD COLUMN `avatar` VARCHAR(191) NOT NULL,
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `product_options` ADD COLUMN `product_id` INTEGER NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `price` DOUBLE NOT NULL,
    MODIFY `stock` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `categoryId`,
    ADD COLUMN `category_id` INTEGER NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `avatar` VARCHAR(191) NOT NULL,
    MODIFY `des` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `product_options_pictures`;

-- CreateTable
CREATE TABLE `product_option_pictures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `is_avatar` BOOLEAN NOT NULL DEFAULT false,
    `product_option_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `categories_title_key` ON `categories`(`title`);

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_options` ADD CONSTRAINT `product_options_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_option_pictures` ADD CONSTRAINT `product_option_pictures_product_option_id_fkey` FOREIGN KEY (`product_option_id`) REFERENCES `product_options`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
