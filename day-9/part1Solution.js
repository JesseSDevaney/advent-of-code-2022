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

const simulationHistory = simulate(movesTaken);

console.log(simulationHistory);

// ***** Functional code *****

function simulate(moves) {
  const INITIAL_X = 0;
  const INITIAL_Y = 0;

  let currHead = new Map([
    ["x", INITIAL_X],
    ["y", INITIAL_Y],
  ]);
  let currTail = new Map([
    ["x", INITIAL_X],
    ["y", INITIAL_Y],
  ]);

  const simulationHistory = [
    {
      head: currHead,
      tail: currTail,
    },
  ];

  return simulationHistory;
}

