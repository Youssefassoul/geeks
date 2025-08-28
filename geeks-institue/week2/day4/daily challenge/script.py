import requests  # pyright: ignore[reportMissingModuleSource]
import random
from config import connect

API_URL = (
    "https://restcountries.com/v3.1/all?fields=name,capital,flags,subregion,population"
)


def fetch_countries():
    response = requests.get(API_URL)
    print("Status code:", response.status_code)
    if response.status_code == 200:
        return response.json()
    else:
        print("Response text:", response.text)
        raise Exception("Failed to fetch data from API")


def insert_countries(countries):
    conn = connect()
    cur = conn.cursor()

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS countries (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            capital TEXT NOT NULL,
            flag TEXT NOT NULL,
            subregion TEXT NOT NULL,
            population BIGINT NOT NULL
        )
        """
    )

    for country in countries:
        name = country.get("name", {}).get("common", "Unknown")
        capital = (country.get("capital") or ["Unknown"])[0]
        flag = country.get("flags", {}).get("png", "")
        subregion = country.get("subregion", "Unknown")
        population = country.get("population", 0)

        cur.execute(
            """
            INSERT INTO countries (name, capital, flag, subregion, population)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (name, capital, flag, subregion, population),
        )

    conn.commit()
    cur.close()

    conn.close()
    print("Countries inserted successfully!")


if __name__ == "__main__":
    all_countries = fetch_countries()
    random_countries = random.sample(all_countries, 10)
    insert_countries(random_countries)
