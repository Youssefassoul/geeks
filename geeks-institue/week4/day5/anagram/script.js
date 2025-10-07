function isAnagram(str1, str2) {
  const cleanStr1 = str1
    .replace(/\s/g, "")
    .toLowerCase()
    .split("")
    .sort()
    .join("");
  const cleanStr2 = str2
    .replace(/\s/g, "")
    .toLowerCase()
    .split("")
    .sort()
    .join("");

  return cleanStr1 === cleanStr2;
}

console.log(isAnagram("Astronomer", "Moon starer")); // true
console.log(isAnagram("School master", "The classroom")); // true
console.log(isAnagram("Hello", "World")); // false
console.log(isAnagram("The Morse Code", "Here come dots")); // true
