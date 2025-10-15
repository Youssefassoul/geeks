const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes.js");

// Configure yargs version
const argv = yargs
  .command("add", "Add a new note", {
    title: {
      describe: "Title of note",
      demand: true,
      alias: "t",
    },
    body: {
      describe: "Body of note",
      demand: true,
      alias: "b",
    },
  })
  .command("list", "List all notes")
  .command("read", "Read a note", {
    title: {
      describe: "Title of note",
      demand: true,
      alias: "t",
    },
  })
  .command("remove", "Remove a note", {
    title: {
      describe: "Title of note",
      demand: true,
      alias: "t",
    },
  })
  .help().argv;

const command = argv._[0];

// Handle commands
if (command === "add") {
  const note = notes.addNote(argv.title, argv.body);

  if (note) {
    console.log("Note created successfully!");
    console.log("--");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  } else {
    console.log("Note already exists");
  }
} else if (command === "list") {
  const allNotes = notes.getAll();

  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => {
    console.log("--");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  });
} else if (command === "read") {
  const note = notes.getNote(argv.title);

  if (note) {
    console.log("Note found!");
    console.log("--");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  } else {
    console.log("Note not found");
  }
} else if (command === "remove") {
  const noteRemoved = notes.removeNote(argv.title);

  if (noteRemoved) {
    console.log("Note was removed");
  } else {
    console.log("Note not found");
  }
} else {
  console.log("Command not recognized");
}
