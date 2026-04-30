-- Add imageUrls to ChatMessage
ALTER TABLE `chat_messages` ADD COLUMN `image_urls` JSON;

-- Create album_photos table
CREATE TABLE `album_photos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `oss_url` VARCHAR(500) NOT NULL,
  `thumbnail_url` VARCHAR(500),
  `chat_message_id` INT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` DATETIME,
  PRIMARY KEY (`id`),
  INDEX `album_photos_user_created` (`user_id`, `created_at`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`chat_message_id`) REFERENCES `chat_messages`(`id`) ON DELETE SET NULL
) DEFAULT CHARACTER SET utf8mb4;