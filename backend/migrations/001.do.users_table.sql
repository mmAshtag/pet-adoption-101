CREATE TABLE IF NOT EXISTS users (
  id            VARCHAR(100) PRIMARY KEY DEFAULT (UUID()),
  email         VARCHAR(100) NOT NULL,
  password      VARCHAR(200) NOT NULL,
  firstName     VARCHAR(50) NOT NULL,
  lastName      VARCHAR(50) NOT NULL,
  tel           VARCHAR(20),
  bio           VARCHAR(255)
)