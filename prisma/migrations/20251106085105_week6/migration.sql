/*
  Warnings:

  - You are about to drop the `food_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `region` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review_image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `store` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `terms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_agree` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_favor_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_mission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `mission` DROP FOREIGN KEY `mission_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `review_image` DROP FOREIGN KEY `review_image_review_id_fkey`;

-- DropForeignKey
ALTER TABLE `store` DROP FOREIGN KEY `store_region_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_agree` DROP FOREIGN KEY `user_agree_terms_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_agree` DROP FOREIGN KEY `user_agree_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_favor_category` DROP FOREIGN KEY `user_favor_category_food_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_favor_category` DROP FOREIGN KEY `user_favor_category_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_mission` DROP FOREIGN KEY `user_mission_mission_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_mission` DROP FOREIGN KEY `user_mission_user_id_fkey`;

-- DropTable
DROP TABLE `food_category`;

-- DropTable
DROP TABLE `mission`;

-- DropTable
DROP TABLE `region`;

-- DropTable
DROP TABLE `review`;

-- DropTable
DROP TABLE `review_image`;

-- DropTable
DROP TABLE `store`;

-- DropTable
DROP TABLE `terms`;

-- DropTable
DROP TABLE `user`;

-- DropTable
DROP TABLE `user_agree`;

-- DropTable
DROP TABLE `user_favor_category`;

-- DropTable
DROP TABLE `user_mission`;

-- CreateTable
CREATE TABLE `FoodCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `gender` VARCHAR(20) NOT NULL,
    `age` INTEGER NOT NULL,
    `address` VARCHAR(40) NOT NULL,
    `detail_address` VARCHAR(40) NULL,
    `status` VARCHAR(15) NOT NULL,
    `inactive_date` DATETIME(0) NOT NULL,
    `social_type` VARCHAR(10) NOT NULL,
    `created_at` DATETIME(6) NOT NULL,
    `updated_at` DATETIME(6) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `point` INTEGER NOT NULL,
    `birth` DATE NOT NULL,
    `phone_number` VARCHAR(50) NOT NULL,
    `password` VARCHAR(15) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserFavorCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `food_category_id` INTEGER NOT NULL,

    INDEX `f_category_id`(`food_category_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Region` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Store` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `region_id` INTEGER NOT NULL,
    `created_at` DATETIME(6) NOT NULL,
    `updated_at` DATETIME(6) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_id` INTEGER NOT NULL,
    `user_id` BIGINT NOT NULL,
    `body` TEXT NOT NULL,
    `score` INTEGER NOT NULL,
    `created_at` DATETIME(6) NOT NULL,
    `updated_at` DATETIME(6) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `review_id` INTEGER NOT NULL,
    `url` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserMission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `mission_id` INTEGER NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    `completed_at` DATETIME(6) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Terms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `content` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAgree` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `terms_id` INTEGER NOT NULL,
    `status` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserFavorCategory` ADD CONSTRAINT `UserFavorCategory_food_category_id_fkey` FOREIGN KEY (`food_category_id`) REFERENCES `FoodCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavorCategory` ADD CONSTRAINT `UserFavorCategory_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `Region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewImage` ADD CONSTRAINT `ReviewImage_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `Review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMission` ADD CONSTRAINT `UserMission_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMission` ADD CONSTRAINT `UserMission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `Mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAgree` ADD CONSTRAINT `UserAgree_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAgree` ADD CONSTRAINT `UserAgree_terms_id_fkey` FOREIGN KEY (`terms_id`) REFERENCES `Terms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
