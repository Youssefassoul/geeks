// app.js
import chalk from "chalk";

// Using chalk to style text
console.log(chalk.blue("Hello, this text is blue!"));
console.log(chalk.bold.red("Bold and red text"));
console.log(chalk.bgGreen.black("Black text on green background"));
console.log(chalk.yellow.underline("Yellow underlined text"));

// Combine styles
console.log(chalk.green.bold("Success: ") + chalk.white("Your NPM project works!"));
