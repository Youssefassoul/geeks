-- ============================================
-- Additional queries for today's tasks
-- ============================================

-- A) All items, ordered by price (lowest to highest)
SELECT * FROM items ORDER BY price ASC;

-- B) Items with a price above 80 (80 included), ordered by price (highest to lowest)
SELECT * FROM items WHERE price >= 80 ORDER BY price DESC;

-- C) First 3 customers by first name (A-Z), excluding the primary key column
SELECT first_name, last_name FROM customers ORDER BY first_name ASC LIMIT 3;

-- D) All last names only, in reverse alphabetical order (Z-A)
SELECT last_name FROM customers ORDER BY last_name DESC;


