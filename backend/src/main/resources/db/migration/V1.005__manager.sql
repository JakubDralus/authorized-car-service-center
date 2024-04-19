CREATE TABLE manager (
    manager_id BIGSERIAL PRIMARY KEY,
    salary INTEGER,
    user_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES user_data(user_id)
);
