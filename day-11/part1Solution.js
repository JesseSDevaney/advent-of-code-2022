import { ADD, MULTIPLY, SQUARE, startingMonkeys } from "./puzzleInput.js";

// ***** PROCEDURAL CODE *****

const simulationHistory = simulateMonkeys(startingMonkeys, 20);

const round20State = simulationHistory[20];
const numItemsInspectedPerMonkey = round20State.map(
  ({ numInspected }) => numInspected
);

const monkeyBusiness = calculateMonkeyBusiness(numItemsInspectedPerMonkey);
console.log(monkeyBusiness);

// ***** FUNCTIONAL CODE *****

function simulateMonkeys(initialState, numRounds) {
  let currentState = initialState;
  const history = [initialState];

  for (let round = 1; round <= numRounds; round++) {
    const newState = simulateRound(currentState);

    history.push(newState);
    currentState = newState;
  }

  return history;
}

function simulateRound(state) {
  const newState = cloneState(state);

  for (const monkey of newState) {
    const { items, operation, test } = monkey;

    while (items.length > 0) {
      const item = items.shift();
      const inspectionWorryLevel = computeInspectionWorryLevel(item, operation);
      const boredWorryLevel = computeBoredWorryLevel(inspectionWorryLevel);
      monkey.numInspected++;

      if (boredWorryLevel % test.divisible === 0) {
        newState[test.true].items.push(boredWorryLevel);
      } else {
        newState[test.false].items.push(boredWorryLevel);
      }
    }
  }

  return newState;
}

function computeInspectionWorryLevel(item, operation) {
  const [procedure, val] = operation;

  if (procedure === SQUARE) {
    return item * item;
  }

  if (procedure === MULTIPLY) {
    return item * val;
  }

  if (procedure === ADD) {
    return item + val;
  }
}

function computeBoredWorryLevel(worryLevel) {
  return Math.floor(worryLevel / 3);
}

function calculateMonkeyBusiness(numArr) {
  const sortedArr = [...numArr].sort((a, b) => {
    return a - b;
  });

  return sortedArr.at(-1) * sortedArr.at(-2);
}

function cloneState(state) {
  const clonedState = [];

  for (let monkey of state) {
    const clonedMonkey = {};

    for (let [key, value] of Object.entries(monkey)) {
      if (["items", "operation"].includes(key)) {
        clonedMonkey[key] = [...value];
        continue;
      }

      clonedMonkey[key] = value;
    }

    clonedState.push(clonedMonkey);
  }

  return clonedState;
}
