// read-directory.js
import fs from "fs";

// Read list of files in current directory
const files = fs.readdirSync(".");

console.log("Files in directory:");
files.forEach((file) => console.log(file));

console.log("Directory read successfully!");
