-- Event Management System Database Schema

CREATE DATABASE event_management;

\c event_management

-- Organizers table
CREATE TABLE organizers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_info VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    date DATE NOT NULL,
    location VARCHAR(200),
    description TEXT,
    organizer_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES organizers(id) ON DELETE CASCADE
);

-- Attendees table
CREATE TABLE attendees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tickets table (many-to-many relationship between events and attendees)
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL,
    attendee_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (attendee_id) REFERENCES attendees(id) ON DELETE CASCADE,
    UNIQUE(event_id, attendee_id)
);

-- Create indexes for better performance
CREATE INDEX idx_events_organizer ON events(organizer_id);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_tickets_event ON tickets(event_id);
CREATE INDEX idx_tickets_attendee ON tickets(attendee_id);
CREATE INDEX idx_attendees_email ON attendees(email);

-- Sample data insertion
INSERT INTO organizers (name, contact_info) VALUES 
('Tech Events Inc', 'tech@events.com, +1-555-0101'),
('Music Productions', 'music@prod.com, +1-555-0102'),
('Sports Arena', 'sports@arena.com, +1-555-0103'),
('Art Gallery', 'art@gallery.com, +1-555-0104'),
('Conference Center', 'conf@center.com, +1-555-0105');

INSERT INTO events (name, date, location, description, organizer_id) VALUES 
('Python Conference 2024', '2024-03-15', 'Convention Center', 'Annual Python developers conference', 1),
('Rock Music Festival', '2024-04-20', 'City Park', '3-day rock music festival', 2),
('Basketball Championship', '2024-05-10', 'Sports Arena', 'Regional basketball championship', 3),
('Modern Art Exhibition', '2024-03-25', 'Art Gallery', 'Contemporary art showcase', 4),
('Business Leadership Summit', '2024-06-05', 'Conference Hall', 'Leadership and management conference', 5);

INSERT INTO attendees (name, email, phone) VALUES 
('John Smith', 'john@email.com', '+1-555-1001'),
('Jane Doe', 'jane@email.com', '+1-555-1002'),
('Mike Johnson', 'mike@email.com', '+1-555-1003'),
('Sarah Wilson', 'sarah@email.com', '+1-555-1004'),
('David Brown', 'david@email.com', '+1-555-1005');

INSERT INTO tickets (event_id, attendee_id) VALUES 
(1, 1), (1, 2), (1, 3),
(2, 2), (2, 4), (2, 5),
(3, 1), (3, 3), (3, 5),
(4, 2), (4, 4),
(5, 1), (5, 2), (5, 3), (5, 4), (5, 5);
