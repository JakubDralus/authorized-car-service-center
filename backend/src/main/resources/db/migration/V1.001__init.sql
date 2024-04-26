create table address (
    address_id bigserial not null,
    country varchar(255),
    city varchar(255),
    street varchar(255),
    postal_code varchar(255),
    primary key (address_id)
);

CREATE TABLE user_data (
    user_id bigserial not null,
    first_name varchar(255),
    last_name varchar(255),
    telephone_number varchar(255),
    email varchar(255),
    password varchar(255),
    role varchar(255),
    created_at timestamp(6),
    address_id bigint,
    primary key (user_id),
    foreign key (address_id) references address(address_id)
);