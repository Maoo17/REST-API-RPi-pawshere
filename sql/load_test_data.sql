Use paws;
DELETE FROM cat_profiles;
INSERT INTO cat_profiles
    (tag_id, name, home_group, is_chipped, owner, home, gps)
VALUES
    (12, "Tiger", "home 2", "no", "Lars Persson", "Dragongatan 3B, 379 40 Karlskrona", "56.164115,15.585870"),
    (15, "Luna", "Almas katter", "yes", "Alma Holm", "Drottninggatan 57, 335 80 Karlskrona", "56.164450, 15.567168"),
    (20, "Nugget", "Almas katter", "yes", "Alma Holm", "Drottninggatan 57, 335 80 Karlskrona", "52.163470, 11.547190"),
    (56, "Maja", "hemlösa", "yes", "Katthemmet", "Ringvägen 8, 378 90 Malmö", "55.162460, 18.547241");


DELETE FROM api_users;
INSERT INTO api_users
    (id, api_key, email)
VALUES
    (null, "bYJhReUH7veOPEyY2HJvx7RNtFCZZV55", "test@gmail.com");
