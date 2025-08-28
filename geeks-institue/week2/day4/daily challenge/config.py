import psycopg2


def connect():
    conn = psycopg2.connect(
        host="localhost",  # Your PostgreSQL host
        database="countries",  # The database you created
        user="postgres",  # Your PostgreSQL username
        password="70752001",  # Your PostgreSQL password
    )
    return conn
