import promptSync from "prompt-sync";
import { users, addFakeUser } from "./users.js";

const prompt = promptSync();

// 1. Add a few fake users
addFakeUser();
addFakeUser();

// 2. Ask user for manual input
const name = prompt("Enter your name: ");
const street = prompt("Enter your street: ");
const country = prompt("Enter your country: ");

users.push({ name, street, country });

// 3. Show all users
console.log("\n📋 User list:");
users.forEach((u, i) => {
  console.log(`${i + 1}. ${u.name}, ${u.street}, ${u.country}`);
});
