const people = ["Greg", "Mary", "Devon", "James"];

// Part I
people.shift();
console.log(people);
const index = people.indexOf("James");
if (index !== -1) {
  people[index] = "Jason";
}
console.log(people); // ["Mary", "Devon", "Jason"];

people.push("Youssef");

console.log(people.indexOf("Mary")); // 0

console.log(people.slice(1));

console.log(people.indexOf("foo"));
// In JavaScript, when indexOf does not find the element you specify in the array, it always returns -1. This is a standard way to signal "not found"

const last = people[people.length - 1];
console.log(last);

// Part II

for (const person of people) {
  console.log(person);
}

for (const person of people) {
  if (person === "James") break;
  console.log(person);
}
