import * as fs from "node:fs";

// ***** CONSTANTS *****

const START_POSITION = "S";
const GOAL = "E";

// ***** PROCEDURE *****

const input = fs.readFileSync("./puzzleInput.txt", "utf-8");
const nodeGrid = input
  .split(/;\n/)
  .map((row) => row.split(""))
  .map((row, rowIndex) => {
    return row.map((val, colIndex) => {
      return { val, row: rowIndex, col: colIndex, explored: false };
    });
  });

const shortestPath = findShortestPath(nodeGrid);
console.log(shortestPath.length - 1); // subtract one for total number of moves

// ***** FUNCTIONS *****

function findShortestPath(grid, start = START_POSITION, end = GOAL) {
  function searchForEndNode(startNode) {
    startNode.node = "root";
    startNode.explored = true;

    const searchQueue = [startNode];
    while (searchQueue.length !== 0) {
      const currNode = searchQueue.pop();

      if (currNode.val === end) {
        return currNode;
      }

      for (let node of getAdjacentNodes(grid, currNode)) {
        if (node.explored) continue;

        node.explored = true;
        node.parent = currNode;
        searchQueue.unshift(node);
      }
    }

    return null; // no route found
  }

  const startingNode = findStartingNode(grid, start);
  const endNode = searchForEndNode(startingNode);

  const path = [endNode];

  let currNode = endNode;
  while (currNode.parent) {
    currNode = currNode.parent;
    path.unshift(currNode);
  }

  return path;
}

function findStartingNode(arr2D, start) {
  for (let row of arr2D) {
    for (let cell of row) {
      if (cell.val === start) return cell;
    }
  }
}

function getAdjacentNodes(grid, currNode) {
  const { row: currRow, col: currCol } = currNode;
  const adjacentNodes = [];

  const moveOptions = [
    {
      row: currRow + 1,
      col: currCol,
    },
    {
      row: currRow - 1,
      col: currCol,
    },
    {
      row: currRow,
      col: currCol + 1,
    },
    {
      row: currRow,
      col: currCol - 1,
    },
  ];

  for (let option of moveOptions) {
    if (!isInBounds(grid, option)) continue;

    const nextNode = getNode(grid, option);
    if (isValidMove(currNode, nextNode)) {
      adjacentNodes.push(nextNode);
    }
  }

  return adjacentNodes;
}

function isInBounds(grid, { row, col }) {
  const rowLength = grid.length;
  const colLength = grid[0].length;

  if (row < 0 || row >= rowLength) return false;
  if (col < 0 || col >= colLength) return false;

  return true;
}

function isValidMove(startNode, endNode) {
  const startingHeight = getNodeValue(startNode);
  const endingHeight = getNodeValue(endNode);

  const heightDifference = endingHeight - startingHeight;
  if (heightDifference > 1) {
    return false;
  }

  return true;
}

function getNode(grid, { row, col }) {
  return grid[row][col];
}

function getNodeValue(node) {
  function getHeightValue(char) {
    if (char === START_POSITION) return -1;
    if (char === GOAL) return 26;

    return char.charCodeAt(0) - 97;
  }

  return getHeightValue(node.val);
}
