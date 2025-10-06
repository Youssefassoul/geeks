import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to file
const filePath = path.join(__dirname, "data", "example.txt");

// Check if file exists
if (!fs.existsSync(filePath)) {
  console.error("File does not exist:", filePath);
  process.exit(1);
}

// Get file stats
const stats = fs.statSync(filePath);

console.log("File exists:", true);
console.log("Size:", stats.size, "bytes");
console.log("Created:", stats.birthtime);
