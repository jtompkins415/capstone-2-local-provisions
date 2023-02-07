CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email VARCHAR(255) NOT NULL
        CHECK (position('@' IN email) > 1),
    isAdmin BOOLEAN NOT NULL DEFAULT FALSE 
);

CREATE TABLE POIs(
    id SERIAL PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    rating FLOAT NOT NULL,
    type TEXT NOT NULL,
    url TEXT NOT NULL,
)

CREATE TABLE favorites (
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  POI_id INTEGER
    REFERENCES POIs ON DELETE CASCADE,
  PRIMARY KEY (username, POI_id)
);