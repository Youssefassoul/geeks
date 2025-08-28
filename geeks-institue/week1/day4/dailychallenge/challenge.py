import math


class Pagination:
    def __init__(self, items=None, page_size=10):
        """Initialize Pagination with optional items list and page size"""
        self.items = items if items is not None else []
        self.page_size = page_size
        self.current_idx = 0
        self.total_pages = math.ceil(len(self.items) / page_size) if self.items else 0

    def get_visible_items(self):
        """Return the list of items visible on the current page"""
        start_idx = self.current_idx * self.page_size
        end_idx = start_idx + self.page_size
        return self.items[start_idx:end_idx]

    def go_to_page(self, page_num):
        """Go to the specified page number (1-based indexing)"""
        if page_num < 1 or page_num > self.total_pages:
            raise ValueError(
                f"Page {page_num} is out of range. "
                f"Valid pages: 1 to {self.total_pages}"
            )
        self.current_idx = page_num - 1
        return self

    def first_page(self):
        """Navigate to the first page"""
        self.current_idx = 0
        return self

    def last_page(self):
        """Navigate to the last page"""
        self.current_idx = self.total_pages - 1
        return self

    def next_page(self):
        """Move one page forward (if not already on the last page)"""
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self

    def previous_page(self):
        """Move one page backward (if not already on the first page)"""
        if self.current_idx > 0:
            self.current_idx -= 1
        return self

    def __str__(self):
        """Return a string displaying the items on the current page,
        each on a new line"""
        visible_items = self.get_visible_items()
        if not visible_items:
            return ""
        return "\n".join(str(item) for item in visible_items)


# Test the Pagination class
if __name__ == "__main__":
    print("=== Pagination System Test ===\n")

    # Create alphabet list and pagination instance
    alphabetList = list("abcdefghijklmnopqrstuvwxyz")
    p = Pagination(alphabetList, 4)

    print("Initial page:")
    print(p.get_visible_items())
    # Expected: ['a', 'b', 'c', 'd']

    print("\nNext page:")
    p.next_page()
    print(p.get_visible_items())
    # Expected: ['e', 'f', 'g', 'h']

    print("\nLast page:")
    p.last_page()
    print(p.get_visible_items())
    # Expected: ['y', 'z']

    print("\nGo to page 7 (last valid page):")
    p.go_to_page(7)
    print(f"Current page: {p.current_idx + 1}")
    print(f"Visible items: {p.get_visible_items()}")
    # Expected: 7 (since there are only 7 pages with 4 items each)

    print("\nGo to first page:")
    p.first_page()
    print(f"Current page: {p.current_idx + 1}")
    print(f"Visible items: {p.get_visible_items()}")

    print("\nGo to page 3:")
    p.go_to_page(3)
    print(f"Current page: {p.current_idx + 1}")
    print(f"Visible items: {p.get_visible_items()}")

    print("\nPrevious page:")
    p.previous_page()
    print(f"Current page: {p.current_idx + 1}")
    print(f"Visible items: {p.get_visible_items()}")

    print("\nString representation of current page:")
    print(str(p))

    print("\n=== Testing Error Handling ===")
    try:
        p.go_to_page(0)  # Should raise ValueError
    except ValueError as e:
        print(f"Error caught: {e}")

    try:
        p.go_to_page(100)  # Should raise ValueError
    except ValueError as e:
        print(f"Error caught: {e}")

    print(f"\nTotal pages: {p.total_pages}")
    print(f"Total items: {len(p.items)}")
    print(f"Page size: {p.page_size}")
