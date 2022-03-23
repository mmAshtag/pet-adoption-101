CREATE TABLE IF NOT EXISTS admins (
    userName            VARCHAR(100) PRIMARY KEY,
    hashed_password     VARCHAR(100),
    role                VARCHAR(50)
)