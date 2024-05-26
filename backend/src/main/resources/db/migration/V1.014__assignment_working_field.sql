ALTER TABLE assignment
    ADD COLUMN working_service_id BIGINT,
    ADD CONSTRAINT fk_service_id FOREIGN KEY (working_service_id) REFERENCES service(service_id);