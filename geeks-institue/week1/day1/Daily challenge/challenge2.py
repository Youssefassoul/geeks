# Ask the user for a word
word = input("Enter a word: ")

# Remove duplicate consecutive letters
new_word = word[0]  # start with the first character
for char in word[1:]:
    if char != new_word[-1]:  # only add if different from last added
        new_word += char

# Display the result
print(new_word)
