my_fav_numbers = set()

my_fav_numbers.add(73)
my_fav_numbers.add(98)
my_fav_numbers.add(99)
my_fav_numbers.add(2)

print(my_fav_numbers)

my_fav_numbers.remove(99)
print(my_fav_numbers)


friend_fav_numbers = set()
friend_fav_numbers.add(45)
friend_fav_numbers.add(33)
friend_fav_numbers.add(5)

print(friend_fav_numbers)


our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)


print(our_fav_numbers)
