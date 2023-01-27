import * as fs from "node:fs";

// ***** Procedural code *****

const input = fs.readFileSync("./puzzleInput.txt", "utf-8");

const NOOP = "noop";
const ADD_X = "addx";

const cpuInstructions = input.split(/\n/).map((line) => {
  if (line === NOOP)
    return {
      type: NOOP,
    };

  const [, value] = line.split(/\s/);

  return {
    type: ADD_X,
    value: Number(value),
  };
});

