-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
drop table if exists peoples;
drop table if exists games;
drop table if exists songs;
drop table if exists movies;
drop table if exists smells;

create table peoples (
    id bigint generated always as identity primary key,
    name varchar,
    age bigint
);

create table games (
    id bigint generated always as identity primary key,
    title varchar,
    popularity varchar
);

create table songs (
    id bigint generated always as identity primary key,
    name varchar,
    rating varchar
);

create table movies (
    id bigint generated always as identity primary key,
    title varchar,
    imdb varchar
);

create table smells (
    id bigint generated always as identity primary key,
    name varchar,
    description varchar
);

insert into  peoples (
    name,
    age
)
values
    ('William', '3'),
    ('Billiam', '4'),
    ('Cilliam', '5')
;

insert into  games (
    title,
    popularity
)
values
    ('Crusher', 'very'),
    ('Brusher', 'not at all'),
    ('Frusher', 'extremely')
;

insert into  songs (
    name,
    rating
)
values
    ('Song', 'bad'),
    ('Dong', 'great'),
    ('Gong', 'amazing')
;

insert into  movies (
    title,
    imdb
)
values
    ('Shmitle', '6'),
    ('Bitle', '7'),
    ('Kitle', '8')
;

insert into  smells (
    name,
    description
)
values
    ('garbage', 'disgusting'),
    ('trees', 'amazing'),
    ('boiled chicken', 'ew')
;
