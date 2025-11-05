-- CreateTable
CREATE TABLE `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `gender` VARCHAR(20) NOT NULL,
    `age` INTEGER NOT NULL,
    `address` VARCHAR(40) NOT NULL,
    `detail_address` VARCHAR(40) NULL,
    `status` VARCHAR(15) NOT NULL,
    `inactive_date` DATETIME NOT NULL,
    `social_type` VARCHAR(10) NOT NULL,
    `create_at` DATETIME(6) NOT NULL,
    `updated_at` DATETIME(6) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `point` INTEGER NOT NULL,
    `birth` DATE NOT NULL,
    `phone_number` VARCHAR(50) NOT NULL,
    `ppas` VARCHAR(15) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_favor_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `food_category_id` INTEGER NOT NULL,

    INDEX `f_category_id`(`food_category_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_favor_category` ADD CONSTRAINT `user_favor_category_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_favor_category` ADD CONSTRAINT `user_favor_category_food_category_id_fkey` FOREIGN KEY (`food_category_id`) REFERENCES `food_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
