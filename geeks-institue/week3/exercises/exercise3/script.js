let number = parseInt(prompt("Enter a number:"));
let numberType = typeof number;

console.log(`The type of the entered number is: ${numberType}`);

while (number < 10) {
  number = parseInt(prompt("Please enter a valid number:"));
  numberType = typeof number;
}

console.log("Number is 10 or greater. Loop ended.");
