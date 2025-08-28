import random


def get_random_temp(season):
    if season == "winter":
        return random.uniform(-10, 16)
    elif season == "spring":
        return random.uniform(16, 23)
    elif season == "summer":
        return random.uniform(23, 30)
    elif season == "fall":
        return random.uniform(30, 39)
    else:
        return random.uniform(39, 40)


# Step 1: Create get_random_temp() with season parameter
def get_random_temp(season):
    if season == "winter":
        return round(random.uniform(-10, 16), 1)
    elif season == "spring":
        return round(random.uniform(5, 25), 1)
    elif season == "summer":
        return round(random.uniform(20, 40), 1)
    elif season == "autumn" or season == "fall":
        return round(random.uniform(10, 24), 1)
    else:
        # Default range if season is invalid
        return round(random.uniform(-10, 40), 1)


# Step 2: Determine season based on month
def month_to_season(month):
    if month in [12, 1, 2]:
        return "winter"
    elif month in [3, 4, 5]:
        return "spring"
    elif month in [6, 7, 8]:
        return "summer"
    elif month in [9, 10, 11]:
        return "autumn"


# Step 3: Main function
def main():
    # Bonus: ask for month instead of season
    month = int(input("Enter the month number (1 = January, 12 = December): "))
    season = month_to_season(month)

    temp = get_random_temp(season)
    print(f"The temperature right now is {temp}°C in {season}.")

    # Step 4: Friendly advice
    if temp < 0:
        print("Brrr, that’s freezing! Wear some extra layers today.")
    elif 0 <= temp <= 16:
        print("Quite chilly! Don’t forget your coat.")
    elif 17 <= temp <= 23:
        print("Nice and cool! A light jacket should be enough.")
    elif 24 <= temp <= 32:
        print("Warm weather! Perfect for outdoor activities.")
    elif 33 <= temp <= 40:
        print("It's really hot! Stay hydrated and wear light clothes.")


# Step 5: Run the program
main()
