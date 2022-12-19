import * as fs from "node:fs";

// turn crate input into stacks (arrays) of crates
// where each index represents a stack (array)
// and each index inside the stack represents a crate
// crates at the start represent the bottom of the stack
// crates at the end represent the top of the stack
function parseCratesInput(setupInput) {
  const trimmedInput = setupInput.replace(/\d\s/g, "");
  const separatedStacks = trimmedInput.split("\n");

  const stacks = separatedStacks.map((stack) => {
    const crateRegex = /\w/g;
    return stack.match(crateRegex);
  });

  return stacks;
}

// parse instructions into cell separated instructions 
// {numCratesToMove, FromStack, ToStack}
function parseInstructions(instructionsInput) {
  const separatedInstructions = instructionsInput.split("\n");

  const instructionsArr = separatedInstructions.map((instruction) => {
    const instructionArr = instruction.match(/\d+/g);

    const instructionMap = new Map();

    instructionMap.set("numToMove", Number(instructionArr[0]));
    instructionMap.set("from", Number(instructionArr[1]));
    instructionMap.set("to", Number(instructionArr[2]));

    return instructionMap;
  });

  return instructionsArr;
}

function clone2DArray(arr) {
  return arr.map((item) => (
    item.map((nestedItem) => nestedItem)
  ));
}

// make the function pure by cloning the array
// and not mutating the original array
function moveCrates(stacks, numToMove, from, to) {
  const stacksCopy = clone2DArray(stacks);
  const fromIndex = from - 1;
  const toIndex = to - 1;

  while(numToMove !== 0 && stacks[fromIndex].length !== 0) {
    // take crate off top of from stack
    const crateToMove = stacksCopy[fromIndex].pop();

    // add create to top of to stack
    stacksCopy[toIndex].push(crateToMove);
    numToMove--;
  }

  return stacksCopy;
}

function getTopOfStacks(stacks) {
  return (
    stacks
    .map((stack) => stack[stack.length-1])
    .reduce(
      (cumStr, char) => cumStr + char,
      "")
  );
}


const input = fs.readFileSync("./puzzleInput.txt", "utf-8");
const [cratesInput, instructionsInput] = input.split("\n\n\n");

const startingStacks = parseCratesInput(cratesInput);
const instructions = parseInstructions(instructionsInput);

const stacksAfterInstructions = instructions.reduce(
  (currStacks, nextInstructions) => {
    const numToMove = nextInstructions.get("numToMove");
    const from = nextInstructions.get("from");
    const to = nextInstructions.get("to");

    return moveCrates(currStacks, numToMove, from, to);
  },
  startingStacks);

const topOfStacks = getTopOfStacks(stacksAfterInstructions);
console.log(topOfStacks);