import * as fs from "node:fs";

const CURRENT_POSITION = "S";
const GOAL = "E";

const input = fs.readFileSync("./puzzleInput.txt", "utf-8");
const grid = input.split(/\n/).map((row) => row.split(""));

const startingPosition = findStartingPosition(grid);

console.log(startingPosition);

function findShortestPath(grid, startingPosition) {}

function findStartingPosition(arr2D) {
  for (let row = 0; row < arr2D.length; row++) {
    for (let col = 0; col < arr2D[row].length; col++) {
      if (arr2D[row][col] === CURRENT_POSITION) return { row, col };
    }
  }
}
