CREATE TABLE car (
    car_id BIGSERIAL PRIMARY KEY,
    model VARCHAR(255),
    manufactured_year BIGINT,
    license_plate VARCHAR(32),
    postal_code VARCHAR(16),
    vin VARCHAR(255),
    color VARCHAR(255),
    mileage BIGINT,
    owner_id BIGINT,
    foreign key (owner_id) references user_data(id)
);