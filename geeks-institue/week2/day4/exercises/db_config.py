import psycopg2  # type: ignore


def get_connection():
    return psycopg2.connect(
        dbname="restaurant",
        user="postgres",
        password="70752001",
        host="localhost",
        port="5432",
    )
