# Import the Family class from exercise4.py
from exercise4 import Family


class TheIncredibles(Family):
    def __init__(self, last_name):
        super().__init__(last_name)

    def use_power(self, name):
        """Print the power of a member only if they are over 18 years old"""
        for member in self.members:
            if member["name"] == name:
                if member["age"] >= 18:
                    print(f"{member['name']} uses their power: " f"{member['power']}")
                else:
                    raise Exception(f"{member['name']} is not over 18 " f"years old!")
                return
        print(f"Member {name} not found in the family.")

    def incredible_presentation(self):
        """Print incredible family presentation"""
        print("*Here is our powerful family **")
        super().family_presentation()


# Create an instance of TheIncredibles class
incredibles_family = TheIncredibles("Incredibles")

# Add the initial members
initial_members = [
    {
        "name": "Michael",
        "age": 35,
        "gender": "Male",
        "is_child": False,
        "power": "fly",
        "incredible_name": "MikeFly",
    },
    {
        "name": "Sarah",
        "age": 32,
        "gender": "Female",
        "is_child": False,
        "power": "read minds",
        "incredible_name": "SuperWoman",
    },
]

incredibles_family.members = initial_members

# Call the incredible_presentation method
print("=== The Incredibles Family Demo ===")
incredibles_family.incredible_presentation()

# Test the use_power method
print("\n=== Testing Powers ===")
try:
    incredibles_family.use_power("Michael")
    incredibles_family.use_power("Sarah")
except Exception as e:
    print(f"Error: {e}")

# Use the born method inherited from Family class to add Baby Jack
print("\n=== Adding Baby Jack ===")
incredibles_family.born(
    name="Jack",
    age=0,
    gender="Male",
    is_child=True,
    power="Unknown Power",
    incredible_name="BabyJack",
)

# Call the incredible_presentation method again
print("\n=== Updated Incredibles Family ===")
incredibles_family.incredible_presentation()

# Test use_power on Baby Jack (should raise exception)
print("\n=== Testing Baby Jack's Power ===")
try:
    incredibles_family.use_power("Jack")
except Exception as e:
    print(f"Error: {e}")
