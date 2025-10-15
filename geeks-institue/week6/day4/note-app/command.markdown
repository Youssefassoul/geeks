# 1. Add first note
node app.js add --title="Shopping List" --body="Milk, Eggs, Bread"

# 2. Add second note
node app.js add --title="Todo" --body="Finish homework, Call mom"

# 3. Try to add duplicate (should show error)
node app.js add --title="Shopping List" --body="Different items"

# 4. List all notes
node app.js list

# 5. Read a specific note
node app.js read --title="Todo"

# 6. Try to read non-existent note
node app.js read --title="Does Not Exist"

# 7. Remove a note
node app.js remove --title="Shopping List"

# 8. Try to remove non-existent note
node app.js remove --title="Does Not Exist"

# 9. List notes again (should show one less)
node app.js list

# 10. Try invalid command
node app.js invalidcommand
