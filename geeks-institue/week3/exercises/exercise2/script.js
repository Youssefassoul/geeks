const colors = ["red", "green", "blue", "yellow", "purple"];
const suffixes = ["st", "nd", "rd"];

for (const color of colors) {
  const indexOf = colors.indexOf(color) + 1;
  console.log(`My # ${indexOf} choice is ${color}`);
}

for (let i = 0; i < colors.length; i++) {
  let suffix = suffixes[i] || "th"; // Use 'st', 'nd', 'rd' for 1st, 2nd, 3rd; 'th' for others
  console.log(`My ${i + 1}${suffix} choice is ${colors[i]}`);
}
