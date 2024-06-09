ALTER TABLE ticket
    ADD COLUMN reserved_id BIGINT,
    ADD CONSTRAINT fk_reserved_id FOREIGN KEY (reserved_id) REFERENCES reserved_hours(reserved_id);