import * as fs from "node:fs";

const inputEncrypted = fs.readFileSync("./puzzleInput.txt", "utf-8");

// possible moves
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

// opponent move translation
const OPPONENT_MOVE_TRANSLATION = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
};

// possible outcomes
const WIN = "win";
const DRAW = "draw";
const LOSE = "lose";

// objective translation
const OBJECTIVE_TRANSLATION = {
  X: LOSE,
  Y: DRAW,
  Z: WIN
};

// decrypt input by translating moves and objectives
function decryptInput(inputStr) {
  let decryptedStr = inputStr;

  for (const [key, value] of Object.entries(OPPONENT_MOVE_TRANSLATION)) {
    decryptedStr = decryptedStr.replaceAll(key, value);
  }

  for (const [key, value] of Object.entries(OBJECTIVE_TRANSLATION)) {
    decryptedStr = decryptedStr.replaceAll(key, value);
  }

  return decryptedStr;
}

const inputDecrypted = decryptInput(inputEncrypted);
const rounds = inputDecrypted.split(/\n/).map(round => round.split(/\s/));

// points scored
const OUTCOME_POINTS = {
  [WIN]: 6,
  [DRAW]: 3,
  [LOSE]: 0
};
const MOVE_POINTS = {
  rock: 1,
  paper: 2,
  scissors: 3
};

// determine move based on opponent move and desired outcome
function determineMove(opponentPlay, desiredOutcome) {
  if (opponentPlay === ROCK) {
    if (desiredOutcome === DRAW) return ROCK;
    else if (desiredOutcome === WIN) return PAPER;
    else if (desiredOutcome === LOSE) return SCISSORS;
  } else if (opponentPlay === PAPER) {
    if (desiredOutcome === DRAW) return PAPER;
    else if (desiredOutcome === WIN) return SCISSORS;
    else if (desiredOutcome === LOSE) return ROCK;
  } else if (opponentPlay === SCISSORS) {
    if (desiredOutcome === DRAW) return SCISSORS;
    else if (desiredOutcome === WIN) return ROCK;
    else if (desiredOutcome === LOSE) return PAPER;
  }
}

// determine points for one round of play
function determinePointsScored(userPlay, roundOutcome) {
  return MOVE_POINTS[userPlay] + OUTCOME_POINTS[roundOutcome];
}

const totalPoints = rounds.reduce(
  (sum, currRound) => {
    const opponentPlay = currRound[0];
    const desiredOutcome = currRound[1];

    const userPlay = determineMove(opponentPlay, desiredOutcome);

    const pointsScored = determinePointsScored(userPlay, desiredOutcome);

    return sum + pointsScored;
  }, 
  0);

  console.log(totalPoints);