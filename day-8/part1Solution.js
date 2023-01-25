import * as fs from "node:fs";

const input = fs.readFileSync("./puzzleInput.txt", "utf-8");
const rows = input.split(/\n/);

// matrix[row][col]
const matrix = rows.map((row) => row.split(""));

const isVisibleMatrix = matrix.map((row, rowIndex, arr2D) => {
  return row.map((item, colIndex, colArr) =>
    isVisible(rowIndex, colIndex, arr2D)
  );
});

const numVisible = isVisibleMatrix.reduce((agg, row) => {
  return agg + row.reduce((rowAgg, val) => rowAgg + val, 0);
}, 0);

console.log(numVisible);

// * Goal: Find how many trees are visible from outside the grid?
// *
// * A tree is visible
// *   (1) if it is on the outside edge of the grid
// *   (2) if it is taller than all remaining trees along the row or column
// *       in either directions

function isVisible(row, col, arr2D) {
  return (
    isOnEdge(row, col, arr2D) ||
    isVisibleFromLeft(row, col, arr2D) ||
    isVisibleFromTop(row, col, arr2D) ||
    isVisibleFromRight(row, col, arr2D) ||
    isVisibleFromBottom(row, col, arr2D)
  );
}

function isOnEdge(row, col, arr2D) {
  const topEdge = 0;
  const bottomEdge = arr2D.length - 1;
  const leftEdge = 0;
  const rightEdge = arr2D[row].length - 1;

  const onEdge =
    row === topEdge ||
    row === bottomEdge ||
    col === leftEdge ||
    col === rightEdge;

  return onEdge;
}

function isVisibleFromLeft(row, col, arr2D) {
  const height = arr2D[row][col];
  const leftEdge = 0;

  let colLeft = col - 1;
  while (colLeft >= leftEdge) {
    if (arr2D[row][colLeft] >= height) {
      return false;
    }

    colLeft--;
  }

  return true;
}

function isVisibleFromRight(row, col, arr2D) {
  const height = arr2D[row][col];
  const rightEdge = arr2D[row].length - 1;

  let colRight = col + 1;
  while (colRight <= rightEdge) {
    if (arr2D[row][colRight] >= height) {
      return false;
    }

    colRight++;
  }

  return true;
}

function isVisibleFromTop(row, col, arr2D) {
  const height = arr2D[row][col];
  const topEdge = 0;

  let rowUp = row - 1;
  while (rowUp >= topEdge) {
    if (arr2D[rowUp][col] >= height) {
      return false;
    }

    rowUp--;
  }

  return true;
}

function isVisibleFromBottom(row, col, arr2D) {
  const height = arr2D[row][col];
  const bottomEdge = arr2D.length - 1;

  let rowDown = row + 1;
  while (rowDown <= bottomEdge) {
    if (arr2D[rowDown][col] >= height) {
      return false;
    }

    rowDown++;
  }

  return true;
}
