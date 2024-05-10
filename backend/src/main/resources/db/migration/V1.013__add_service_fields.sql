ALTER TABLE service
    ADD COLUMN photo_big_key VARCHAR(255),
    ADD COLUMN photo_small_key VARCHAR(255),
    ADD COLUMN is_available BOOLEAN,
    ADD COLUMN is_featured BOOLEAN;
