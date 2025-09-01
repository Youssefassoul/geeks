from app import create_app
from models import db, Event, Organizer, Attendee, Ticket
from datetime import datetime, date, timedelta
import random


def seed_database():
    app = create_app()

    with app.app_context():
        db.drop_all()
        db.create_all()

        print("Seeding organizers...")
        organizers = [
            Organizer(
                name="Tech Events Inc", contact_info="tech@events.com, +1-555-0101"
            ),
            Organizer(
                name="Music Productions", contact_info="music@prod.com, +1-555-0102"
            ),
            Organizer(
                name="Sports Arena", contact_info="sports@arena.com, +1-555-0103"
            ),
            Organizer(name="Art Gallery", contact_info="art@gallery.com, +1-555-0104"),
            Organizer(
                name="Conference Center", contact_info="conf@center.com, +1-555-0105"
            ),
            Organizer(
                name="Community Events",
                contact_info="community@events.com, +1-555-0106",
            ),
            Organizer(
                name="Business Network",
                contact_info="business@network.com, +1-555-0107",
            ),
            Organizer(name="Educational Hub", contact_info="edu@hub.com, +1-555-0108"),
            Organizer(
                name="Food Festival", contact_info="food@festival.com, +1-555-0109"
            ),
            Organizer(
                name="Startup Meetup", contact_info="startup@meetup.com, +1-555-0110"
            ),
        ]

        for org in organizers:
            db.session.add(org)
        db.session.commit()

        print("Seeding events...")
        events = [
            Event(
                name="Python Conference 2024",
                date=date(2024, 3, 15),
                location="Convention Center",
                description="Annual Python developers conference",
                organizer_id=1,
            ),
            Event(
                name="Rock Music Festival",
                date=date(2024, 4, 20),
                location="City Park",
                description="3-day rock music festival",
                organizer_id=2,
            ),
            Event(
                name="Basketball Championship",
                date=date(2024, 5, 10),
                location="Sports Arena",
                description="Regional basketball championship",
                organizer_id=3,
            ),
            Event(
                name="Modern Art Exhibition",
                date=date(2024, 3, 25),
                location="Art Gallery",
                description="Contemporary art showcase",
                organizer_id=4,
            ),
            Event(
                name="Business Leadership Summit",
                date=date(2024, 6, 5),
                location="Conference Hall",
                description="Leadership and management conference",
                organizer_id=5,
            ),
            Event(
                name="Community Cleanup Day",
                date=date(2024, 4, 15),
                location="Downtown",
                description="Volunteer community service event",
                organizer_id=6,
            ),
            Event(
                name="Networking Night",
                date=date(2024, 3, 30),
                location="Business Center",
                description="Professional networking event",
                organizer_id=7,
            ),
            Event(
                name="AI Workshop",
                date=date(2024, 5, 20),
                location="Tech Campus",
                description="Machine learning workshop",
                organizer_id=8,
            ),
            Event(
                name="Food Truck Rally",
                date=date(2024, 4, 25),
                location="Central Plaza",
                description="Local food truck gathering",
                organizer_id=9,
            ),
            Event(
                name="Startup Pitch Competition",
                date=date(2024, 6, 15),
                location="Innovation Hub",
                description="Entrepreneurs pitch their startups",
                organizer_id=10,
            ),
            Event(
                name="Jazz Night",
                date=date(2024, 3, 20),
                location="Jazz Club",
                description="Live jazz music performance",
                organizer_id=2,
            ),
            Event(
                name="Tech Talk: Cloud Computing",
                date=date(2024, 4, 10),
                location="Tech Campus",
                description="Cloud technology presentation",
                organizer_id=1,
            ),
        ]

        for event in events:
            db.session.add(event)
        db.session.commit()

        print("Seeding attendees...")
        attendees = [
            Attendee(name="John Smith", email="john@email.com", phone="+1-555-1001"),
            Attendee(name="Jane Doe", email="jane@email.com", phone="+1-555-1002"),
            Attendee(name="Mike Johnson", email="mike@email.com", phone="+1-555-1003"),
            Attendee(name="Sarah Wilson", email="sarah@email.com", phone="+1-555-1004"),
            Attendee(name="David Brown", email="david@email.com", phone="+1-555-1005"),
            Attendee(name="Lisa Garcia", email="lisa@email.com", phone="+1-555-1006"),
            Attendee(name="Chris Lee", email="chris@email.com", phone="+1-555-1007"),
            Attendee(name="Emily Davis", email="emily@email.com", phone="+1-555-1008"),
            Attendee(
                name="Alex Rodriguez", email="alex@email.com", phone="+1-555-1009"
            ),
            Attendee(
                name="Maria Martinez", email="maria@email.com", phone="+1-555-1010"
            ),
            Attendee(name="Tom Anderson", email="tom@email.com", phone="+1-555-1011"),
            Attendee(
                name="Jessica Taylor", email="jessica@email.com", phone="+1-555-1012"
            ),
            Attendee(name="Ryan Thomas", email="ryan@email.com", phone="+1-555-1013"),
            Attendee(name="Amy Jackson", email="amy@email.com", phone="+1-555-1014"),
            Attendee(name="Kevin White", email="kevin@email.com", phone="+1-555-1015"),
        ]

        for attendee in attendees:
            db.session.add(attendee)
        db.session.commit()

        print("Seeding tickets...")
        # Create random tickets (many-to-many relationships)
        ticket_combinations = []
        for event_id in range(1, 13):  # 12 events
            # Each event gets random number of attendees (1-8)
            num_attendees = random.randint(1, 8)
            attendee_ids = random.sample(range(1, 16), num_attendees)  # 15 attendees

            for attendee_id in attendee_ids:
                if (event_id, attendee_id) not in ticket_combinations:
                    ticket_combinations.append((event_id, attendee_id))
                    ticket = Ticket(event_id=event_id, attendee_id=attendee_id)
                    db.session.add(ticket)

        db.session.commit()

        print(f"Database seeded successfully!")
        print(f"Created {len(organizers)} organizers")
        print(f"Created {len(events)} events")
        print(f"Created {len(attendees)} attendees")
        print(f"Created {len(ticket_combinations)} tickets")


if __name__ == "__main__":
    seed_database()
