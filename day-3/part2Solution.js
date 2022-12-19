import { match } from "node:assert";
import * as fs from "node:fs";

const input = fs.readFileSync("./puzzleInput.txt", "utf-8");
const ruckSacks = input.split("\n");

// take an array, group the elements into groups of N
// return the grouped array
function groupIntoN(items, groupLength) {
  const groupArr = [];
  let groupAccumulator = [];

  items.forEach((item, index) => {
    groupAccumulator.push(item);

    if (index % 3 === (groupLength - 1)) {
      groupArr.push(groupAccumulator);
      groupAccumulator = [];
    }
  });

  return groupArr;
}

// groups of three
const ruckSackGroups = groupIntoN(ruckSacks, 3);

// find the character that is present in all strings
function getMatching(...strArr) {
  let str1 = strArr.shift();

  for (let char of str1) {
    if (strArr.every((str) => str.includes(char))) {
      return char;
    }
  }
}

// find item present in all 3 compartments
const matchingItemPerGroup = ruckSackGroups.map((group) => {
  return getMatching(...group);
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

const sumOfPriority = matchingItemPerGroup.reduce(
  (sum, currVal) => {
    return sum + getPriority(currVal);
  },
  0);

console.log(sumOfPriority);