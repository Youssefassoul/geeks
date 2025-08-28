from psycopg2 import connect
from psycopg2.extras import RealDictConnection
import os
from dotenv import load_dotenv

load_dotenv()


def connect_to_db():
    try:
        conn = connect(
            host=os.getenv("PGHOST"),
            port=int(os.getenv("PGPORT", "5432")),
            database=os.getenv("PGDATABASE"),
            user=os.getenv("PGUSER"),
            password=os.getenv("PGPASSWORD"),
            sslmode=os.getenv("PGSSLMODE", "require"),
            connection_factory=RealDictConnection,
        )
        try:
            cur = conn.cursor()
            cur.execute("SET search_path TO public")
            conn.commit()
            cur.close()
        except Exception:
            pass
        return conn
    except Exception as e:
        print(e)
        return None
