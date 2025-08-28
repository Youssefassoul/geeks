class Zoo:
    def __init__(self, zoo_name):
        self.name = zoo_name
        self.animals = []

    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)

    def get_animals(self):
        print(self.animals)

    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)

    def sort_animals(self):
        sorted_animals = sorted(self.animals)
        grouped_animals = {}
        for animal in sorted_animals:
            animal_type = animal[0].upper()
            if animal_type not in grouped_animals:
                grouped_animals[animal_type] = []
            grouped_animals[animal_type].append(animal)

        for animal_type in grouped_animals:
            if len(grouped_animals[animal_type]) == 1:
                grouped_animals[animal_type] = grouped_animals[animal_type][0]
        return grouped_animals

    def get_groups(self):
        grouped_animals = self.sort_animals()
        for animal_type, animals in grouped_animals.items():
            print(f"{animal_type}: {animals}")


new_york_zoo = Zoo("New York Zoo")
new_york_zoo.add_animal("Giraffe")
new_york_zoo.add_animal("Bear")
new_york_zoo.add_animal("Ape")
new_york_zoo.get_animals()
new_york_zoo.sell_animal("Bear")
new_york_zoo.get_animals()
new_york_zoo.get_groups()
