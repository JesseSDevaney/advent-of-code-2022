import * as fs from "node:fs";

const input = fs.readFileSync("./puzzleInput.txt", "utf-8");

const [startOfPacketMarker, index] = getStartOfPacket(input);

console.log(`Start of packet marker: ${startOfPacketMarker}`);
console.log(`First marker after character: ${index}`);

// * HELPER FUNCTIONS
function getStartOfPacket(input) {
  // start of packet marker is four characters in a row that
  // are all different
  let startOfPacketMarker = "";
  let readCharCount = 0;

  for (let char of input) {
    if (startOfPacketMarker.includes(char)) {
      const duplicateIndex = startOfPacketMarker.indexOf(char);

      // remove all characters at and before duplicate
      // b/c it can no longer contribute to a start-of-packet marker
      startOfPacketMarker = startOfPacketMarker.slice(duplicateIndex + 1);
    }

    startOfPacketMarker += char;
    readCharCount++;
    if (startOfPacketMarker.length === 4) break;
  }

  return [startOfPacketMarker, readCharCount];
}
