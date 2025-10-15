const fs = require("fs");

// Function to fetch all notes from the JSON file
const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync("notes.json");
    return JSON.parse(notesString);
  } catch (e) {
    // If file doesn't exist or is empty, return empty array
    return [];
  }
};

// Function to save notes to the JSON file
const saveNotes = (notes) => {
  fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2));
};

// Add a new note
const addNote = (title, body) => {
  const notes = fetchNotes();

  const note = {
    title,
    body,
  };

  // Check if note with same title already exists
  const duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  } else {
    return null;
  }
};

// Get all notes
const getAll = () => {
  return fetchNotes();
};

// Get a specific note by title
const getNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];
};

// Remove a note by title
const removeNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);

  // Check if a note was actually removed
  const noteRemoved = notes.length !== filteredNotes.length;

  if (noteRemoved) {
    saveNotes(filteredNotes);
  }

  return noteRemoved;
};

// Export all functions
module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
};
