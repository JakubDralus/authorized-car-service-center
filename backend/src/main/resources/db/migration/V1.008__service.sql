CREATE TABLE service(
    service_id BIGSERIAL PRIMARY KEY,
    estimated_repair_time INTEGER,
    name VARCHAR(255),
    type VARCHAR(255),
    cost FLOAT
)