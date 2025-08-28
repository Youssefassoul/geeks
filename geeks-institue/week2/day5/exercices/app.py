from flask import Flask, render_template, request, redirect, url_for, flash
from db_config import get_connection


app = Flask(__name__)
app.secret_key = "dev-secret-key"


def table_has_id_column():
    conn = get_connection()
    cursor = conn.cursor()
    query = """
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'menu_items' AND column_name = 'id'
        UNION ALL
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'Menu_Items' AND column_name = 'id'
        """
    cursor.execute(query)
    exists = cursor.fetchone() is not None
    cursor.close()
    conn.close()
    return exists


HAS_ID = table_has_id_column()


def get_all_items():
    conn = get_connection()
    cursor = conn.cursor()
    if HAS_ID:
        cursor.execute("SELECT id, item_name, item_price FROM Menu_Items ORDER BY id")
        rows = cursor.fetchall()
        items = []
        for row in rows:
            items.append(
                {
                    "identifier": str(row[0]),
                    "name": row[1],
                    "price": row[2],
                }
            )
    else:
        cursor.execute(
            "SELECT item_name, item_price FROM Menu_Items ORDER BY item_name"
        )
        rows = cursor.fetchall()
        items = []
        for row in rows:
            items.append({"identifier": row[0], "name": row[0], "price": row[1]})
    cursor.close()
    conn.close()
    return items


def get_item(identifier):
    conn = get_connection()
    cursor = conn.cursor()
    if HAS_ID and identifier.isdigit():
        cursor.execute(
            "SELECT id, item_name, item_price FROM Menu_Items WHERE id = %s",
            (int(identifier),),
        )
    else:
        cursor.execute(
            ("SELECT item_name, item_price FROM Menu_Items" " WHERE item_name = %s"),
            (identifier,),
        )
    row = cursor.fetchone()
    cursor.close()
    conn.close()
    if not row:
        return None
    if HAS_ID and identifier.isdigit():
        return {
            "identifier": str(row[0]),
            "name": row[1],
            "price": row[2],
        }
    return {"identifier": row[0], "name": row[0], "price": row[1]}


def add_item(name, price):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s)",
        (name, price),
    )
    conn.commit()
    cursor.close()
    conn.close()


def update_item(identifier, new_name, new_price):
    conn = get_connection()
    cursor = conn.cursor()
    if HAS_ID and identifier.isdigit():
        cursor.execute(
            ("UPDATE Menu_Items SET item_name = %s, item_price = %s" " WHERE id = %s"),
            (new_name, new_price, int(identifier)),
        )
    else:
        cursor.execute(
            (
                "UPDATE Menu_Items SET item_name = %s, item_price = %s"
                " WHERE item_name = %s"
            ),
            (new_name, new_price, identifier),
        )
    conn.commit()
    cursor.close()
    conn.close()


def delete_item(identifier):
    conn = get_connection()
    cursor = conn.cursor()
    if HAS_ID and identifier.isdigit():
        cursor.execute(
            "DELETE FROM Menu_Items WHERE id = %s",
            (int(identifier),),
        )
    else:
        cursor.execute(
            "DELETE FROM Menu_Items WHERE item_name = %s",
            (identifier,),
        )
    conn.commit()
    cursor.close()
    conn.close()


@app.route("/")
def home():
    return redirect(url_for("menu"))


@app.route("/menu")
def menu():
    items = get_all_items()
    return render_template("menu.html", items=items)


@app.route("/add", methods=["GET", "POST"])
def add():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        price_raw = request.form.get("price", "").strip()
        if not name or not price_raw:
            flash("Name and price are required.", "error")
            return redirect(url_for("add"))
        try:
            price = float(price_raw)
        except ValueError:
            flash("Price must be a number.", "error")
            return redirect(url_for("add"))
        add_item(name, price)
        flash("Item added.", "success")
        return redirect(url_for("menu"))
    return render_template("add_item.html")


@app.route("/update/<identifier>", methods=["GET", "POST"])
def update(identifier):
    item = get_item(identifier)
    if not item:
        flash("Item not found.", "error")
        return redirect(url_for("menu"))
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        price_raw = request.form.get("price", "").strip()
        if not name or not price_raw:
            flash("Name and price are required.", "error")
            return redirect(url_for("update", identifier=identifier))
        try:
            price = float(price_raw)
        except ValueError:
            flash("Price must be a number.", "error")
            return redirect(url_for("update", identifier=identifier))
        update_item(identifier, name, price)
        flash("Item updated.", "success")
        return redirect(url_for("menu"))
    return render_template("update_item.html", item=item)


@app.route("/delete/<identifier>", methods=["POST"])
def delete(identifier):
    delete_item(identifier)
    flash("Item deleted.", "success")
    return redirect(url_for("menu"))


if __name__ == "__main__":
    app.run(debug=True)
