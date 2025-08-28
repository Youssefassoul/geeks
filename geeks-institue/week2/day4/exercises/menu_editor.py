from menu_items import MenuItem
from menu_manager import MenuManager


def show_user_menu():
    while True:
        print("\n--- Restaurant Menu Manager ---")
        print("(V) View an Item")
        print("(A) Add an Item")
        print("(D) Delete an Item")
        print("(U) Update an Item")
        print("(S) Show the Menu")
        print("(Q) Quit")

        choice = input("Enter your choice: ").upper()

        if choice == "V":
            name = input("Enter item name: ")
            item = MenuManager.get_by_name(name)
            if item:
                print(f"Found: {item.name} - ${item.price}")
            else:
                print("Item not found.")
        elif choice == "A":
            add_item_to_menu()
        elif choice == "D":
            remove_item_from_menu()
        elif choice == "U":
            update_item_from_menu()
        elif choice == "S":
            show_restaurant_menu()
        elif choice == "Q":
            print("Exiting... Here’s the final menu:")
            show_restaurant_menu()
            break
        else:
            print("Invalid choice. Try again!")


def add_item_to_menu():
    name = input("Enter item name: ")
    price = int(input("Enter item price: "))
    item = MenuItem(name, price)
    item.save()
    print(f"{name} was added successfully!")


def remove_item_from_menu():
    name = input("Enter item name to delete: ")
    item = MenuItem(name, 0)
    item.delete()
    print(f"{name} was deleted successfully!")


def update_item_from_menu():
    name = input("Enter item name to update: ")
    new_name = input("Enter new name: ")
    new_price = int(input("Enter new price: "))
    item = MenuItem(name, 0)
    item.update(new_name, new_price)
    print(f"{name} was updated successfully to {new_name} - ${new_price}")


def show_restaurant_menu():
    items = MenuManager.get_all_items()
    print("\n--- Restaurant Menu ---")
    for item in items:
        print(f"{item.name} - ${item.price}")
