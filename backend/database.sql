CREATE DATABASE pernproj4;

CREATE TABLE user(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    hash BIT(64),
    email VARCHAR(50),
    country VARCHAR(50),
    city VARCHAR(50),
    role VARCHAR(10)
)

CREATE TABLE request(
    id SERIAL PRIMARY KEY,
    description VARCHAR(100),
    date DATE,
    price INT,
    country VARCHAR(50),
    city VARCHAR(50),
    user_id INT
)

CREATE TABLE trip(
    id SERIAL PRIMARY KEY,
    start_date DATE,
    end_date DATE,
    country VARCHAR(50),
    city VARCHAR(50),
    user_id INT
)

CREATE TABLE transaction(
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    status VARCHAR(50),
    type_id INT
)

CREATE TABLE item(
    id SERIAL PRIMARY KEY
    user_id INT
    type_id INT
)

CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    type VARCHAR(50),
    country VARCHAR(50),
    city VARCHAR(50),
    item_id INT
)