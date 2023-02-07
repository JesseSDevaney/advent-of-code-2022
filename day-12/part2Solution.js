import * as fs from "node:fs";

// ***** CONSTANTS *****

const START_POSITION = "S";
const GOAL = "E";
const LOWEST_ELEVATION = "a";

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

const shortestTrail = findShortestTrail(nodeGrid);
console.log(shortestTrail.length - 1);

// ***** FUNCTIONS *****

function findShortestTrail(grid, end = GOAL) {
  // find all the nodes with elevation "a"
  const lowestElevationNodes = grid.reduce((agg, row) => {
    const lowestRowNodes = row.filter(({ val }) => val === LOWEST_ELEVATION);
    return [...agg, ...lowestRowNodes];
  }, []);

  const lowestElevationPaths = lowestElevationNodes
    .map((startingNode) => {
      const shortestPath = findShortestPath(grid, startingNode, end);

      resetGrid(grid); // reset grid after each run

      return shortestPath;
    })
    .filter((path) => path !== null);

  let shortestTrail = lowestElevationPaths.pop();

  while (lowestElevationPaths.length !== 0) {
    const path = lowestElevationPaths.pop();

    if (path.length < shortestTrail.length) {
      shortestTrail = path;
    }
  }

  return shortestTrail;
}

function findShortestPath(grid, startingNode, end = GOAL) {
  function searchForEndNode(startNode) {
    startNode.type = "root";
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

  const endNode = searchForEndNode(startingNode);
  if (!endNode) return null;

  const path = [endNode];

  let currNode = endNode;
  while (currNode.parent) {
    currNode = currNode.parent;
    path.unshift(currNode);
  }

  return path;
}

function resetGrid(grid) {
  for (let row of grid) {
    for (let node of row) {
      node.explored = false;
      node.parent = null;
      node.type = null;
    }
  }
}

function findShortestPathFromStartVal(
  grid,
  start = START_POSITION,
  end = GOAL
) {
  const startingNode = findStartingNode(grid, start);
  return findShortestPath(grid, startingNode, end);
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
