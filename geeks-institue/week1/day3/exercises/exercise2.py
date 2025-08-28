class Dog:
    def __init__(self, dog_name, dog_height):
        self.name = dog_name
        self.height = dog_height

    def bark(self):
        return f"Woof! {self.name} barks!"

    def jump(self):
        return f"Jump! {self.name} jumps {self.height*2}cm high!"


davids_dog = Dog("Rex", 50)

print(f"{davids_dog.name} is {davids_dog.height}cm tall.")
print(davids_dog.bark())
print(davids_dog.jump())

sarahs_dog = Dog("Teacup", 20)

print(f"{sarahs_dog.name} is {sarahs_dog.height}cm tall.")
print(sarahs_dog.bark())
print(sarahs_dog.jump())

if davids_dog.height > sarahs_dog.height:
    print(f"{davids_dog.name} is taller than {sarahs_dog.name}.")
else:
    print(f"{sarahs_dog.name} is taller than {davids_dog.name}.")
