-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_roles_user_id_role_id_key`(`user_id`, `role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workouts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    INDEX `workouts_user_id_idx`(`user_id`),
    INDEX `workouts_date_idx`(`date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workout_exercises` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `workout_id` INTEGER NOT NULL,
    `exercise_name` VARCHAR(100) NOT NULL,
    `sets` INTEGER NULL,
    `reps` INTEGER NULL,
    `weight` DECIMAL(10, 2) NULL,
    `duration` INTEGER NULL,
    `distance` DECIMAL(10, 2) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `body_measurements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    INDEX `body_measurements_user_id_idx`(`user_id`),
    INDEX `body_measurements_date_idx`(`date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `measurement_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurement_id` INTEGER NOT NULL,
    `body_part` VARCHAR(20) NOT NULL,
    `value` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workout_plans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `goal` VARCHAR(20) NOT NULL,
    `frequency` INTEGER NOT NULL DEFAULT 3,
    `experience` VARCHAR(20) NOT NULL,
    `equipment` VARCHAR(255) NOT NULL,
    `conditions` TEXT NULL,
    `body_weight` DECIMAL(5, 2) NULL,
    `body_fat` DECIMAL(4, 1) NULL,
    `height` DECIMAL(5, 1) NULL,
    `duration_weeks` INTEGER NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `workout_plans_user_id_idx`(`user_id`),
    INDEX `workout_plans_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plan_exercises` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plan_id` INTEGER NOT NULL,
    `day_of_week` INTEGER NOT NULL,
    `exercise_name` VARCHAR(100) NOT NULL,
    `sets` INTEGER NOT NULL DEFAULT 3,
    `reps` VARCHAR(20) NOT NULL,
    `weight` DECIMAL(5, 2) NULL,
    `duration` INTEGER NULL,
    `rest_seconds` INTEGER NOT NULL DEFAULT 60,
    `order_index` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `plan_exercises_plan_id_idx`(`plan_id`),
    INDEX `plan_exercises_day_of_week_idx`(`day_of_week`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plan_executions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plan_id` INTEGER NOT NULL,
    `plan_exercise_id` INTEGER NOT NULL,
    `scheduled_date` DATE NOT NULL,
    `completed_at` DATETIME(3) NULL,
    `completed_reps` INTEGER NULL,
    `completed_weight` DECIMAL(5, 2) NULL,
    `status` VARCHAR(20) NOT NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `plan_executions_plan_id_idx`(`plan_id`),
    INDEX `plan_executions_scheduled_date_idx`(`scheduled_date`),
    INDEX `plan_executions_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_contexts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `context_text` TEXT NULL,
    `profile_snapshot` JSON NULL,
    `active_plan_name` VARCHAR(255) NULL,
    `active_plan_status` VARCHAR(50) NULL,
    `last_workout_date` DATE NULL,
    `last_measurement_date` DATE NULL,
    `total_workouts` INTEGER NOT NULL DEFAULT 0,
    `total_measurements` INTEGER NOT NULL DEFAULT 0,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_contexts_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat_messages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `role` VARCHAR(20) NOT NULL,
    `content` TEXT NOT NULL,
    `saved_data` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `chat_messages_user_id_created_at_idx`(`user_id`, `created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `muscles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `group` VARCHAR(191) NOT NULL,
    `parentId` INTEGER NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `origin` TEXT NULL,
    `insertion` TEXT NULL,
    `function` TEXT NULL,
    `trainingTips` TEXT NULL,

    INDEX `muscles_group_idx`(`group`),
    INDEX `muscles_parentId_idx`(`parentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exercises` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `equipment` VARCHAR(191) NOT NULL,
    `difficulty` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `adjustmentNotes` TEXT NULL,
    `videoUrl` VARCHAR(500) NULL,
    `isVariant` BOOLEAN NOT NULL DEFAULT false,
    `parentId` INTEGER NULL,
    `tags` JSON NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'draft',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `steps` TEXT NULL,
    `safetyNotes` TEXT NULL,
    `commonMistakes` TEXT NULL,
    `exerciseType` VARCHAR(191) NULL,
    `variantType` VARCHAR(191) NULL,
    `conversionGuide` JSON NULL,

    INDEX `exercises_category_idx`(`category`),
    INDEX `exercises_equipment_idx`(`equipment`),
    INDEX `exercises_difficulty_idx`(`difficulty`),
    INDEX `exercises_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exercise_muscles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `exercise_id` INTEGER NOT NULL,
    `muscle_id` INTEGER NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `exercise_muscles_exercise_id_muscle_id_role_key`(`exercise_id`, `muscle_id`, `role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workouts` ADD CONSTRAINT `workouts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workout_exercises` ADD CONSTRAINT `workout_exercises_workout_id_fkey` FOREIGN KEY (`workout_id`) REFERENCES `workouts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `body_measurements` ADD CONSTRAINT `body_measurements_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `measurement_items` ADD CONSTRAINT `measurement_items_measurement_id_fkey` FOREIGN KEY (`measurement_id`) REFERENCES `body_measurements`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workout_plans` ADD CONSTRAINT `workout_plans_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plan_exercises` ADD CONSTRAINT `plan_exercises_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `workout_plans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plan_executions` ADD CONSTRAINT `plan_executions_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `workout_plans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plan_executions` ADD CONSTRAINT `plan_executions_plan_exercise_id_fkey` FOREIGN KEY (`plan_exercise_id`) REFERENCES `plan_exercises`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_contexts` ADD CONSTRAINT `user_contexts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_messages` ADD CONSTRAINT `chat_messages_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `muscles` ADD CONSTRAINT `muscles_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `muscles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exercises` ADD CONSTRAINT `exercises_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `exercises`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exercise_muscles` ADD CONSTRAINT `exercise_muscles_exercise_id_fkey` FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exercise_muscles` ADD CONSTRAINT `exercise_muscles_muscle_id_fkey` FOREIGN KEY (`muscle_id`) REFERENCES `muscles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
