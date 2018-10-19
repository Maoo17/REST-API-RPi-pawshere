use paws;
DROP TABLE IF EXISTS cat_profiles;
DROP TABLE IF EXISTS users_cats;
DROP TABLE  IF EXISTS api_users;
DROP TABLE IF EXISTS app_users;


CREATE TABLE api_users (
    id INT AUTO_INCREMENT,
    api_key VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE app_users (
    id INT AUTO_INCREMENT,
    username VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE cat_profiles (
    tag_id INT,
    owner_id INT,
    name VARCHAR(255),
    home_group VARCHAR(255),
    is_chipped VARCHAR(20),
    owner VARCHAR(255),
    home VARCHAR(255),
    gps VARCHAR(255),
    before VARCHAR(255),
    img VARCHAR(255),
    PRIMARY KEY (tag_id),
    FOREIGN KEY (owner_id) REFERENCES app_users(id)
);
