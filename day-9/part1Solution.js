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

  for (const { direction, steps } of moves) {
    let stepsRemaining = steps;
    while (stepsRemaining > 0) {
      const { nextHead, nextTail } = moveKnotsOneStep(
        currHead,
        currTail,
        direction
      );

      currHead = nextHead;
      currTail = nextTail;

      simulationHistory.push({
        currHead,
        currTail,
      });

      stepsRemaining--;
    }
  }

  return simulationHistory;
}

function moveKnotsOneStep(currHead, currTail, direction) {
  const nextHead = moveHead(currHead, direction);
  const nextTail = moveTail(currTail, nextHead);

  return { nextHead, nextTail };
}

function moveHead(head, direction) {
  const UP = "U";
  const DOWN = "D";
  const LEFT = "L";
  const RIGHT = "R";

  const nextHead = new Map(head);

  if (direction === UP) nextHead.set("y", nextHead.get("y") + 1);
  if (direction === DOWN) nextHead.set("y", nextHead.get("y") - 1);
  if (direction === LEFT) nextHead.set("x", nextHead.get("x") - 1);
  if (direction === RIGHT) nextHead.set("x", nextHead.get("x") + 1);

  return nextHead;
}

function moveTail(currTail, nextHead) {
  const nextTail = new Map(currTail);

  const nextHeadX = nextHead.get("x");
  const nextHeadY = nextHead.get("y");
  const currTailX = currTail.get("x");
  const currTailY = currTail.get("y");

  const diffX = nextHeadX - currTailX;
  const diffY = nextHeadY - currTailY;

  const isXMove =
    Math.abs(diffX) > 1 || (Math.abs(diffY) > 1 && Math.abs(diffX) === 1);
  const isYMove =
    Math.abs(diffY) > 1 || (Math.abs(diffX) > 1 && Math.abs(diffY) === 1);

  if (isXMove) {
    nextTail.set("x", currTailX + diffX / Math.abs(diffX));
  }

  if (isYMove) {
    nextTail.set("y", currTailY + diffY / Math.abs(diffY));
  }

  return nextTail;
}
