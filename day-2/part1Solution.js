import * as fs from "node:fs";

const inputEncrypted = fs.readFileSync("./puzzleInput.txt", "utf-8");

// possible moves
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

// move translation
const MOVE_TRANSLATION = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS
};

// translate moves from 
// "A" or "X" -> "ROCK"
// "B" or "Y" -> "PAPER"
// "C" or "Z" -> "SCISSORS"
function decryptInput(inputStr) {
  let decryptedStr = inputStr;

  for (const [key, value] of Object.entries(MOVE_TRANSLATION)) {
    decryptedStr = decryptedStr.replaceAll(key, value);
  }

  return decryptedStr;
}

const inputDecrypted = decryptInput(inputEncrypted);

const rounds = inputDecrypted.split(/\n/).map(round => round.split(/\s/));

// possible outcomes
const WIN = "win";
const DRAW = "draw";
const LOSE = "lose";

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

// determine outcome for one round of play
function determineOutcome(opponentPlay, userPlay) {
  if (opponentPlay === ROCK) {
    if (userPlay === ROCK) return DRAW;
    else if (userPlay === PAPER) return WIN;
    else return LOSE;
  } else if (opponentPlay === PAPER) {
    if (userPlay === PAPER) return DRAW;
    else if (userPlay === SCISSORS) return WIN;
    else return LOSE;
  } else if (opponentPlay === SCISSORS) {
    if (userPlay === SCISSORS) return DRAW;
    else if (userPlay === ROCK) return WIN;
    else return LOSE;
  }
}

// determine points for one round of play
function determinePointsScored(userPlay, roundOutcome) {
  return MOVE_POINTS[userPlay] + OUTCOME_POINTS[roundOutcome];
}

const totalPoints = rounds.reduce(
  (sum, currRound) => {
    const opponentPlay = currRound[0];
    const userPlay = currRound[1];

    const roundOutcome = determineOutcome(opponentPlay, userPlay);
    const pointsScored = determinePointsScored(userPlay, roundOutcome);

    return sum + pointsScored;
  }, 
  0);

  console.log(totalPoints);