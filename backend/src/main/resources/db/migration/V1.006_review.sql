create table review (
    review_id bigserial not null,
    title varchar(255),
    description varchar(255),
    created_at TIMESTAMP,
    foreign key (user_id) references user_data(user_id),
    primary key (review_id)
);