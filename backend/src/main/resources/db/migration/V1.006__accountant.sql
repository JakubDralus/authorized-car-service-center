CREATE TABLE accountant (
    accountant_id BIGSERIAL PRIMARY KEY,
    salary INT,
    user_id BIGINT,
    foreign key (user_id) references user_data(user_id)
);