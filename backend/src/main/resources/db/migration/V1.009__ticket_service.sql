CREATE TABLE ticket_service (
    ticket_id BIGINT,
    service_id BIGINT,
    PRIMARY KEY (ticket_id, service_id),
    FOREIGN KEY (ticket_id) REFERENCES ticket (ticket_id),
    FOREIGN KEY (service_id) REFERENCES service (service_id)
);

ALTER TABLE ticket
    ADD COLUMN car_id BIGINT,
    ADD CONSTRAINT fk_car_id FOREIGN KEY (car_id) REFERENCES car(car_id);