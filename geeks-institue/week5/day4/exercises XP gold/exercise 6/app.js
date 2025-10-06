const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your full name (e.g., John Doe): ", (answer) => {
  // Regular Expression Explanation:
  // ^ asserts start of string
  // [A-Z][a-z]+ : First Name starts with upper case, then lowercase letters
  //  [space]
  // [A-Z][a-z]+ : Last Name starts with upper case, then lowercase letters
  // $ asserts end of string

  const nameRegex = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

  if (nameRegex.test(answer)) {
    console.log("Valid name!");
  } else {
    console.log(
      "Invalid name. Make sure it contains only letters, exactly one space, and both names start with a capital letter."
    );
  }

  rl.close();
});
