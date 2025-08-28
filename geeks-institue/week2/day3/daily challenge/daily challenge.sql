/* PART 1 */
-- Create the customer table
CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE customer_profile (
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN DEFAULT FALSE,
    customer_id INT UNIQUE, -- one-to-one (each customer can only have one profile)
    CONSTRAINT fk_customer FOREIGN KEY (customer_id)
        REFERENCES customer (id)
        ON DELETE CASCADE
);

-- Insert sample data into the customer table
INSERT INTO customer (first_name, last_name)
VALUES 
    ('John', 'Doe'),
    ('Jerome', 'Lalu'),
    ('Lea', 'Rive');

-- Insert sample data into the customer_profile table
INSERT INTO customer_profile (isLoggedIn, customer_id)
VALUES 
    (TRUE,  (SELECT id FROM customer WHERE first_name = 'John' AND last_name = 'Doe')),
    (FALSE, (SELECT id FROM customer WHERE first_name = 'Jerome' AND last_name = 'Lalu'));

-- Query to find all logged-in customers
SELECT c.first_name
FROM customer c
JOIN customer_profile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = TRUE;


-- Query to find all customers and their login status
SELECT c.first_name, cp.isLoggedIn
FROM customer c
LEFT JOIN customer_profile cp ON c.id = cp.customer_id;

-- Query to count all customers who are not logged in
SELECT COUNT(*)
FROM customer c
LEFT JOIN customer_profile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = FALSE OR cp.isLoggedIn IS NULL;

/* PART 2 */
-- Create the book table
CREATE TABLE book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL
);

INSERT INTO book (title, author)
VALUES
    ('Alice In Wonderland', 'Lewis Carroll'),
    ('Harry Potter', 'J.K Rowling'),
    ('To Kill a Mockingbird', 'Harper Lee');

-- Create the student table
CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    age INT CHECK (age <= 15)
);

INSERT INTO student (name, age)
VALUES
    ('John', 12),
    ('Lera', 11),
    ('Patrick', 10),
    ('Bob', 14);

-- Create the library table
CREATE TABLE library (
    book_fk_id INT,
    student_fk_id INT,
    borrowed_date DATE,
    PRIMARY KEY (book_fk_id, student_fk_id, borrowed_date),
    FOREIGN KEY (book_fk_id) REFERENCES book (book_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (student_fk_id) REFERENCES student (student_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert sample data into the library table
INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES
    ((SELECT book_id FROM book WHERE title = 'Alice In Wonderland'),
     (SELECT student_id FROM student WHERE name = 'John'),
     '2022-02-15'),

    ((SELECT book_id FROM book WHERE title = 'To Kill a Mockingbird'),
     (SELECT student_id FROM student WHERE name = 'Bob'),
     '2021-03-03'),

    ((SELECT book_id FROM book WHERE title = 'Alice In Wonderland'),
     (SELECT student_id FROM student WHERE name = 'Lera'),
     '2021-05-23'),

    ((SELECT book_id FROM book WHERE title = 'Harry Potter'),
     (SELECT student_id FROM student WHERE name = 'Bob'),
     '2021-08-12');

-- Query to find all borrowed books
SELECT * FROM library;

-- Query to find all students who borrowed a specific book
SELECT s.name, b.title, l.borrowed_date
FROM library l
JOIN student s ON l.student_fk_id = s.student_id
JOIN book b ON l.book_fk_id = b.book_id;

-- Query to find the average age of students who borrowed a specific book
SELECT AVG(s.age) AS avg_age
FROM library l
JOIN student s ON l.student_fk_id = s.student_id
JOIN book b ON l.book_fk_id = b.book_id
WHERE b.title = 'Alice In Wonderland';

-- Query to delete a student
DELETE FROM student WHERE name = 'Bob';
