CREATE TABLE invoice (
    invoice_id BIGSERIAL,
    ticket_id BIGINT,
    accountant_id BIGINT,
    PRIMARY KEY (invoice_id),
    FOREIGN KEY (ticket_id) REFERENCES ticket (ticket_id),
    FOREIGN KEY (accountant_id) REFERENCES accountant (accountant_id)
);