# Event Management System API

A Flask-based REST API for managing events, organizers, attendees, and tickets with comprehensive analytics.

## Features

### Core CRUD Operations

- **Events**: Create, read, update, delete events
- **Organizers**: Manage event organizers
- **Attendees**: Handle attendee registration
- **Tickets**: Manage event registrations (many-to-many relationship)

### Advanced Features

- **Pagination**: 6 items per page on all listing endpoints
- **Search**: Search events by name
- **Analytics Dashboard**: Statistics with SQL subqueries
- **Database Relationships**: Proper foreign key constraints with CASCADE delete
- **Data Validation**: Input validation and error handling

### SQL Subqueries Used

- Events per organizer count
- Most popular events by attendee count
- Most active attendees
- Events with no attendees

## Database Schema

```
organizers (id, name, contact_info, created_at)
    ↓ (1:many)
events (id, name, date, location, description, organizer_id, created_at)
    ↓ (many:many via tickets)
attendees (id, name, email, phone, created_at)

tickets (id, event_id, attendee_id, created_at)
```

## Setup Instructions

### Prerequisites

- Python 3.8+
- PostgreSQL 12+

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd goddamn-project
```

2. **Create virtual environment**

```bash
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

4. **Database Setup**

```bash
# Create PostgreSQL database
psql -U postgres
CREATE DATABASE event_management;
\q

# Or run the SQL schema file
psql -U postgres -f databases/event.sql
```

5. **Environment Variables**
   Create a `.env` file:

```
DATABASE_URL=postgresql://username:password@localhost/event_management
```

6. **Seed Database (Optional)**

```bash
python seed_data.py
```

7. **Run Application**

```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Events

- `GET /events` - List events (with pagination & search)
- `POST /events` - Create event
- `GET /events/{id}` - Get event details
- `PUT /events/{id}` - Update event
- `DELETE /events/{id}` - Delete event

### Organizers

- `GET /organizers` - List organizers (with pagination)
- `POST /organizers` - Create organizer
- `GET /organizers/{id}` - Get organizer details
- `PUT /organizers/{id}` - Update organizer
- `DELETE /organizers/{id}` - Delete organizer

### Attendees

- `GET /attendees` - List attendees (with pagination)
- `POST /attendees` - Create attendee
- `GET /attendees/{id}` - Get attendee details
- `PUT /attendees/{id}` - Update attendee
- `DELETE /attendees/{id}` - Delete attendee

### Tickets

- `GET /tickets` - List tickets (with pagination)
- `POST /tickets` - Create ticket (register attendee for event)
- `DELETE /tickets/{id}` - Delete ticket

### Analytics

- `GET /dashboard` - Analytics dashboard with statistics

## Example Usage

### Create Event

```bash
curl -X POST http://localhost:5000/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Python Workshop",
    "date": "2024-04-15",
    "location": "Tech Center",
    "description": "Learn Python basics",
    "organizer_id": 1
  }'
```

### Search Events

```bash
curl "http://localhost:5000/events?search=python&page=1"
```

### Get Analytics

```bash
curl http://localhost:5000/dashboard
```

## Project Structure

```
project/
├── app.py              # Main Flask application
├── models.py           # Database models
├── seed_data.py        # Database seeding script
├── databases/
│   └── event.sql       # Database schema
├── requirements.txt    # Python dependencies
└── README.md          # This file
```

## Database Design Features

- **Primary Keys**: Auto-incrementing IDs for all tables
- **Foreign Keys**: Proper relationships with CASCADE delete
- **Constraints**: Unique constraints and NOT NULL validations
- **Indexes**: Performance optimization on frequently queried columns
- **Many-to-Many**: Events ↔ Attendees through tickets table

## Assignment Compliance

This project meets all Event Management assignment requirements:

✅ **Mandatory Features**

- Core CRUD operations for all entities
- Pagination (6 items per page)
- Search functionality
- Proper database relationships
- Foreign key constraints with CASCADE
- Database seeding with sample data
- Analytics dashboard with SQL subqueries

✅ **Technical Requirements**

- Flask backend with proper structure
- PostgreSQL database
- Clean, readable code
- Git repository with proper commits
- Documentation and setup instructions

## SQL Subquery Examples

The dashboard endpoint uses several SQL subqueries:

```sql
-- Events per organizer
SELECT o.name, (SELECT COUNT(*) FROM events e WHERE e.organizer_id = o.id)
FROM organizers o;

-- Popular events
SELECT e.name, (SELECT COUNT(*) FROM tickets t WHERE t.event_id = e.id)
FROM events e
WHERE (SELECT COUNT(*) FROM tickets t WHERE t.event_id = e.id) > 0;
```

## Testing the Database Connection

If you encounter database connection issues:

1. Check PostgreSQL is running
2. Verify database credentials in environment variables
3. Ensure database exists
4. Test connection: `psql -U username -d event_management`

## Notes

- All API responses are in JSON format
- Error handling included for invalid requests
- Pagination metadata included in list responses
- Timestamps automatically added to all records
- Unique constraints prevent duplicate tickets per event/attendee pair
