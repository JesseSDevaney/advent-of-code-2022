import * as fs from "node:fs";

// ***** Procedural code *****

const input = fs.readFileSync("./puzzleInput.txt", "utf-8");
const headMoves = input.split(/\n/).map((move) => {
  const [direction, steps] = move.split(/\s/);
  return {
    direction,
    steps,
  };
});

const simulationHistory = simulate(headMoves, 10);

const cellsVisitedByTail = getCellsVisitedByKnot(10, simulationHistory);

const numCellsVisitedByTail = cellsVisitedByTail.size;

console.log(numCellsVisitedByTail);

// ***** Functional code *****

function simulate(headMoves, numKnots) {
  const INITIAL_X = 0;
  const INITIAL_Y = 0;

  let currKnots = [];

  for (let knotCount = 1; knotCount <= numKnots; knotCount++) {
    const newKnot = new Map([
      ["x", INITIAL_X],
      ["y", INITIAL_Y],
    ]);
    currKnots.push(newKnot);
  }

  const simulationHistory = [currKnots];

  for (const { direction, steps } of headMoves) {
    let stepsRemaining = steps;
    while (stepsRemaining > 0) {
      const nextKnots = moveKnotsOneStep(currKnots, direction);

      currKnots = nextKnots;

      simulationHistory.push(currKnots);

      stepsRemaining--;
    }
  }

  return simulationHistory;
}

function moveKnotsOneStep(currKnots, direction) {
  const nextKnots = [];
  const nextHead = moveHead(currKnots[0], direction);
  nextKnots.push(nextHead);

  for (let knot = 1; knot < currKnots.length; knot++) {
    const nextHead = nextKnots[knot - 1];
    const currTail = currKnots[knot];

    const nextTail = moveTail(currTail, nextHead);
    nextKnots.push(nextTail);
  }

  return nextKnots;
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

function getCellsVisitedByKnot(knotNumber, history) {
  const cellsVisited = new Set();

  for (let state of history) {
    const knotState = state[knotNumber - 1];
    const stateStr = `(${knotState.get("x")},${knotState.get("y")})`;
    cellsVisited.add(stateStr);
  }

  return cellsVisited;
}
