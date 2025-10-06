module.exports = function returnNumbers(str) {
  return str.match(/\d/g).join("");
};
