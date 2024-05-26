ALTER TABLE service
    ADD COLUMN description TEXT,
    ALTER COLUMN photo_big_key TYPE TEXT,
    ALTER COLUMN photo_small_key TYPE TEXT;