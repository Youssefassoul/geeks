// copy-file.js
import fs from "fs";

// Read content from source.txt
const content = fs.readFileSync("source.txt", "utf8");

// Write content to destination.txt
fs.writeFileSync("destination.txt", content);

console.log("File copied successfully!");
