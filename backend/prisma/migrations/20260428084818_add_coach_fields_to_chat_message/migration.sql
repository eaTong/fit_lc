-- AlterTable
ALTER TABLE `chat_messages` ADD COLUMN `coach_message_type` VARCHAR(191) NULL,
    ADD COLUMN `is_from_coach` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `parent_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `plan_exercises` ADD COLUMN `exercise_id` INTEGER NULL,
    ADD COLUMN `target_muscles` VARCHAR(100) NULL;

-- CreateTable
CREATE TABLE `user_profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `nickname` VARCHAR(50) NULL,
    `avatar` VARCHAR(500) NULL,
    `height` FLOAT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_profiles_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `body_metrics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `weight` FLOAT NOT NULL,
    `bodyFat` FLOAT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `body_metrics_user_id_idx`(`user_id`),
    UNIQUE INDEX `body_metrics_user_id_date_key`(`user_id`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `plan_exercises` ADD CONSTRAINT `plan_exercises_exercise_id_fkey` FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_messages` ADD CONSTRAINT `chat_messages_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `chat_messages`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_profiles` ADD CONSTRAINT `user_profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `body_metrics` ADD CONSTRAINT `body_metrics_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
