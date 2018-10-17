Use paws;
DELETE FROM cat_profiles;
DELETE FROM app_users;
DELETE FROM api_users;

INSERT INTO app_users
    (id, username, password)
VALUES
    (1, "Alm2", "testpass"),
    (2, "Lars1", "testpass2"),
    (3, "katthemmet", "testpass3");

INSERT INTO cat_profiles
    (owner_id, tag_id, name, home_group, is_chipped, owner, home, gps, img)
VALUES
    (2, 12, "Tiger", "home 2", "no", "Lars Persson", "Dragongatan 3B, 379 40 Karlskrona", "56.164115,15.585870", "kitten.jpg"),
    (1, 15, "Luna", "Almas katter", "yes", "Alma Holm", "Drottninggatan 57, 335 80 Karlskrona", "56.164450, 15.567168", "kitten2.jpg"),
    (1, 20, "Nugget", "Almas katter", "yes", "Alma Holm", "Drottninggatan 57, 335 80 Karlskrona", "56.164450, 15.27190", "kitten3.jpg"),
    (3, 56, "Maja", "hemlösa", "yes", "Katthemmet", "Ringvägen 8, 378 90 Malmö", "55.162460, 18.547241", "kitten.jpg");


INSERT INTO api_users
    (id, api_key, email)
VALUES
    (null, "bYJhReUH7veOPEyY2HJvx7RNtFCZZV55", "test@gmail.com");




DROP VIEW IF EXISTS ownersView;
CREATE VIEW ownersView
AS SELECT au.id AS "Owner Id", cp.owner AS "Owner Name", cp.tag_id AS "Tag Id", cp.name AS "Cat Name"
FROM
    app_users au, cat_profiles cp
WHERE
    cp.owner_id=au.id;

SELECT * FROM ownersView;
