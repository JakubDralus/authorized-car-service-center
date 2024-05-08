ALTER TABLE service
    ADD COLUMN photo_url VARCHAR(255) UNIQUE,
    ADD COLUMN is_available BOOLEAN,
    ADD COLUMN is_featured BOOLEAN;
