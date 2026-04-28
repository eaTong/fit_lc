-- CreateTable
CREATE TABLE `exercise_variants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `exercise_id` INTEGER NOT NULL,
    `variant_id` INTEGER NOT NULL,
    `variant_type` VARCHAR(191) NOT NULL,
    `difference_notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `exercise_variants_exercise_id_variant_id_key`(`exercise_id`, `variant_id`),
    INDEX `exercise_variants_exercise_id_idx`(`exercise_id`),
    INDEX `exercise_variants_variant_id_idx`(`variant_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `exercise_variants` ADD CONSTRAINT `exercise_variants_exercise_id_fkey` FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exercise_variants` ADD CONSTRAINT `exercise_variants_variant_id_fkey` FOREIGN KEY (`variant_id`) REFERENCES `exercises`(`id`) ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE `exercises` DROP FOREIGN KEY `exercises_parentId_fkey`;

-- DropIndex
DROP INDEX `exercises_parentId_idx` ON `exercises`;

-- DropColumn
ALTER TABLE `exercises` DROP COLUMN `isVariant`;

-- DropColumn
ALTER TABLE `exercises` DROP COLUMN `parentId`;