from flask import Flask, request, jsonify
from models import db, Event, Organizer, Attendee, Ticket
from datetime import datetime
import os


def create_app():
    app = Flask(__name__)
    app.secret_key = "your-secret-key-here"

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
        "DATABASE_URL", "postgresql://postgres:70752001@localhost/event_management"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()

    @app.route("/")
    def index():
        return jsonify(
            {
                "message": "Event Management API",
                "endpoints": {
                    "events": "/events",
                    "organizers": "/organizers",
                    "attendees": "/attendees",
                    "tickets": "/tickets",
                    "dashboard": "/dashboard",
                },
            }
        )

    @app.route("/events", methods=["GET"])
    def get_events():
        page = request.args.get("page", 1, type=int)
        search = request.args.get("search", "")
        per_page = 6

        query = Event.query
        if search:
            query = query.filter(Event.name.ilike(f"%{search}%"))

        events = query.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify(
            {
                "events": [
                    {
                        "id": e.id,
                        "name": e.name,
                        "date": e.date.isoformat(),
                        "location": e.location,
                        "description": e.description,
                        "organizer_id": e.organizer_id,
                        "organizer_name": e.organizer.name,
                        "created_at": e.created_at.isoformat(),
                    }
                    for e in events.items
                ],
                "pagination": {
                    "page": events.page,
                    "pages": events.pages,
                    "per_page": events.per_page,
                    "total": events.total,
                    "has_next": events.has_next,
                    "has_prev": events.has_prev,
                },
            }
        )

    @app.route("/events", methods=["POST"])
    def create_event():
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        try:
            event = Event(
                name=data["name"],
                date=datetime.strptime(data["date"], "%Y-%m-%d").date(),
                location=data.get("location"),
                description=data.get("description"),
                organizer_id=data["organizer_id"],
            )
            db.session.add(event)
            db.session.commit()
            return (
                jsonify(
                    {
                        "message": "Event created successfully!",
                        "event": {
                            "id": event.id,
                            "name": event.name,
                            "date": event.date.isoformat(),
                            "location": event.location,
                            "description": event.description,
                            "organizer_id": event.organizer_id,
                        },
                    }
                ),
                201,
            )
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    @app.route("/events/<int:id>", methods=["GET"])
    def get_event(id):
        event = Event.query.get_or_404(id)
        return jsonify(
            {
                "id": event.id,
                "name": event.name,
                "date": event.date.isoformat(),
                "location": event.location,
                "description": event.description,
                "organizer_id": event.organizer_id,
                "organizer_name": event.organizer.name,
                "attendees": [
                    {
                        "id": ticket.attendee.id,
                        "name": ticket.attendee.name,
                        "email": ticket.attendee.email,
                        "phone": ticket.attendee.phone,
                    }
                    for ticket in event.tickets
                ],
            }
        )

    @app.route("/events/<int:id>", methods=["PUT"])
    def update_event(id):
        event = Event.query.get_or_404(id)
        data = request.get_json()

        try:
            event.name = data.get("name", event.name)
            event.date = (
                datetime.strptime(data["date"], "%Y-%m-%d").date()
                if data.get("date")
                else event.date
            )
            event.location = data.get("location", event.location)
            event.description = data.get("description", event.description)
            event.organizer_id = data.get("organizer_id", event.organizer_id)

            db.session.commit()
            return jsonify({"message": "Event updated successfully!"})
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    @app.route("/events/<int:id>", methods=["DELETE"])
    def delete_event(id):
        event = Event.query.get_or_404(id)
        db.session.delete(event)
        db.session.commit()
        return jsonify({"message": "Event deleted successfully!"})

    @app.route("/organizers", methods=["GET"])
    def get_organizers():
        page = request.args.get("page", 1, type=int)
        organizers = Organizer.query.paginate(page=page, per_page=6, error_out=False)

        return jsonify(
            {
                "organizers": [
                    {
                        "id": o.id,
                        "name": o.name,
                        "contact_info": o.contact_info,
                        "event_count": len(o.events),
                    }
                    for o in organizers.items
                ],
                "pagination": {
                    "page": organizers.page,
                    "pages": organizers.pages,
                    "per_page": organizers.per_page,
                    "total": organizers.total,
                    "has_next": organizers.has_next,
                    "has_prev": organizers.has_prev,
                },
            }
        )

    @app.route("/organizers", methods=["POST"])
    def create_organizer():
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        try:
            organizer = Organizer(
                name=data["name"], contact_info=data.get("contact_info")
            )
            db.session.add(organizer)
            db.session.commit()
            return (
                jsonify(
                    {
                        "message": "Organizer created successfully!",
                        "organizer": {
                            "id": organizer.id,
                            "name": organizer.name,
                            "contact_info": organizer.contact_info,
                        },
                    }
                ),
                201,
            )
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    @app.route("/organizers/<int:id>", methods=["GET"])
    def get_organizer(id):
        organizer = Organizer.query.get_or_404(id)
        return jsonify(
            {
                "id": organizer.id,
                "name": organizer.name,
                "contact_info": organizer.contact_info,
                "events": [
                    {
                        "id": event.id,
                        "name": event.name,
                        "date": event.date.isoformat(),
                        "location": event.location,
                    }
                    for event in organizer.events
                ],
            }
        )

    @app.route("/organizers/<int:id>", methods=["PUT"])
    def update_organizer(id):
        organizer = Organizer.query.get_or_404(id)
        data = request.get_json()

        try:
            organizer.name = data.get("name", organizer.name)
            organizer.contact_info = data.get("contact_info", organizer.contact_info)

            db.session.commit()
            return jsonify({"message": "Organizer updated successfully!"})
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    @app.route("/organizers/<int:id>", methods=["DELETE"])
    def delete_organizer(id):
        organizer = Organizer.query.get_or_404(id)
        db.session.delete(organizer)
        db.session.commit()
        return jsonify({"message": "Organizer deleted successfully!"})

    @app.route("/attendees", methods=["GET"])
    def get_attendees():
        page = request.args.get("page", 1, type=int)
        attendees = Attendee.query.paginate(page=page, per_page=6, error_out=False)

        return jsonify(
            {
                "attendees": [
                    {
                        "id": a.id,
                        "name": a.name,
                        "email": a.email,
                        "phone": a.phone,
                        "events_count": len(a.tickets),
                        "created_at": a.created_at.isoformat(),
                    }
                    for a in attendees.items
                ],
                "pagination": {
                    "page": attendees.page,
                    "pages": attendees.pages,
                    "per_page": attendees.per_page,
                    "total": attendees.total,
                    "has_next": attendees.has_next,
                    "has_prev": attendees.has_prev,
                },
            }
        )

    @app.route("/attendees", methods=["POST"])
    def create_attendee():
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        try:
            attendee = Attendee(
                name=data["name"], email=data["email"], phone=data.get("phone")
            )
            db.session.add(attendee)
            db.session.commit()
            return (
                jsonify(
                    {
                        "message": "Attendee created successfully!",
                        "attendee": {
                            "id": attendee.id,
                            "name": attendee.name,
                            "email": attendee.email,
                            "phone": attendee.phone,
                        },
                    }
                ),
                201,
            )
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    @app.route("/attendees/<int:id>", methods=["GET"])
    def get_attendee(id):
        attendee = Attendee.query.get_or_404(id)
        return jsonify(
            {
                "id": attendee.id,
                "name": attendee.name,
                "email": attendee.email,
                "phone": attendee.phone,
                "events": [
                    {
                        "id": ticket.event.id,
                        "name": ticket.event.name,
                        "date": ticket.event.date.isoformat(),
                        "location": ticket.event.location,
                    }
                    for ticket in attendee.tickets
                ],
            }
        )

    @app.route("/attendees/<int:id>", methods=["PUT"])
    def update_attendee(id):
        attendee = Attendee.query.get_or_404(id)
        data = request.get_json()

        try:
            attendee.name = data.get("name", attendee.name)
            attendee.email = data.get("email", attendee.email)
            attendee.phone = data.get("phone", attendee.phone)

            db.session.commit()
            return jsonify({"message": "Attendee updated successfully!"})
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    @app.route("/attendees/<int:id>", methods=["DELETE"])
    def delete_attendee(id):
        attendee = Attendee.query.get_or_404(id)
        db.session.delete(attendee)
        db.session.commit()
        return jsonify({"message": "Attendee deleted successfully!"})

    @app.route("/tickets", methods=["GET"])
    def get_tickets():
        page = request.args.get("page", 1, type=int)
        tickets = Ticket.query.paginate(page=page, per_page=6, error_out=False)

        return jsonify(
            {
                "tickets": [
                    {
                        "id": t.id,
                        "event_id": t.event_id,
                        "event_name": t.event.name,
                        "event_date": t.event.date.isoformat(),
                        "attendee_id": t.attendee_id,
                        "attendee_name": t.attendee.name,
                        "attendee_email": t.attendee.email,
                        "created_at": t.created_at.isoformat(),
                    }
                    for t in tickets.items
                ],
                "pagination": {
                    "page": tickets.page,
                    "pages": tickets.pages,
                    "per_page": tickets.per_page,
                    "total": tickets.total,
                    "has_next": tickets.has_next,
                    "has_prev": tickets.has_prev,
                },
            }
        )

    @app.route("/tickets", methods=["POST"])
    def create_ticket():
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        try:
            ticket = Ticket(event_id=data["event_id"], attendee_id=data["attendee_id"])
            db.session.add(ticket)
            db.session.commit()
            return (
                jsonify(
                    {
                        "message": "Ticket created successfully!",
                        "ticket": {
                            "id": ticket.id,
                            "event_id": ticket.event_id,
                            "attendee_id": ticket.attendee_id,
                        },
                    }
                ),
                201,
            )
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    @app.route("/tickets/<int:id>", methods=["DELETE"])
    def delete_ticket(id):
        ticket = Ticket.query.get_or_404(id)
        db.session.delete(ticket)
        db.session.commit()
        return jsonify({"message": "Ticket deleted successfully!"})

    @app.route("/dashboard", methods=["GET"])
    def dashboard():
        total_events = Event.query.count()
        total_organizers = Organizer.query.count()
        total_attendees = Attendee.query.count()
        total_tickets = Ticket.query.count()

        # SQL Subquery: Events per organizer
        events_per_organizer = db.session.execute(
            db.text(
                """
            SELECT o.name as organizer_name, 
                   (SELECT COUNT(*) FROM events e WHERE e.organizer_id = o.id) as event_count
            FROM organizers o
            ORDER BY event_count DESC
        """
            )
        ).fetchall()

        # SQL Subquery: Most popular events by attendee count
        popular_events = db.session.execute(
            db.text(
                """
            SELECT e.name as event_name,
                   e.date as event_date,
                   (SELECT COUNT(*) FROM tickets t WHERE t.event_id = e.id) as attendee_count
            FROM events e
            WHERE (SELECT COUNT(*) FROM tickets t WHERE t.event_id = e.id) > 0
            ORDER BY attendee_count DESC
            LIMIT 5
        """
            )
        ).fetchall()

        # SQL Subquery: Attendees with most events
        active_attendees = db.session.execute(
            db.text(
                """
            SELECT a.name as attendee_name,
                   a.email as attendee_email,
                   (SELECT COUNT(*) FROM tickets t WHERE t.attendee_id = a.id) as events_attended
            FROM attendees a
            WHERE (SELECT COUNT(*) FROM tickets t WHERE t.attendee_id = a.id) > 0
            ORDER BY events_attended DESC
            LIMIT 5
        """
            )
        ).fetchall()

        # SQL Subquery: Events with no attendees
        empty_events = db.session.execute(
            db.text(
                """
            SELECT e.name as event_name, e.date as event_date, o.name as organizer_name
            FROM events e
            JOIN organizers o ON e.organizer_id = o.id
            WHERE NOT EXISTS (SELECT 1 FROM tickets t WHERE t.event_id = e.id)
            ORDER BY e.date
        """
            )
        ).fetchall()

        return jsonify(
            {
                "totals": {
                    "events": total_events,
                    "organizers": total_organizers,
                    "attendees": total_attendees,
                    "tickets": total_tickets,
                },
                "analytics": {
                    "events_per_organizer": [
                        {"organizer_name": row[0], "event_count": row[1]}
                        for row in events_per_organizer
                    ],
                    "popular_events": [
                        {
                            "event_name": row[0],
                            "event_date": row[1].isoformat() if row[1] else None,
                            "attendee_count": row[2],
                        }
                        for row in popular_events
                    ],
                    "active_attendees": [
                        {
                            "attendee_name": row[0],
                            "attendee_email": row[1],
                            "events_attended": row[2],
                        }
                        for row in active_attendees
                    ],
                    "empty_events": [
                        {
                            "event_name": row[0],
                            "event_date": row[1].isoformat() if row[1] else None,
                            "organizer_name": row[2],
                        }
                        for row in empty_events
                    ],
                },
            }
        )

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
