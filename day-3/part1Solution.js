import * as fs from "node:fs";

const input = fs.readFileSync("./puzzleInput.txt", "utf-8");
const ruckSacks = input.split("\n");

// split ruckSacks into their individual compartments
const ruckSackAndCompartments = ruckSacks.map((ruckSack) => {
  const splitIndex = Math.ceil(ruckSack.length / 2);
  const firstCompartment = ruckSack.slice(0, splitIndex);
  const secondCompartment = ruckSack.slice(splitIndex);

  return [firstCompartment, secondCompartment];
});

// determines item priority
function getPriority(char) {
  const charCode = char.charCodeAt(0);
  const LOWERCASE_CHAR_REFERENCE = 'a'.charCodeAt(0);
  const UPPERCASE_CHAR_REFERENCE = 'A'.charCodeAt(0);

  if (charCode >= 97 && charCode <= 122) {
    // map 'a' to 'z' to  priority values 1 through 26
    return (charCode - LOWERCASE_CHAR_REFERENCE) + 1
  } else {
    // map 'A' to 'Z' to priority values 27 through 52
    return (charCode - UPPERCASE_CHAR_REFERENCE) + 1 + 26
  }
}

// find the character that is present in both strings
function getMatching(str1, str2) {
  for (let char of str1) {
    if (str2.includes(char)) {
      return char;
    }
  }
}

// find item present in both compartments
const matchingItemPerRucksack = ruckSackAndCompartments.map(([firstCompartment, secondCompartment]) => {
  return getMatching(firstCompartment, secondCompartment);
});

const sumOfPriority = matchingItemPerRucksack.reduce(
  (sum, currVal) => {
    return sum + getPriority(currVal);
  },
  0);

console.log(sumOfPriority);