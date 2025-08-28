from exercise2 import Dog
import random


class PetDog(Dog):
    def __init__(self, name, age, weight, trained=False):
        super().__init__(name, age, weight)  # inherit Dog’s constructor
        self.trained = trained

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *dog_names):
        names = ", ".join(dog_names)
        print(f"{self.name}, {names} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                f"{self.name} does a barrel roll",
                f"{self.name} stands on his back legs",
                f"{self.name} shakes your hand",
                f"{self.name} plays dead",
            ]
            print(random.choice(tricks))
        else:
            print(f"{self.name} is not trained yet")


# Test the PetDog class
if __name__ == "__main__":
    pet = PetDog("Max", 4, 20)

    pet.train()  # bark + trained = True
    pet.play("Buddy", "Rex", "Luna")
    pet.do_a_trick()  # random trick because trained = True
