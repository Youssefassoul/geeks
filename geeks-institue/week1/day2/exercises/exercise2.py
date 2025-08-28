def ticket_price(age):

    if age < 3:
        return 0
    elif 3 <= age <= 12:
        return 10
    else:
        return 15


family = {"rick": 43, "beth": 13, "morty": 5, "summer": 8}

total_cost = 0
for name, age in family.items():
    price = ticket_price(age)
    print(f"{name.title()} has to pay ${price}")
    total_cost += price

print(f"Total family cost: ${total_cost}")


# bonus
family = {}

while True:
    name = input("Enter family member's name (or 'done' to finish): ").strip()
    if name.lower() == "done":
        break
    age = int(input(f"Enter {name.title()}'s age: "))
    family[name] = age

total_cost = 0
for name, age in family.items():
    price = ticket_price(age)
    print(f"{name.title()} has to pay ${price}")
    total_cost += price

print(f"Total family cost: ${total_cost}")
