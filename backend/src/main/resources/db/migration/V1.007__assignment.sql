CREATE TABLE assignment (
    assignment_id BIGSERIAL PRIMARY KEY,
    description TEXT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    ticket_id BIGINT,
    manager_id BIGINT,
    mechanic_id BIGINT,
    FOREIGN KEY (manager_id) REFERENCES manager(manager_id),
    FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id),
    FOREIGN KEY (mechanic_id) REFERENCES mechanic(mechanic_id)
);
