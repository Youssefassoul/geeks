from db_config import get_connection
from menu_items import MenuItem


class MenuManager:
    @classmethod
    def get_by_name(cls, name):
        conn = get_connection()
        cursor = conn.cursor()
        query = "SELECT item_name, item_price FROM Menu_Items WHERE item_name = %s"
        cursor.execute(query, (name,))
        row = cursor.fetchone()
        cursor.close()
        conn.close()
        if row:
            return MenuItem(row[0], row[1])
        return None

    @classmethod
    def get_all_items(cls):
        conn = get_connection()
        cursor = conn.cursor()
        query = "SELECT item_name, item_price FROM Menu_Items"
        cursor.execute(query)
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return [MenuItem(row[0], row[1]) for row in rows]
