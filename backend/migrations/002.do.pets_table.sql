CREATE TABLE IF NOT EXISTS pets (
  id              VARCHAR(100) PRIMARY KEY DEFAULT (UUID()),
  type            VARCHAR(100) NOT NULL,
  name            VARCHAR(100) NOT NULL,
  adoptionStatus  VARCHAR(20) NOT NULL,
  picture         VARCHAR(255) NOT NULL,
  color           VARCHAR(100) NOT NULL,
  breed           VARCHAR(255) NOT NULL,
  height          INT,
  weight          INT,
  bio             VARCHAR(255),
  hypoallergenic  BOOLEAN NOT NULL DEFAULT 0,
  dietary         VARCHAR(255),
  userId          VARCHAR(100)
);
