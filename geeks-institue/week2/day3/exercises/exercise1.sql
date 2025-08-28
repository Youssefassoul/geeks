-- 1
SELECT *
FROM language;

-- 2
SELECT f.title, f.description, l.name AS language
FROM film f
JOIN language l
  ON f.language_id = l.language_id
ORDER BY l.name, f.title;

-- 3
SELECT f.title, f.description, l.name AS language
FROM language l
LEFT JOIN film f
  ON f.language_id = l.language_id
ORDER BY l.name, f.title;

-- 4
CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO new_film (name)
VALUES 
    ('The Silent Driver'),
    ('Dreams of Casablanca'),
    ('Tokyo Drift Legends'),
    ('Code Warriors'),
    ('The Last Samurai Reloaded');


-- 5
CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL,
    language_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    score INT CHECK (score BETWEEN 1 AND 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_film
        FOREIGN KEY (film_id)
        REFERENCES new_film(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_language
        FOREIGN KEY (language_id)
        REFERENCES language(language_id)
);

-- 6
INSERT INTO customer_review (film_id, review, rating)
VALUES (1, 'Great movie!', 5);
INSERT INTO customer_review (film_id, review, rating)
VALUES (1, 'Great movie!', 5);

-- 7
DELETE FROM new_film WHERE id = 1;
-- Because of ON DELETE CASCADE, all reviews linked to film_id = 1 will be automatically deleted from customer_review.