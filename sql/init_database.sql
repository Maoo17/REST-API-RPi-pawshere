use paws;

DROP TABLE  IF EXISTS api_users;
CREATE TABLE api_users (
    id INT AUTO_INCREMENT,
    api_key VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS cat_profiles;
CREATE TABLE cat_profiles (
    tag_id INT,
    name VARCHAR(255),
    home_group VARCHAR(255),
    is_chipped VARCHAR(20),
    owner VARCHAR(255),
    home VARCHAR(255),
    gps VARCHAR(255),
    PRIMARY KEY (tag_id)
);
