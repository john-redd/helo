create table users (
    user_id serial primary key,
    username varchar(50) not null,
    password varchar(250) not null,
    profile_pic text
);

create table posts (
    post_id serial primary key,
    title varchar(45),
    img text,
    content text,
    user_id int references users(user_id)
);