CREATE TABLE car (
    car_id BIGSERIAL PRIMARY KEY,
    model VARCHAR(255),
    manufactured_year INT,
    license_plate VARCHAR(32),
    vin VARCHAR(255),
    color VARCHAR(255),
    mileage INT,
    owner_id BIGINT,
    foreign key (owner_id) references user_data(user_id)
);