import * as fs from "node:fs";

const input = fs.readFileSync("./puzzleInput.txt", "utf-8");
const rows = input.split(/\n/);

// matrix[row][col]
const matrix = rows.map((row) => row.split(""));

const scenicScoreMatrix = matrix.map((row, rowIndex, arr2D) => {
  return row.map((item, colIndex, colArr) =>
    getScenicScore(rowIndex, colIndex, arr2D)
  );
});

const flatScenicScoreMatrix = [];
scenicScoreMatrix.forEach((row) => {
  flatScenicScoreMatrix.push(...row);
});

const largestScenicScore = Math.max(...flatScenicScoreMatrix);
console.log(largestScenicScore);

// * Goal: Find how many trees are visible from outside the grid?
// *
// * A tree is visible
// *   (1) if it is on the outside edge of the grid
// *   (2) if it is taller than all remaining trees along the row or column
// *       in either directions

function getScenicScore(row, col, arr2D) {
  return (
    getScenicScoreLeft(row, col, arr2D) *
    getScenicScoreTop(row, col, arr2D) *
    getScenicScoreRight(row, col, arr2D) *
    getScenicScoreBottom(row, col, arr2D)
  );
}

function getScenicScoreLeft(row, col, arr2D) {
  const height = arr2D[row][col];
  const leftEdge = 0;
  let score = 0;

  let colLeft = col - 1;
  while (colLeft >= leftEdge) {
    score++;
    if (arr2D[row][colLeft] >= height) {
      break;
    }

    colLeft--;
  }

  return score;
}

function getScenicScoreRight(row, col, arr2D) {
  const height = arr2D[row][col];
  const rightEdge = arr2D[row].length - 1;
  let score = 0;

  let colRight = col + 1;
  while (colRight <= rightEdge) {
    score++;
    if (arr2D[row][colRight] >= height) {
      break;
    }

    colRight++;
  }

  return score;
}

function getScenicScoreTop(row, col, arr2D) {
  const height = arr2D[row][col];
  const topEdge = 0;
  let score = 0;

  let rowUp = row - 1;
  while (rowUp >= topEdge) {
    score++;
    if (arr2D[rowUp][col] >= height) {
      break;
    }

    rowUp--;
  }

  return score;
}

function getScenicScoreBottom(row, col, arr2D) {
  const height = arr2D[row][col];
  const bottomEdge = arr2D.length - 1;
  let score = 0;

  let rowDown = row + 1;
  while (rowDown <= bottomEdge) {
    score++;
    if (arr2D[rowDown][col] >= height) {
      break;
    }

    rowDown++;
  }

  return score;
}
