import { ADD, MULTIPLY, SQUARE, startingMonkeys } from "./puzzleInput.js";

// ***** PROCEDURAL CODE *****

const NUM_ROUNDS = 10000;
const simulationHistory = simulateMonkeys(startingMonkeys, NUM_ROUNDS);

const finalState = simulationHistory[NUM_ROUNDS];
const numItemsInspectedPerMonkey = finalState.map(
  ({ numInspected }) => numInspected
);

const monkeyBusiness = calculateMonkeyBusiness(numItemsInspectedPerMonkey);
console.log(monkeyBusiness);

// ***** FUNCTIONAL CODE *****

function simulateMonkeys(initialState, numRounds) {
  let currentState = initialState;
  const history = [initialState];
  const allDivisors = initialState
    .map(({ test }) => test.divisible)
    .reduce((agg, divisor) => agg * divisor, 1);

  for (let round = 1; round <= numRounds; round++) {
    const newState = simulateRound(currentState, allDivisors);

    history.push(newState);
    currentState = newState;
  }

  return history;
}

function simulateRound(state, allDivisors) {
  const newState = cloneState(state);

  for (const monkey of newState) {
    const { items, operation, test } = monkey;

    while (items.length > 0) {
      const item = items.shift();
      const inspectionWorryLevel = computeInspectionWorryLevel(item, operation);
      monkey.numInspected++;

      if (inspectionWorryLevel % test.divisible === 0) {
        newState[test.true].items.push(inspectionWorryLevel % allDivisors);
      } else {
        newState[test.false].items.push(inspectionWorryLevel % allDivisors);
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
