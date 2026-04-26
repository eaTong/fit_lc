CREATE DATABASE IF NOT EXISTS fitlc;
USE fitlc;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

CREATE TABLE IF NOT EXISTS workouts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  date DATE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_date (date),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS workout_exercises (
  id INT PRIMARY KEY AUTO_INCREMENT,
  workout_id INT NOT NULL,
  exercise_name VARCHAR(100) NOT NULL,
  sets INT NULL,
  reps INT NULL,
  weight DECIMAL(10,2) NULL,
  duration INT NULL,
  distance DECIMAL(10,2) NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS body_measurements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  date DATE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_date (date),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS measurement_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  measurement_id INT NOT NULL,
  body_part ENUM('chest','waist','hips','biceps','thighs','calves','other') NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (measurement_id) REFERENCES body_measurements(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS workout_plans (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  goal ENUM('bulk', 'cut', 'maintain') NOT NULL,
  frequency INT NOT NULL DEFAULT 3,
  experience ENUM('beginner', 'intermediate', 'advanced') NOT NULL DEFAULT 'beginner',
  equipment VARCHAR(255) DEFAULT '',
  conditions TEXT,
  body_weight DECIMAL(5,2),
  body_fat DECIMAL(4,1),
  height DECIMAL(5,1),
  duration_weeks INT NOT NULL DEFAULT 12,
  status ENUM('draft', 'active', 'completed', 'paused') NOT NULL DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS plan_exercises (
  id INT PRIMARY KEY AUTO_INCREMENT,
  plan_id INT NOT NULL,
  day_of_week INT NOT NULL COMMENT '1=Monday, 7=Sunday',
  exercise_name VARCHAR(100) NOT NULL,
  sets INT DEFAULT 3,
  reps VARCHAR(20) DEFAULT '8-12',
  weight DECIMAL(5,2),
  duration INT COMMENT 'minutes',
  rest_seconds INT DEFAULT 60,
  order_index INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_plan_id (plan_id),
  INDEX idx_day_of_week (day_of_week),
  FOREIGN KEY (plan_id) REFERENCES workout_plans(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS plan_executions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  plan_id INT NOT NULL,
  plan_exercise_id INT NOT NULL,
  scheduled_date DATE NOT NULL,
  completed_at DATETIME,
  completed_reps INT,
  completed_weight DECIMAL(5,2),
  status ENUM('pending', 'completed', 'skipped') NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_plan_id (plan_id),
  INDEX idx_scheduled_date (scheduled_date),
  INDEX idx_status (status),
  FOREIGN KEY (plan_id) REFERENCES workout_plans(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_exercise_id) REFERENCES plan_exercises(id) ON DELETE CASCADE
);

-- User context for AI prompts
CREATE TABLE IF NOT EXISTS user_contexts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  context_text TEXT,
  profile_snapshot JSON,
  active_plan_name VARCHAR(255),
  active_plan_status VARCHAR(50),
  last_workout_date DATE,
  last_measurement_date DATE,
  total_workouts INT DEFAULT 0,
  total_measurements INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Chat messages for history
CREATE TABLE IF NOT EXISTS chat_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  role ENUM('user', 'assistant') NOT NULL,
  content TEXT NOT NULL,
  saved_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_created (user_id, created_at)
);