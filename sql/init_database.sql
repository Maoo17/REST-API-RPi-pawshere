use paws;

DROP TABLE api_users;
CREATE TABLE IF NOT EXISTS api_users (
    id INT AUTO_INCREMENT,
    api_key VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    password VRCHAR(255),
    PRIMARY KEY (id)
);

DROP TABLE cat_profiles;
CREATE TABLE IF NOT EXISTS cat_profiles (
    tag_id INT,
    name VARCHAR(255),
    home_group VARCHAR(255),
    is_chipped VARCHAR(20),
    owner VARCHAR(255),
    home VARCHAR(255),
    gps VARCHAR(255),
    PRIMARY KEY (tag_id)
);
