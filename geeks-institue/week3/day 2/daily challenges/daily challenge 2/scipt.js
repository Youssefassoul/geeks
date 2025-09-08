const user = prompt("What damn you want? ");
let wordsArray = user.split(",").map((word) => word.trim());
console.log(wordsArray);

let maxLength = Math.max(...wordsArray.map((word) => word.length));
console.log(maxLength);
// → 5 (because "Hello" and "World" have 5 letters)
let border = "*".repeat(maxLength + 4);
console.log(border); // "*********"

for (let word of wordsArray) {
  let padding = " ".repeat(maxLength - word.length);
  console.log(`* ${word}${padding} *`);
}
console.log(border);
