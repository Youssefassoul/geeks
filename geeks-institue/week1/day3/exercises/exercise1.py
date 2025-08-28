class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age


cat1 = Cat("Whiskers", 3)
cat2 = Cat("Mittens", 5)

cats = [cat1, cat2]


def find_old_cat(cats):
    if not cats:
        return None  # Handle the case of an empty list

    oldest_cat = cats[0]  # Initialize with the first cat
    for cat in cats[1:]:  # Iterate from the second cat
        if cat.age > oldest_cat.age:
            oldest_cat = cat
    return oldest_cat


oldest_cat = find_old_cat(cats)
print(f"The oldest cat is {oldest_cat.name}, and is {oldest_cat.age} years old.")
