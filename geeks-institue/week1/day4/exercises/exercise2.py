class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return (self.weight / self.age) * 10

    def fight(self, other_dog):
        my_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight

        if my_power > other_power:
            return f"{self.name} won the fight against {other_dog.name}"
        elif other_power > my_power:
            return f"{other_dog.name} won the fight against {self.name}"
        else:
            return f"It's a tie between {self.name} and {other_dog.name}!"


# Test the class
if __name__ == "__main__":
    dog1 = Dog("Buddy", 3, 25)
    dog2 = Dog("Rex", 5, 40)
    dog3 = Dog("Luna", 2, 15)

    dogs = [dog1, dog2, dog3]
    for dog in dogs:
        print(dog.bark())
        print("Speed:", dog.run_speed())

    print(dog1.fight(dog2))
    print(dog1.fight(dog3))
    print(dog2.fight(dog3))
