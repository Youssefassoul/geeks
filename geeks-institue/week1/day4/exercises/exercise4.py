class Family:
    def __init__(self, last_name):
        self.members = []
        self.last_name = last_name

    def born(self, **kwargs):
        """Adds a child to the members list using **kwargs"""
        self.members.append(kwargs)
        print(
            f"Congratulations! A new child has been born to the "
            f"{self.last_name} family!"
        )

    def is_18(self, name):
        """Takes a family member's name and returns True if they are
        over 18, False if not"""
        for member in self.members:
            if member["name"] == name:
                return member["age"] >= 18
        return False  # Return False if member not found

    def family_presentation(self):
        """Prints the family's last name and all members' details"""
        print(f"\nFamily: {self.last_name}")
        print("Members:")
        for member in self.members:
            print(
                f"  - Name: {member['name']}, Age: {member['age']}, "
                f"Gender: {member['gender']}, Is Child: {member['is_child']}"
            )


# Create an instance of the Family class
smith_family = Family("Smith")

# Add the initial members
initial_members = [
    {"name": "Michael", "age": 35, "gender": "Male", "is_child": False},
    {"name": "Sarah", "age": 32, "gender": "Female", "is_child": False},
]

smith_family.members = initial_members

# Call all the methods
print("=== Family Class Demo ===")

# Test family_presentation method
smith_family.family_presentation()

# Test is_18 method
print(f"\nIs Michael over 18? {smith_family.is_18('Michael')}")
print(f"Is Sarah over 18? {smith_family.is_18('Sarah')}")

# Test born method
smith_family.born(name="Emma", age=0, gender="Female", is_child=True)

# Show updated family
smith_family.family_presentation()
