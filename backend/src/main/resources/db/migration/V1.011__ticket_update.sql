create table ticket_update (
    ticket_update_id BIGSERIAL PRIMARY KEY,
    description TEXT,
    severity VARCHAR,
    created_at TIMESTAMP,
    ticket_id BIGINT,
    FOREIGN KEY (ticket_id) REFERENCES ticket (ticket_id)
);