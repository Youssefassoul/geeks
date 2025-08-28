-- 1
UPDATE film
SET language_id = 2   -- 2 = French for example
WHERE film_id IN (1, 2, 3);

-- 2
store_id → references store(store_id)

address_id → references address(address_id)

Effect:
When inserting into customer, the store_id and address_id you provide must already exist in the store and address tables. Otherwise you’ll get a foreign key constraint error.

-- 3
DROP TABLE customer_review;

-- 4
SELECT COUNT(*)
FROM rental
WHERE return_date IS NULL;

-- 5
SELECT f.title, f.replacement_cost, r.rental_date
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
ORDER BY f.replacement_cost DESC
LIMIT 30;

-- 6
/*film 1*/
SELECT f.title, f.replacement_cost, r.rental_date
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
ORDER BY f.replacement_cost DESC
LIMIT 30;

SELECT title
FROM film
WHERE length < 60
  AND rating = 'R'
  AND description ILIKE '%documentary%';

/*film 3*/
SELECT DISTINCT f.title
FROM payment p
JOIN rental r ON p.rental_id = r.rental_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE c.first_name = 'MATTHEW' AND c.last_name = 'MAHAN'
  AND p.amount > 4
  AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';

/*film 4*/
SELECT DISTINCT f.title, f.replacement_cost
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE c.first_name = 'MATTHEW' AND c.last_name = 'MAHAN'
  AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC
LIMIT 1;
