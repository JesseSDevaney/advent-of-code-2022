import * as fs from "node:fs";

const input = fs.readFileSync("./puzzleInput.txt", "utf-8");

const [startOfMessageMarker, index] = NDistinctCharsInARow(input, 14);

console.log(`Start of message marker: ${startOfMessageMarker}`);
console.log(`First marker after character count: ${index}`);

// * HELPER FUNCTIONS
function NDistinctCharsInARow(input, numOfDistinctChars) {
  let charAccumulator = "";
  let charCount = 0;

  for (let char of input) {
    if (charAccumulator.includes(char)) {
      const duplicateIndex = charAccumulator.indexOf(char);

      // remove all characters at and before duplicate
      // b/c it can no longer contribute to a start-of-packet marker
      charAccumulator = charAccumulator.slice(duplicateIndex + 1);
    }

    charAccumulator += char;
    charCount++;
    if (charAccumulator.length === numOfDistinctChars) break;
  }

  return [charAccumulator, charCount];
}
