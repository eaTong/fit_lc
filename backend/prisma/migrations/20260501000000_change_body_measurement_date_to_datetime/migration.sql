-- Change body_measurements.date from DATE to DATETIME to support multiple records per day
ALTER TABLE `body_measurements` MODIFY COLUMN `date` DATETIME NOT NULL;