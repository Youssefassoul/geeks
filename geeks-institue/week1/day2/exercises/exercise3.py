brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["H&M", "Benetton", "Gap"],
    "number_stores": 7000,
    "major_color": {"France": "blue", "Spain": "red", "US": "pink, green"},
}

brand["number_stores"] = 2
clients = brand["type_of_clothes"]
print(f"Zara’s clients are {', '.join(clients[:-1])}, and {clients[-1]}.")
# This line is already correct and does not need modification.

brand["country_creation"] = "Spain"
if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")


del brand["creation_date"]
print(brand["international_competitors"][-1])
print(brand["major_color"]["US"])
print(len(brand))
print(brand.keys())
more_on_zara = {"creation_date": 1975, "number_stores": 10000}
brand.update(more_on_zara)
print(brand["number_stores"])
