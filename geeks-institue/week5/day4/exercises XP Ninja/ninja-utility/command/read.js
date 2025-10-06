const fs = require("fs");
const path = require("path");
module.exports = (filepath) => {
  if (!filepath) {
    console.error("Please provide a file path.");
    return;
  }
  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) return console.error("Error:", err.message);
    console.log(data);
  });
};
