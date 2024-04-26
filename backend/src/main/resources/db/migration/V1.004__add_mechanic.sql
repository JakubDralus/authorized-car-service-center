create table mechanic (
    mechanic_id bigserial not null,
    specialization varchar(255),
    salary int,
    user_id bigint,
    foreign key (user_id) references user_data(user_id),
    primary key (mechanic_id)
);