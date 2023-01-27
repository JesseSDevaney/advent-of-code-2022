import * as fs from "node:fs";

// ***** CONSTANTS *****

const NOOP = "noop";
const ADD_X = "addx";

// ***** PROCEDURAL CODE *****

const input = fs.readFileSync("./puzzleInput.txt", "utf-8");

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

const cycleHistory = simulateInstructions(cpuInstructions);

const sumOfSignalStrength = calculateSumOfSignalStrength(cycleHistory);

console.log(sumOfSignalStrength);

// ***** FUNCTIONAL CODE *****

function simulateInstructions(instructions) {
  let currState = new Map([
    ["X", 1],
    ["cycle", 1],
  ]);

  const simulationHistory = [currState];

  for (const instruction of instructions) {
    const nextCycles = computeInstruction(currState, instruction);

    currState = nextCycles.at(-1);

    simulationHistory.push(...nextCycles);
  }

  return simulationHistory;
}

function computeInstruction(currState, instruction) {
  if (instruction.type === NOOP) return computeNOOP(currState);
  if (instruction.type === ADD_X)
    return computeAddX(currState, instruction.value);
}

function computeNOOP(currState) {
  const nextState = new Map(currState);
  nextState.set("cycle", currState.get("cycle") + 1);

  return [nextState];
}

function computeAddX(currState, value) {
  const firstCycle = new Map(currState);
  firstCycle.set("cycle", currState.get("cycle") + 1);

  const secondCycle = new Map(firstCycle);
  secondCycle.set("cycle", firstCycle.get("cycle") + 1);
  secondCycle.set("X", firstCycle.get("X") + value);

  return [firstCycle, secondCycle];
}

function calculateSumOfSignalStrength(cycleHistory) {
  let sum = 0;

  for (let cycle of cycleHistory) {
    const X = cycle.get("X");
    const cycleNum = cycle.get("cycle");

    if ((cycleNum - 20) % 40 === 0) {
      sum += cycleNum * X;
    }
  }

  return sum;
}
