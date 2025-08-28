import math


class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None and diameter is not None:
            raise ValueError("Please provide either radius OR diameter, not both")
        elif radius is not None:
            if radius <= 0:
                raise ValueError("Radius must be positive")
            self.radius = float(radius)
        elif diameter is not None:
            if diameter <= 0:
                raise ValueError("Diameter must be positive")
            self.radius = float(diameter) / 2
        else:
            raise ValueError("Please provide either radius or diameter")

    def get_diameter(self):
        return self.radius * 2

    def get_area(self):
        return math.pi * self.radius**2

    def __str__(self):
        return f"Circle with radius {self.radius:.2f}"

    def __add__(self, other):
        if not isinstance(other, Circle):
            raise TypeError("Can only add Circle instances together")
        return Circle(radius=self.radius + other.radius)

    def __lt__(self, other):
        if not isinstance(other, Circle):
            raise TypeError("Can only compare Circle instances")
        return self.radius < other.radius

    def __eq__(self, other):
        if not isinstance(other, Circle):
            return False
        return abs(self.radius - other.radius) < 0.000001

    def __gt__(self, other):
        if not isinstance(other, Circle):
            raise TypeError("Can only compare Circle instances")
        return self.radius > other.radius


def sort_circles(circles):
    return sorted(circles)


def draw_circles_with_turtle(circles):
    try:
        import turtle

        turtle.speed(0)
        turtle.penup()
        turtle.goto(-300, 0)

        for i, circle in enumerate(circles):
            turtle.penup()
            turtle.goto(-300 + i * 100, 0)
            turtle.pendown()

            turtle.circle(circle.radius * 10)

            turtle.penup()
            turtle.goto(-300 + i * 100, -circle.radius * 10 - 20)
            turtle.write(f"r={circle.radius:.1f}", align="center")

        turtle.done()

    except ImportError:
        print("Turtle module not available")
    except Exception as e:
        print(f"Error drawing circles: {e}")


def main():
    print("=== Circle Class Demo ===\n")

    print("Creating circles...")
    circle1 = Circle(radius=5)
    circle2 = Circle(diameter=8)
    circle3 = Circle(radius=3)

    print(f"Circle 1: {circle1}")
    print(f"Circle 2: {circle2}")
    print(f"Circle 3: {circle3}")

    print("\nAreas:")
    print(f"Circle 1 area: {circle1.get_area():.2f}")
    print(f"Circle 2 area: {circle2.get_area():.2f}")
    print(f"Circle 3 area: {circle3.get_area():.2f}")

    print("\nAdding circles:")
    combined_circle = circle1 + circle2
    print(f"Circle 1 + Circle 2 = {combined_circle}")

    print("\nComparisons:")
    print(f"Circle 1 > Circle 2: {circle1 > circle2}")
    print(f"Circle 1 == Circle 2: {circle1 == circle2}")
    print(f"Circle 1 < Circle 3: {circle1 < circle3}")

    print("\nSorting circles by radius:")
    circles_list = [circle1, circle2, circle3]
    sorted_circles = sort_circles(circles_list)

    print("Original order:")
    for i, circle in enumerate(circles_list):
        print(f"  {i+1}. {circle}")

    print("\nSorted order (by radius):")
    for i, circle in enumerate(sorted_circles):
        print(f"  {i+1}. {circle}")

    print("\nDrawing circles with Turtle...")
    draw_circles_with_turtle(sorted_circles)


if __name__ == "__main__":
    main()
