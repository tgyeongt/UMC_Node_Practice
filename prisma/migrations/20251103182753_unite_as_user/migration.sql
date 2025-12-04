/*
  Warnings:

  - You are about to drop the `member_agree` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `member_mission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `member_agree` DROP FOREIGN KEY `member_agree_terms_id_fkey`;

-- DropForeignKey
ALTER TABLE `member_agree` DROP FOREIGN KEY `member_agree_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `member_mission` DROP FOREIGN KEY `member_mission_mission_id_fkey`;

-- DropForeignKey
ALTER TABLE `member_mission` DROP FOREIGN KEY `member_mission_user_id_fkey`;

-- DropTable
DROP TABLE `member_agree`;

-- DropTable
DROP TABLE `member_mission`;

-- CreateTable
CREATE TABLE `user_mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `mission_id` INTEGER NOT NULL,
    `status` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_agree` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `terms_id` INTEGER NOT NULL,
    `status` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_agree` ADD CONSTRAINT `user_agree_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_agree` ADD CONSTRAINT `user_agree_terms_id_fkey` FOREIGN KEY (`terms_id`) REFERENCES `terms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
