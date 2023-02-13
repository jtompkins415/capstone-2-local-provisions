INSERT INTO users (username, password, firstName, lastName, email, isAdmin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        TRUE);

INSERT INTO POIs (name, rating, type, url)
VALUES('The Buena Vista', 
        4.6,
        'restaurant',
        'https://www.thebuenavista.com/home/home.html'),
        ('The Epicurian Trader',
         4.6,
         'convenience_store',
         'https://theepicureantrader.com/'),
         ('Dogpatch Saloon',
         4.6,
         'bar',
         'https://www.yelp.com/biz/dogpatch-saloon-san-francisco-3');

INSERT INTO favorites (user_id, POI_id)
VALUES(1,2), (1,3);

