def make_shirt(size="Large", text="I love Python"):
    print(f"The size of the shirt is {size} and the text is '{text}'.")


print("4. Large shirt with default message:")
make_shirt()

print("\n5. Medium shirt with default message:")
make_shirt(size="Medium")

print("\n6. Small shirt with custom message:")
make_shirt(size="Small", text="Hello World")

print("\n7. Extra Large shirt with keyword arguments:")
make_shirt(text="Keep Coding", size="XL")
