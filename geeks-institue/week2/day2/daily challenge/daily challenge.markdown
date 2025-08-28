Q1:
output = 0

Because the subquery gives NULL, and NOT IN (NULL) is always false.

Q2:
output = 2

Because only id = 5 is excluded. So rows with 6 and 7 are counted.

Q3:
output = 0

Because the subquery gives (5, NULL). Any NOT IN with NULL returns no rows.

Q4:
output = 2

Because only id = 5 is excluded. So rows with 6 and 7 are counted.
