-- AlterTable
ALTER TABLE `workouts` ADD COLUMN `idempotency_key` VARCHAR(64) NULL;

-- AlterTable
ALTER TABLE `body_measurements` ADD COLUMN `idempotency_key` VARCHAR(64) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `uniq_user_idempotency_workout` ON `workouts`(`user_id`, `idempotency_key`);

-- CreateIndex
CREATE UNIQUE INDEX `uniq_user_idempotency_measurement` ON `body_measurements`(`user_id`, `idempotency_key`);
