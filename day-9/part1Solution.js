import * as fs from "node:fs";

// ***** Procedural code *****

const input = fs.readFileSync("./puzzleInput.txt", "utf-8");
const movesTaken = input.split(/\n/).map((move) => {
  const [direction, steps] = move.split(/\s/);
  return {
    direction,
    steps,
  };
});

