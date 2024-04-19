CREATE TABLE ticket (
    ticket_id BIGSERIAL PRIMARY KEY,
    description TEXT,
    full_cost INTEGER,
    status VARCHAR(20),
    created_at TIMESTAMP,
    last_updated_at TIMESTAMP,
    finished_at TIMESTAMP,
    customer_id BIGINT,
    FOREIGN KEY (customer_id) REFERENCES user_data(user_id)
);
