// index.js
const { Command } = require("commander");
const program = new Command();

const greet = require("./command/greet");
const fetch = require("./command/fetch.js");
const read = require("./command/read");

program.command("greet").description("Display a greeting").action(greet);

program.command("fetch").description("Fetch a joke from an API").action(fetch);

program
  .command("read <filepath>")
  .description("Read and display contents of a file")
  .action(read);

program.parse(process.argv);
