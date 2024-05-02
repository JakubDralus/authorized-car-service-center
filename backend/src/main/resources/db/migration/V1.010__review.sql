CREATE TABLE review (
    review_id BIGSERIAL NOT NULL,
    title VARCHAR(255),
    description VARCHAR(255),
    created_at TIMESTAMP,
    user_id BIGINT,
    PRIMARY KEY (review_id),
    FOREIGN KEY (user_id)
        REFERENCES user_data(user_id)
        ON DELETE CASCADE
);